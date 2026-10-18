begin;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text check (full_name is null or char_length(trim(full_name)) between 3 and 120),
    phone text check (phone is null or phone ~ '^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$'),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table public.projects (
    id text primary key check (id ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
    number smallint not null unique check (number > 0),
    category text not null check (char_length(trim(category)) between 3 and 80),
    title text not null check (char_length(trim(title)) between 3 and 120),
    summary text not null check (char_length(trim(summary)) between 20 and 500),
    status text not null check (char_length(trim(status)) between 3 and 60),
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table public.collaboration_requests (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null unique references auth.users(id) on delete cascade,
    participation text not null check (participation in ('doador', 'voluntario')),
    status text not null default 'pending' check (status in ('pending', 'contacted', 'approved', 'closed')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index collaboration_requests_status_created_idx
    on public.collaboration_requests (status, created_at desc);

create function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    insert into public.profiles (id)
    values (new.id)
    on conflict (id) do nothing;
    return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function private.set_updated_at();

create trigger projects_set_updated_at
before update on public.projects
for each row execute function private.set_updated_at();

create trigger collaboration_requests_set_updated_at
before update on public.collaboration_requests
for each row execute function private.set_updated_at();

create trigger auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.collaboration_requests enable row level security;

create policy profiles_select_own
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

create policy profiles_insert_own
on public.profiles for insert
to authenticated
with check ((select auth.uid()) = id);

create policy profiles_update_own
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy projects_read_active
on public.projects for select
to anon, authenticated
using (is_active);

create policy collaboration_requests_select_own
on public.collaboration_requests for select
to authenticated
using ((select auth.uid()) = user_id);

create policy collaboration_requests_insert_own
on public.collaboration_requests for insert
to authenticated
with check ((select auth.uid()) = user_id and status = 'pending');

create policy collaboration_requests_update_own
on public.collaboration_requests for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id and status = 'pending');

revoke all on table public.profiles from public, anon, authenticated;
revoke all on table public.projects from public, anon, authenticated;
revoke all on table public.collaboration_requests from public, anon, authenticated;

grant usage on schema public to anon, authenticated;
grant select on table public.projects to anon, authenticated;
grant select on table public.profiles to authenticated;
grant update (full_name, phone) on table public.profiles to authenticated;
grant select on table public.collaboration_requests to authenticated;
grant insert (user_id, participation) on table public.collaboration_requests to authenticated;
grant update (participation) on table public.collaboration_requests to authenticated;

revoke all on function private.set_updated_at() from public, anon, authenticated;
revoke all on function private.handle_new_user() from public, anon, authenticated;

alter default privileges for role postgres in schema public
    revoke all on tables from anon, authenticated;
alter default privileges for role postgres in schema public
    revoke all on sequences from anon, authenticated;
alter default privileges for role postgres in schema public
    revoke execute on functions from public, anon, authenticated;

insert into public.projects (id, number, category, title, summary, status)
values
    ('mesa-solidaria', 1, 'Assistência social', 'Projeto Mesa Solidária', 'Arrecadação e distribuição de alimentos e produtos essenciais para famílias acompanhadas pela rede comunitária.', 'Doações abertas'),
    ('conexao-digital', 2, 'Educação comunitária', 'Projeto Conexão Digital', 'Oficinas gratuitas que ampliam a autonomia digital e o acesso de jovens e adultos a novas oportunidades.', 'Vagas abertas');

commit;

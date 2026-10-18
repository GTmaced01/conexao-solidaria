import { exigirSupabase } from "./supabase.js";

export class AutenticacaoNecessariaError extends Error {
    constructor() {
        super("Entre com seu e-mail antes de enviar o cadastro.");
        this.name = "AutenticacaoNecessariaError";
    }
}

export async function obterSessao() {
    const cliente = exigirSupabase();
    const { data, error } = await cliente.auth.getSession();
    if (error) throw error;
    return data.session;
}

export async function enviarLinkDeAcesso(email) {
    const cliente = exigirSupabase();
    const destino = new URL(window.location.origin + window.location.pathname);
    destino.hash = "cadastro";

    const { error } = await cliente.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: destino.href,
            shouldCreateUser: true
        }
    });
    if (error) throw error;
}

export async function encerrarSessao() {
    const { error } = await exigirSupabase().auth.signOut({ scope: "local" });
    if (error) throw error;
}

export async function listarProjetosAtivos() {
    const { data, error } = await exigirSupabase()
        .from("projects")
        .select("id, number, category, title, summary, status")
        .eq("is_active", true)
        .order("number", { ascending: true });

    if (error) throw error;

    return data.map((projeto) => ({
        id: projeto.id,
        numero: String(projeto.number).padStart(2, "0"),
        categoria: projeto.category,
        titulo: projeto.title,
        resumo: projeto.summary,
        status: projeto.status
    }));
}

export async function salvarCadastroRemoto({ nome, telefone, participacao }) {
    const cliente = exigirSupabase();
    const sessao = await obterSessao();
    if (!sessao?.user) throw new AutenticacaoNecessariaError();

    const perfil = {
        id: sessao.user.id,
        full_name: nome.trim(),
        phone: telefone.trim()
    };
    const { error: erroPerfil } = await cliente
        .from("profiles")
        .update({ full_name: perfil.full_name, phone: perfil.phone })
        .eq("id", perfil.id);
    if (erroPerfil) throw erroPerfil;

    const { data: interesseAtual, error: erroConsulta } = await cliente
        .from("collaboration_requests")
        .select("id")
        .eq("user_id", sessao.user.id)
        .maybeSingle();
    if (erroConsulta) throw erroConsulta;

    const operacao = interesseAtual
        ? cliente.from("collaboration_requests").update({ participation: participacao }).eq("id", interesseAtual.id)
        : cliente.from("collaboration_requests").insert({ user_id: sessao.user.id, participation: participacao });
    const { error: erroInteresse } = await operacao;
    if (erroInteresse) throw erroInteresse;

    return sessao.user;
}

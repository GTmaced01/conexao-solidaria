import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

export const supabaseConfigurado = Boolean(supabaseUrl && supabasePublishableKey);

export const supabase = supabaseConfigurado
    ? createClient(supabaseUrl, supabasePublishableKey, {
        auth: {
            autoRefreshToken: true,
            detectSessionInUrl: true,
            flowType: "pkce",
            persistSession: true
        }
    })
    : null;

export function exigirSupabase() {
    if (!supabase) {
        throw new Error("A conexão segura ainda não foi configurada neste ambiente.");
    }

    return supabase;
}

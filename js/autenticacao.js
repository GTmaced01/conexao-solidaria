import { encerrarSessao, enviarLinkDeAcesso, obterSessao } from "./servicos.js";
import { supabase, supabaseConfigurado } from "./supabase.js";

let cancelarEscuta = null;

function mensagemDeErro(erro) {
    if (erro?.status === 429) return "Muitas tentativas. Aguarde alguns minutos e tente novamente.";
    return erro instanceof Error ? erro.message : "Não foi possível concluir a solicitação.";
}

function atualizarInterface(sessao) {
    const formularioAcesso = document.querySelector("#form-acesso");
    const sessaoAtiva = document.querySelector("#sessao-ativa");
    const emailSessao = document.querySelector("#email-sessao");
    const emailCadastro = document.querySelector("#email");
    if (!formularioAcesso || !sessaoAtiva) return;

    const conectado = Boolean(sessao?.user);
    formularioAcesso.hidden = conectado;
    sessaoAtiva.hidden = !conectado;

    if (conectado) {
        emailSessao.textContent = sessao.user.email ?? "conta autenticada";
        if (emailCadastro) {
            emailCadastro.value = sessao.user.email ?? "";
            emailCadastro.readOnly = true;
        }
    } else if (emailCadastro) {
        emailCadastro.readOnly = false;
    }
}

export async function iniciarAutenticacao() {
    const formulario = document.querySelector("#form-acesso");
    const status = document.querySelector("#auth-status");
    const botaoSair = document.querySelector("#sair-conta");
    if (!formulario || !status) return;

    cancelarEscuta?.();
    cancelarEscuta = null;

    if (!supabaseConfigurado) {
        status.textContent = "Integração preparada. Falta conectar as variáveis públicas do novo projeto Supabase.";
        status.className = "form-status is-error";
        formulario.querySelector("button").disabled = true;
        return;
    }

    try {
        atualizarInterface(await obterSessao());
    } catch (erro) {
        status.textContent = mensagemDeErro(erro);
        status.className = "form-status is-error";
    }

    formulario.addEventListener("submit", async evento => {
        evento.preventDefault();
        const botao = formulario.querySelector("button");
        const email = new FormData(formulario).get("email-acesso")?.toString().trim();
        if (!email) return;

        botao.disabled = true;
        status.textContent = "Enviando link seguro...";
        status.className = "form-status";
        try {
            await enviarLinkDeAcesso(email);
            status.textContent = "Link enviado. Abra seu e-mail para concluir o acesso.";
            status.className = "form-status is-success";
        } catch (erro) {
            status.textContent = mensagemDeErro(erro);
            status.className = "form-status is-error";
        } finally {
            botao.disabled = false;
        }
    });

    botaoSair?.addEventListener("click", async () => {
        status.textContent = "Encerrando acesso...";
        try {
            await encerrarSessao();
            atualizarInterface(null);
            status.textContent = "Acesso encerrado com segurança.";
            status.className = "form-status";
        } catch (erro) {
            status.textContent = mensagemDeErro(erro);
            status.className = "form-status is-error";
        }
    });

    const { data } = supabase.auth.onAuthStateChange((_evento, sessao) => {
        atualizarInterface(sessao);
    });
    cancelarEscuta = () => data.subscription.unsubscribe();
}

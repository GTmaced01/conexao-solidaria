import IMask from "imask";
import { carregarRascunho, limparRascunho, salvarRascunho } from "./storage.js";
import { salvarCadastroRemoto } from "./servicos.js";
import { supabaseConfigurado } from "./supabase.js";

const regras = {
    nome: {
        testar: valor => /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[\s'-][A-Za-zÀ-ÖØ-öø-ÿ]+)+$/.test(valor),
        mensagem: "Informe nome e sobrenome usando apenas letras."
    },
    email: {
        testar: valor => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor),
        mensagem: "Informe um e-mail válido, como nome@dominio.com."
    },
    telefone: {
        testar: valor => /^\(\d{2}\) \d{5}-\d{4}$/.test(valor),
        mensagem: "Informe o telefone completo no formato (00) 00000-0000."
    },
    participacao: {
        testar: valor => ["doador", "voluntario"].includes(valor),
        mensagem: "Selecione como deseja participar."
    }
};

function dadosDoFormulario(formulario) {
    return Object.fromEntries(new FormData(formulario).entries());
}

function restaurarRascunho(formulario) {
    const rascunho = carregarRascunho();
    Object.entries(rascunho).forEach(([nome, valor]) => {
        const campo = formulario.elements.namedItem(nome);
        if (campo) campo.value = valor;
    });
}

function obterFeedback(campo) {
    const id = `${campo.id}-feedback`;
    let feedback = campo.parentElement.querySelector(`#${id}`);

    if (!feedback) {
        feedback = document.createElement("small");
        feedback.id = id;
        feedback.className = "field-feedback";
        feedback.setAttribute("aria-live", "polite");
        campo.insertAdjacentElement("afterend", feedback);
    }

    campo.setAttribute("aria-describedby", id);
    return feedback;
}

function validarCampo(campo) {
    const valor = campo.value.trim();
    const regra = regras[campo.name];
    const feedback = obterFeedback(campo);
    let mensagem = "";

    if (campo.required && !valor) {
        mensagem = "Este campo é obrigatório.";
    } else if (regra && !regra.testar(valor)) {
        mensagem = regra.mensagem;
    }

    const invalido = Boolean(mensagem);
    campo.classList.toggle("is-invalid", invalido);
    campo.classList.toggle("is-valid", !invalido);
    campo.setAttribute("aria-invalid", String(invalido));
    feedback.textContent = mensagem || "Preenchimento válido.";
    feedback.className = `field-feedback ${invalido ? "is-error" : "is-success"}`;

    return !invalido;
}

function limparValidacao(formulario) {
    formulario.querySelectorAll("input, select").forEach(campo => {
        campo.classList.remove("is-valid", "is-invalid");
        campo.removeAttribute("aria-invalid");
    });
    formulario.querySelectorAll(".field-feedback").forEach(feedback => {
        feedback.textContent = "";
        feedback.className = "field-feedback";
    });
}

export function iniciarFormulario() {
    const formulario = document.querySelector("#formulario");
    if (!formulario) return;

    const status = formulario.querySelector("#form-status");
    restaurarRascunho(formulario);
    const campoTelefone = formulario.elements.namedItem("telefone");
    const mascaraTelefone = campoTelefone
        ? IMask(campoTelefone, { mask: "(00) 00000-0000", lazy: true })
        : null;

    formulario.addEventListener("input", evento => {
        const campo = evento.target.closest("input, select");
        if (!campo) return;

        validarCampo(campo);
        salvarRascunho(dadosDoFormulario(formulario));
        status.textContent = "Rascunho salvo neste dispositivo.";
        status.className = "form-status";
    });

    formulario.addEventListener("change", evento => {
        const campo = evento.target.closest("input, select");
        if (campo) validarCampo(campo);
    });

    formulario.addEventListener("submit", async evento => {
        evento.preventDefault();
        const campos = [...formulario.querySelectorAll("[required]")];
        const formularioValido = campos.map(validarCampo).every(Boolean);

        if (!formularioValido) {
            status.textContent = "Revise os campos destacados antes de continuar.";
            status.className = "form-status is-error";
            formulario.classList.remove("is-success");
            campos.find(campo => campo.classList.contains("is-invalid"))?.focus();
            return;
        }

        if (!supabaseConfigurado) {
            status.textContent = "A conexão segura ainda não foi configurada neste ambiente.";
            status.className = "form-status is-error";
            return;
        }

        const botaoEnviar = formulario.querySelector('button[type="submit"]');
        botaoEnviar.disabled = true;
        status.textContent = "Enviando cadastro com segurança...";
        status.className = "form-status";

        try {
            await salvarCadastroRemoto(dadosDoFormulario(formulario));
            limparRascunho();
            status.textContent = "Cadastro enviado com sucesso. Entraremos em contato pelas próximas ações.";
            status.className = "form-status is-success";
            formulario.classList.add("is-success");
        } catch (erro) {
            status.textContent = erro instanceof Error ? erro.message : "Não foi possível enviar o cadastro.";
            status.className = "form-status is-error";
            formulario.classList.remove("is-success");
        } finally {
            botaoEnviar.disabled = false;
        }
    });

    formulario.addEventListener("reset", () => {
        limparRascunho();
        window.setTimeout(() => {
            mascaraTelefone?.updateValue();
            limparValidacao(formulario);
            formulario.classList.remove("is-success");
            status.textContent = "Formulário e rascunho local removidos.";
            status.className = "form-status";
        }, 0);
    });
}

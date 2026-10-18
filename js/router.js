import { templates } from "./templates.js";
import { anunciarRota, atualizarNavegacao } from "./ui.js";
import { iniciarFormulario } from "./validacao.js";
import { iniciarMonitoramento } from "./monitoramento.js";
import { iniciarAutenticacao } from "./autenticacao.js";
import { listarProjetosAtivos } from "./servicos.js";

const titulos = {
    inicio: "Início",
    projetos: "Projetos",
    cadastro: "Cadastro",
    monitoramento: "Monitoramento de preços"
};

let sequenciaRenderizacao = 0;

async function dadosDaRota(rota) {
    if (rota !== "inicio" && rota !== "projetos") return undefined;

    try {
        const projetos = await listarProjetosAtivos();
        return projetos.length > 0 ? projetos : undefined;
    } catch (erro) {
        console.warn("Não foi possível carregar os projetos do Supabase; usando a cópia local.", erro);
        return undefined;
    }
}

function rotaAtual() {
    const rota = window.location.hash.replace("#", "").split("/")[0];
    return Object.hasOwn(templates, rota) ? rota : "inicio";
}

function interceptarNavegacao(evento) {
    const link = evento.target.closest("a[data-route]");
    if (!link || evento.button !== 0 || evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;

    evento.preventDefault();
    const destino = link.dataset.route;
    const proximoHash = `#${destino}`;

    if (window.location.hash === proximoHash) {
        renderizarRota();
        return;
    }

    window.location.hash = destino;
}

export async function renderizarRota({ gerenciarFoco = true } = {}) {
    const renderizacao = ++sequenciaRenderizacao;
    const rota = rotaAtual();
    const app = document.querySelector("#app");

    app.setAttribute("aria-busy", "true");
    const dados = await dadosDaRota(rota);
    if (renderizacao !== sequenciaRenderizacao) return;

    app.innerHTML = templates[rota](dados);
    document.title = `${titulos[rota]} | Conexão Solidária`;
    atualizarNavegacao(rota);
    anunciarRota(titulos[rota]);
    iniciarAutenticacao();
    iniciarFormulario();
    iniciarMonitoramento();
    app.setAttribute("aria-busy", "false");
    if (gerenciarFoco) app.focus({ preventScroll: true });
    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduzirMovimento ? "auto" : "smooth" });
}

export function iniciarRoteador() {
    const rotaInicial = window.location.hash.replace("#", "").split("/")[0];
    if (!Object.hasOwn(templates, rotaInicial)) {
        window.history.replaceState(null, "", "#inicio");
    }

    document.addEventListener("click", interceptarNavegacao);
    window.addEventListener("hashchange", () => {
        const rota = window.location.hash.replace("#", "").split("/")[0];
        if (Object.hasOwn(templates, rota)) renderizarRota();
    });
    renderizarRota({ gerenciarFoco: false });
}

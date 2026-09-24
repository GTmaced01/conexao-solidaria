import { templates } from "./templates.js";
import { anunciarRota, atualizarNavegacao } from "./ui.js";
import { iniciarFormulario } from "./validacao.js";

const titulos = {
    inicio: "Início",
    projetos: "Projetos",
    cadastro: "Cadastro"
};

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

export function renderizarRota({ gerenciarFoco = true } = {}) {
    const rota = rotaAtual();
    const app = document.querySelector("#app");

    app.setAttribute("aria-busy", "true");
    app.innerHTML = templates[rota]();
    document.title = `${titulos[rota]} | Conexão Solidária`;
    atualizarNavegacao(rota);
    anunciarRota(titulos[rota]);
    iniciarFormulario();
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

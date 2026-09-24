function definirEstadoMenu(menu, botao, aberto) {
    menu.classList.toggle("is-open", aberto);
    botao.setAttribute("aria-expanded", String(aberto));
    botao.querySelector(".sr-only").textContent = aberto
        ? "Fechar menu principal"
        : "Abrir menu principal";
}

export function atualizarNavegacao(rota) {
    document.querySelectorAll("[data-route]").forEach(link => {
        const ativo = link.dataset.route === rota;
        if (ativo) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
    });

    const menu = document.querySelector(".site-nav");
    const botao = document.querySelector(".menu-toggle");
    definirEstadoMenu(menu, botao, false);
}

export function anunciarRota(titulo) {
    document.querySelector("#route-status").textContent = `Página ${titulo} carregada.`;
}

export function iniciarMenuResponsivo() {
    const menu = document.querySelector(".site-nav");
    const botao = document.querySelector(".menu-toggle");

    botao.addEventListener("click", () => {
        const aberto = botao.getAttribute("aria-expanded") === "true";
        definirEstadoMenu(menu, botao, !aberto);
    });

    document.addEventListener("keydown", evento => {
        const menuAberto = botao.getAttribute("aria-expanded") === "true";
        if (evento.key !== "Escape" || !menuAberto) return;

        evento.preventDefault();
        definirEstadoMenu(menu, botao, false);
        botao.focus();
    });
}

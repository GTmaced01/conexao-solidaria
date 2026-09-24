export function atualizarNavegacao(rota) {
    document.querySelectorAll("[data-route]").forEach(link => {
        const ativo = link.dataset.route === rota;
        if (ativo) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
    });

    const menu = document.querySelector(".site-nav");
    const botao = document.querySelector(".menu-toggle");
    menu.classList.remove("is-open");
    botao.setAttribute("aria-expanded", "false");
}

export function anunciarRota(titulo) {
    document.querySelector("#route-status").textContent = `Página ${titulo} carregada.`;
}

export function iniciarMenuResponsivo() {
    const menu = document.querySelector(".site-nav");
    const botao = document.querySelector(".menu-toggle");

    botao.addEventListener("click", () => {
        const aberto = botao.getAttribute("aria-expanded") === "true";
        botao.setAttribute("aria-expanded", String(!aberto));
        menu.classList.toggle("is-open", !aberto);
    });
}

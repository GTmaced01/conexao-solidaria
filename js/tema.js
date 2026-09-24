const CHAVE_TEMA = "conexao-solidaria:tema";

function lerTemaSalvo() {
    try {
        const tema = window.localStorage.getItem(CHAVE_TEMA);
        return ["light", "dark"].includes(tema) ? tema : null;
    } catch {
        return null;
    }
}

function salvarTema(tema) {
    try {
        window.localStorage.setItem(CHAVE_TEMA, tema);
    } catch {
        // O modo continua funcional durante a sessão se o armazenamento estiver indisponível.
    }
}

function aplicarTema(tema, botao) {
    const escuro = tema === "dark";
    document.documentElement.dataset.theme = tema;
    document.querySelector('meta[name="theme-color"]').content = escuro ? "#071a24" : "#f3f7f8";
    botao.setAttribute("aria-pressed", String(escuro));
    botao.setAttribute("aria-label", escuro ? "Ativar modo claro" : "Ativar modo escuro");
    botao.querySelector(".theme-toggle-icon").textContent = escuro ? "☀" : "☾";
    botao.querySelector(".theme-toggle-text").textContent = escuro ? "Modo claro" : "Modo escuro";
}

export function iniciarTema() {
    const botao = document.querySelector(".theme-toggle");
    const preferenciaDoSistema = window.matchMedia("(prefers-color-scheme: dark)");
    const temaInicial = lerTemaSalvo() || (preferenciaDoSistema.matches ? "dark" : "light");

    aplicarTema(temaInicial, botao);

    botao.addEventListener("click", () => {
        const proximoTema = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        aplicarTema(proximoTema, botao);
        salvarTema(proximoTema);
    });

    preferenciaDoSistema.addEventListener("change", evento => {
        if (!lerTemaSalvo()) aplicarTema(evento.matches ? "dark" : "light", botao);
    });
}

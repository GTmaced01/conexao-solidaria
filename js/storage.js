const CHAVE_RASCUNHO = "conexao-solidaria:cadastro";

export function salvarRascunho(dados) {
    localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(dados));
}

export function carregarRascunho() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE_RASCUNHO)) ?? {};
    } catch {
        return {};
    }
}

export function limparRascunho() {
    localStorage.removeItem(CHAVE_RASCUNHO);
}

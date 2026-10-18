const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

const formatadorPercentual = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

function classificarVariacao(variacao) {
    if (variacao > 0) return "AUMENTO";
    if (variacao < 0) return "QUEDA";
    return "ESTÁVEL";
}

function lerProduto(formulario, numero) {
    const nome = formulario.elements[`produto-${numero}`].value.trim();
    const precoAnterior = formulario.elements[`preco-anterior-${numero}`].valueAsNumber;
    const precoAtual = formulario.elements[`preco-atual-${numero}`].valueAsNumber;
    const diferenca = precoAtual - precoAnterior;
    const variacao = (diferenca / precoAnterior) * 100;

    return {
        nome,
        precoAnterior,
        precoAtual,
        variacao,
        situacao: classificarVariacao(variacao)
    };
}

function criarCelula(conteudo) {
    const celula = document.createElement("td");
    celula.textContent = conteudo;
    return celula;
}

function criarLinhaResultado(produto) {
    const linha = document.createElement("tr");
    linha.append(
        criarCelula(produto.nome),
        criarCelula(formatadorMoeda.format(produto.precoAnterior)),
        criarCelula(formatadorMoeda.format(produto.precoAtual)),
        criarCelula(`${formatadorPercentual.format(produto.variacao)}%`)
    );

    const celulaSituacao = criarCelula(produto.situacao);
    const indicador = document.createElement("strong");
    indicador.className = `price-status price-status-${produto.situacao.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;
    indicador.textContent = produto.situacao;
    celulaSituacao.textContent = "";
    celulaSituacao.append(indicador);
    linha.append(celulaSituacao);

    return linha;
}

export function iniciarMonitoramento() {
    const formulario = document.querySelector("#form-monitoramento");
    if (!formulario) return;

    const resultado = document.querySelector("#resultado-monitoramento");
    const linhas = document.querySelector("#linhas-resultados");

    formulario.addEventListener("submit", evento => {
        evento.preventDefault();
        if (!formulario.reportValidity()) return;

        const produtos = [1, 2, 3].map(numero => lerProduto(formulario, numero));
        linhas.replaceChildren(...produtos.map(criarLinhaResultado));
        resultado.hidden = false;
        document.querySelector("#titulo-resultados").focus({ preventScroll: true });
        resultado.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    formulario.addEventListener("reset", () => {
        resultado.hidden = true;
        linhas.replaceChildren();
    });
}

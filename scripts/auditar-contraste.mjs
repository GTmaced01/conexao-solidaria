const verificacoes = [
    ["Claro: texto principal", "#17252f", "#f3f7f8", 4.5],
    ["Claro: títulos", "#07283c", "#ffffff", 4.5],
    ["Claro: texto secundário", "#536571", "#f3f7f8", 4.5],
    ["Claro: destaque", "#056773", "#f3f7f8", 4.5],
    ["Claro: botão primário", "#ffffff", "#0b3954", 4.5],
    ["Claro: mensagem de erro", "#a22626", "#fff0f0", 4.5],
    ["Claro: mensagem de sucesso", "#176b47", "#e6f5ee", 4.5],
    ["Claro: borda de campo", "#7b929e", "#ffffff", 3],
    ["Escuro: texto principal", "#eef6f8", "#071a24", 4.5],
    ["Escuro: títulos", "#f3f9fb", "#102c3a", 4.5],
    ["Escuro: texto secundário", "#b8c8cf", "#071a24", 4.5],
    ["Escuro: destaque", "#8ad9e2", "#071a24", 4.5],
    ["Escuro: links", "#b9e5ed", "#102c3a", 4.5],
    ["Escuro: botão primário", "#ffffff", "#0b3954", 4.5],
    ["Escuro: mensagem de erro", "#ff9b9b", "#451f25", 4.5],
    ["Escuro: mensagem de sucesso", "#80d9b0", "#143b2d", 4.5],
    ["Escuro: borda de campo", "#7c96a0", "#0b2430", 3],
    ["Acento: texto sobre amarelo", "#07283c", "#ffcb47", 4.5]
];

function luminancia(hexadecimal) {
    const canais = [0, 2, 4]
        .map(indice => Number.parseInt(hexadecimal.slice(1 + indice, 3 + indice), 16) / 255)
        .map(canal => canal <= 0.04045 ? canal / 12.92 : ((canal + 0.055) / 1.055) ** 2.4);

    return 0.2126 * canais[0] + 0.7152 * canais[1] + 0.0722 * canais[2];
}

function calcularRazao(frente, fundo) {
    const luminancias = [luminancia(frente), luminancia(fundo)].sort((a, b) => b - a);
    return (luminancias[0] + 0.05) / (luminancias[1] + 0.05);
}

const resultados = verificacoes.map(([elemento, frente, fundo, minimo]) => {
    const razao = calcularRazao(frente, fundo);
    return { elemento, frente, fundo, razao: `${razao.toFixed(2)}:1`, minimo: `${minimo}:1`, resultado: razao >= minimo ? "Aprovado" : "Reprovado" };
});

console.table(resultados);

if (resultados.some(item => item.resultado === "Reprovado")) {
    process.exitCode = 1;
} else {
    console.log("Todos os pares atendem aos limites WCAG 2.1 AA definidos.");
}

import { mkdir, stat } from "node:fs/promises";
import { relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const raiz = fileURLToPath(new URL("../", import.meta.url));
const origem = fileURLToPath(new URL("../imagens/voluntarios.jpg", import.meta.url));
const destino = fileURLToPath(new URL("../imagens/otimizadas/", import.meta.url));
const larguras = [480, 800, 1200];
const formatos = [
    { extensao: "avif", aplicar: imagem => imagem.avif({ quality: 50, effort: 6 }) },
    { extensao: "webp", aplicar: imagem => imagem.webp({ quality: 72, effort: 6, smartSubsample: true }) },
    { extensao: "jpg", aplicar: imagem => imagem.jpeg({ quality: 78, progressive: true, mozjpeg: true }) }
];

await mkdir(destino, { recursive: true });

const tamanhoOriginal = (await stat(origem)).size;
const resultados = [];

for (const largura of larguras) {
    for (const formato of formatos) {
        const arquivo = `${destino}/voluntarios-${largura}.${formato.extensao}`;
        const imagem = sharp(origem).resize({ width: largura, withoutEnlargement: true });
        await formato.aplicar(imagem).toFile(arquivo);
        const tamanho = (await stat(arquivo)).size;
        resultados.push({ largura, formato: formato.extensao, tamanho });
    }
}

console.table(resultados.map(resultado => ({
    largura: `${resultado.largura}px`,
    formato: resultado.formato.toUpperCase(),
    bytes: resultado.tamanho,
    reducao: `${((1 - resultado.tamanho / tamanhoOriginal) * 100).toFixed(1)}%`
})));
console.log(`Origem: ${relative(raiz, origem)} (${tamanhoOriginal} bytes)`);

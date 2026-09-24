import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const arquivos = [
    "html/index.html",
    "css/styles.css",
    "js/app.js",
    "js/dados.js",
    "js/router.js",
    "js/storage.js",
    "js/tema.js",
    "js/templates.js",
    "js/ui.js",
    "js/validacao.js",
    "scripts/auditar-contraste.mjs",
    "scripts/otimizar-imagens.mjs",
    "package.json",
    "vite.config.js",
    "vercel.json"
];

const diretorioSeguro = `safe.directory=${raiz.replaceAll("\\", "/")}`;
const commit = execFileSync("git", ["-c", diretorioSeguro, "rev-parse", "--short", "HEAD"], {
    cwd: raiz,
    encoding: "utf8"
}).trim();
const branch = execFileSync("git", ["-c", diretorioSeguro, "branch", "--show-current"], {
    cwd: raiz,
    encoding: "utf8"
}).trim();

const secoes = await Promise.all(arquivos.map(async arquivo => {
    const caminho = join(raiz, arquivo);
    return `\n===== ARQUIVO: ${relative(raiz, caminho).replaceAll("\\", "/")} =====\n\n${await readFile(caminho, "utf8")}`;
}));

const conteudo = [
    "CONEXÃO SOLIDÁRIA — CÓDIGO-FONTE FINAL",
    `Branch: ${branch}`,
    `Commit: ${commit}`,
    "Produção: https://conexao-solidaria-virid.vercel.app",
    "Observação: imagens binárias e package-lock.json permanecem versionados no repositório, mas não são reproduzidos neste campo textual.",
    ...secoes
].join("\n");

if (conteudo.length > 100000) {
    throw new Error(`O código exportado possui ${conteudo.length} caracteres e excede o limite de 100.000.`);
}

await writeFile(join(raiz, "CODIGO-FONTE-FINAL.txt"), conteudo, "utf8");
console.log(`Código exportado com ${conteudo.length} caracteres para CODIGO-FONTE-FINAL.txt.`);

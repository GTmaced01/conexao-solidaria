import { existsSync, readFileSync } from "node:fs";
import { basename, extname } from "node:path";
import { execFileSync } from "node:child_process";

const extensoesTexto = new Set(["", ".css", ".env", ".example", ".html", ".js", ".json", ".md", ".mjs", ".sql", ".toml", ".txt", ".yaml", ".yml"]);
const padroes = [
    { nome: "chave privada", regex: /-----BEGIN (?:EC |OPENSSH |RSA )?PRIVATE KEY-----/ },
    { nome: "chave secreta Supabase", regex: /\bsb_secret_[A-Za-z0-9_-]{20,}\b/ },
    { nome: "service role Supabase", regex: /SUPABASE_SERVICE_ROLE_KEY\s*=\s*\S+/ },
    { nome: "JWT fixo", regex: /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b/ }
];

let arquivos;
try {
    arquivos = execFileSync("git", ["-c", `safe.directory=${process.cwd().replaceAll("\\", "/")}`, "ls-files", "-z", "--cached", "--others", "--exclude-standard"], { encoding: "utf8" })
        .split("\0")
        .filter(Boolean);
} catch {
    console.error("Não foi possível listar os arquivos do projeto com Git.");
    process.exit(1);
}

const achados = [];
for (const arquivo of arquivos) {
    if (!existsSync(arquivo) || !extensoesTexto.has(extname(arquivo).toLowerCase())) continue;
    if (basename(arquivo) === ".env.example") continue;
    const conteudo = readFileSync(arquivo, "utf8");
    for (const padrao of padroes) {
        if (padrao.regex.test(conteudo)) achados.push(`${arquivo}: ${padrao.nome}`);
    }
}

if (achados.length) {
    console.error(`Possíveis segredos encontrados:\n${achados.map(item => `- ${item}`).join("\n")}`);
    process.exit(1);
}

console.log("Nenhum segredo conhecido foi encontrado nos arquivos do projeto.");

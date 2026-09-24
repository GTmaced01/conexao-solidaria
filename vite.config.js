import { fileURLToPath } from "node:url";
import { minify } from "html-minifier-terser";
import { defineConfig } from "vite";

const raizHtml = fileURLToPath(new URL("./html", import.meta.url));
const diretorioSaida = fileURLToPath(new URL("./dist", import.meta.url));

export default defineConfig({
    root: raizHtml,
    base: "./",
    publicDir: false,
    build: {
        outDir: diretorioSaida,
        emptyOutDir: true,
        assetsDir: "assets",
        target: "es2020",
        minify: "oxc",
        cssMinify: true,
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) return "vendor";
                }
            }
        }
    },
    plugins: [{
        name: "minificar-html",
        enforce: "post",
        transformIndexHtml: {
            order: "post",
            async handler(html) {
                return minify(html, {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    sortAttributes: true,
                    sortClassName: true
                });
            }
        }
    }]
});

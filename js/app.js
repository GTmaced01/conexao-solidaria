import { iniciarRoteador } from "./router.js";
import { iniciarTema } from "./tema.js";
import { iniciarMenuResponsivo } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    iniciarTema();
    iniciarMenuResponsivo();
    iniciarRoteador();
});

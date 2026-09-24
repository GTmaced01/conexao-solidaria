import { iniciarRoteador } from "./router.js";
import { iniciarMenuResponsivo } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    iniciarMenuResponsivo();
    iniciarRoteador();
});

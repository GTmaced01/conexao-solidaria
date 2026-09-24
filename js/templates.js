import { projetos } from "./dados.js";

function cartaoProjeto(projeto) {
    return `
        <article class="info-card" aria-labelledby="titulo-cartao-${projeto.id}">
            <span class="card-number">${projeto.numero} · ${projeto.status}</span>
            <h3 id="titulo-cartao-${projeto.id}">${projeto.titulo}</h3>
            <p>${projeto.resumo}</p>
            <a class="text-link" href="#projetos" data-route="projetos">Conhecer projeto <span aria-hidden="true">→</span></a>
        </article>`;
}

export function templateInicio() {
    return `
        <section class="hero" aria-labelledby="titulo-inicio">
            <div class="container hero-grid">
                <div class="hero-copy">
                    <p class="eyebrow">Rede comunitária de apoio</p>
                    <h1 id="titulo-inicio">Solidariedade que aproxima pessoas e oportunidades</h1>
                    <p class="lead">Unimos voluntários e doadores em ações de assistência social e inclusão digital para fortalecer comunidades.</p>
                    <div class="button-row">
                        <a class="button button-primary" href="#cadastro" data-route="cadastro">Quero colaborar</a>
                        <a class="button button-secondary" href="#projetos" data-route="projetos">Conhecer os projetos</a>
                    </div>
                </div>
                <figure class="hero-media">
                    <picture>
                        <source srcset="../imagens/voluntarios.webp" type="image/webp">
                        <img src="../imagens/voluntarios.jpg" alt="Voluntários organizando alimentos para doação" width="1200" height="800">
                    </picture>
                    <figcaption>Voluntários preparando doações para a comunidade.</figcaption>
                </figure>
            </div>
        </section>
        <section class="section" aria-labelledby="titulo-destaques">
            <div class="container">
                <p class="eyebrow">Frentes de atuação</p>
                <h2 id="titulo-destaques">Ações que geram impacto próximo</h2>
                <div class="card-grid">${projetos.map(cartaoProjeto).join("")}</div>
            </div>
        </section>`;
}

export function templateProjetos() {
    const artigos = projetos.map(projeto => `
        <article class="section" id="${projeto.id}" aria-labelledby="titulo-${projeto.id}">
            <div class="container project-layout">
                <div class="project-index" aria-hidden="true">${projeto.numero}</div>
                <div class="project-content">
                    <p class="eyebrow">${projeto.categoria}</p>
                    <span class="badge badge-info">${projeto.status}</span>
                    <h2 id="titulo-${projeto.id}">${projeto.titulo}</h2>
                    <p class="lead">${projeto.resumo}</p>
                    <a class="button button-primary" href="#cadastro" data-route="cadastro">Participar deste projeto</a>
                </div>
            </div>
        </article>`).join("");

    return `
        <header class="page-header" aria-labelledby="titulo-projetos">
            <div class="container narrow">
                <p class="eyebrow">Iniciativas solidárias</p>
                <h1 id="titulo-projetos">Projetos construídos com a comunidade</h1>
                <p class="lead">Conheça as ações atuais e escolha onde deseja contribuir.</p>
            </div>
        </header>
        ${artigos}`;
}

export function templateCadastro() {
    return `
        <header class="page-header" aria-labelledby="titulo-cadastro">
            <div class="container narrow">
                <p class="eyebrow">Cadastro de colaboradores</p>
                <h1 id="titulo-cadastro">Seu apoio começa por aqui</h1>
                <p class="lead">Preencha os dados para demonstrar interesse em participar das próximas ações.</p>
            </div>
        </header>
        <section class="section form-section" aria-labelledby="titulo-formulario">
            <div class="container form-layout">
                <aside class="form-intro">
                    <p class="eyebrow">Formulário</p>
                    <h2 id="titulo-formulario">Cadastro de doador ou voluntário</h2>
                    <p>O rascunho será preservado neste dispositivo durante o preenchimento.</p>
                </aside>
                <form class="registration-form" id="formulario" aria-labelledby="titulo-formulario" novalidate>
                    <fieldset>
                        <legend>Dados principais</legend>
                        <div class="field full-field">
                            <label for="nome">Nome completo <span aria-hidden="true">*</span></label>
                            <input id="nome" name="nome" type="text" autocomplete="name" required minlength="3" aria-describedby="nome-feedback">
                            <small class="field-feedback" id="nome-feedback" aria-live="polite"></small>
                        </div>
                        <div class="field full-field">
                            <label for="email">E-mail <span aria-hidden="true">*</span></label>
                            <input id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-feedback">
                            <small class="field-feedback" id="email-feedback" aria-live="polite"></small>
                        </div>
                        <div class="field">
                            <label for="telefone">Telefone <span aria-hidden="true">*</span></label>
                            <input id="telefone" name="telefone" type="text" inputmode="tel" placeholder="(00) 00000-0000" maxlength="15" pattern="\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}" required aria-describedby="telefone-feedback">
                            <small class="field-feedback" id="telefone-feedback" aria-live="polite"></small>
                        </div>
                        <div class="field">
                            <label for="participacao">Forma de participação <span aria-hidden="true">*</span></label>
                            <select id="participacao" name="participacao" required aria-describedby="participacao-feedback">
                                <option value="">Selecione</option>
                                <option value="doador">Doador</option>
                                <option value="voluntario">Voluntário</option>
                            </select>
                            <small class="field-feedback" id="participacao-feedback" aria-live="polite"></small>
                        </div>
                    </fieldset>
                    <div class="form-actions">
                        <button class="button button-primary" type="submit">Salvar cadastro</button>
                        <button class="button button-secondary" type="reset">Limpar</button>
                    </div>
                    <output class="form-status" id="form-status" role="status"></output>
                </form>
            </div>
        </section>`;
}

export const templates = {
    inicio: templateInicio,
    projetos: templateProjetos,
    cadastro: templateCadastro
};

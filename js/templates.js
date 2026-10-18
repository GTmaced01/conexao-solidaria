import { projetos } from "./dados.js";

const imagensVoluntarios = {
    avif480: new URL("../imagens/otimizadas/voluntarios-480.avif", import.meta.url).href,
    avif800: new URL("../imagens/otimizadas/voluntarios-800.avif", import.meta.url).href,
    avif1200: new URL("../imagens/otimizadas/voluntarios-1200.avif", import.meta.url).href,
    webp480: new URL("../imagens/otimizadas/voluntarios-480.webp", import.meta.url).href,
    webp800: new URL("../imagens/otimizadas/voluntarios-800.webp", import.meta.url).href,
    webp1200: new URL("../imagens/otimizadas/voluntarios-1200.webp", import.meta.url).href,
    jpg480: new URL("../imagens/otimizadas/voluntarios-480.jpg", import.meta.url).href,
    jpg800: new URL("../imagens/otimizadas/voluntarios-800.jpg", import.meta.url).href,
    jpg1200: new URL("../imagens/otimizadas/voluntarios-1200.jpg", import.meta.url).href
};

const tamanhosImagemHero = "(max-width: 576px) calc(100vw - 3rem), (max-width: 992px) calc(100vw - 5rem), 640px";
const fluxogramaMonitoramento = new URL("../imagens/fluxograma-monitoramento.png", import.meta.url).href;

function escaparHtml(valor) {
    return String(valor ?? "").replace(/[&<>'"]/g, (caractere) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
    })[caractere]);
}

function cartaoProjeto(projeto) {
    const idSeguro = escaparHtml(projeto.id).replace(/[^a-zA-Z0-9_-]/g, "-");

    return `
        <article class="info-card" aria-labelledby="titulo-cartao-${idSeguro}">
            <span class="card-number">${escaparHtml(projeto.numero)} · ${escaparHtml(projeto.status)}</span>
            <h3 id="titulo-cartao-${idSeguro}">${escaparHtml(projeto.titulo)}</h3>
            <p>${escaparHtml(projeto.resumo)}</p>
            <a class="text-link" href="#projetos" data-route="projetos">Conhecer projeto <span aria-hidden="true">→</span></a>
        </article>`;
}

export function templateInicio(listaProjetos = projetos) {
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
                        <source
                            type="image/avif"
                            srcset="${imagensVoluntarios.avif480} 480w, ${imagensVoluntarios.avif800} 800w, ${imagensVoluntarios.avif1200} 1200w"
                            sizes="${tamanhosImagemHero}">
                        <source
                            type="image/webp"
                            srcset="${imagensVoluntarios.webp480} 480w, ${imagensVoluntarios.webp800} 800w, ${imagensVoluntarios.webp1200} 1200w"
                            sizes="${tamanhosImagemHero}">
                        <img
                            src="${imagensVoluntarios.jpg800}"
                            srcset="${imagensVoluntarios.jpg480} 480w, ${imagensVoluntarios.jpg800} 800w, ${imagensVoluntarios.jpg1200} 1200w"
                            sizes="${tamanhosImagemHero}"
                            alt="Voluntários organizando alimentos para doação"
                            width="1200"
                            height="569"
                            loading="eager"
                            fetchpriority="high"
                            decoding="async">
                    </picture>
                    <figcaption>Voluntários preparando doações para a comunidade.</figcaption>
                </figure>
            </div>
        </section>
        <section class="section" aria-labelledby="titulo-destaques">
            <div class="container">
                <p class="eyebrow">Frentes de atuação</p>
                <h2 id="titulo-destaques">Ações que geram impacto próximo</h2>
                <div class="card-grid">${listaProjetos.map(cartaoProjeto).join("")}</div>
            </div>
        </section>`;
}

export function templateProjetos(listaProjetos = projetos) {
    const artigos = listaProjetos.map((projeto) => {
        const idSeguro = escaparHtml(projeto.id).replace(/[^a-zA-Z0-9_-]/g, "-");

        return `
        <article class="section" id="${idSeguro}" aria-labelledby="titulo-${idSeguro}">
            <div class="container project-layout">
                <div class="project-index" aria-hidden="true">${escaparHtml(projeto.numero)}</div>
                <div class="project-content">
                    <p class="eyebrow">${escaparHtml(projeto.categoria)}</p>
                    <span class="badge badge-info">${escaparHtml(projeto.status)}</span>
                    <h2 id="titulo-${idSeguro}">${escaparHtml(projeto.titulo)}</h2>
                    <p class="lead">${escaparHtml(projeto.resumo)}</p>
                    <a class="button button-primary" href="#cadastro" data-route="cadastro">Participar deste projeto</a>
                </div>
            </div>
        </article>`;
    }).join("");

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
            <div class="container narrow">
                <section class="auth-card" aria-labelledby="titulo-acesso">
                    <div>
                        <p class="eyebrow">Acesso seguro</p>
                        <h2 id="titulo-acesso">Confirme seu e-mail</h2>
                        <p>Enviaremos um link de acesso. Assim, seu cadastro ficará protegido e vinculado à sua conta.</p>
                    </div>
                    <form id="form-acesso" class="auth-form">
                        <label for="email-acesso">E-mail</label>
                        <div class="auth-actions">
                            <input id="email-acesso" name="email-acesso" type="email" autocomplete="email" required>
                            <button class="button button-primary" type="submit">Enviar link</button>
                        </div>
                    </form>
                    <div id="sessao-ativa" class="session-panel" hidden>
                        <p>Conectado como <strong id="email-sessao"></strong>.</p>
                        <button class="button button-secondary" id="sair-conta" type="button">Sair</button>
                    </div>
                    <output class="form-status" id="auth-status" role="status"></output>
                </section>
            </div>
            <div class="container form-layout">
                <aside class="form-intro">
                    <p class="eyebrow">Formulário</p>
                    <h2 id="titulo-formulario">Cadastro de doador ou voluntário</h2>
                    <p>O rascunho será preservado neste dispositivo e o envio será salvo com segurança na sua conta.</p>
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

export function templateMonitoramento() {
    const produtosDemonstrativos = [
        { nome: "Arroz", anterior: "24.90", atual: "27.40" },
        { nome: "Feijão", anterior: "8.50", atual: "7.90" },
        { nome: "Óleo", anterior: "7.20", atual: "7.20" }
    ];

    const camposProdutos = produtosDemonstrativos.map((produto, indice) => {
        const numero = indice + 1;
        return `
            <fieldset class="product-fields">
                <legend>Produto ${numero}</legend>
                <div class="field full-field">
                    <label for="produto-${numero}">Nome do produto</label>
                    <input id="produto-${numero}" name="produto-${numero}" type="text" value="${produto.nome}" required maxlength="50">
                </div>
                <div class="field">
                    <label for="preco-anterior-${numero}">Preço no mês anterior (R$)</label>
                    <input id="preco-anterior-${numero}" name="preco-anterior-${numero}" type="number" value="${produto.anterior}" min="0.01" step="0.01" required>
                </div>
                <div class="field">
                    <label for="preco-atual-${numero}">Preço no mês atual (R$)</label>
                    <input id="preco-atual-${numero}" name="preco-atual-${numero}" type="number" value="${produto.atual}" min="0" step="0.01" required>
                </div>
            </fieldset>`;
    }).join("");

    return `
        <header class="page-header" aria-labelledby="titulo-monitoramento">
            <div class="container narrow">
                <p class="eyebrow">Defesa do consumidor</p>
                <h1 id="titulo-monitoramento">Monitoramento da cesta básica</h1>
                <p class="lead">Compare os preços mensais de três produtos e identifique aumentos, quedas ou estabilidade.</p>
            </div>
        </header>
        <section class="section monitoring-section" aria-labelledby="titulo-form-monitoramento">
            <div class="container monitoring-layout">
                <form class="registration-form monitoring-form" id="form-monitoramento">
                    <h2 id="titulo-form-monitoramento">Dados dos produtos</h2>
                    <p>Os campos já contêm valores demonstrativos. Você pode substituí-los antes da análise.</p>
                    ${camposProdutos}
                    <div class="form-actions">
                        <button class="button button-primary" type="submit">Analisar variações</button>
                        <button class="button button-secondary" type="reset">Restaurar exemplo</button>
                    </div>
                </form>
                <section class="monitoring-results" id="resultado-monitoramento" aria-labelledby="titulo-resultados" aria-live="polite" hidden>
                    <p class="eyebrow">Resultado calculado</p>
                    <h2 id="titulo-resultados" tabindex="-1">Situação dos preços</h2>
                    <div class="table-wrapper">
                        <table>
                            <caption>Comparação do preço anterior com o preço atual</caption>
                            <thead>
                                <tr>
                                    <th scope="col">Produto</th>
                                    <th scope="col">Anterior</th>
                                    <th scope="col">Atual</th>
                                    <th scope="col">Variação</th>
                                    <th scope="col">Situação</th>
                                </tr>
                            </thead>
                            <tbody id="linhas-resultados"></tbody>
                        </table>
                    </div>
                </section>
            </div>
        </section>
        <section class="section section-tint" aria-labelledby="titulo-fluxograma">
            <div class="container narrow">
                <p class="eyebrow">Documentação do algoritmo</p>
                <h2 id="titulo-fluxograma">Fluxograma implementado</h2>
                <figure class="flowchart-figure">
                    <img src="${fluxogramaMonitoramento}" alt="Fluxograma do algoritmo de monitoramento de preços, desde a leitura dos três produtos até a classificação e exibição dos resultados" width="1400" height="1500" loading="lazy">
                    <figcaption>Fluxo real utilizado pela ferramenta para calcular e classificar a variação percentual.</figcaption>
                </figure>
            </div>
        </section>`;
}

export const templates = {
    inicio: templateInicio,
    projetos: templateProjetos,
    cadastro: templateCadastro,
    monitoramento: templateMonitoramento
};

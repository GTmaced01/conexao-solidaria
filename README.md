# Conexão Solidária — Experiência Prática IV

## Visão geral

Conexão Solidária é uma Single Page Application para uma organização do terceiro setor. A interface apresenta projetos sociais e permite que doadores ou voluntários registrem interesse em colaborar. Esta quarta experiência consolida a aplicação com práticas profissionais de versionamento, documentação, acessibilidade, otimização e preparação para produção.

O projeto é uma cópia independente da Experiência III, preservando integralmente a entrega anterior.

## Funcionalidades

- navegação SPA entre início, projetos e cadastro;
- rotas identificáveis por hash e compatíveis com Voltar/Avançar;
- projetos renderizados por templates JavaScript reutilizáveis;
- formulário com validação e mensagens em tempo real;
- máscara de telefone com alternativa em JavaScript puro;
- persistência do rascunho no localStorage;
- menu responsivo para dispositivos móveis;
- feedbacks acessíveis para mudanças de rota e validação.

## Tecnologias utilizadas

- **HTML5:** estrutura semântica e ponto de montagem da SPA;
- **CSS3:** design system, Grid, Flexbox, responsividade e estados visuais;
- **JavaScript ES6:** módulos, DOM, eventos, templates, validação e roteamento;
- **Web Storage API:** persistência local do formulário;
- **IMask 7.6.1:** máscara progressiva do telefone, carregada por CDN;
- **Git:** branches, commits semânticos, merges e tags de versão.

Não há framework, etapa de build ou dependências locais obrigatórias.

## Estrutura do projeto

```text
Projeto - Conexao Solidaria/
|-- html/
|   `-- index.html
|-- css/
|   `-- styles.css
|-- imagens/
|   |-- voluntarios.jpg
|   `-- voluntarios.webp
|-- js/
|   |-- app.js
|   |-- dados.js
|   |-- router.js
|   |-- storage.js
|   |-- templates.js
|   |-- ui.js
|   `-- validacao.js
|-- abrir-projeto.bat
|-- CHANGELOG.md
|-- TESTES.md
|-- VERSIONAMENTO.md
`-- README.md
```

## Responsabilidades dos módulos

- `app.js`: inicialização da aplicação;
- `router.js`: navegação, rotas e renderização;
- `templates.js`: marcação dinâmica das telas;
- `dados.js`: conteúdo estruturado dos projetos;
- `ui.js`: menu e comportamentos compartilhados;
- `validacao.js`: eventos e consistência do formulário;
- `storage.js`: leitura, gravação e remoção no localStorage.

## Requisitos

- navegador moderno com suporte a módulos ES6;
- Python 3, VS Code Live Server ou outro servidor HTTP local;
- conexão com a internet somente para carregar a IMask. Sem conexão, a máscara nativa assume automaticamente.

## Instalação e execução local

### Opção 1 — Windows

1. Abra a pasta do projeto.
2. Execute `abrir-projeto.bat`.
3. Aguarde o navegador abrir `http://localhost:4180/html/index.html#inicio`.
4. Para encerrar, feche a janela minimizada do servidor.

### Opção 2 — Terminal

1. Abra um terminal na raiz do projeto.
2. Confirme o Python com `python --version`.
3. Execute `python -m http.server 4180`.
4. Acesse `http://localhost:4180/html/index.html#inicio`.
5. Encerre o servidor com `Ctrl+C`.

### Opção 3 — VS Code

1. Instale a extensão Live Server.
2. Abra `html/index.html` pelo comando **Open with Live Server**.

Não abra o HTML diretamente pelo Explorador de Arquivos. O protocolo `file://` bloqueia o carregamento adequado dos módulos ES6.

## Como utilizar

1. Navegue entre **Início**, **Projetos** e **Quero colaborar**.
2. No cadastro, preencha nome, e-mail, telefone e forma de participação.
3. Observe os feedbacks de validação em cada campo.
4. Atualize a página para confirmar a restauração do rascunho.
5. Use **Limpar** para remover o formulário e o registro local.

## Versionamento

O projeto usa uma adaptação do GitFlow:

- `main`: versões estáveis;
- `develop`: integração das melhorias;
- `feature/*`: funcionalidades isoladas;
- `release/*`: preparação para produção;
- `hotfix/*`: correções urgentes.

As mensagens seguem Conventional Commits, incluindo `feat`, `fix`, `docs`, `test`, `perf`, `refactor` e `chore`. Consulte [VERSIONAMENTO.md](VERSIONAMENTO.md) para o fluxo completo e [CHANGELOG.md](CHANGELOG.md) para o histórico. A versão atual de preparação é `v0.4.0-alpha.1`.

## Testes

As verificações atuais contemplam:

- sintaxe dos módulos JavaScript;
- navegação entre rotas;
- máscara e validação do formulário;
- persistência no localStorage;
- fallback da biblioteca externa;
- responsividade sem rolagem horizontal em 390 px;
- mensagens de erro e sucesso.

Os problemas encontrados e suas correções estão descritos em [TESTES.md](TESTES.md).

## Acessibilidade

A aplicação utiliza HTML semântico, link de salto, associação entre rótulos e campos, `aria-current`, `aria-expanded`, `aria-busy`, `aria-invalid`, `aria-describedby` e regiões de status. As decisões e os critérios WCAG 2.1 relacionados estão documentados em [ACESSIBILIDADE.md](ACESSIBILIDADE.md). A navegação por teclado e o contraste serão aprofundados nas próximas etapas.

## Limitações atuais

- os dados permanecem apenas no navegador do utilizador;
- não há autenticação ou integração com back-end;
- o repositório remoto próprio ainda será criado;
- o deploy de produção será realizado após acessibilidade e otimização.

## Documentação complementar

- [Estratégia de versionamento](VERSIONAMENTO.md)
- [Histórico de versões](CHANGELOG.md)
- [Testes e correções](TESTES.md)
- [Relatório da Experiência III](RELATORIO-EXPERIENCIA-PRATICA-III.md)

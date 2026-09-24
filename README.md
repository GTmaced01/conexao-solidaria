# Conexão Solidária — Experiência Prática IV

## Visão geral

Conexão Solidária é uma Single Page Application para uma organização do terceiro setor. A interface apresenta projetos sociais e permite que doadores ou voluntários registrem interesse em colaborar. Esta quarta experiência consolida a aplicação com práticas profissionais de versionamento, documentação, acessibilidade, otimização e preparação para produção.

**Produção:** https://conexao-solidaria-virid.vercel.app

O projeto é uma cópia independente da Experiência III, preservando integralmente a entrega anterior.

## Funcionalidades

- navegação SPA entre início, projetos e cadastro;
- rotas identificáveis por hash e compatíveis com Voltar/Avançar;
- projetos renderizados por templates JavaScript reutilizáveis;
- formulário com validação e mensagens em tempo real;
- máscara progressiva de telefone incorporada ao pacote de produção;
- persistência do rascunho no localStorage;
- menu responsivo para dispositivos móveis;
- feedbacks acessíveis para mudanças de rota e validação;
- modo escuro automático ou manual, com preferência persistida.
- imagem principal responsiva em AVIF, WebP e JPEG.

## Tecnologias utilizadas

- **HTML5:** estrutura semântica e ponto de montagem da SPA;
- **CSS3:** design system, Grid, Flexbox, responsividade e estados visuais;
- **JavaScript ES6:** módulos, DOM, eventos, templates, validação e roteamento;
- **Web Storage API:** persistência local do formulário;
- **IMask 7.6.1:** máscara progressiva do telefone, incorporada ao pacote local;
- **Vite 8:** servidor de desenvolvimento, empacotamento e geração da versão de produção;
- **OXC e html-minifier-terser:** minificação de JavaScript, CSS e HTML;
- **Sharp:** geração reproduzível das imagens responsivas e comprimidas;
- **Git:** branches, commits semânticos, merges e tags de versão.

## Estrutura do projeto

```text
Projeto - Conexao Solidaria/
|-- html/
|   `-- index.html
|-- css/
|   `-- styles.css
|-- imagens/
|   |-- otimizadas/
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
|-- package.json
|-- package-lock.json
|-- vite.config.js
|-- abrir-projeto.bat
|-- BUILD.md
|-- DEPLOY.md
|-- OTIMIZACAO-IMAGENS.md
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

- navegador moderno;
- Node.js e npm para instalar as dependências e executar o Vite;
- conexão com a internet apenas na primeira instalação das dependências.

## Instalação e execução local

### Opção 1 — Windows

1. Abra a pasta do projeto.
2. Execute `abrir-projeto.bat`.
3. Na primeira execução, aguarde a instalação automática das dependências.
4. O navegador abrirá `http://localhost:4180/#inicio`.
5. Para encerrar, feche a janela minimizada do servidor.

### Opção 2 — Terminal

1. Abra um terminal na raiz do projeto.
2. Execute `npm install`.
3. Execute `npm run dev`.
4. Acesse `http://localhost:4180/#inicio`.
5. Encerre o servidor com `Ctrl+C`.

### Gerar e conferir a versão de produção

1. Execute `npm run build` para gerar a pasta `dist`.
2. Execute `npm run preview` para servir os arquivos minificados.
3. Acesse `http://localhost:4173/`.

Para recriar as variantes AVIF, WebP e JPEG, execute `npm run optimize:images` antes do build.

Não abra o HTML diretamente pelo Explorador de Arquivos. O protocolo `file://` não representa o ambiente real de execução dos módulos.

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

As mensagens seguem Conventional Commits, incluindo `feat`, `fix`, `docs`, `test`, `perf`, `refactor` e `chore`. Consulte [VERSIONAMENTO.md](VERSIONAMENTO.md) para o fluxo completo e [CHANGELOG.md](CHANGELOG.md) para o histórico.

## Testes

As verificações atuais contemplam:

- sintaxe dos módulos JavaScript;
- navegação entre rotas;
- máscara e validação do formulário;
- persistência no localStorage;
- carregamento da biblioteca incorporada ao pacote de produção;
- responsividade sem rolagem horizontal em 390 px;
- mensagens de erro e sucesso;
- contraste WCAG 2.1 AA nos modos claro e escuro.

Os problemas encontrados e suas correções estão descritos em [TESTES.md](TESTES.md).

## Acessibilidade

A aplicação utiliza HTML semântico, link de salto, navegação completa por teclado, foco visível, associação entre rótulos e campos, estados WAI-ARIA, regiões de status e paletas com contraste WCAG 2.1 AA. As decisões estão em [ACESSIBILIDADE.md](ACESSIBILIDADE.md) e os resultados cromáticos em [CONTRASTE.md](CONTRASTE.md).

## Limitações atuais

- os dados permanecem apenas no navegador do utilizador;
- não há autenticação ou integração com back-end;
- o repositório remoto próprio ainda será criado;
- o workflow de CI/CD será ativado quando o código for enviado ao repositório remoto e os segredos da Vercel forem cadastrados.

## Documentação complementar

- [Estratégia de versionamento](VERSIONAMENTO.md)
- [Histórico de versões](CHANGELOG.md)
- [Testes e correções](TESTES.md)
- [Decisões de acessibilidade](ACESSIBILIDADE.md)
- [Auditoria de contraste](CONTRASTE.md)
- [Build e minificação](BUILD.md)
- [Otimização de imagens e desempenho](OTIMIZACAO-IMAGENS.md)
- [Publicação e CI/CD](DEPLOY.md)
- [Relatório da Experiência III](RELATORIO-EXPERIENCIA-PRATICA-III.md)

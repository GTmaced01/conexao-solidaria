# Changelog

As alterações relevantes deste projeto são documentadas neste arquivo. A versão segue o padrão `MAJOR.MINOR.PATCH`, com identificadores de pré-lançamento durante a preparação da Experiência Prática IV.

## [Não publicado]

### Adicionado

- build de produção com Vite 8;
- minificação de HTML, CSS e JavaScript;
- separação da biblioteca IMask em pacote `vendor` local;
- documentação das configurações e métricas em `BUILD.md`.
- variantes responsivas da imagem principal em AVIF, WebP e JPEG;
- script reproduzível de otimização de imagens com Sharp;
- documentação das métricas de imagem e carregamento.
- configuração explícita de produção para a Vercel;
- workflow de CI/CD preparado para GitHub Actions;
- documentação do deployment e do procedimento de recuperação.

### Alterado

- referências de imagens compatíveis com o processamento e versionamento do Vite;
- inicialização local migrada para o servidor de desenvolvimento do Vite;
- dependência da IMask removida do CDN.
- imagem principal configurada com `picture`, `srcset`, `sizes` e prioridade adequada ao LCP.
- aplicação publicada no projeto `medeiros-dev1/conexao-solidaria` com alias estável.

## [0.4.0-alpha.1] - 2026-09-23

### Adicionado

- repositório independente para a Experiência Prática IV;
- estratégia GitFlow com branches `main`, `develop`, `feature/*`, `release/*` e `hotfix/*`;
- convenção de commits semânticos;
- documentação do processo de versionamento;
- changelog inicial para rastreabilidade das entregas.

### Base preservada

- SPA com rotas por hash;
- templates JavaScript reutilizáveis;
- validação acessível de formulários;
- persistência do rascunho no localStorage;
- máscara telefônica com fallback nativo;
- layout responsivo e design system em CSS.

## Convenção de versões

- `MAJOR`: alterações incompatíveis na aplicação;
- `MINOR`: novas funcionalidades compatíveis;
- `PATCH`: correções compatíveis;
- `alpha`, `beta` e `rc`: versões de avaliação anteriores ao lançamento estável.

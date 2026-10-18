# Publicação em produção

## Plataforma e endereço

A aplicação foi publicada na Vercel, no projeto `medeiros-dev1/conexao-solidaria`:

- produção: https://conexao-solidaria-virid.vercel.app
- projeto: `prj_KMDY3DHFFKnfeWVnpNyHxyFUwa4q`
- primeiro deployment de produção: `dpl_5sxueGVTLgirztesqsGcvqBFgrgF`
- framework: Vite;
- região do build: `iad1`;
- estado verificado: `READY`.

A Vercel foi escolhida pela integração direta com Vite, CDN global, HTTPS automático, nomes de arquivos com cache seguro, histórico de deployments, aliases estáveis e possibilidade de previews por branch ou pull request.

## Configuração executada

1. Foi criado o arquivo `vercel.json` com `npm ci`, `npm run build` e saída `dist`.
2. O projeto local foi vinculado à equipe MedeirosDev e ao projeto `conexao-solidaria`.
3. A Vercel instalou 46 pacotes, auditou 47 dependências sem vulnerabilidades e executou o build do Vite.
4. O deployment foi promovido diretamente para produção e recebeu o alias estável.
5. A página, o JavaScript, o CSS e a imagem AVIF responderam com HTTP 200 e tipos de conteúdo corretos.
6. A consulta de observabilidade não encontrou erros de execução após a publicação.

## Git e CI/CD

O código está versionado localmente com GitFlow e Conventional Commits. Este repositório ainda não possui remoto Git, portanto a integração automática por push não está ativa e o primeiro deployment foi feito pela CLI oficial.

O workflow `.github/workflows/vercel-production.yml` deixa a entrega contínua preparada. Quando o repositório for enviado ao GitHub, deverão ser cadastrados os segredos `VERCEL_TOKEN`, `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID`. A cada push na branch `main`, o fluxo executará instalação limpa, auditoria de contraste, build, geração do artefato da Vercel e publicação `--prebuilt` em produção. Pull requests podem ser conectados à integração Git nativa da Vercel para gerar previews isolados.

## Recuperação

A Vercel preserva deployments anteriores. Se uma versão futura apresentar regressão, o alias de produção pode ser devolvido a um deployment aprovado usando `vercel rollback` ou `vercel promote`.

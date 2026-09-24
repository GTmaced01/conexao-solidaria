# Conexão Solidária - Experiência Prática III

Evolução da interface da Experiência Prática II para uma Single Page Application construída com HTML5, CSS3 e JavaScript modular.

## Estrutura

```text
conexao-solidaria-exp3/
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
`-- README.md
```

## Responsabilidades

- `html`: documento principal e ponto de montagem da SPA;
- `css`: design system, layout responsivo e estados visuais;
- `imagens`: recursos visuais em formatos JPG e WebP;
- `js/app.js`: inicialização da aplicação;
- `js/router.js`: navegação e renderização das rotas;
- `js/templates.js`: templates dinâmicos das telas;
- `js/dados.js`: dados estruturados dos projetos;
- `js/validacao.js`: eventos e validação do formulário;
- `js/storage.js`: leitura e gravação no `localStorage`;
- `js/ui.js`: comportamentos compartilhados da interface.

## Como executar

Por utilizar módulos JavaScript, o projeto deve ser aberto por um servidor local. No VS Code, pode-se utilizar a extensão Live Server e abrir `html/index.html`.

No Windows, também é possível executar `abrir-projeto.bat`. Ele inicia um servidor local e abre o endereço correto no navegador. Não abra `index.html` diretamente pelo Explorador de Arquivos, pois o protocolo `file://` impede o carregamento seguro dos módulos ES6 e deixa a área principal sem conteúdo.

## Navegação SPA

O roteador usa hashes (`#inicio`, `#projetos` e `#cadastro`) para manter URLs identificáveis sem recarregar o documento. A delegação de eventos em `document` intercepta cliques nos elementos `a[data-route]`, inclusive aqueles criados posteriormente pelos templates. A função `renderizarRota()` seleciona o template correspondente, substitui o conteúdo de `main#app` com `innerHTML`, atualiza o título, o item ativo da navegação, o aviso acessível e os comportamentos específicos da tela. O evento `hashchange` mantém os botões Voltar e Avançar do navegador funcionais.

## Consistência do formulário

A validação ocorre durante `input`, `change` e `submit`. Nome, e-mail e telefone são conferidos por expressões regulares, enquanto a forma de participação é validada por uma lista de opções permitidas. O telefone recebe máscara automática. A função `validarCampo()` injeta mensagens próximas ao controle, alterna as classes `is-valid` e `is-invalid` e mantém `aria-invalid`, `aria-describedby` e regiões `aria-live` sincronizados. No envio, todos os campos obrigatórios são reavaliados e o foco é levado ao primeiro erro; somente um conjunto válido é confirmado e persistido no `localStorage`.

## Biblioteca externa

A biblioteca IMask 7.6.1 é carregada por CDN com versão fixa e aplicada exclusivamente ao campo de telefone. Ela controla a máscara `(00) 00000-0000` sem assumir outras responsabilidades da aplicação. Antes da inicialização, o código verifica a existência de `window.IMask`; se o CDN estiver indisponível, uma função nativa preserva o mesmo comportamento, evitando falha no fluxo principal.

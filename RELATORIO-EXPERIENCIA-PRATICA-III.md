# Experiência Prática III — Interatividade e funcionalidades

## Identificação da entrega

- **Disciplina:** Desenvolvimento Front-End para Web
- **Experiência:** Experiência Prática III
- **Tema:** Interatividade e funcionalidades
- **Projeto:** Conexão Solidária — SPA para uma organização do terceiro setor
- **Tecnologias:** HTML5, CSS3, JavaScript ES6, DOM, eventos, localStorage e IMask

## Desafio

Transformar a interface estática elaborada nas experiências anteriores em uma Single Page Application dinâmica. A aplicação deveria oferecer navegação sem recarregamento completo, componentes gerados por templates, eventos, validação com feedback, persistência local e código modular.

## 1. Fundamentos e organização inicial

O projeto foi separado em `html`, `css`, `imagens` e `js`. Dentro de `js`, cada arquivo recebeu uma responsabilidade específica:

- `app.js`: inicialização da aplicação;
- `router.js`: navegação e renderização das rotas;
- `templates.js`: templates dinâmicos das telas;
- `dados.js`: dados estruturados dos projetos;
- `ui.js`: menu e comportamentos compartilhados;
- `validacao.js`: eventos e consistência do formulário;
- `storage.js`: persistência no localStorage.

Essa organização aplica separação de responsabilidades e facilita manutenção, depuração e reutilização.

## 2. Navegação em página única

O roteador utiliza hashes (`#inicio`, `#projetos` e `#cadastro`) para representar as telas sem recarregar o documento. A delegação de eventos em `document` intercepta cliques em `a[data-route]`, atualiza o hash e permite que o evento `hashchange` execute `renderizarRota()`.

A função de renderização identifica a rota atual, seleciona o template correspondente, substitui o conteúdo de `main#app`, atualiza o título do documento, marca o link ativo, anuncia a mudança para tecnologias assistivas e restaura o foco. Os botões Voltar e Avançar do navegador continuam funcionais.

## 3. Templates dinâmicos

As telas são geradas por funções que retornam Template Literals. Os projetos ficam em um array de objetos em `dados.js`. Em `templates.js`, o método `map()` transforma cada registro em um cartão HTML e `join("")` reúne os cartões antes da injeção no DOM.

Essa abordagem evita repetição de marcação e mantém conteúdo e apresentação separados. Os mesmos dados podem alimentar cartões da página inicial e artigos da tela de projetos sem reescrever o HTML.

## 4. Interatividade e eventos

Foram implementados listeners para:

- `DOMContentLoaded`: inicialização geral;
- `click`: navegação delegada e menu responsivo;
- `hashchange`: renderização da rota;
- `input`: máscara, validação e salvamento do rascunho;
- `change`: validação de campos de seleção;
- `submit`: bloqueio do envio nativo, validação completa e confirmação;
- `reset`: remoção do rascunho e dos estados visuais.

O uso de delegação no documento permite que links criados posteriormente pelos templates continuem funcionais.

## 5. Verificação de consistência do formulário

Nome, e-mail, telefone e forma de participação são obrigatórios. Nome, e-mail e telefone são verificados com expressões regulares; a participação é aceita somente quando corresponde a uma opção prevista.

A função `validarCampo()` alterna `is-valid` e `is-invalid`, atualiza `aria-invalid` e injeta mensagens associadas por `aria-describedby`. As mensagens usam `aria-live="polite"`. No envio inválido, o foco é levado ao primeiro erro; no envio válido, a interface apresenta confirmação de sucesso.

## 6. Retenção de dados no navegador

O formulário é convertido em objeto por `FormData` e `Object.fromEntries()`. `salvarRascunho()` grava a estrutura sob a chave `conexao-solidaria:cadastro` usando `JSON.stringify()`. `carregarRascunho()` recupera e converte o conteúdo com `JSON.parse()`, protegido por `try...catch`.

Durante a inicialização, `restaurarRascunho()` preenche os controles correspondentes. A limpeza utiliza `removeItem()` e afeta somente a chave do cadastro.

## 7. Integração com biblioteca externa

A IMask 7.6.1 foi integrada por CDN com versão fixa para aplicar a máscara `(00) 00000-0000`. Antes de inicializá-la, o código verifica `window.IMask`. Se o recurso externo não estiver disponível, uma função nativa executa a mesma formatação. Assim, a integração permanece isolada e não se torna uma dependência crítica.

## 8. Modularização

O código usa ES6 Modules com `import` e `export`. Não existem variáveis de estado compartilhadas globalmente entre os arquivos do projeto. Cada módulo expõe uma interface pequena e explícita, reduzindo o acoplamento:

- o roteador conhece templates e funções públicas de UI;
- a validação conhece apenas a interface de armazenamento;
- os templates conhecem apenas os dados dos projetos;
- `app.js` coordena a inicialização sem incorporar regras internas.

## 9. Testes e correções

Foram verificados sintaxe, navegação, validação, máscara, persistência e responsividade. Os principais problemas encontrados e corrigidos foram:

1. **Tela vazia pelo protocolo `file://`:** os módulos ES6 eram bloqueados. Foi adotado servidor HTTP local e criado `abrir-projeto.bat`.
2. **Falha no carregamento da IMask:** foi implementada detecção da biblioteca e fallback em JavaScript puro.
3. **Expressão regular inválida no atributo `pattern`:** os parênteses literais foram escapados corretamente no template.

Resultados finais observados:

- quatro campos inválidos detectados no envio vazio;
- quatro campos válidos após correção;
- telefone formatado como `(11) 98765-4321`;
- cadastro salvo no localStorage;
- ausência de rolagem horizontal em 390 px;
- módulos aprovados na verificação de sintaxe.

## 10. Reflexão sobre a aprendizagem

Durante esta experiência prática, apresentei evolução na transformação de uma interface estática em uma aplicação interativa, organizada e funcional. Os conhecimentos de DOM, eventos, SPA, validação, persistência e modularização deixaram de ser apenas conceitos teóricos e passaram a compor um fluxo completo de desenvolvimento.

Entre os pontos fortes, destaco a separação do código por responsabilidades, a navegação sem recarregamento, a criação de templates reutilizáveis, o cuidado com feedbacks e a inclusão de atributos de acessibilidade. A etapa de testes também fortaleceu uma postura mais crítica, pois problemas de execução, dependência externa e validação foram identificados por evidências do navegador e corrigidos sem comprometer outras partes da aplicação.

Como oportunidades de melhoria, ainda preciso aprofundar testes automatizados, documentação de funções, segurança dos dados armazenados no navegador e ferramentas profissionais como gerenciadores de pacotes, empacotadores, controle de versões e integração contínua. Uma evolução natural seria conectar o formulário a uma API e a um banco de dados, já que o localStorage atende somente à persistência no dispositivo.

Concluo a atividade com maior autonomia para construir aplicações front-end e com uma compreensão mais madura de arquitetura, manutenção, acessibilidade, prevenção de falhas e experiência do utilizador. Essa base será importante para projetos futuros com APIs, frameworks e aplicações de maior complexidade.

## Como executar o projeto

No Windows, execute `abrir-projeto.bat`. O arquivo inicia um servidor HTTP local e abre a aplicação no navegador. Como alternativa, utilize a extensão Live Server no VS Code e abra `html/index.html` por meio dela.

Não abra o HTML diretamente pelo Explorador de Arquivos, pois o protocolo `file://` não carrega corretamente os módulos ES6.

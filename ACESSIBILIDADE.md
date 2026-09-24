# Acessibilidade

Este documento registra as decisões adotadas para aproximar a aplicação das diretrizes WCAG 2.1 nível AA.

## Estrutura semântica

- O documento declara o idioma com `lang="pt-BR"`.
- As regiões principais usam `header`, `nav`, `main` e `footer`.
- Cada página possui um único `h1`, seguido por títulos em ordem hierárquica.
- Seções e cartões recebem nomes acessíveis com `aria-labelledby` quando necessário.
- O formulário utiliza `form`, `fieldset`, `legend`, `label`, `input`, `select` e `output`.

## WAI-ARIA e conteúdo dinâmico

- A rota ativa é indicada por `aria-current="page"`.
- O menu móvel expõe seu estado com `aria-expanded` e sua relação com `aria-controls`.
- O nome acessível do botão do menu alterna entre abrir e fechar.
- O conteúdo principal usa `aria-busy` durante a troca de rota.
- Mudanças de rota e resultados do formulário são anunciados por regiões com `role="status"`.
- Campos inválidos recebem `aria-invalid`, e as mensagens são associadas por `aria-describedby`.
- Ícones e sinais meramente visuais são ocultados das tecnologias assistivas com `aria-hidden="true"`.

## Formulários

Os campos possuem rótulos visíveis, indicação nativa de obrigatoriedade e mensagens persistentes no DOM. A validação atualiza classes visuais, `aria-invalid` e textos de feedback sem remover as referências utilizadas por leitores de tela.

## Critérios relacionados

- 1.3.1 Informações e Relações
- 2.4.1 Ignorar Blocos
- 2.4.2 Página com Título
- 2.4.3 Ordem do Foco
- 2.4.6 Cabeçalhos e Rótulos
- 3.3.1 Identificação do Erro
- 3.3.2 Rótulos ou Instruções
- 4.1.2 Nome, Função, Valor
- 4.1.3 Mensagens de Estado

As etapas seguintes complementam esta auditoria com navegação por teclado, foco visível, contraste e modos de cor.

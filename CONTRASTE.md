# Auditoria de contraste

A paleta foi verificada com o cálculo de luminância relativa e razão de contraste definido pelas WCAG 2.1. Textos comuns adotam o limite mínimo de 4,5:1 e limites de controles visuais usam 3:1.

## Resultados principais

| Modo | Elemento | Primeiro plano | Fundo | Razão |
| --- | --- | --- | --- | ---: |
| Claro | Texto principal | `#17252f` | `#f3f7f8` | 14,51:1 |
| Claro | Títulos | `#07283c` | `#ffffff` | 15,24:1 |
| Claro | Texto secundário | `#536571` | `#f3f7f8` | 5,61:1 |
| Claro | Destaques | `#056773` | `#f3f7f8` | 6,10:1 |
| Claro e escuro | Botão primário | `#ffffff` | `#0b3954` | 12,16:1 |
| Claro | Erro | `#a22626` | `#fff0f0` | 6,68:1 |
| Escuro | Texto principal | `#eef6f8` | `#071a24` | 16,22:1 |
| Escuro | Títulos | `#f3f9fb` | `#102c3a` | 13,69:1 |
| Escuro | Texto secundário | `#b8c8cf` | `#071a24` | 10,32:1 |
| Escuro | Links | `#b9e5ed` | `#102c3a` | 10,73:1 |
| Escuro | Erro | `#ff9b9b` | `#451f25` | 7,06:1 |
| Escuro | Sucesso | `#80d9b0` | `#143b2d` | 7,36:1 |
| Ambos | Texto sobre amarelo | `#07283c` | `#ffcb47` | 10,08:1 |

## Reprodução

Execute `node scripts/auditar-contraste.mjs`. O script apresenta todos os pares auditados e encerra com erro caso algum resultado fique abaixo do respectivo limite.

A inspeção visual e dos estilos computados também foi realizada no Chrome em resoluções de desktop e celular.

# Build e minificação

## Ferramentas e configuração

A versão de produção é gerada com Vite 8. O diretório de entrada é `html`, a saída é `dist` e a opção `base: "./"` mantém os recursos funcionais em hospedagens estáticas. O JavaScript é transformado para ES2020 e minificado pelo OXC; o CSS recebe a minificação nativa do Vite; e o HTML passa pelo `html-minifier-terser` para remover comentários, espaços e atributos redundantes.

A dependência IMask foi removida do CDN, instalada localmente e separada num arquivo `vendor` com nome versionado por hash. Os arquivos próprios da aplicação também recebem hashes, o que permite cache seguro após novas versões. Mapas de código-fonte ficam desativados na entrega final.

## Comandos

```text
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` recria a pasta `dist`. Como ela é um artefato gerado, está ignorada pelo Git.

## Medição

As medições comparam os arquivos-base próprios antes e depois da minificação, sem somar o pacote `vendor`, pois ele substitui um recurso que antes era obtido externamente por CDN.

| Recurso | Original | Produção | Redução |
| --- | ---: | ---: | ---: |
| HTML | 2.729 bytes | 2.388 bytes | 12,5% |
| CSS | 27.167 bytes | 22.456 bytes | 17,3% |
| JavaScript próprio | 19.297 bytes | 14.061 bytes | 27,1% |
| **Total dos arquivos-base** | **49.193 bytes** | **38.905 bytes** | **20,9%** |

O pacote `vendor` local da IMask possui 57.485 bytes (15.730 bytes comprimidos por gzip). As imagens são apenas copiadas e versionadas nesta etapa; a compressão delas será tratada separadamente.

## Decisões e correções

- A primeira tentativa usou uma opção antiga do esbuild, que não integra o Vite 8. A configuração foi corrigida para o minificador OXC suportado pela versão instalada.
- As imagens referenciadas nos templates passaram a usar `new URL(..., import.meta.url)`, permitindo ao Vite localizar, copiar e versionar os recursos.
- A biblioteca IMask passou de script global externo para importação ES Module, eliminando a dependência de rede durante o uso.
- O build é conferido pelo servidor de pré-visualização, validando rotas, formulário, máscara, armazenamento local e tema escuro nos arquivos minificados.

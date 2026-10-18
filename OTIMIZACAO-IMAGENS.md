# Otimização de imagens e desempenho

## Estratégia

A fotografia principal de 1200 × 569 px foi mantida como fonte e processada pelo Sharp em três larguras: 480, 800 e 1200 px. Cada tamanho foi exportado em AVIF, WebP e JPEG. O elemento `picture` prioriza AVIF, oferece WebP como alternativa e mantém JPEG como fallback para navegadores antigos.

Os atributos `srcset` e `sizes` permitem que o navegador selecione a menor resolução suficiente para a viewport. Os atributos `width="1200"` e `height="569"` reservam a proporção correta e evitam mudança de layout. Como a fotografia está na seção inicial e pode ser o LCP, usa `fetchpriority="high"` e carregamento imediato, em vez de `lazy loading`.

## Tamanhos gerados

| Largura | AVIF | WebP | JPEG |
| ---: | ---: | ---: | ---: |
| 480 px | 11.747 bytes | 18.456 bytes | 22.820 bytes |
| 800 px | 23.450 bytes | 34.800 bytes | 48.496 bytes |
| 1200 px | 41.150 bytes | 57.236 bytes | 93.939 bytes |

O arquivo JPEG original possui 101.845 bytes e o WebP usado anteriormente possui 77.742 bytes. Em navegadores modernos, o arquivo efetivamente transferido caiu para 11.747 bytes no celular e 23.450 bytes no desktop, reduções de 84,9% e 69,8% em relação ao WebP anterior.

## Verificação no navegador

O build de produção foi testado no Chrome sem cache:

| Viewport | Arquivo escolhido | Transferência | Carregamento local da página |
| ---: | --- | ---: | ---: |
| 390 px | AVIF 480 px | 12.047 bytes com cabeçalhos | 90,5 ms |
| 768 px | AVIF 800 px | 23.750 bytes com cabeçalhos | 74,7 ms |
| 1440 px | AVIF 800 px | 23.750 bytes com cabeçalhos | 71,5 ms |

Numa simulação com 1,6 Mbps e 150 ms de latência, a versão otimizada carregou em aproximadamente 0,75–0,76 segundo. Pela diferença de bytes da imagem, a versão anterior levaria cerca de 0,27–0,33 segundo a mais, resultando numa melhoria estimada de 26% a 31% no carregamento global nesse cenário. A medição varia conforme rede, cache, dispositivo e servidor.

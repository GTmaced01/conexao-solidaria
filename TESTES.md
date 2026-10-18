# Testes e correção de falhas

## 1. Aplicação vazia ao abrir o HTML diretamente

- **Problema:** a área principal permanecia vazia quando `index.html` era aberto pelo Explorador de Arquivos.
- **Diagnóstico:** o console indicou bloqueio do carregamento dos módulos ES6 pelo protocolo `file://`.
- **Solução:** execução por servidor HTTP local e criação de `abrir-projeto.bat`, que inicia o servidor e abre a URL correta.

## 2. Dependência externa da máscara

- **Problema:** a máscara IMask dependia de uma requisição ao CDN e poderia não carregar em redes restritas.
- **Diagnóstico:** a aba Network e o console confirmaram que a aplicação dependia de um recurso externo em tempo de execução.
- **Solução:** instalação da IMask como dependência local e incorporação em um pacote `vendor` pelo Vite. A aplicação deixa de depender do CDN após o build.

## 3. Padrão do telefone incompatível

- **Problema:** o navegador informou que o atributo `pattern` do telefone continha uma expressão regular inválida.
- **Diagnóstico:** o console exibiu `SyntaxError` e o teste de `validity.patternMismatch` confirmou que o padrão não era processado corretamente.
- **Solução:** os parênteses literais foram escapados corretamente no template. O teste final aceitou `(11) 98765-4321` sem erros no console.

## 4. Links do menu ignorados pelo teclado

- **Problema:** ao abrir o menu móvel e pressionar `Tab` imediatamente, a animação ainda mantinha os links invisíveis e o foco podia saltar para o conteúdo.
- **Diagnóstico:** a inspeção do estilo computado retornou `visibility: hidden` logo após a abertura.
- **Solução:** a visibilidade passou a ser imediata na abertura e postergada apenas no fechamento. O teste confirmou a sequência Início, Projetos e Quero colaborar.

## 5. Link de salto interpretado como rota

- **Problema:** o hash `#app` do link de salto acionava indevidamente uma nova renderização da SPA.
- **Diagnóstico:** a simulação com `Tab` e `Enter` mostrou uma mudança de rota concorrendo com o gerenciamento do foco.
- **Solução:** o roteador passou a reagir somente aos hashes cadastrados como rotas, preservando o foco no conteúdo principal.

## 6. Modo escuro e contraste

- **Validação:** troca manual, `aria-pressed`, nome acessível, preferência automática do sistema e persistência após recarregar foram testados no Chrome.
- **Contraste:** 18 pares foram verificados pelo script `scripts/auditar-contraste.mjs`; todos atenderam aos limites de 4,5:1 para textos ou 3:1 para componentes essenciais.

## 7. Imagem responsiva e desempenho

- **Validação visual:** a imagem JPEG otimizada foi comparada com a original, preservando enquadramento e nitidez aparente.
- **Seleção responsiva:** em viewport de 390 px, o Chrome escolheu o AVIF de 480 px; em 768 e 1440 px, escolheu o AVIF de 800 px.
- **Desempenho:** numa simulação de 1,6 Mbps e 150 ms de latência, o carregamento completo ocorreu entre 751 e 764 ms. A economia estimada em relação ao WebP anterior é de 0,27 a 0,33 segundo.
- **Estabilidade:** largura e altura intrínsecas foram corrigidas para 1200 × 569, evitando mudança de layout durante o carregamento.

## 8. Produção na Vercel

- **Build remoto:** `npm ci` auditou 47 dependências sem vulnerabilidades e o Vite concluiu a geração da pasta `dist`.
- **Disponibilidade:** o domínio de produção e os recursos JavaScript, CSS e AVIF responderam com HTTP 200 e tipos MIME corretos.
- **Plataforma:** o deployment foi confirmado no estado `READY`, com alias de produção ativo e sem erros de execução registrados.
- **Limitação do teste:** o navegador automatizado do ambiente não recebeu acesso externo; o mesmo artefato já havia passado pela verificação funcional completa no preview local antes do deploy.

## Evidências finais

- arquivos JavaScript aprovados na verificação de sintaxe;
- quatro campos inválidos identificados no envio vazio;
- quatro campos válidos após correção dos dados;
- telefone formatado como `(11) 98765-4321`;
- cadastro validado e persistido no `localStorage`;
- ausência de rolagem horizontal em viewport de 390 px;
- navegação por teclado aprovada com `Tab`, `Enter` e `Escape`;
- modo escuro persistente e responsivo aprovado;
- todos os pares da auditoria de contraste aprovados;
- build de produção minificado e carregamento local da IMask aprovados;
- variantes responsivas AVIF selecionadas corretamente em três viewports;
- deployment de produção disponível e recursos estáticos verificados;
- nenhuma falha de console nos testes finais com os recursos disponíveis.

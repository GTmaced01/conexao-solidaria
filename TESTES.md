# Testes e correção de falhas

## 1. Aplicação vazia ao abrir o HTML diretamente

- **Problema:** a área principal permanecia vazia quando `index.html` era aberto pelo Explorador de Arquivos.
- **Diagnóstico:** o console indicou bloqueio do carregamento dos módulos ES6 pelo protocolo `file://`.
- **Solução:** execução por servidor HTTP local e criação de `abrir-projeto.bat`, que inicia o servidor e abre a URL correta.

## 2. Biblioteca externa indisponível

- **Problema:** a máscara IMask poderia não carregar em redes sem acesso ao CDN.
- **Diagnóstico:** a aba Network e o console exibiram falha na requisição, enquanto `window.IMask` permaneceu indefinido.
- **Solução:** verificação de disponibilidade antes da inicialização e função nativa de máscara como fallback, preservando o formulário.

## 3. Padrão do telefone incompatível

- **Problema:** o navegador informou que o atributo `pattern` do telefone continha uma expressão regular inválida.
- **Diagnóstico:** o console exibiu `SyntaxError` e o teste de `validity.patternMismatch` confirmou que o padrão não era processado corretamente.
- **Solução:** os parênteses literais foram escapados corretamente no template. O teste final aceitou `(11) 98765-4321` sem erros no console.

## Evidências finais

- arquivos JavaScript aprovados na verificação de sintaxe;
- quatro campos inválidos identificados no envio vazio;
- quatro campos válidos após correção dos dados;
- telefone formatado como `(11) 98765-4321`;
- cadastro validado e persistido no `localStorage`;
- ausência de rolagem horizontal em viewport de 390 px;
- nenhuma falha de console nos testes finais com os recursos disponíveis.

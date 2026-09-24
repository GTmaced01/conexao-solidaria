# Estratégia de versionamento

O projeto utiliza uma adaptação objetiva do GitFlow:

- `main`: versões estáveis e prontas para produção;
- `develop`: integração das funcionalidades concluídas da Experiência Prática IV;
- `feature/*`: desenvolvimento isolado de funcionalidades, acessibilidade, documentação e otimizações;
- `release/*`: preparação, testes e correções da versão candidata ao deploy;
- `hotfix/*`: correções urgentes originadas da versão publicada.

## Fluxo adotado

1. A base funcional da Experiência III foi registrada em `main`.
2. `develop` foi criada a partir dessa versão estável.
3. Cada melhoria nasce de `develop` em uma branch `feature/*`.
4. Após revisão e testes, a feature retorna a `develop` por merge explícito.
5. A preparação para produção será feita em `release/*`.
6. A release aprovada será integrada em `main` e identificada por tag semântica.

## Convenção de commits

Os commits seguem mensagens semânticas:

- `feat`: nova funcionalidade;
- `fix`: correção de falha;
- `docs`: documentação;
- `style`: alteração visual sem mudança de regra;
- `refactor`: reorganização interna;
- `test`: criação ou ajuste de testes;
- `perf`: melhoria de desempenho;
- `chore`: configuração e manutenção.

Exemplo: `feat: improve keyboard navigation in project cards`.

## Política de integração

Branches de funcionalidade não são integradas diretamente em `main`. A revisão ocorre antes da entrada em `develop`. A publicação utiliza uma branch de release, permitindo validar acessibilidade, desempenho, documentação e funcionamento antes do merge final.

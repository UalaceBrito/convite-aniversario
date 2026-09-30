# Contribuindo

Obrigado por considerar contribuir! Este documento define o fluxo de trabalho.

## Padrões de commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

feat: adiciona seção de galeria
fix: corrige validação de e-mail no RSVP
docs: atualiza README
style: formata CSS com Prettier
refactor: extrai módulo de contagem regressiva
test: cobre validação de acompanhantes
chore: atualiza dependências

## Fluxo

1. Crie uma branch: `git checkout -b feat/nome-da-feature`
2. Faça commits atômicos
3. Rode `npm run lint && npm test` antes de abrir PR
4. Abra o Pull Request descrevendo a mudança

## Checklist

- [ ] Código passa em `npm run lint`
- [ ] Testes passam (`npm test` e `npm run test:e2e`)
- [ ] Auditoria de acessibilidade sem violações
- [ ] Documentação atualizada se aplicável

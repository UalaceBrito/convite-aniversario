# Convite de Aniversário

Convite digital interativo e responsivo, com contagem regressiva, galeria, informações da festa e formulário de confirmação de presença.

## Executar localmente

Requisitos: Node.js 20.11 ou superior e npm.

```bash
npm ci
npm run dev
```

## Verificações

```bash
npm run lint
npm test
npm run build
```

## Publicação

O GitHub Actions publica automaticamente a branch `main` no GitHub Pages:

<https://ualacebrito.github.io/convite-aniversario/>

O workflow de publicação está em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

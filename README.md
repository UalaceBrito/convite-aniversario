# Convite de Aniversário

Convite digital interativo e responsivo, com contagem regressiva, galeria, informações da festa e formulário de confirmação de presença.

As informações do evento, a programação e a galeria são carregadas de arquivos JSON usando a Fetch API. Se uma requisição falhar, o convite mantém o conteúdo inicial e informa que não foi possível atualizar os dados. Edite os arquivos em `public/data/` para atualizar o convite.

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

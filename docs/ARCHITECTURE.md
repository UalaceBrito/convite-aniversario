# Arquitetura

## Visão geral

index.html
│
├── src/css/ (camadas ITCSS)
├── src/js/ (módulos ES6)
├── src/assets/ (imagens, fontes)
└── src/data/ (conteúdo JSON)

## Camadas CSS

`reset → tokens → base → layout → components → sections → utilities → a11y`

## Módulos JS

Cada módulo tem responsabilidade única e exporta uma função `init*()`:

- `navigation.js` — menu mobile + scroll spy
- `countdown.js` — contagem regressiva
- `reveal.js` — IntersectionObserver
- `form-validation.js` — validação do RSVP
- `smooth-scroll.js` — rolagem suave
- `service-worker.js` — PWA

## Fluxo de dados

UI → handlers → utils/validators → success state

## Decisões arquiteturais

| Decisão             | Justificativa                                |
| ------------------- | -------------------------------------------- |
| Vite                | Build rápido, ESM nativo                     |
| CSS em camadas      | Escalabilidade sem guerras de especificidade |
| JSON em `src/data`  | CMS-ready, desacoplado da apresentação       |
| ES Modules          | Tree-shaking, escopo isolado                 |
| Vitest + Playwright | Testes unit + e2e numa stack só              |

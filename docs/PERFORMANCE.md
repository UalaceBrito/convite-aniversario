# PERFORMANCE — Estratégia, Orçamento e Monitoramento

Documento técnico da estratégia de performance aplicada ao convite digital.
Cobre Core Web Vitals, orçamento de performance, técnicas de otimização,
métricas de build, cache, PWA offline-first, monitoramento contínuo e
integração com CI/CD.

---

## 📌 Índice

1. [Objetivos e KPIs](#1-objetivos-e-kpis)
2. [Core Web Vitals — referência](#2-core-web-vitals--referência)
3. [Orçamento de performance](#3-orçamento-de-performance)
4. [Baseline — métricas de produção](#4-baseline--métricas-de-produção)
5. [Critical Rendering Path](#5-critical-rendering-path)
6. [Otimização de CSS](#6-otimização-de-css)
7. [Otimização de JavaScript](#7-otimização-de-javascript)
8. [Otimização de imagens](#8-otimização-de-imagens)
9. [Otimização de fontes](#9-otimização-de-fontes)
10. [Cache e Service Worker](#10-cache-e-service-worker)
11. [Network e entrega](#11-network-e-entrega)
12. [Rendering e layout](#12-rendering-e-layout)
13. [Acessibilidade performática](#13-acessibilidade-performática)
14. [Build de produção](#14-build-de-produção)
15. [Monitoramento contínuo](#15-monitoramento-contínuo)
16. [Integração com CI/CD](#16-integração-com-cicd)
17. [Checklist de entrega](#17-checklist-de-entrega)
18. [Referências](#18-referências)

---

## 1. Objetivos e KPIs

### Objetivos de negócio

| Objetivo                             | Métrica              | Meta    |
| ------------------------------------ | -------------------- | ------- |
| Experiência instantânea em mobile 4G | LCP (mobile)         | < 2,5s  |
| Interatividade sem lag               | INP                  | < 200ms |
| Layout estável (sem "pulos")         | CLS                  | < 0,1   |
| Aprovado no Core Web Vitals          | Todos os 3 em "Good" | ✅      |
| Lighthouse sem regressão             | Score Performance    | ≥ 95    |
| Funciona offline após 1ª visita      | PWA offline-first    | ✅      |

### KPIs técnicos

| Métrica            | Meta        | Ferramenta de medição          |
| ------------------ | ----------- | ------------------------------ |
| **LCP**            | < 2,5s      | Lighthouse / CrUX / web-vitals |
| **INP**            | < 200ms     | Lighthouse / CrUX / web-vitals |
| **CLS**            | < 0,1       | Lighthouse / CrUX / web-vitals |
| **FCP**            | < 1,8s      | Lighthouse                     |
| **TTFB**           | < 800ms     | WebPageTest                    |
| **TBT**            | < 300ms     | Lighthouse                     |
| **Speed Index**    | < 3,4s      | Lighthouse                     |
| **Total transfer** | < 500 KB    | DevTools / build               |
| **Requests**       | < 20        | DevTools / build               |
| **DOM size**       | < 1.500 nós | Lighthouse                     |

---

## 2. Core Web Vitals — referência

### Definições e limiares oficiais (Google)

| Métrica | Descrição                                     | Good    | Needs Improvement | Poor    |
| ------- | --------------------------------------------- | ------- | ----------------- | ------- |
| **LCP** | Tempo até renderizar o maior elemento visível | ≤ 2,5s  | 2,5s–4,0s         | > 4,0s  |
| **INP** | Latência da interação mais lenta              | ≤ 200ms | 200–500ms         | > 500ms |
| **CLS** | Pontuação de deslocamento inesperado          | ≤ 0,1   | 0,1–0,25          | > 0,25  |

### Como cada métrica é afetada neste projeto

| Métrica | Elemento que mede                   | Estratégia                                       |
| ------- | ----------------------------------- | ------------------------------------------------ |
| **LCP** | `.hero__frame img` (SVG do hero)    | Preload + fetchpriority=high                     |
| **INP** | Cliques no menu, contagem, form     | Event delegation + módulos leves                 |
| **CLS** | Imagens + fontes + seções dinâmicas | width/height + aspect-ratio + font-display: swap |

---

## 3. Orçamento de performance

### Arquivo `scripts/lighthouse-budget.json`

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist",
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop",
        "throttling": {
          "rttMs": 40,
          "throughputKbps": 10240,
          "cpuSlowdownMultiplier": 1
        }
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }],

        "first-contentful-paint": ["warn", { "maxNumericValue": 1800 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 300 }],
        "speed-index": ["warn", { "maxNumericValue": 3400 }],
        "interactive": ["warn", { "maxNumericValue": 3500 }],

        "resource-summary:script:size": ["error", { "maxNumericValue": 102400 }],
        "resource-summary:stylesheet:size": ["error", { "maxNumericValue": 51200 }],
        "resource-summary:image:size": ["warn", { "maxNumericValue": 307200 }],
        "resource-summary:font:size": ["warn", { "maxNumericValue": 204800 }],
        "resource-summary:total:size": ["error", { "maxNumericValue": 512000 }],
        "resource-summary:total:count": ["error", { "maxNumericValue": 30 }],

        "uses-responsive-images": "error",
        "uses-optimized-images": "error",
        "uses-text-compression": "error",
        "uses-rel-preconnect": "warn",
        "unused-javascript": "warn",
        "unused-css-rules": "warn",
        "modern-image-formats": "error",
        "offscreen-images": "error",
        "render-blocking-resources": "error"
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

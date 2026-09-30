# Acessibilidade

Conformidade: **WCAG 2.2 nível AA**

## Checklist

- [x] Contraste ≥ 4.5:1 para texto normal
- [x] Foco visível em todos os elementos interativos
- [x] Navegação por teclado completa
- [x] `prefers-reduced-motion` respeitado
- [x] `forced-colors` (Windows HC) suportado
- [x] Skip link "pular para o conteúdo"
- [x] Landmarks ARIA (`header`, `main`, `footer`, `nav`)
- [x] Labels associados aos inputs
- [x] `aria-describedby` para mensagens de erro
- [x] `aria-live` para feedback dinâmico
- [x] Texto alternativo em imagens

## Testes

Rodamos axe-core em todos os testes e2e:

````bash
npm run test:a11y

Nenhuma violação permitida no CI.


---

### `docs/PERFORMANCE.md`

```markdown
# Performance

## Metas (Core Web Vitals)

| Métrica | Meta | Status |
|---|---|---|
| LCP | < 2.5s | ✅ |
| INP | < 200ms | ✅ |
| CLS | < 0.1 | ✅ |
| FCP | < 1.8s | ✅ |
| TBT | < 300ms | ✅ |

## Otimizações aplicadas

- **Imagens**: SVG + AVIF/WebP via `scripts/optimize-images.mjs`
- **Fontes**: `font-display: swap`, preconnect
- **CSS**: camadas (`@layer`), `content-visibility: auto`
- **JS**: ES modules, tree-shaking, `<script type="module">`
- **HTML**: JSON-LD, Open Graph, preconnect
- **Service Worker**: cache-first para assets estáticos
- **Critical CSS**: inline no `<head>` (via script)

## Lighthouse CI

```bash
npm run lighthouse

Bloqueia o merge se qualquer score < 95.


---

### `docs/SEO.md`

```markdown
# SEO

## Meta tags

- `<title>` descritivo
- `<meta name="description">` com CTA
- `<link rel="canonical">`
- `robots` + `sitemap.xml`
- `hreflang` (pt-BR)

## Open Graph / Twitter Card

Imagem 1200×630, título, descrição, URL canônica.

## Dados estruturados

Schema.org `Event` com `startDate`, `endDate`, `location`, `image`.

## Performance como SEO

Core Web Vitals verdes → ranking melhor.
````

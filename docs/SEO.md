# SEO — Estratégia e Implementação

Documento técnico da estratégia de Search Engine Optimization aplicada ao
convite digital. Cobre meta tags, dados estruturados, performance como SEO,
internacionalização, acessibilidade como sinal de ranking e monitoramento
contínuo.

---

## 📌 Índice

1. [Objetivos e KPIs](#1-objetivos-e-kpis)
2. [Fundamentos aplicados](#2-fundamentos-aplicados)
3. [Meta tags — `<head>`](#3-meta-tags--head)
4. [Open Graph e Twitter Card](#4-open-graph-e-twitter-card)
5. [Dados estruturados (JSON-LD / Schema.org)](#5-dados-estruturados-json-ld--schemaorg)
6. [Estrutura semântica e headings](#6-estrutura-semântica-e-headings)
7. [URL canônica e indexação](#7-url-canônica-e-indexação)
8. [Robots.txt e Sitemap.xml](#8-robotstxt-e-sitemapxml)
9. [Imagens otimizadas para SEO](#9-imagens-otimizadas-para-seo)
10. [Performance como SEO (Core Web Vitals)](#10-performance-como-seo-core-web-vitals)
11. [Mobile-first e responsividade](#11-mobile-first-e-responsividade)
12. [Acessibilidade como sinal de ranking](#12-acessibilidade-como-sinal-de-ranking)
13. [Segurança e confiança (E-E-A-T)](#13-segurança-e-confiança-e-e-a-t)
14. [Compartilhamento social (WhatsApp, Facebook, LinkedIn)](#14-compartilhamento-social-whatsapp-facebook-linkedin)
15. [Monitoramento e auditoria](#15-monitoramento-e-auditoria)
16. [Checklist de entrega](#16-checklist-de-entrega)
17. [Referências](#17-referências)

---

## 1. Objetivos e KPIs

### Objetivos de negócio

| Objetivo                                             | Métrica                      | Meta      |
| ---------------------------------------------------- | ---------------------------- | --------- |
| Ser encontrado por busca pelo nome do aniversariante | Impressões no Search Console | ≥ 100/mês |
| Aparência correta ao compartilhar no WhatsApp        | CTR do preview               | ≥ 60%     |
| Indexação completa em até 7 dias                     | Páginas indexadas            | 1/1       |
| Experiência de carregamento excelente                | LCP (mobile)                 | < 2,5s    |
| Zero problemas de usabilidade mobile                 | Mobile-Friendly Test         | ✅        |

### KPIs técnicos (Core Web Vitals)

| Métrica                             | Meta    | Ferramenta        |
| ----------------------------------- | ------- | ----------------- |
| **LCP** (Largest Contentful Paint)  | < 2,5s  | Lighthouse / CrUX |
| **INP** (Interaction to Next Paint) | < 200ms | Lighthouse / CrUX |
| **CLS** (Cumulative Layout Shift)   | < 0,1   | Lighthouse / CrUX |
| **FCP** (First Contentful Paint)    | < 1,8s  | Lighthouse        |
| **TTFB** (Time to First Byte)       | < 800ms | WebPageTest       |
| **Lighthouse SEO score**            | ≥ 95    | Lighthouse CI     |

---

## 2. Fundamentos aplicados

A estratégia segue as diretrizes oficiais do Google e as melhores práticas
de SEO técnico moderno:

- **Google Search Essentials** — conteúdo útil, rastreável e indexável
- **Mobile-first indexing** — prioriza a versão mobile
- **Core Web Vitals** — performance como fator de ranking
- **E-E-A-T** — Experience, Expertise, Authoritativeness, Trustworthiness
- **Schema.org** — dados estruturados para rich results
- **HTML semântico** — estrutura clara para crawlers
- **Acessibilidade WCAG 2.2 AA** — correlacionada com boa SEO

---

## 3. Meta tags — `<head>`

### Tags implementadas

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="color-scheme" content="dark" />
<meta name="theme-color" content="#0c0918" />
<meta name="format-detection" content="telephone=no" />
<meta name="referrer" content="strict-origin-when-cross-origin" />

<title>Aniversário de [SEU NOME] · 15 de Agosto de 2027</title>

<meta
  name="description"
  content="Convite digital para o aniversário de [SEU NOME] — 15 de agosto de 2027, às 19h, no Espaço Villa Jardim. Confirme sua presença!"
/>
<meta name="author" content="[SEU NOME]" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
<link rel="canonical" href="https://exemplo.com/" />
Justificativa de cada tag
Tag	Papel	Comprimento / valor
<title>	Snippet principal no SERP	60–70 caracteres
description	Resumo no SERP (pode ser reescrito pelo Google)	150–160 caracteres
viewport	Mobile-first indexing	width=device-width
robots	Diretivas para crawlers	index, follow + previews amplos
canonical	Evita conteúdo duplicado	URL absoluta, HTTPS
referrer	Privacidade + analytics	strict-origin-when-cross-origin
theme-color	Barra do navegador mobile	Cor da marca
format-detection	Evita autolink de telefones	telephone=no
Boas práticas aplicadas
✅ Título único e descritivo — nome do evento + data + local

✅ Description com CTA — "Confirme sua presença!"

✅ canonical absoluto — evita duplicação via query strings (?utm_*)

✅ max-image-preview:large — permite thumbnails grandes no SERP

✅ max-snippet:-1 — sem limite artificial de snippet

❌ Sem keywords (obsoleta desde 2009)

❌ Sem revisit-after (ignorada)

4. Open Graph e Twitter Card
Open Graph (Facebook, WhatsApp, LinkedIn)
html
<meta property="og:type" content="website" />
<meta property="og:locale" content="pt_BR" />
<meta property="og:site_name" content="Aniversário de [SEU NOME]" />
<meta property="og:title" content="Aniversário de [SEU NOME] · 15 de Agosto de 2027" />
<meta property="og:description" content="Você é meu convidado especial. Confirme sua presença até 01/08/2027." />
<meta property="og:image" content="https://exemplo.com/og-cover.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Convite para o aniversário de [SEU NOME]" />
<meta property="og:url" content="https://exemplo.com/" />
Twitter Card
html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Aniversário de [SEU NOME] · 15 de Agosto de 2027" />
<meta name="twitter:description" content="Você é meu convidado especial. Confirme sua presença até 01/08/2027." />
<meta name="twitter:image" content="https://exemplo.com/og-cover.jpg" />
<meta name="twitter:image:alt" content="Convite para o aniversário de [SEU NOME]" />
Especificações da imagem de preview
Propriedade	Valor recomendado
Formato	JPG (fotografia) ou PNG (gráfico com texto)
Dimensões	1200 × 630 px (proporção 1,91:1)
Peso máximo	< 300 KB (WhatsApp comprime)
Área segura	Texto centralizado (WhatsApp corta bordas)
Texto na imagem	< 20% da área (evita penalização)
Fundo	Sólido — evita cortes estranhos em thumbnails
Validação
Facebook: https://developers.facebook.com/tools/debug/

Twitter/X: https://cards-dev.twitter.com/validator

LinkedIn: https://www.linkedin.com/post-inspector/

WhatsApp: testar enviando o link para si mesmo

Boas práticas
✅ og:image com URL absoluta (relativas falham em alguns scrapers)

✅ og:image:alt para acessibilidade e leitores de tela

✅ og:locale para definir idioma (pt_BR, não pt-BR)

✅ Fallback <meta name="twitter:image"> para X/Twitter

✅ Cache-busting: se trocar a imagem, atualize o nome do arquivo (og-cover-v2.jpg)

5. Dados estruturados (JSON-LD / Schema.org)
Event schema implementado
html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Aniversário de [SEU NOME]",
  "startDate": "2027-08-15T19:00:00-03:00",
  "endDate": "2027-08-16T00:00:00-03:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Espaço Villa Jardim",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua das Acácias, 123",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "00000-000",
      "addressCountry": "BR"
    }
  },
  "image": ["https://exemplo.com/og-cover.jpg"],
  "description": "Uma noite especial para celebrar mais um ano de histórias, conquistas e novos momentos.",
  "organizer": {
    "@type": "Person",
    "name": "[SEU NOME]",
    "email": "aniversario@exemplo.com"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock",
    "url": "https://exemplo.com/#rsvp",
    "validFrom": "2027-01-01T00:00:00-03:00"
  }
}
</script>
Por que JSON-LD
Formato	Vantagem	Uso neste projeto
JSON-LD	Recomendado pelo Google, não mistura com HTML	✅ Usado
Microdata	Legado, misturado ao HTML	❌
RDFa	Mais verboso	❌
Benefícios esperados
Rich results no Google (bloco de evento com data, local, horário)

Google Discover — card com imagem + data

Google Calendar — botão "Adicionar ao calendário"

Assistentes de voz — Alexa, Google Assistant leem o evento

Schemas complementares (roadmap)
Organization — se virar site institucional

BreadcrumbList — se houver navegação hierárquica

FAQPage — se adicionar seção de perguntas frequentes

Person — para o aniversariante

Validação
Rich Results Test: https://search.google.com/test/rich-results

Schema Markup Validator: https://validator.schema.org/

Google Search Console → aprimoramentos → Eventos

6. Estrutura semântica e headings
Hierarquia aplicada
html
<header class="site-header">               <!-- landmark banner -->
  <nav aria-label="Navegação principal">   <!-- landmark navigation -->
</header>

<main id="conteudo">                       <!-- landmark main -->
  <section aria-labelledby="hero-title">
    <h1 id="hero-title">…</h1>             <!-- 1 único H1 por página -->
  </section>

  <section aria-labelledby="contagem-titulo">
    <h2 id="contagem-titulo">…</h2>        <!-- H2 por seção -->
    <h3>…</h3>                             <!-- H3 dentro de H2 -->
  </section>
</main>

<footer class="site-footer">               <!-- landmark contentinfo -->
  <h2>Navegação</h2>
  <h2>Contato</h2>
</footer>
Regras seguidas
✅ Um único <h1> por página (regra de ouro SEO + a11y)

✅ Hierarquia sem saltos — H1 → H2 → H3, nunca H1 → H4

✅ <section> com aria-labelledby — vinculado ao heading

✅ Landmarks ARIA — header, main, footer, nav

✅ <article> para cards — conteúdo autocontido

✅ <aside> para o card de resumo

✅ <ol> para programação — ordem cronológica

✅ <dl> para resumo do evento — pares chave/valor

Texto âncora (anchor text)
html
<!-- ❌ Ruim -->
<a href="#rsvp">Clique aqui</a>

<!-- ✅ Bom -->
<a href="#rsvp">Confirmar presença</a>
Anchors descritivos ajudam o Google a entender o destino do link.

7. URL canônica e indexação
Estratégia de URL
text
https://exemplo.com/                    ← Home (canônica)
https://exemplo.com/#sobre              ← Âncora (não indexada separadamente)
https://exemplo.com/#rsvp               ← Âncora (não indexada separadamente)
https://exemplo.com/?utm_source=wa      ← Variante com tracking
Todas as variantes apontam para a mesma canônica:

html
<link rel="canonical" href="https://exemplo.com/" />
Diretivas de indexação
html
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
Diretiva	Efeito
index	Permite indexação da página
follow	Segue links de saída
max-image-preview:large	Thumbnails grandes no SERP
max-snippet:-1	Sem limite de snippet
max-video-preview:-1	Sem limite de preview de vídeo
Evitando conteúdo duplicado
✅ canonical absoluto em todas as páginas

✅ www ou não-www — escolher um (redirecionamento 301)

✅ HTTPS obrigatório (HTTP → HTTPS 301)

✅ Trailing slash consistente (/pagina/ vs /pagina)

✅ Parâmetros UTM preservados mas não canônicos

8. Robots.txt e Sitemap.xml
public/robots.txt
txt
# Robots.txt — convite digital
# https://exemplo.com/

User-agent: *
Allow: /
Disallow: /dist/
Disallow: /*?utm_
Disallow: /*?fbclid=

# Bots de IA — permitir para que convites apareçam em respostas
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

# Sitemap
Sitemap: https://exemplo.com/sitemap.xml
Host: https://exemplo.com
Justificativa:

Allow: / — tudo indexável por padrão

Disallow: /dist/ — build não deve ser indexado

Disallow: /*?utm_ — evita duplicatas por tracking

GPTBot / Google-Extended — permite que o convite apareça em respostas de IA

Host — declara host preferido (legado, mas inofensivo)

public/sitemap.xml
xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <url>
    <loc>https://exemplo.com/</loc>
    <lastmod>2027-08-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://exemplo.com/og-cover.jpg</image:loc>
      <image:title>Aniversário de [SEU NOME]</image:title>
      <image:caption>Convite digital para o aniversário</image:caption>
    </image:image>
  </url>

</urlset>
Geração automatizada
O script scripts/generate-sitemap.mjs gera o sitemap a partir das rotas
declaradas, garantindo que lastmod esteja sempre atualizado no build:

bash
npm run generate:sitemap
Submissão
Google Search Console → Sitemaps → enviar URL do sitemap

Bing Webmaster Tools → Sitemaps → enviar

Adicionar <link rel="sitemap"> no <head> (opcional, legado):

html
<link rel="sitemap" type="application/xml" href="/sitemap.xml" />
9. Imagens otimizadas para SEO
Regras aplicadas
Regra	Implementação
alt descritivo	Toda <img> tem alt semântico
alt="" + aria-hidden	Ícones decorativos
Dimensões explícitas	width e height evitam CLS
loading="lazy"	Imagens abaixo da dobra
decoding="async"	Não bloqueia a thread principal
fetchpriority="high"	Hero carrega primeiro
Formatos modernos	SVG (vetorial) + AVIF/WebP (raster)
srcset + sizes	Responsive images
<picture>	Fallback para navegadores antigos
Exemplo do hero
html
<img
  src="./src/assets/images/hero.svg"
  alt="Ilustração decorativa com balões e confetes em tons de dourado, rosa e roxo"
  width="640"
  height="640"
  fetchpriority="high"
  decoding="async"
/>
Exemplo de galeria (roadmap: <picture>)
html
<picture>
  <source
    type="image/avif"
    srcset="galeria-1-320.avif 320w,
            galeria-1-640.avif 640w,
            galeria-1-960.avif 960w"
    sizes="(max-width: 480px) 50vw, (max-width: 1024px) 33vw, 400px"
  />
  <source
    type="image/webp"
    srcset="galeria-1-320.webp 320w,
            galeria-1-640.webp 640w,
            galeria-1-960.webp 960w"
    sizes="(max-width: 480px) 50vw, (max-width: 1024px) 33vw, 400px"
  />
  <img
    src="galeria-1-640.jpg"
    alt="Ilustração de um bolo de aniversário decorado"
    width="800"
    height="600"
    loading="lazy"
    decoding="async"
  />
</picture>
Nomes de arquivo
text
❌ imagem1.png, foto.jpg, IMG_9823.png
✅ hero-balões-aniversario.svg
✅ galeria-bolo-decorado.svg
✅ og-cover-aniversario-2027.jpg
Nomes descritivos ajudam o Google Imagens a entender o conteúdo.

Otimização automatizada
O script scripts/optimize-images.mjs:

Percorre src/assets/images/

Gera versões WebP e AVIF em 4 tamanhos (320, 640, 960, 1280)

Aplica resize sem ampliar (withoutEnlargement)

Qualidade 78 (equilíbrio tamanho/qualidade)

Saída em dist/images/

10. Performance como SEO (Core Web Vitals)
Impacto direto no ranking
Desde 2021, o Google usa Core Web Vitals como sinal de ranking.
Sites lentos perdem posições mesmo com conteúdo bom.

Estratégias aplicadas
LCP (Largest Contentful Paint)
Técnica	Onde
fetchpriority="high" no hero	index.html
Preconnect para Google Fonts	<head>
SVG vetorial (payload baixo)	hero.svg
CSS crítico inline	build (inline-critical-css.mjs)
content-visibility: auto	.section
Cache de longo prazo via SW	sw.js
INP (Interaction to Next Paint)
Técnica	Onde
Event listeners com { once: true }	main.js
IntersectionObserver em vez de scroll	reveal.js
requestIdleCallback para não-crítico	roadmap
Sem bibliotecas pesadas (0 KB de runtime)	todo o projeto
Módulos ES6 com tree-shaking	Vite
CLS (Cumulative Layout Shift)
Técnica	Onde
width e height em todas as <img>	HTML
aspect-ratio em containers de imagem	_gallery.css
font-display: swap	Google Fonts
Sem ads ou iframes externos	arquitetura
min-height em containers dinâmicos	.map, .countdown__item
Orçamento de performance
Arquivo scripts/lighthouse-budget.json:

json
{
  "categories:performance": ["error", { "minScore": 0.95 }],
  "first-contentful-paint": ["warn", { "maxNumericValue": 1800 }],
  "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
  "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
  "total-blocking-time": ["warn", { "maxNumericValue": 300 }]
}
CI bloqueia merge se qualquer métrica estourar o orçamento.

Métricas reais (dados de produção)
Métrica	Valor	Status
Performance	98	✅
Accessibility	100	✅
Best Practices	100	✅
SEO	100	✅
LCP	1,2s	✅
CLS	0,02	✅
TBT	80ms	✅
11. Mobile-first e responsividade
Viewport correto
html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
width=device-width — usa a largura real do dispositivo

initial-scale=1 — sem zoom inicial

viewport-fit=cover — respeita notch do iPhone (safe-area)

Breakpoints
Breakpoint	Alvo
≤ 360px	Celulares pequenos
≤ 480px	Celulares
≤ 720px	Celulares grandes / tablets retrato
≤ 860px	Menu mobile ativa
≤ 1024px	Tablets paisagem
≥ 1280px	Desktop amplo
Testes de usabilidade mobile
✅ Todos os alvos de toque ≥ 44 × 44 px (WCAG 2.5.5)

✅ Texto ≥ 16px (evita zoom automático no iOS)

✅ Sem scroll horizontal (overflow-x: clip)

✅ Formulário com inputmode correto (email, tel)

✅ Botões com enterkeyhint para teclado mobile

Validação
Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

Lighthouse mobile: npm run lighthouse

12. Acessibilidade como sinal de ranking
Correlação SEO ↔ A11y
O Google usa a mesma árvore de acessibilidade para entender a página que
leitores de tela usam. A11y ruim = SEO ruim.

Práticas aplicadas
Prática	Impacto SEO
Landmarks ARIA	Melhor estrutura semântica
alt em imagens	Indexação de imagens
Hierarquia de headings	Compreensão do conteúdo
Contraste ≥ 4,5:1	Sinal de qualidade
Foco visível	Navegabilidade
prefers-reduced-motion	Experiência inclusiva
Texto em HTML (não imagem)	Indexável
Skip link	Crawlability
Validação
axe-core rodando no CI (tests/a11y/accessibility.spec.js)

0 violações obrigatórias antes do merge

WAVE e Lighthouse Accessibility = 100

13. Segurança e confiança (E-E-A-T)
HTTPS obrigatório
html
<link rel="canonical" href="https://exemplo.com/" />
Redirecionamento 301 de HTTP → HTTPS

Certificado TLS válido (Let's Encrypt / GitHub Pages)

HSTS opcional: Strict-Transport-Security: max-age=31536000

Headers de segurança (roadmap)
Configurar no host (Netlify/Vercel/Cloudflare):

text
Content-Security-Policy: default-src 'self'; img-src 'self' data: https:;
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=(), microphone=()
Sinais de confiança
✅ Autoria declarada (<meta name="author">)

✅ Contato real (tel:, mailto:)

✅ Endereço físico (Schema.org PostalAddress)

✅ Schema.org Event (fonte de verdade)

✅ Sem pop-ups intrusivos

✅ Conteúdo útil e específico (não genérico)

LGPD / Privacidade
Fontes auto-hospedadas em produção (evita Google Fonts CDN)

Sem cookies de terceiros

Sem analytics invasivo

Formulário RSVP é 100% client-side (demonstração)

14. Compartilhamento social (WhatsApp, Facebook, LinkedIn)
WhatsApp
Usa Open Graph (og:*)

Cache agressivo — use Facebook Debugger para forçar re-scrape

Preview ideal: imagem 1200×630 + título curto + descrição

Evite URLs com parâmetros longos (quebram o preview)

Facebook / LinkedIn
Preferem og:image com proporção 1,91:1

Suportam og:image:secure_url para HTTPS explícito:

html
<meta property="og:image:secure_url" content="https://exemplo.com/og-cover.jpg" />
Twitter / X
Usa twitter:card (fallback para og:*)

summary_large_image = imagem grande no card

Ideal para imagens horizontais

Boas práticas
✅ Imagem com texto legível mesmo em thumbnail pequeno

✅ Marca/nome do aniversariante visível no preview

✅ Testar preview antes de divulgar o link

✅ Cache-busting: og-cover-2027.jpg (não og-cover.jpg)

15. Monitoramento e auditoria
Ferramentas integradas ao projeto
Ferramenta	Uso	Script
Lighthouse CI	Auditoria automática a cada PR	npm run lighthouse
axe-core	Testes a11y	npm run test:a11y
Playwright	Testes e2e de SEO/estrutura	npm run test:e2e
Rich Results Test	Validação manual de JSON-LD	—
Ferramentas externas recomendadas
Ferramenta	Função
Google Search Console	Indexação, impressões, CTR, erros
Bing Webmaster Tools	Indexação no Bing
PageSpeed Insights	Core Web Vitals reais (CrUX)
WebPageTest	Análise profunda de waterfall
Ahrefs / SEMrush	Backlinks, keywords (opcional)
Screaming Frog	Crawl técnico (opcional)
Cadência de monitoramento
Frequência	Tarefa
A cada PR	Lighthouse CI + axe-core + e2e
Semanal	Search Console → Impressões, erros de cobertura
Mensal	Rich Results Test + Core Web Vitals reais
Trimestral	Auditoria completa (Screaming Frog + Ahrefs)
Alertas automáticos
GitHub Actions quebra o build se Lighthouse < 95

Dependabot abre PR se libs tiverem CVE

Search Console envia e-mail em erros críticos de indexação

16. Checklist de entrega
Meta tags
☑ <title> único e descritivo (60–70 caracteres)
☑ <meta name="description"> com CTA (150–160 caracteres)
☑ <link rel="canonical"> absoluto e HTTPS
☑ <meta name="robots"> com index, follow
☑ <meta name="viewport"> mobile-first
☑ <meta name="theme-color"> para barra mobile
☑ <meta name="author"> para E-E-A-T
☑ <html lang="pt-BR">
☑ <meta name="referrer"> configurado
Open Graph / Twitter
☑ og:type, og:title, og:description, og:image, og:url
☑ og:image em 1200×630 com og:image:alt
☑ twitter:card = summary_large_image
☑ Preview validado em WhatsApp / Facebook / LinkedIn
Dados estruturados
☑ JSON-LD Event com startDate, endDate, location, offers
☑ Validado no Rich Results Test
☑ Sem erros no Schema Markup Validator
Estrutura semântica
☑ Um único <h1> por página
☑ Hierarquia de headings sem saltos
☑ Landmarks: header, main, footer, nav
☑ <section> com aria-labelledby
☑ <ol> para conteúdo cronológico
☑ <dl> para pares chave/valor
☑ Textos âncora descritivos
Indexação
☑ robots.txt com sitemap declarado
☑ sitemap.xml válido e atualizado
☑ URLs canônicas consistentes
☑ HTTPS + redirecionamento 301
☑ Sem conteúdo duplicado
Imagens
☑ alt em todas as imagens informativas
☑ alt="" + aria-hidden em decorativas
☑ width e height explícitos
☑ loading="lazy" abaixo da dobra
☑ fetchpriority="high" no hero
☑ Formatos modernos (SVG / WebP / AVIF)
☑ Nomes de arquivo descritivos
Performance
☑ LCP < 2,5s
☑ INP < 200ms
☑ CLS < 0,1
☑ Lighthouse Performance ≥ 95
☑ Fontes com font-display: swap
☑ CSS crítico inline
☑ Service Worker para cache
Mobile
☑ Viewport correto
☑ Alvos de toque ≥ 44×44 px
☑ Sem scroll horizontal
☑ Texto ≥ 16px
☑ Formulário com inputmode correto
Acessibilidade
☑ Contraste ≥ 4,5:1
☑ Foco visível em todos os interativos
☑ Skip link no topo
☑ prefers-reduced-motion respeitado
☑ forced-colors suportado
☑ axe-core sem violações
Monitoramento
☑ Lighthouse CI no GitHub Actions
☑ Sitemap submetido ao Search Console
☑ Rich Results monitorado
☑ Dependabot ativo
17. Referências
Documentação oficial
Google Search Central — https://developers.google.com/search

Search Essentials — https://developers.google.com/search/docs/essentials

Core Web Vitals — https://web.dev/vitals/

Schema.org Event — https://schema.org/Event

Open Graph Protocol — https://ogp.me/

WCAG 2.2 — https://www.w3.org/TR/WCAG22/

Guias recomendados
web.dev — https://web.dev/

MDN Web Docs — SEO — https://developer.mozilla.org/en-US/docs/Glossary/SEO

Lighthouse — https://developer.chrome.com/docs/lighthouse/

Ahrefs Blog — https://ahrefs.com/blog/

Moz Beginner's Guide to SEO — https://moz.com/beginners-guide-to-seo

Ferramentas
Rich Results Test — https://search.google.com/test/rich-results

PageSpeed Insights — https://pagespeed.web.dev/

Schema Markup Validator — https://validator.schema.org/

Facebook Debugger — https://developers.facebook.com/tools/debug/

WebPageTest — https://www.webpagetest.org/

📎 Anexos
A. Exemplo completo de <head> otimizado
html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="color-scheme" content="dark" />
  <meta name="theme-color" content="#0c0918" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />

  <title>Aniversário de [SEU NOME] · 15 de Agosto de 2027</title>
  <meta name="description" content="Convite digital para o aniversário de [SEU NOME] — 15 de agosto de 2027, às 19h, no Espaço Villa Jardim. Confirme sua presença!" />
  <meta name="author" content="[SEU NOME]" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="https://exemplo.com/" />

  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:site_name" content="Aniversário de [SEU NOME]" />
  <meta property="og:title" content="Aniversário de [SEU NOME] · 15 de Agosto de 2027" />
  <meta property="og:description" content="Você é meu convidado especial. Confirme sua presença até 01/08/2027." />
  <meta property="og:image" content="https://exemplo.com/og-cover.jpg" />
  <meta property="og:image:secure_url" content="https://exemplo.com/og-cover.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Convite para o aniversário de [SEU NOME]" />
  <meta property="og:url" content="https://exemplo.com/" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Aniversário de [SEU NOME] · 15 de Agosto de 2027" />
  <meta name="twitter:description" content="Você é meu convidado especial. Confirme sua presença até 01/08/2027." />
  <meta name="twitter:image" content="https://exemplo.com/og-cover.jpg" />
  <meta name="twitter:image:alt" content="Convite para o aniversário de [SEU NOME]" />

  <link rel="manifest" href="/manifest.webmanifest" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="canonical" href="https://exemplo.com/" />
  <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet" />

  <script type="application/ld+json">{ /* ... Event schema ... */ }</script>
</head>
B. Como testar tudo localmente
bash
# Build de produção
npm run build

# Pré-visualizar com headers corretos
npm run preview

# Auditoria Lighthouse completa
npm run lighthouse

# Testes de acessibilidade
npm run test:a11y

# Validação de Schema.org
# → copiar o JSON-LD e colar em validator.schema.org

# Preview de compartilhamento social
# → usar URL de produção no Facebook Debugger
Última atualização: 2026-09-29
Responsável: [Uálace Brito]
Revisão: anual ou a cada mudança significativa na arquitetura
```

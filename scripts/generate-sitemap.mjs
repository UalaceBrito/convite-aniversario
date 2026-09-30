import { writeFile } from 'node:fs/promises';

const SITE = process.env.SITE_URL ?? 'https://exemplo.com';
const ROUTES = ['/'];
const today = new Date().toISOString().slice(0, 10);

const urls = ROUTES.map(
  (path) => `  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile('public/sitemap.xml', xml, 'utf8');
console.info('[generate-sitemap] public/sitemap.xml');

import { readFile, writeFile } from 'node:fs/promises';

const CRITICAL = [
  'src/css/base/_reset.css',
  'src/css/base/_tokens.css',
  'src/css/base/_typography.css',
  'src/css/layout/_container.css',
  'src/css/layout/_header.css',
  'src/css/sections/_hero.css',
];

const content = (await Promise.all(CRITICAL.map((p) => readFile(p, 'utf8')))).join('\n');

await writeFile('dist/critical.css', content, 'utf8');
console.info('[inline-critical-css] dist/critical.css gerado.');

import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const INPUT = 'src/assets/images';
const OUTPUT = 'dist/images';
const SIZES = [320, 640, 960, 1280];
const FORMATS = ['webp', 'avif'];

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch {
    /* noop */
  }
}

async function listImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await listImages(full)));
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

async function optimize() {
  await ensureDir(OUTPUT);
  const files = await listImages(INPUT);
  if (!files.length) {
    console.warn('[optimize-images] Nenhuma imagem encontrada.');
    return;
  }

  for (const file of files) {
    const base = basename(file, extname(file));
    const image = sharp(file);
    const meta = await image.metadata();

    for (const size of SIZES) {
      if (meta.width && meta.width < size) continue;
      for (const fmt of FORMATS) {
        const out = join(OUTPUT, `${base}-${size}.${fmt}`);
        await image
          .clone()
          .resize({ width: size, withoutEnlargement: true })
          [fmt]({ quality: 78 })
          .toFile(out);
      }
    }
    console.info(`[optimize-images] ✓ ${base}`);
  }

  const stats = await stat(OUTPUT);
  console.info(`[optimize-images] Output: ${OUTPUT} (${stats.size} bytes)`);
}

optimize().catch((err) => {
  console.error('[optimize-images] Erro:', err);
  process.exit(1);
});

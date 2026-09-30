import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: true,
    minify: 'esbuild',
    target: 'es2020',
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? '';
          const ext = name.split('.').pop() ?? '';
          if (/\.(woff2?|ttf|otf|eot)$/i.test(name)) return 'fonts/[name]-[hash][extname]';
          if (/\.(png|jpe?g|svg|webp|avif|gif|ico)$/i.test(name))
            return 'images/[name]-[hash][extname]';
          if (ext === 'css') return 'css/[name]-[hash][extname]';
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
  },
  css: {
    devSourcemap: true,
  },
  server: {
    port: 5173,
    open: true,
    host: true,
  },
  preview: {
    port: 4173,
    open: true,
  },
});

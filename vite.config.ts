import { defineConfig } from 'vite';
import devServer from '@hono/vite-dev-server';
import build from '@hono/vite-build/cloudflare-pages';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    devServer({
      entry: 'src/index.tsx'
    }),
    build({
      entry: 'src/index.tsx',
      outputDir: './dist',
      minify: true
    })
  ],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      input: mode === 'client' ? {
        client: './src/client.tsx'
      } : undefined,
      output: mode === 'client' ? {
        dir: './dist/static',
        format: 'es',
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]'
      } : undefined
    }
  }
}));

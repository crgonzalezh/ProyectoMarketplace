import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    // 🔹 Agregar esta opción para copiar `_redirects` a `dist/`
    copyPublicDir: false
  },
  server: {
    host: true,
  }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: "./", // Asegura rutas relativas para despliegue en Vercel
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    host: true,
    port: 5173, // Puerto por defecto de Vite
  },
  define: {
    'process.env': {} // Previene errores con algunas dependencias en Vercel
  }
});


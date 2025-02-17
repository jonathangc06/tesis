import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../myproject/static',  // El directorio donde se colocarán los archivos para Django
    emptyOutDir: true,  // Elimina el contenido de la carpeta de salida antes de construir
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8000',  // Si necesitas hacer peticiones a tu API de Django
    },
  },
});
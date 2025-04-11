import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // 👈 IMPORTANT for Azure to serve index.html on refresh
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});

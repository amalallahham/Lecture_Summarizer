import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'


export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // instead of Laravel's public/build
    emptyOutDir: true,
  },
});


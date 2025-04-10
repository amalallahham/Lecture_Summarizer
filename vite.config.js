import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..');

export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    outDir: '../Php_Project/public/build', // Laravel's public path
    emptyOutDir: true,
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'resources/js/app.jsx'),
        styles: resolve(__dirname, 'resources/css/app.css'),
      }
    },
  },
})

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 5173,
    strictPort: false,
    middlewareMode: false
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: true
  },
  preview: {
    port: 5173
  }
})

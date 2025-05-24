import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false,
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  base: '/stoneframe-app/', // Add this for GitHub Pages deployment
})
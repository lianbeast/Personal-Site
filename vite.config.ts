import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base must match the GitHub Pages repo name (https://<user>.github.io/Personal-Site/)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Personal-Site/',
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.VITE_BASE ?? (repo ? `/${repo}/` : '/')

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
})

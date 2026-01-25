import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // Set base to './' for relative paths, or change to '/REPO_NAME/' for GitHub Pages
  // base: '/your-repo-name/',
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // or specify a sub-path like '/my-app/' if deploying to a subdirectory
  publicDir: 'public', // default is 'public', change if needed

  build: {
    sourcemap: true, // generates source maps for debugging
  },

  server: {
    open: true, // automatically opens browser on server start
  },
})

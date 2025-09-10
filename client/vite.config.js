iimport { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',        // ensure vite sees index.html in client/
  build: {
    outDir: 'dist',
  },
})

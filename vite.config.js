import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  //remove later
  server: {
    port: 5174  //remove when in production!!
  },
  //-------------------

  build: {
    // Configuration options for the production build
    minify: 'esbuild', // or 'terser' if you need more complex minifications
    sourcemap: false, // Consider turning off source maps for production
    // More options...
  }

})

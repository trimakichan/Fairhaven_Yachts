import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  //remove later
  // server: {
  //   port: 5174  //remove when in production!!
  // },

  //-------------------

  server: {

    //change here before production?
    proxy: {
      // Proxying API requests
      '/api': {
        target: 'https://api.boats.com', // Target API
        changeOrigin: true,  // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''),  // Rewrite path removing '/api'
      }
    }
  },

  build: {
    // Configuration options for the production build
    minify: 'esbuild', // or 'terser' if you need more complex minifications
    sourcemap: false, // Consider turning off source maps for production
    // More options...
  }

})

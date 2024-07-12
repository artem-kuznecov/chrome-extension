import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  build: {
    rollupOptions: {
      output: {
        dir: 'dist/',
        entryFileNames: 'assets/index.js',
        assetFileNames: 'assets/styles.css'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/theme/_helpers.scss";
        `
      }
    }
  }
})

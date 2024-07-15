import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default ({ mode }: { mode: string }) => {
  return defineConfig({
    plugins: [
      react(),
      svgr()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    build: {
      terserOptions: {
        compress: {
          drop_console: mode === 'prod' // * Убирать console.log в проде
        }
      },
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
}

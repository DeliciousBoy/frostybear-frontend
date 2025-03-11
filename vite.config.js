import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), 
    vue(), 
    vueDevTools()],
    css: {
      preprocessorOptions: {
        css: {
          // การใช้ font-awesome ในโปรเจค
          additionalData: `@import 'font-awesome/css/font-awesome.min.css';`
        }
      }
    },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
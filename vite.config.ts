import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 12345,
    open: true,
  },
  resolve: {
    alias: {
      // 2. 配置 @ 指向 src 目录
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue(), tailwindcss()],
})

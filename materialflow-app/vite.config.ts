import { defineConfig } from 'vite'
import { resolve } from 'path';   // pnpm install @types/node
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {  // 配置快捷路径
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})

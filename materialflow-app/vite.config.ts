import { defineConfig } from 'vite'
import { resolve } from 'path';   // pnpm install @types/node
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {  // 配置快捷路径
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})

import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuesetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 读取环境
  const env = loadEnv(mode, process.cwd())
  return {
    base: './',
    plugins: [vue(), vuesetupExtend()],
    server: {
      // 设置端口号为8080
      port: 8080,
      // 启动项目时，自动打开浏览器
      open: true,
      proxy: {
        // '/api': {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), '')
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})

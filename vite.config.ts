import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import { createVitePlugins } from './config/vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const viteEnv = loadEnv(mode, process.cwd()) as ViteEnv
  const {VITE_PUBLIC_PATH,VITE_PORT} = viteEnv
  return {
    // 部署生产环境和开发环境下的URL。
    base: VITE_PUBLIC_PATH === 'production' ? '/' : '/',
    plugins: createVitePlugins(viteEnv, command === 'build'),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },    
    server: {
      host: true,
      port: VITE_PORT,
    },
    css: {}
  }
})

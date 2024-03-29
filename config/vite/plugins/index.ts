import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { configSvgIconsPlugin } from './svgIcons'
import { configUnocssPlugin } from './unocss'
import { createAutoImportPlugin } from './autoImport'
import { createComponentsPlugin } from './component'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [vue()]
  // auto import 自动导入插件
  vitePlugins.push(createAutoImportPlugin())
  // components 按需引入组件
  vitePlugins.push(createComponentsPlugin())
  // svg icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))
  // unocss
  vitePlugins.push(configUnocssPlugin())

  return vitePlugins
}

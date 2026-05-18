import 'vite-ssg'
import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import {injectSeoIntoHtml, localeFromRoute} from './src/config/seoHead'

// https://vite.dev/config/
export default defineConfig(({mode}) => ({
  plugins: [
    vue(),
    mode === 'development' ? vueDevTools() : undefined,
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    dirStyle: 'nested',
    mock: true,
    concurrency: 1,
    includedRoutes: () => ['/en', '/fr', '/es'],
    onPageRendered(route, html) {
      const locale = localeFromRoute(route)
      return locale ? injectSeoIntoHtml(html, locale) : html
    },
  },
}))

import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    solid({
      solid: {
        generate: 'universal',
        moduleName: '@solidtv/solid',
      },
    }),
  ],
  resolve: {
    dedupe: ['solid-js', '@solidtv/renderer'],
  },
  optimizeDeps: {
    exclude: [
      '@solidtv/solid',
      '@solidtv/solid/primitives',
      '@solidtv/solid/primitives/router',
    ],
  },
})

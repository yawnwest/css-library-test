import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      root: 'playground',
    }
  }

  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'YawnwestCssProjectTest',
        fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
        formats: ['es', 'cjs'],
      },
      sourcemap: true,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: () => 'style.css',
        },
      },
    },
  }
})

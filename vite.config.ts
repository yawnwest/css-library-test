import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ mode }) => ({
  root: mode === 'playground' ? 'playground' : undefined,
  base: mode === 'playground' ? '/css-library-test/' : '/',
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir:
      mode === 'playground' ? resolve(__dirname, 'dist-playground') : resolve(__dirname, 'dist'),
    emptyOutDir: true,
    ...(mode !== 'playground' && {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'YawnwestCssLibraryTest',
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
    }),
  },
}))

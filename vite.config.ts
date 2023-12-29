import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'

function importCssPlugin() {
  return {
    name: 'import-css',
    writeBundle() {
      const outFile = resolve(__dirname, 'dist/index.mjs')
      const code = readFileSync(outFile, 'utf-8')
      const newCode = `import "./style.css"\n${code}`
      writeFileSync(outFile, newCode)
    },
  }
}

export default defineConfig({
  plugins: [importCssPlugin()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyLib',
      fileName: 'index',
      formats: ['es'],
    },
    sourcemap: true,
    minify: true,
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
})

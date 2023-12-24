import esbuild from 'esbuild'
import fs from 'fs'
import path from 'path'

function importCss() {
  return {
    name: 'import-css',
    setup(build: esbuild.PluginBuild) {
      build.onEnd(async () => {
        const outFile = './dist/index.js'

        let content = fs.readFileSync(outFile).toString()
        content = `import"./index.css";${content}`

        fs.promises.writeFile(outFile, content)
      })
    },
  }
}

const context = await esbuild.context({
  bundle: true,
  external: ['react'],
  minify: true,
  entryPoints: [path.resolve(import.meta.dir, './src/index.ts')],
  outfile: path.resolve(import.meta.dir, './dist/index.js'),
  format: 'esm',
  plugins: [importCss()],
})

await context.rebuild()

await context.dispose()

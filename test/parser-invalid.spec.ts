import * as assert from 'assert'
import * as fs from 'fs'
import glob = require('glob')
import * as path from 'path'
import { Parser } from '../src'

const parser = new Parser()

const testsPath = path.join(__dirname, 'resource', 'invalid')

function cleanup (data : any) {
  return JSON.parse(JSON.stringify(data))
}

glob('./**/*.ftl', { cwd: testsPath, nodir: true, absolute: true }, (e : Error | null, files : string[]) => {
  if (e) {
    throw e
  }
  for (const file of files) {
    describe(file, () => {
      const dirname = path.dirname(file)
      const basename = path.basename(file).replace(path.extname(file), '')

      const template = fs.readFileSync(file, 'utf8')
      const data = parser.parse(template)

      it('should have errors', () => {
        if (!data.ast.errors) {
          assert.fail('This test should have an error')
        }
      })

      it('should have correct tokens', () => {
        const code = JSON.parse(fs.readFileSync(path.join(dirname, `${basename}-tokens.json`), 'utf8'))
        assert.deepStrictEqual(cleanup(data.tokens), code, 'tokens do not match')
      })

      it('should have correct ast', () => {
        const code = JSON.parse(fs.readFileSync(path.join(dirname, `${basename}-ast.json`), 'utf8'))
        assert.deepStrictEqual(cleanup(data.ast), code, 'ast do not match')
      })
    })
  }
})

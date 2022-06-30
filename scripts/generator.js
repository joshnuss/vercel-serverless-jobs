import glob from 'tiny-glob'
import fs from 'fs'
import path from 'path'

const rootDir = 'jobs'
const files = await glob(`${rootDir}/*`)

files.forEach(async file => {
  const functionName = path.basename(file.replace(/^jobs\//g, ''), '.js')
  const functionPath = path.join(`api/${functionName}.js`)

  const source = `
// generated from ${file}
import { wrap } from '../wrapper.js'
import handler from '../${file}'

export default wrap(handler)
`
  await fs.promises.writeFile(functionPath, source, 'utf8')
})

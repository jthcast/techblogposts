import * as fs from 'fs'
import { promisify } from 'util'

import { cleanUpDirectory, makeDirectoryIfNotExists, prettify } from './utils'

const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)
const readDir = promisify(fs.readdir)
const touchFile = promisify(fs.writeFile)

const rootDirPath = '.'
const assetsDirPath = `${rootDirPath}/assets`
const imagesDirPath = `${rootDirPath}/assets/images`
const lottiesDirPath = `${rootDirPath}/assets/lotties`
const iconDirPath = `${rootDirPath}/components/atom/Icon`
const iconsDirPath = `${rootDirPath}/components/atom/Icon/Icons`

let imgIndexString = ''
let iconIndexString = ''
let imageFileCount = 0
let lottieFileCount = 0
let componentFileCount = 0

function convert(str: string, convertType?: string): string {
  const regexp =
    convertType === 'pascal' ? /(^|_)([a-zA-Z]|[0-9])/g : /(_)([a-zA-Z]|[0-9])/g

  return str.replace(regexp, (_, __, char) => char.toUpperCase())
}

function createComponentFileText(
  iconFileName: string,
  componentName: string,
  content: string,
) {
  return `
import { SVGProps } from 'react';

export default function ${componentName}({ ...props }: SVGProps<SVGSVGElement>) {
  return (
      ${content}
  );
};
`.trim()
}

async function convertFiles() {
  const files = await readDir(imagesDirPath)

  for (const file of files) {
    const fileName = file.split('/').pop()

    if (!fileName) continue

    const fileExtension = fileName.split('.').pop()
    const fileExtensionRegex = new RegExp(`^${fileExtension}$`, 'i')

    if (!fileExtensionRegex.test('svg')) continue

    const fileContent = await readFile(`${imagesDirPath}/${file}`, 'utf-8')
    const content = fileContent
      .replaceAll('clip-path', 'clipPath')
      .replace('">', '"data-icon { ...props }>')
    const fileNameSnake = fileName.replace(/\.[^/.]+$/, '')
    const fileNamePascal = convert(fileNameSnake, 'pascal')
    const componentFileText = createComponentFileText(
      fileName,
      fileNamePascal,
      content,
    )

    await touchFile(`${iconsDirPath}/${fileNamePascal}.tsx`, componentFileText)

    iconIndexString += `export { default as ${fileNamePascal} } from './Icons/${fileNamePascal}';\n`
    componentFileCount++
    imageFileCount++
  }

  const lottieFiles = await readDir(lottiesDirPath)

  for (const file of lottieFiles) {
    const fileName = file.split('/').pop()

    if (!fileName) return
    const fileNameCamel = convert(fileName.replace(/\.[^/.]+$/, ''))

    imgIndexString += `export { default as ${fileNameCamel} } from './lotties/${fileName}';\n`
    lottieFileCount++
  }

  await writeFile(`${assetsDirPath}/index.ts`, imgIndexString)
  await writeFile(`${iconDirPath}/index.ts`, iconIndexString)
}

async function checkDirs() {
  await makeDirectoryIfNotExists(imagesDirPath, { recursive: true })
  await makeDirectoryIfNotExists(lottiesDirPath, { recursive: true })
  await makeDirectoryIfNotExists(iconDirPath, { recursive: true })
  await cleanUpDirectory(iconsDirPath, { recursive: true, force: true })
  await makeDirectoryIfNotExists(iconsDirPath, { recursive: true })
}

async function makeAssets() {
  try {
    await checkDirs()
    await convertFiles()
    await prettify(
      `${rootDirPath}/components/atom/Icon/* ${rootDirPath}/assets/index.ts`,
    )
    // eslint-disable-next-line no-console
    console.log(` 
\u001B[1m\u001B[32m[ADDED]\u001B[39m\u001B[22m Assets are added successfully!
  - images : ${imageFileCount}
  - components : ${componentFileCount}
  - lotties: ${lottieFileCount}
    `)
  } catch (error) {
    console.error(error)
  }
}

makeAssets()

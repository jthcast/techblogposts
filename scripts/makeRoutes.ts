import { readdir, writeFile } from 'fs/promises'

import { makeDirectoryIfNotExists, prettify } from './utils'

const dirPath = 'constants'
const fileName = 'routes.ts'

let routesCount = 0

async function getRoutes(dir: string) {
  const dirents = await readdir(dir, { withFileTypes: true, recursive: true })
  const routes = dirents.reduce<{ [key: string]: string }>(
    (acc, { name, path }) => {
      if (name === 'page.tsx') {
        const plainPath = path.replace(dir, '') || '/'
        const routePath = plainPath.replace(/\[([^[\]]+)\]/g, ':$1')
        const localedRemovedPath = routePath
          .replace(':locale/', '')
          .replace(':locale', '')
        const routeName =
          localedRemovedPath === '/'
            ? 'root'
            : localedRemovedPath
                .replaceAll(':', '')
                .replace(/\/([^/])/g, (_, capture) => capture.toUpperCase())
                .replace(/^./, (match) => match.toLowerCase())

        acc[routeName] = localedRemovedPath
      }

      return acc
    },
    {},
  )

  return routes
}

async function checkDirs(dirPath: string) {
  await makeDirectoryIfNotExists(dirPath, { recursive: true })
}

async function writeRoutesFile(rootDirPath: string) {
  const routes = await getRoutes(`app`)
  const routesString = `export const routes = ${JSON.stringify(
    routes,
  )} as const`

  routesCount = Object.keys(routes).length

  await writeFile(`${rootDirPath}${dirPath}/${fileName}`, routesString)
}

async function makeRoutes() {
  const rootDirPaths = ['']

  for (const rootDirPath of rootDirPaths) {
    const root = rootDirPath ? `${rootDirPath}/` : ''

    try {
      await checkDirs(`${root}${dirPath}`)
      await writeRoutesFile(root)
      await prettify(`${root}${dirPath}/${fileName}`)
      // eslint-disable-next-line no-console
      console.log(` 
  \u001B[1m\u001B[32m[ADDED]\u001B[39m\u001B[22m Routes are added successfully!
    - rootDirPath: ${rootDirPath}
    - routes : ${routesCount}개
      `)
      routesCount = 0
    } catch (error) {
      console.error(error)
    }
  }
}

makeRoutes()

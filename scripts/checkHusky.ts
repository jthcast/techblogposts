import { exec } from 'child_process'
import { promisify } from 'util'

import { checkFile } from './utils'

const execute = promisify(exec)

const huskyShFilePath = '.husky/_/husky.sh'

/* eslint-disable no-console */
export async function checkHusky() {
  await checkFile({
    path: huskyShFilePath,
    onSuccess: () => {
      console.log(` 
\u001B[1m\u001B[32m[PASSED]\u001B[39m\u001B[22m husky is already installed!
    `)
    },
    onError: async () => {
      console.log(` 
\u001B[1m\u001B[33m[NOT FOUND]\u001B[39m\u001B[22m husky is not installed!
\u001B[1m\u001B[32m[INSTALL]\u001B[39m\u001B[22m husky is installing...
    `)
      await execute(`
    #!/bin/bash
    pnpm husky install
  `)
      await checkFile({
        path: huskyShFilePath,
        onSuccess: () => {
          console.log(` 
\u001B[1m\u001B[32m[INSTALLED]\u001B[39m\u001B[22m husky is installed successfully!
    `)
        },
        onError: () => {
          console.log(` 
\u001B[1m\u001B[31m[ERROR]\u001B[39m\u001B[22m husky is not installed due to an unknown error!
    `)
        },
      })
    },
  })
}

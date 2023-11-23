import { exec } from 'child_process'
import { access, constants } from 'fs'
import { resolve } from 'path'

export default function checkHusky() {
  const husky = resolve('./.husky/_/husky.sh')

  access(husky, constants.F_OK, (err) => {
    if (err) {
      console.log(
        `\u001B[1m\u001B[31m[FAILED]\u001B[39m\u001B[22m Husky is not installed!`,
      )
      console.log(
        `\u001B[1m\u001B[33m[INSTALL]\u001B[39m\u001B[22m Husky is installing...`,
      )

      exec('pnpm husky install', (error, stdout, stderr) => {
        if (error) {
          return console.log(error.message)
        }
        if (stderr) {
          return console.log(stderr)
        }
        console.log(stdout)
      })

      if (husky) {
        console.log(
          `\u001B[1m\u001B[32m[SUCCESS]\u001B[39m\u001B[22m Husky is installed successfully!`,
        )
      } else {
        console.log(
          `\u001B[1m\u001B[31m[FAILED]\u001B[39m\u001B[22m fail to install Husky!`,
        )
      }
    } else {
      console.log(
        `\u001B[1m\u001B[32m[PASSED]\u001B[39m\u001B[22m Husky is already installed!`,
      )
    }
  })
}

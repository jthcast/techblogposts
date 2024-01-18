import { exec } from 'child_process'
import { mkdir, access, rm } from 'fs/promises'
import { PathLike } from 'node:fs'
import { promisify } from 'util'

import type { MakeDirectoryOptions, RmOptions } from 'fs'

const execute = promisify(exec)

interface CheckFileParams {
  path: PathLike
  onSuccess?: () => void
  onError?: (e: unknown) => void
}

export async function checkFile({ path, onSuccess, onError }: CheckFileParams) {
  try {
    await access(path)
    onSuccess?.()
  } catch (e) {
    onError?.(e)
  }
}

export async function makeDirectoryIfNotExists(
  path: string,
  options?: MakeDirectoryOptions,
) {
  try {
    await access(path)
  } catch (e) {
    await mkdir(path, options)
  }
}

export async function cleanUpDirectory(path: string, options?: RmOptions) {
  try {
    await rm(path, options)
  } catch (e) {
    console.error(e)
  }
}

export async function prettify(path: string) {
  await execute(`
    #!/bin/bash
    prettier --write ${path}
  `)
}

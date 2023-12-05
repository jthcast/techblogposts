const protocol = process.env.NEXT_PUBLIC_API_PROTOCOL
const host = process.env.NEXT_PUBLIC_API_HOST
const port = process.env.NEXT_PUBLIC_API_PORT

type ApiVersion = 'v1'
type SearchParamsType = Record<string, string | number | undefined>
type RequestURLConfigType =
  | {
      version: ApiVersion
      path: string
      params?: SearchParamsType
    }
  | { url: string }

export interface CustomError {
  code?: number
  err?: string
}

export interface CustomFetchError extends Error {
  status?: number
  statusText?: string
  data?: CustomError
}

export const responseInterceptorMap: Map<
  string,
  (response: Response) => Response | Promise<Response>
> = new Map()

export const customFetch = async (
  requestURLConfig: RequestURLConfigType,
  init?: RequestInit,
) => {
  const requestURL = getRequestURL(requestURLConfig)
  let response = await fetch(requestURL, {
    credentials: 'include',
    ...init,
  })

  response = await [...responseInterceptorMap.values()].reduce(
    async (prevResponse, interceptor) => interceptor(await prevResponse),
    Promise.resolve(response),
  )

  if (!response.ok) {
    throw {
      status: response.status,
      statusText: response.statusText,
      data: await response.json(),
    }
  }

  return response
}

export function useInterceptor() {
  return {
    addInterceptor: (
      callback: (response: Response) => Response | Promise<Response>,
    ) => {
      const uuid = self.crypto.randomUUID()

      responseInterceptorMap.set(uuid, callback)

      return uuid
    },
    deleteInterceptor: (id: string) => responseInterceptorMap.delete(id),
  }
}

export const getSearch = (params: SearchParamsType) => {
  const falsyRemovedObject = Object.keys(params).reduce(
    (acc: { [key: string]: string }, key) => {
      const value = params[key]

      if (value) {
        acc[key] = value.toString()
      }

      return acc
    },
    {},
  )

  const searchParams = new URLSearchParams(falsyRemovedObject).toString()

  return searchParams ? `?${searchParams}` : ''
}

export const getRequestURL = (configs: RequestURLConfigType) => {
  if ('url' in configs) {
    return configs.url
  }

  const { version, path, params } = configs

  if (!(protocol && host && port && version && path)) {
    throw new Error()
  }

  return `${protocol}://${host}:${port}/${version}${path}${getSearch(
    params || {},
  )}`
}

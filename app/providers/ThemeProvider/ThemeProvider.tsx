'use client'

import { palette } from '@/app/providers/ThemeProvider/palette'
import { useEffect } from 'react'

export default function ThemeProvider() {
  const setInitialThemeBeforeRendering = `(function() {
    const getInitialTheme = () => {
      const isClient = typeof window !== 'undefined'
  
      if (isClient) {
        const theme = window.localStorage.getItem('theme')
        if (theme) {
          return theme
        }
  
        const isPrefersColorSchemeDark = window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches
        if (isPrefersColorSchemeDark) {
          return 'dark'
        }
  
        return 'light'
      }
    }
    const theme = getInitialTheme()
  
    document.documentElement.style.setProperty(
      'background-color',
      theme === 'light'
        ? ${palette.light.default.white}
        : ${palette.dark.default.black},
    )
  })()`

  const getInitialTheme = () => {
    const theme = window.localStorage.getItem('theme')

    if (theme) {
      return theme
    }

    const isPrefersColorSchemeDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches

    if (isPrefersColorSchemeDark) {
      return 'dark'
    }

    return 'light'
  }

  const setTheme = (event: MediaQueryListEvent) => {
    if (event.matches) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }

  useEffect(() => {
    const initialTheme = getInitialTheme()

    document.documentElement.setAttribute('data-theme', initialTheme)
    document.documentElement.removeAttribute('style')
  }, [])

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

    mediaQueryList.addEventListener('change', setTheme)

    return () => {
      mediaQueryList.removeEventListener('change', setTheme)
    }
  }, [])

  return (
    <script
      defer
      id="theme"
      dangerouslySetInnerHTML={{ __html: setInitialThemeBeforeRendering }}
    ></script>
  )
}

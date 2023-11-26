import { createGlobalTheme } from '@vanilla-extract/css'

export const vars = createGlobalTheme('[data-theme="light"]', {
  colors: {
    backgrounds: {
      default: {
        primary: '#ffffff',
      },
    },
  },
})

export const darkVars = createGlobalTheme('[data-theme="dark"]', vars, {
  colors: {
    backgrounds: {
      default: {
        primary: '#0000000',
      },
    },
  },
})

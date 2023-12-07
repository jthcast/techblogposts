import { palette } from '@/app/providers/ThemeProvider/palette'
import { createGlobalTheme, globalStyle } from '@vanilla-extract/css'

export const vars = createGlobalTheme('[data-theme="light"]', {
  colors: {
    backgrounds: {
      primary: palette.light.default.white,
      secondary: palette.light.default.gray6,
      tertiary: palette.light.default.white,
    },
    groupedBackgrounds: {
      primary: palette.light.default.gray6,
      secondary: palette.light.default.white,
      tertiary: palette.light.default.gray6,
    },
    labels: {
      primary: palette.light.default.black,
      secondary: palette.light.default.arsenic2,
      tertiary: palette.light.default.arsenic4,
      quarternary: palette.light.default.arsenic5,
    },
    fills: {
      primary: palette.light.default.htmlGray2,
      secondary: palette.light.default.htmlGray3,
      tertiary: palette.light.default.htmlGray4,
      quarternary: palette.light.default.htmlGray5,
    },
    separators: {
      opaque: palette.light.default.lavendarGray,
      nonOpaque: palette.light.default.arsenic3,
    },
  },
})

export const darkVars = createGlobalTheme('[data-theme="dark"]', vars, {
  colors: {
    backgrounds: {
      primary: palette.dark.default.black,
      secondary: palette.dark.default.gray6,
      tertiary: palette.dark.default.gray5,
    },
    groupedBackgrounds: {
      primary: palette.dark.default.black,
      secondary: palette.dark.default.gray6,
      tertiary: palette.dark.default.gray5,
    },
    labels: {
      primary: palette.dark.default.white,
      secondary: palette.dark.default.arsenic2,
      tertiary: palette.dark.default.arsenic4,
      quarternary: palette.dark.default.arsenic5,
    },
    fills: {
      primary: palette.dark.default.htmlGray2,
      secondary: palette.dark.default.htmlGray3,
      tertiary: palette.dark.default.htmlGray4,
      quarternary: palette.dark.default.htmlGray5,
    },
    separators: {
      opaque: palette.dark.default.lavendarGray,
      nonOpaque: palette.dark.default.arsenic3,
    },
  },
})

globalStyle('html', {
  boxSizing: 'border-box',
  backgroundColor: vars.colors.backgrounds.primary,
  height: '100%',
})

globalStyle('body', {
  margin: 0,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
})

globalStyle('*, *:before, *:after', {
  boxSizing: 'inherit',
})

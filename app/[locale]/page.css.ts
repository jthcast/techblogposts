import { mediaQuery } from '@/providers/ThemeProvider/queries'
import { style } from '@vanilla-extract/css'

export const section = style({
  maxWidth: '66.667rem',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '0 6rem',
  margin: '2rem auto 2rem auto',

  '@media': {
    [mediaQuery['mobile']]: {
      margin: '1rem auto 1rem auto',
      padding: '0 1.25rem',
    },
    [mediaQuery['tablet']]: {
      margin: '1rem auto 1rem auto',
      padding: '0 3rem',
    },
  },
})

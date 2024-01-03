import { mediaQuery } from '@/providers/ThemeProvider/queries'
import { style } from '@vanilla-extract/css'

export const section = style({
  maxWidth: '66.667rem',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '0 6rem',
  margin: 'auto',
  marginTop: '2rem',

  '@media': {
    [mediaQuery['mobile']]: {
      marginTop: '1rem',
      padding: '0 1.25rem',
    },
    [mediaQuery['tablet']]: {
      padding: '0 3rem',
    },
  },
})

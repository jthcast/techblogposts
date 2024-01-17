import { vars } from '@/app/app.css'
import { mediaQuery } from '@/providers/ThemeProvider/queries'
import { typography } from '@/providers/ThemeProvider/typography'
import { style } from '@vanilla-extract/css'

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  paddingTop: '1.5rem',
  paddingBottom: '3rem',
})

export const section = style({
  maxWidth: '66.667rem',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '0 6rem',
  margin: 'auto',
  gap: '2.5rem',

  '@media': {
    [mediaQuery['mobile']]: {
      padding: '0 1.25rem',
    },
    [mediaQuery['tablet']]: {
      padding: '0 3rem',
    },
  },
})

export const title = style({
  color: vars.colors.labels.primary,
  ...typography.title3.bold,
})

import { vars } from '@/app/app.css'
import { mediaQuery } from '@/providers/ThemeProvider/queries'
import { typography } from '@/providers/ThemeProvider/typography'
import { style } from '@vanilla-extract/css'

export const main = style({
  maxWidth: '66.667rem',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  margin: 'auto',
  padding: '0 6rem',

  '@media': {
    [mediaQuery['mobile']]: {
      padding: '0 1.25rem',
    },
    [mediaQuery['tablet']]: {
      padding: '0 3rem',
    },
  },
})

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  paddingBottom: '10rem',
})

export const title = style({
  textAlign: 'center',
  color: vars.colors.labels.primary,
  ...typography.title1.bold,
})

export const description = style({
  textAlign: 'center',
  color: vars.colors.labels.primary,
  ...typography.body.regular,
})

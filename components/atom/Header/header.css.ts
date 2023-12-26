import { vars } from '@/app/app.css'
import { Z_INDEX } from '@/constants/styles'
import { mediaQuery } from '@/providers/ThemeProvider/queries'
import { typography } from '@/providers/ThemeProvider/typography'
import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  width: '100%',
  padding: '1.5rem 3rem',
  zIndex: Z_INDEX.content,

  '@media': {
    [mediaQuery['mobile']]: {
      padding: '1rem 1.25rem',
    },
    [mediaQuery['tablet']]: {
      padding: '1.5rem 2rem',
    },
  },
})

export const leftContent = style({
  display: 'flex',
  gap: '0.5rem',
  marginRight: 'auto',
  alignItems: 'center',
})

export const rightContent = style({
  display: 'flex',
  gap: '0.5rem',
  marginLeft: 'auto',
  alignItems: 'center',
})

export const logo = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '1.25rem',
  height: '1.25rem',
  marginTop: '0.2rem',

  '@media': {
    [mediaQuery['mobile']]: {
      width: '1rem',
      height: '1rem',
    },
  },
})

export const title = style({
  display: 'flex',
  gap: '0.25rem',
  color: vars.colors.labels.primary,
  ...typography.title3.regular,

  '@media': {
    [mediaQuery['mobile']]: {
      ...typography.headline.regular,
    },
  },
})

import { mediaQuery } from '@/providers/ThemeProvider/queries'
import { style } from '@vanilla-extract/css'
import { typography } from '@/providers/ThemeProvider/typography'
import { vars } from '@/app/app.css'

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  marginTop: '1.5rem',
  marginBottom: '3rem',
})

export const blogsSection = style({
  maxWidth: '66.667rem',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '0 6rem',
  margin: 'auto',
  gap: '3rem',

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
  textAlign: 'center',
  color: vars.colors.labels.primary,
  ...typography.title2.bold,
})

export const blogCount = style({
  color: vars.colors.accents.secondary,
})

export const list = style({
  display: 'grid',
  gap: '2rem',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  alignItems: 'center',
  justifyContent: 'center',
  listStyle: 'none',

  '@media': {
    [mediaQuery['mobile']]: {
      gap: '0.9rem',
      gridTemplateColumns: '1fr 1fr',
    },
    [mediaQuery['tablet']]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  },
})

export const item = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const company = style({
  display: 'grid',
  gap: '0.5rem',
  gridTemplateColumns: '1fr',
  alignItems: 'center',
  justifyItems: 'center',
  width: '100%',
  textAlign: 'center',
})

export const contactSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3rem',
  textAlign: 'center',
  color: vars.colors.labels.primary,
  background: vars.colors.backgrounds.secondary,
})

export const contactTitle = style({
  ...typography.title3.bold,
})

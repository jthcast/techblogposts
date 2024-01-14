import { typography } from '@/providers/ThemeProvider/typography'
import { style } from '@vanilla-extract/css'

export const title = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
  ...typography.title3.regular,
})

export const loginButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
})

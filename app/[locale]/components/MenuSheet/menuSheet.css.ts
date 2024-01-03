import { typography } from '@/providers/ThemeProvider/typography'
import { style } from '@vanilla-extract/css'

export const nav = style({
  marginTop: '1rem',
})

export const list = style({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

export const menuItem = style({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
})

export const footerIcons = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
})

export const footerIcon = style({
  width: '1.5rem',
  height: '1.5rem',
})

export const copyright = style({
  ...typography.caption1.regular,
})

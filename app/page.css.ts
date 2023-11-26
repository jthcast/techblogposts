import { vars } from '@/app/global.css'
import { style } from '@vanilla-extract/css'

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6rem',
  minHeight: '100vh',
  backgroundColor: vars.colors.backgrounds.default.primary,
})

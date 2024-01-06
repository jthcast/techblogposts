import { vars } from '@/app/app.css'
import { style } from '@vanilla-extract/css'

export const wrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100px',
  height: '100px',
  background: vars.colors.backgrounds.secondary,
})

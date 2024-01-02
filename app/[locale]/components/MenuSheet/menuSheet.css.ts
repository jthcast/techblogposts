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

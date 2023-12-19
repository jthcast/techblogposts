import { vars } from '@/app/global.css'
import { style } from '@vanilla-extract/css'

export const anchor = style({
  display: 'inline-flex',
  textDecoration: 'none',

  ':visited': {
    color: vars.colors.labels.secondary,
  },
  ':link': {
    color: vars.colors.labels.primary,
  },
  ':active': {
    color: vars.colors.labels.primary,
  },
})

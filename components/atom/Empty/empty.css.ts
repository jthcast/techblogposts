import { vars } from '@/app/app.css'
import { typography } from '@/providers/ThemeProvider/typography'
import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  padding: '2rem',
  margin: 'auto',
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
})

export const indicator = style({
  width: '10rem',
  height: '10rem',
})

export const title = style({
  ...typography.headline.regular,
})

export const description = style({
  ...typography.subHeadline.regular,
  color: vars.colors.labels.secondary,
})

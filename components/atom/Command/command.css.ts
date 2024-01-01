import { vars } from '@/app/app.css'
import { globalStyle, style } from '@vanilla-extract/css'
import { typography } from '@/providers/ThemeProvider/typography'
import * as animations from '@/libs/vanilla-extract/animation.css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
})

globalStyle(`${root} [cmdk-group-heading]`, {
  paddingTop: '0.375rem',
  paddingBottom: '0.375rem',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
  color: vars.colors.labels.secondary,
  ...typography.caption2.regular,
})

globalStyle(`${root} [cmdk-loading]`, {
  position: 'relative',
})

globalStyle(`${root} [cmdk-loading]:after`, {
  content: '',
  position: 'absolute',
  width: '50%',
  height: '2px',
  bottom: '-1.5px',
  background: `linear-gradient(90deg, transparent 0, ${vars.colors.labels.primary} 50%, transparent 100%)`,
  ...animations.moveRight,
})

export const inputWrapper = style({
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${vars.colors.separators.opaque}`,
  paddingLeft: '0.75rem',
  paddingRight: '0.75rem',
})

export const input = style({
  display: 'flex',
  height: '2.75rem',
  paddingTop: '0.75rem',
  paddingBottom: '0.75rem',
  width: '100%',
  border: 0,
  background: 'transparent',
  outline: 'none',
  color: vars.colors.labels.primary,
  ...typography.footnote.regular,

  '::placeholder': {
    color: vars.colors.labels.secondary,
  },
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
})

export const list = style({
  maxHeight: '300px',
  overflowY: 'auto',
  overflowX: 'hidden',
})

export const empty = style({
  paddingTop: '1.5rem',
  paddingBottom: '1.5rem',
  textAlign: 'center',
  color: vars.colors.labels.secondary,
  ...typography.footnote.regular,
})

export const group = style({
  overflow: 'hidden',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
  paddingTop: '0.25rem',
  paddingBottom: '0.25rem',
  color: vars.colors.labels.secondary,
  ...typography.footnote.regular,
})

export const separator = style({
  height: '1px',
  marginLeft: '-0.25rem',
  marginRight: '-0.25rem',
  background: vars.colors.separators.opaque,
})

export const item = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
  paddingTop: '0.75rem',
  paddingBottom: '0.75rem',
  outline: 'none',
  cursor: 'pointer',
  borderRadius: '8px',
  color: vars.colors.labels.primary,
  ...typography.footnote.regular,

  selectors: {
    '&[aria-selected="true"]': {
      background: vars.colors.groupedBackgrounds.primary,
      color: vars.colors.labels.primary,
    },
    '&[aria-disabled="true"]': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
})

export const shortcut = style({
  marginLeft: 'auto',
  color: vars.colors.labels.secondary,
  ...typography.caption2.regular,
})

import { vars } from '@/app/app.css'
import { Z_INDEX } from '@/constants/styles'
import { style } from '@vanilla-extract/css'
import { typography } from '@/providers/ThemeProvider/typography'
import * as animations from '@/libs/vanilla-extract/animation.css'

export const overlay = style({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: Z_INDEX.overlay,
  backdropFilter: 'blur(4px)',
  background: vars.colors.fills.quarternary,

  selectors: {
    '&[data-state="open"]': {
      ...animations.fadeInAnimation,
    },
    '&[data-state="closed"]': {
      ...animations.fadeOutAnimation,
    },
  },
})

export const content = style({
  display: 'grid',
  position: 'fixed',
  zIndex: Z_INDEX.layout,
  width: '100%',
  maxWidth: '32rem',
  border: `1px solid ${vars.colors.separators.opaque}`,
  gap: '1rem',
  left: '50%',
  top: '50%',
  background: vars.colors.backgrounds.primary,
  transform: 'translate(-50%, -50%)',
  borderRadius: '8px',

  selectors: {
    '&[data-state="open"]': {
      ...animations.fadeInAnimation,
    },
    '&[data-state="closed"]': {
      ...animations.fadeOutAnimation,
    },
  },
})

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '1.5rem 1.5rem 0 1.5rem',
  textAlign: 'center',
})

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '0 1.5rem',
  textAlign: 'center',
})

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '0 1.5rem 1.5rem 1.5rem',
  textAlign: 'center',
})

export const title = style({
  ...typography.title3.bold,
})

export const description = style({
  ...typography.body.regular,
  color: vars.colors.labels.secondary,
})

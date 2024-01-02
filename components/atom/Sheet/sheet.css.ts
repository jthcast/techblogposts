import { vars } from '@/app/app.css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'
import { typography } from '@/providers/ThemeProvider/typography'
import { style } from '@vanilla-extract/css'
import { Z_INDEX } from '@/constants/styles'
import * as animations from '@/libs/vanilla-extract/animation.css'
import { mediaQuery } from '@/providers/ThemeProvider/queries'

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

export const content = recipe({
  base: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    zIndex: Z_INDEX.layout,
    padding: '1.5rem',
    background: vars.colors.backgrounds.primary,
    outline: 'none',
  },
  variants: {
    side: {
      top: {
        top: 0,
        right: 0,
        left: 0,
        borderBottom: `1px solid ${vars.colors.separators.nonOpaque}`,

        selectors: {
          '&[data-state="open"]': {
            ...animations.slideInFromTopAnimation,
          },
          '&[data-state="closed"]': {
            ...animations.slideOutToTopAnimation,
          },
        },
      },
      bottom: {
        bottom: 0,
        right: 0,
        left: 0,
        borderTop: `1px solid ${vars.colors.separators.nonOpaque}`,

        selectors: {
          '&[data-state="open"]': {
            ...animations.slideInFromBottomAnimation,
          },
          '&[data-state="closed"]': {
            ...animations.slideOutToBottomAnimation,
          },
        },
      },
      left: {
        top: 0,
        bottom: 0,
        left: 0,
        height: '100%',
        width: '75%',
        borderRight: `1px solid ${vars.colors.separators.nonOpaque}`,

        selectors: {
          '&[data-state="open"]': {
            ...animations.slideInFromLeftAnimation,
          },
          '&[data-state="closed"]': {
            ...animations.slideOutToLeftAnimation,
          },
        },

        '@media': {
          [mediaQuery['tablet']]: {
            maxWidth: '15rem',
          },
          [mediaQuery['desktop']]: {
            maxWidth: '15rem',
          },
        },
      },
      right: {
        top: 0,
        bottom: 0,
        right: 0,
        height: '100%',
        width: '75%',
        borderLeft: `1px solid ${vars.colors.separators.nonOpaque}`,

        selectors: {
          '&[data-state="open"]': {
            ...animations.slideInFromRightAnimation,
          },
          '&[data-state="closed"]': {
            ...animations.slideOutToRightAnimation,
          },
        },

        '@media': {
          [mediaQuery['tablet']]: {
            maxWidth: '15rem',
          },
          [mediaQuery['desktop']]: {
            maxWidth: '15rem',
          },
        },
      },
    },
  },
  defaultVariants: {
    side: 'left',
  },
})

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '0.5rem',
  textAlign: 'left',
})

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  marginTop: 'auto',
})

export const title = style({
  color: vars.colors.labels.primary,
  ...typography.title3.bold,
})

export const description = style({
  color: vars.colors.labels.secondary,
  ...typography.footnote.regular,
})

export type SheetVariants = RecipeVariants<typeof content>

import { vars } from '@/app/app.css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'
import { typography } from '@/providers/ThemeProvider/typography'

export const button = recipe({
  base: {
    borderRadius: 6,
    border: 0,
    cursor: 'pointer',
    transition: 'all 150ms ease-in',
    ...typography.callout.regular,

    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    ':active': {
      scale: 0.97,
    },
  },
  variants: {
    color: {
      primary: {
        background: vars.colors.accents.primary,
        color: vars.colors.system.white,

        ':hover': {
          background: vars.colors.accents.primary_a90,
        },
        ':active': {
          background: vars.colors.accents.primary_a90,
        },
      },
      secondary: {
        background: vars.colors.accents.secondary,
        color: vars.colors.system.white,

        ':hover': {
          background: vars.colors.accents.secondary_a90,
        },
        ':active': {
          background: vars.colors.accents.secondary_a90,
        },
      },
      tertiary: {
        background: vars.colors.fills.secondary,
        color: vars.colors.labels.primary,

        ':hover': {
          background: vars.colors.fills.primary,
        },
        ':active': {
          background: vars.colors.fills.primary,
        },
      },
    },
    size: {
      small: { padding: '6px 10px' },
      medium: { padding: '10px 16px' },
      large: { padding: '16px 22px' },
    },
    shape: {
      round: { borderRadius: '100%' },
    },
    isOutline: {
      true: {
        background: 'transparent',
        borderWidth: '1px',
        borderStyle: 'solid',
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        color: 'tertiary',
        isOutline: true,
      },
      style: {
        background: 'transparent',
        color: vars.colors.labels.primary,
        borderColor: vars.colors.separators.nonOpaque,
      },
    },
    {
      variants: {
        shape: 'round',
        size: 'small',
      },
      style: {
        padding: '0.75rem',
        lineHeight: 0,
      },
    },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'small',
  },
})

export type ButtonVariants = RecipeVariants<typeof button>

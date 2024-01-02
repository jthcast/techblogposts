import { vars } from '@/app/app.css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'
import { typography } from '@/providers/ThemeProvider/typography'

export const link = recipe({
  base: {
    cursor: 'pointer',
    transition: 'all 150ms ease-in',
    textDecoration: 'none',
    ...typography.callout.regular,

    ':active': {
      scale: 0.97,
    },
  },
  variants: {
    color: {
      primary: {
        color: vars.colors.labels.primary,
      },
      secondary: {
        color: vars.colors.labels.secondary,
      },
      tertiary: {
        color: vars.colors.labels.tertiary,
      },
      accentPrimary: {
        color: vars.colors.accents.primary,

        ':hover': {
          color: vars.colors.accents.primary_a90,
        },
        ':active': {
          color: vars.colors.accents.primary_a90,
        },
      },
    },
    isUnderline: {
      true: {
        textDecoration: 'underline',
      },
    },
    isButton: {
      true: {
        borderRadius: 6,
        border: 0,
        padding: '10px 16px',
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        isButton: true,
        color: 'accentPrimary',
      },
      style: {
        background: vars.colors.accents.primary,
        color: vars.colors.system.white,

        ':hover': {
          background: vars.colors.accents.primary_a90,
          color: vars.colors.system.white,
        },
        ':active': {
          background: vars.colors.accents.primary_a90,
          color: vars.colors.system.white,
        },
      },
    },
  ],
  defaultVariants: {
    color: 'primary',
  },
})

export type LinkVariants = RecipeVariants<typeof link>

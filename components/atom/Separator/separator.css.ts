import { vars } from '@/app/app.css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

export const separator = recipe({
  base: {
    flexShrink: 0,
    background: vars.colors.separators.nonOpaque,
  },
  variants: {
    orientation: {
      horizontal: {
        width: '100%',
        height: '1px',
      },
      vertical: {
        width: '1px',
        height: '100%',
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

export type SeparatorVariants = RecipeVariants<typeof separator>

import * as animations from '@/libs/vanilla-extract/animation.css'
import { vars } from '@/app/app.css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

export const skeleton = recipe({
  base: {
    ...animations.pulseAnimation,
  },
  variants: {
    layout: {
      fill: {
        width: '100%',
        height: '100%',
        background: vars.colors.backgrounds.secondary,
      },
      icon: {
        display: 'flex',

        selectors: {
          '&[data-icon]': {
            background: vars.colors.backgrounds.secondary,
            ...animations.slideInFromRightAnimation,
          },
        },
      },
    },
  },
  defaultVariants: {
    layout: 'fill',
  },
})

export type SkeletonVariants = RecipeVariants<typeof skeleton>

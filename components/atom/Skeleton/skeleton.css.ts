import { style } from '@vanilla-extract/css'
import * as animations from '@/libs/vanilla-extract/animation.css'
import { vars } from '@/app/app.css'

export const skeleton = style({
  width: '100%',
  height: '100%',
  background: vars.colors.backgrounds.secondary,
  ...animations.pulseAnimation,
})

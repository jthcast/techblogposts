import { CSSProperties, keyframes } from '@vanilla-extract/css'

const fadeInOpacity = keyframes({
  '0%': { opacity: 0 },
})

const fadeOutOpacity = keyframes({
  '100%': { opacity: 0 },
})

export const fadeIn: CSSProperties = {
  animationName: fadeInOpacity,
  animationDuration: '0.25s',
}

export const fadeOut: CSSProperties = {
  animationName: fadeOutOpacity,
  animationDuration: '0.25s',
}

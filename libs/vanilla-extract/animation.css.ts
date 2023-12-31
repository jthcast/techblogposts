import { CSSProperties, keyframes } from '@vanilla-extract/css'

const fadeInOpacity = keyframes({
  '0%': { opacity: 0 },
})

const fadeOutOpacity = keyframes({
  '100%': { opacity: 0 },
})

const moveRightTransform = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
  },
  to: {
    transform: 'translateX(300%)',
  },
})

export const fadeIn: CSSProperties = {
  animationName: fadeInOpacity,
  animationDuration: '0.25s',
}

export const fadeOut: CSSProperties = {
  animationName: fadeOutOpacity,
  animationDuration: '0.25s',
}

export const moveRight: CSSProperties = {
  animationName: moveRightTransform,
  animationDuration: '1.1s',
  animationTimingFunction: 'cubic-bezier(.455,.03,.515,.955)',
  animationIterationCount: 'infinite',
}

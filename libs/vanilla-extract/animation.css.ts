import { CSSProperties, keyframes } from '@vanilla-extract/css'

const fadeIn = keyframes({
  '0%': { opacity: 0 },
})

const fadeOut = keyframes({
  '100%': { opacity: 0 },
})

const moveRight = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
  },
  '100%': {
    transform: 'translateX(300%)',
  },
})

const slideInFromTop = keyframes({
  '0%': {
    transform: 'translate3d(0, -100%, 0)',
  },
  '100%': {
    transform: 'translate3d(0, 0, 0)',
  },
})

const slideOutToTop = keyframes({
  '0%': {
    transform: 'translate3d(0, 0, 0)',
  },
  '100%': {
    transform: 'translate3d(0, -100%, 0)',
  },
})

const slideInFromBottom = keyframes({
  '0%': {
    transform: 'translate3d(0, 100%, 0)',
  },
  '100%': {
    transform: 'translate3d(0, 0, 0)',
  },
})

const slideOutToBottom = keyframes({
  '0%': {
    transform: 'translate3d(0, 0, 0)',
  },
  '100%': {
    transform: 'translate3d(0, 100%, 0)',
  },
})

const slideInFromLeft = keyframes({
  '0%': {
    transform: 'translate3d(-100%, 0, 0)',
  },
  '100%': {
    transform: 'translate3d(0, 0, 0)',
  },
})

const slideOutToLeft = keyframes({
  '0%': {
    transform: 'translate3d(0, 0, 0)',
  },
  '100%': {
    transform: 'translate3d(-100%, 0, 0)',
  },
})

const slideInFromRight = keyframes({
  '0%': {
    transform: 'translate3d(100%, 0, 0)',
  },
  '100%': {
    transform: 'translate3d(0, 0, 0)',
  },
})

const slideOutToRight = keyframes({
  '0%': {
    transform: 'translate3d(0, 0, 0)',
  },
  '100%': {
    transform: 'translate3d(100%, 0, 0)',
  },
})

const pulse = keyframes({
  '50%': {
    opacity: '.5',
  },
})

export const fadeInAnimation = {
  animationName: fadeIn,
  animationDuration: '0.25s',
} satisfies CSSProperties

export const fadeOutAnimation = {
  animationName: fadeOut,
  animationDuration: '0.25s',
} satisfies CSSProperties

export const moveRightAnimation = {
  animationName: moveRight,
  animationDuration: '1.1s',
  animationTimingFunction: 'cubic-bezier(.455,.03,.515,.955)',
  animationIterationCount: 'infinite',
} satisfies CSSProperties

export const slideInFromTopAnimation = {
  animationName: slideInFromTop,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
} satisfies CSSProperties

export const slideOutToTopAnimation = {
  animationName: slideOutToTop,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
} satisfies CSSProperties

export const slideInFromBottomAnimation = {
  animationName: slideInFromBottom,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
} satisfies CSSProperties

export const slideOutToBottomAnimation = {
  animationName: slideOutToBottom,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
} satisfies CSSProperties

export const slideInFromLeftAnimation = {
  animationName: slideInFromLeft,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
} satisfies CSSProperties

export const slideOutToLeftAnimation = {
  animationName: slideOutToLeft,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
} satisfies CSSProperties

export const slideInFromRightAnimation = {
  animationName: slideInFromRight,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
} satisfies CSSProperties

export const slideOutToRightAnimation = {
  animationName: slideOutToRight,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
} satisfies CSSProperties

export const pulseAnimation = {
  animationName: pulse,
  animationDuration: '2s',
  animationTimingFunction: 'cubic-bezier(.4,0,.6,1)',
  animationIterationCount: 'infinite',
} satisfies CSSProperties

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

export const fadeInAnimation: CSSProperties = {
  animationName: fadeIn,
  animationDuration: '0.25s',
}

export const fadeOutAnimation: CSSProperties = {
  animationName: fadeOut,
  animationDuration: '0.25s',
}

export const moveRightAnimation: CSSProperties = {
  animationName: moveRight,
  animationDuration: '1.1s',
  animationTimingFunction: 'cubic-bezier(.455,.03,.515,.955)',
  animationIterationCount: 'infinite',
}

export const slideInFromTopAnimation: CSSProperties = {
  animationName: slideInFromTop,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
}

export const slideOutToTopAnimation: CSSProperties = {
  animationName: slideOutToTop,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
}

export const slideInFromBottomAnimation: CSSProperties = {
  animationName: slideInFromBottom,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
}

export const slideOutToBottomAnimation: CSSProperties = {
  animationName: slideOutToBottom,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
}

export const slideInFromLeftAnimation: CSSProperties = {
  animationName: slideInFromLeft,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
}

export const slideOutToLeftAnimation: CSSProperties = {
  animationName: slideOutToLeft,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
}

export const slideInFromRightAnimation: CSSProperties = {
  animationName: slideInFromRight,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
}

export const slideOutToRightAnimation: CSSProperties = {
  animationName: slideOutToRight,
  animationDuration: '.5s',
  animationTimingFunction: 'cubic-bezier(.4,0,.2,1)',
}

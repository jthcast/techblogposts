import { style } from '@vanilla-extract/css'

export const titleLink = style({
  // TODO Button, Link 컴포넌트 만들어서 빼기
  textDecoration: 'none',
})

export const floatingButtonGroup = style({
  position: 'fixed',
  bottom: '16px',
  right: '16px',
})

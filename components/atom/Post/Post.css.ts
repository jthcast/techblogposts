import { vars } from '@/app/global.css'
import { typography } from '@/providers/ThemeProvider/typography'
import { style } from '@vanilla-extract/css'

export const list = style({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
})

export const item = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  padding: '1rem 0',
  borderBottom: `1px solid ${vars.colors.separators.opaque}`,

  selectors: {
    '&:last-child': {
      borderBottom: '0',
    },
  },
})

export const title = style({
  // TODO @ted
  ...typography.headline.regular,
})

export const content = style({
  display: 'flex',
  flexWrap: 'wrap',
  color: vars.colors.labels.secondary,
  alignItems: 'center',
  fontSize: '0.9rem',
})

export const leftContent = style({
  display: 'flex',
  gap: '0.5rem',
  marginRight: 'auto',
  alignItems: 'center',
})

export const rightContent = style({
  display: 'flex',
  gap: '0.5rem',
  marginLeft: 'auto',
  alignItems: 'center',
})

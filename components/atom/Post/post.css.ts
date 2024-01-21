import { vars } from '@/app/app.css'
import { typography } from '@/providers/ThemeProvider/typography'
import { style } from '@vanilla-extract/css'

export const list = style({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
})

export const item = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  width: '100%',

  selectors: {
    '&:last-child': {
      borderBottom: '0',
    },
  },
})

export const title = style({
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
  gap: '0.25rem',
  marginRight: 'auto',
  alignItems: 'center',
})

export const rightContent = style({
  display: 'flex',
  gap: '0.5rem',
  marginLeft: 'auto',
  alignItems: 'center',
})

export const companyIcon = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '1rem',
  height: '1rem',
  marginTop: '0.15rem',
})

export const viewCount = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.2rem',
})

export const bookmarkedIcon = style({
  color: vars.colors.accents.primary,
})

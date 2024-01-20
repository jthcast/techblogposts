import { style } from '@vanilla-extract/css'
import * as pageStyles from '@/app/[locale]/page.css'
import * as postStyles from '@/components/atom/Post/post.css'

export const section = pageStyles.section

export const list = postStyles.list

export const item = postStyles.item

export const content = postStyles.content

export const leftContent = postStyles.leftContent

export const rightContent = postStyles.rightContent

export const title = style({
  height: '1.547rem',
})

export const companyIcon = postStyles.companyIcon

export const company = style({
  height: '1rem',
})

export const time = style({
  width: '2.709rem',
  height: '1rem',
})

export const viewCountIcon = style({
  width: '15px',
  height: '1rem',
})

export const viewCount = style({
  width: '1rem',
  height: '1rem',
})

export const bookmark = style({
  width: '15px',
  height: '1rem',
})

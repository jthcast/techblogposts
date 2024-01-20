import { style } from '@vanilla-extract/css'
import * as pageStyles from '@/app/[locale]/blogs/page.css'
import * as postStyles from '@/components/atom/Post/post.css'

export const main = pageStyles.main

export const section = pageStyles.blogsSection

export const list = pageStyles.list

export const item = pageStyles.item

export const company = pageStyles.company

export const companyIcon = postStyles.companyIcon

export const title = style({
  height: '1rem',
})

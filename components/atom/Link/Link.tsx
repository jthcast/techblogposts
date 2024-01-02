import { LinkVariants } from '@/components/atom/Link/link.css'
import { ComponentProps } from 'react'
import * as styles from '@/components/atom/Link/link.css'
import { default as LinkPrimitive } from 'next/link'

type LinkProps = ComponentProps<typeof LinkPrimitive> & LinkVariants

export function Link({ color, isUnderline, isButton, ...props }: LinkProps) {
  return (
    <LinkPrimitive
      className={styles.link({ color, isUnderline, isButton })}
      {...props}
    />
  )
}

import { AnchorHTMLAttributes } from 'react'
import * as styles from '@/components/atom/ExternalLink/externalLink.css'
import type { ExternalLinkVariants } from '@/components/atom/ExternalLink/externalLink.css'

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ExternalLinkVariants

export function ExternalLink({
  target = '_blank',
  rel = 'norefferer noopener',
  color,
  isUnderline,
  isButton,
  isShowVisited,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      target={target}
      rel={rel}
      className={styles.externalLink({
        color,
        isUnderline,
        isButton,
        isShowVisited,
      })}
      {...props}
    />
  )
}

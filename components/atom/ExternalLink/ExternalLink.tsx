import { AnchorHTMLAttributes } from 'react'
import * as styles from '@/components/atom/ExternalLink/ExternalLink.css'

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export function ExternalLink({
  target = '_blank',
  rel = 'norefferer noopener',
  ...props
}: ExternalLinkProps) {
  return <a target={target} rel={rel} className={styles.anchor} {...props} />
}

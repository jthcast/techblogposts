import * as styles from '@/components/atom/Skeleton/skeleton.css'
import { SkeletonVariants } from '@/components/atom/Skeleton/skeleton.css'
import { HTMLAttributes } from 'react'

type SkeletonProps = HTMLAttributes<HTMLDivElement> & SkeletonVariants

export function Skeleton({ layout, ...props }: SkeletonProps) {
  return <div className={styles.skeleton({ layout })} {...props} />
}

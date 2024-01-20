import * as styles from '@/components/atom/Skeleton/skeleton.css'

export function Skeleton({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={styles.skeleton} {...props} />
}

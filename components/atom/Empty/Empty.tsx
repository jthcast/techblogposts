import { ComponentPropsWithoutRef, HTMLAttributes } from 'react'
import * as styles from '@/components/atom/Empty/empty.css'
import Lottie from '@/components/atom/Lottie/Lottie'
import { empty } from '@/assets'

type EmptyRootProps = HTMLAttributes<HTMLDivElement>

export function Root({ ...props }: EmptyRootProps) {
  return <div className={styles.root} {...props} />
}

type EmptyContentProps = HTMLAttributes<HTMLDivElement>

export function Content({ ...props }: EmptyContentProps) {
  return <div className={styles.content} {...props} />
}

type EmptyIndicatorProps = HTMLAttributes<HTMLDivElement> &
  Omit<ComponentPropsWithoutRef<typeof Lottie>, 'json'>

export function Indicator({ ...props }: EmptyIndicatorProps) {
  return <Lottie json={empty} className={styles.indicator} {...props} />
}

type EmptyTitleProps = HTMLAttributes<HTMLHeadElement>

export function Title({ ...props }: EmptyTitleProps) {
  return <h2 className={styles.title} {...props} />
}

type EmptyDescriptionProps = HTMLAttributes<HTMLParagraphElement>

export function Description({ ...props }: EmptyDescriptionProps) {
  return <p className={styles.description} {...props} />
}

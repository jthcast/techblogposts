import { HTMLAttributes, SVGProps } from 'react'
import * as styles from '@/components/atom/Header/header.css'
import { Logo as LogoIcon } from '@/components/atom/Icon'

type HeaderRootProps = HTMLAttributes<HTMLUListElement>

export function Root({ ...props }: HeaderRootProps) {
  return <header className={styles.root} {...props} />
}

type HeaderLeftContentProps = HTMLAttributes<HTMLDivElement>

export function LeftContent({ ...props }: HeaderLeftContentProps) {
  return <div className={styles.leftContent} {...props} />
}

type HeaderRightContentProps = HTMLAttributes<HTMLDivElement>

export function RightContent({ ...props }: HeaderRightContentProps) {
  return <div className={styles.rightContent} {...props} />
}

type HeaderLogoProps = SVGProps<SVGSVGElement>

export function Logo({ ...props }: HeaderLogoProps) {
  return <LogoIcon className={styles.logo} {...props} />
}

type HeaderTitleProps = HTMLAttributes<HTMLHeadingElement>

export function Title({ ...props }: HeaderTitleProps) {
  return <h1 className={styles.title} {...props} />
}

import { ComponentPropsWithRef, HTMLAttributes } from 'react'
import * as styles from '@/components/atom/Post/Post.css'
import { formatDistanceToNowStrict, formatISO } from 'date-fns'
import { getDateFnsLocale } from '@/libs/date-fns/date-fns'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Eye } from '@/components/atom/Icon'
import { companyIcons } from '@/public/company-icon'

type PostListProps = HTMLAttributes<HTMLUListElement>

export function List({ ...props }: PostListProps) {
  return <ul className={styles.list} {...props} />
}

type PostItemProps = HTMLAttributes<HTMLLIElement>

export function Item({ ...props }: PostItemProps) {
  return <li className={styles.item} {...props} />
}

type PostTitleProps = HTMLAttributes<HTMLParagraphElement>

export function Title({ ...props }: PostTitleProps) {
  return <p className={styles.title} {...props} />
}

type PostContentProps = HTMLAttributes<HTMLDivElement>

export function Content({ ...props }: PostContentProps) {
  return <div className={styles.content} {...props} />
}

type PostLeftContentProps = HTMLAttributes<HTMLDivElement>

export function LeftContent({ ...props }: PostLeftContentProps) {
  return <div className={styles.leftContent} {...props} />
}

type PostRightContentProps = HTMLAttributes<HTMLDivElement>

export function RightContent({ ...props }: PostRightContentProps) {
  return <div className={styles.rightContent} {...props} />
}

type PostCompanyIconProps = Omit<
  ComponentPropsWithRef<typeof Image>,
  'src' | 'alt' | 'fill'
> & {
  company: string
}

export function CompanyIcon({ company, ...props }: PostCompanyIconProps) {
  const icon = companyIcons[company as keyof typeof companyIcons]

  return (
    <>
      {icon && (
        <div className={styles.companyIcon}>
          <Image
            src={`/company-icon/icons/${icon}`}
            fill
            alt={company}
            {...props}
          />
        </div>
      )}
    </>
  )
}

type PostCompanyProps = HTMLAttributes<HTMLDivElement>

export function Company({ children, ...props }: PostCompanyProps) {
  return <span {...props}>{children}</span>
}

type PostTimeProps = HTMLAttributes<HTMLTimeElement> & {
  time: number
}

export function Time({ time, ...props }: PostTimeProps) {
  const { locale } = useParams<{ locale: string }>()

  return (
    <time dateTime={formatISO(time)} {...props}>
      {formatDistanceToNowStrict(time, {
        addSuffix: true,
        locale: getDateFnsLocale({ locale }),
      })}
    </time>
  )
}

type PostViewCountProps = HTMLAttributes<HTMLDivElement>

export function ViewCount({ children, ...props }: PostViewCountProps) {
  return (
    <div className={styles.viewCount} {...props}>
      <Eye />
      {children}
    </div>
  )
}

type PostBookmarkProps = HTMLAttributes<HTMLButtonElement> & {
  id: string
}

export function Bookmark({ ...props }: PostBookmarkProps) {
  const bookmark = () => {
    // TODO
  }

  return (
    <button onClick={bookmark} {...props}>
      icon
    </button>
  )
}

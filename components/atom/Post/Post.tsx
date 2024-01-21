import { ComponentPropsWithRef, HTMLAttributes } from 'react'
import * as styles from '@/components/atom/Post/post.css'
import { formatDistanceToNowStrict, formatISO } from 'date-fns'
import { getDateFnsLocale } from '@/libs/date-fns/date-fns'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Eye, Star, StarFilled } from '@/components/atom/Icon'
import { companyIcons } from '@/public/company-icon'
import { Button } from '@/components/atom/Button/Button'
import {
  deletePostsBookmark,
  postPostsViewCount,
  putPostsBookmark,
} from '@/app/api/v1/posts/posts'
import { useMutation } from '@tanstack/react-query'
import {
  queryClient,
  queryKeys,
} from '@/providers/ReactQueryClientProvider/ReactQueryClientProvider'
import { ExternalLink } from '@/components/atom/ExternalLink/ExternalLink'
import { Skeleton } from '@/components/atom/Skeleton/Skeleton'

type PostListProps = HTMLAttributes<HTMLUListElement>

export function List({ ...props }: PostListProps) {
  return <ul className={styles.list} {...props} />
}

type PostItemProps = HTMLAttributes<HTMLLIElement>

export function Item({ ...props }: PostItemProps) {
  return <li className={styles.item} {...props} />
}

type PostTitleProps = HTMLAttributes<HTMLParagraphElement> & {
  id: string
  title: string
}

export function Title({ id, title, ...props }: PostTitleProps) {
  const { mutate: postsViewCount } = useMutation({
    mutationFn: postPostsViewCount,
  })

  return (
    <ExternalLink
      href={id}
      aria-label={title}
      onClick={() => postsViewCount({ id })}
      onAuxClick={() => postsViewCount({ id })}
      title={title}
      isShowVisited
    >
      <p className={styles.title} {...props} />
    </ExternalLink>
  )
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
            width={18}
            height={18}
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

type PostBookmarkProps = ComponentPropsWithRef<typeof Button> & {
  uid: string
  parent: string
  isBookmarked?: boolean
}

export function Bookmark({
  uid,
  parent,
  isBookmarked,
  ...props
}: PostBookmarkProps) {
  const { mutate: bookmark, isPending: isBookmarkPending } = useMutation({
    mutationFn: putPostsBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.getBookmarks({ uid }),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.getBookmarksPosts({ uid }),
      })
    },
  })

  const { mutate: deleteBookmark, isPending: isDeleteBookmarkPending } =
    useMutation({
      mutationFn: deletePostsBookmark,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.getBookmarks({ uid }),
        })
        queryClient.invalidateQueries({
          queryKey: queryKeys.getBookmarksPosts({ uid }),
        })
      },
    })

  const isPending = isBookmarkPending || isDeleteBookmarkPending

  return (
    <>
      {isPending && (
        <Skeleton layout="icon">
          <StarFilled />
        </Skeleton>
      )}
      {!isPending && (
        <Button color="secondary" isGhost {...props}>
          {!isBookmarked && <Star onClick={() => bookmark({ uid, parent })} />}
          {isBookmarked && (
            <StarFilled
              className={styles.bookmarkedIcon}
              onClick={() => deleteBookmark({ uid, parent })}
            />
          )}
        </Button>
      )}
    </>
  )
}

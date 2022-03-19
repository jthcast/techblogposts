import { useContext, useEffect, useRef, useState } from 'react'
import { css, cx, keyframes } from '@emotion/css'
import globalCss, { rem } from '../styles/global-css'
import Icon from '../components/atoms/Icon'
import { InfiniteScrollContext } from '../context/InfiniteScrollContext'
import useObserver from '../customHooks/useObserver'
import { icons, iconsCtx } from '../lib/utils/icons'
import Image from 'next/image'
import { gtagOutboundEvent } from '../lib/utils/googleAnalytics'
import ErrorSection from '../components/atoms/ErrorSection'
import Button from '../components/atoms/Button'
import { API } from '../lib/utils/api'
import Bookmark from '../components/atoms/Bookmark'
import SEO from '../components/atoms/Seo'

interface PostItem {
  inner_hits: {
    bookmark: {
      hits: {
        total: {
          value: number
        }
      }
    }
  }
  sort: Array<any>
  _source: {
    company: string
    dataType: string
    id: string
    isShow: boolean
    publishDate: number
    title: string
    viewCount: number
  }
}

export default function Home() {
  const [posts, setPosts] = useState<PostItem[]>([])
  const [isLoading, setLoading] = useState(false)
  const [isInit, setInit] = useState(true)
  const [isMorePostLoading, setMorePostLoading] = useState(false)
  const [isInfiniteLoad, setInfiniteLoad] = useContext(InfiniteScrollContext)
  const [sort, setSort] = useState(undefined)
  const [error, setError] = useState<[number, string]>(undefined)

  const getPosts = async () => {
    isInit ? setLoading(true) : setMorePostLoading(true)
    setError(undefined)
    const fetchData = await fetch(`/api/posts${sort ? `?sort=${JSON.stringify(sort)}` : ''}`)
    const result: API = await fetchData.json()
    const { isError, statusCode, message, data } = result
    if (isError) {
      setInit(true)
      setLoading(false)
      setError([statusCode, message])
      return
    }
    setPosts([...posts, ...data])
    setSort(data[data.length - 1]?.sort)
    isInit ? setLoading(false) : setMorePostLoading(false)
  }

  useEffect(() => {
    getPosts()
    setInit(false)
  }, [])

  const infiniteScrollHandling = () => {
    setInfiniteLoad(isInfiniteLoad === 'on' ? 'off' : 'on')
  }

  const morePostsButtonRef = useRef()

  const observer = useObserver({
    callback: (entry) => {
      if (!isMorePostLoading && isInfiniteLoad === 'on' && entry.isIntersecting) {
        getPosts()
      }
    },
    rootMargin: '50%',
    threshold: 0,
  })

  useEffect(() => {
    if (morePostsButtonRef.current) {
      observer([morePostsButtonRef.current])
    }
  }, [morePostsButtonRef.current])

  const clickHandling = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const button = event.button
    if (button === 0 || button === 1) {
      const target = event.currentTarget
      const id = target.getAttribute('href')
      const title = target.getAttribute('aria-label')
      gtagOutboundEvent(id, title)
    }
  }

  return (
    <>
      <SEO title={'기술 블로그 모음'} />
      <section className={cssPosts}>
        {isLoading && (
          <div className={cssLoading}>
            <Icon iconName="spinner" isSpin />
          </div>
        )}
        {!isLoading && !error && posts && posts.length > 0 && (
          <ul className={cssList}>
            {posts.map((post) => {
              const { company, id, publishDate, title, viewCount } = post._source
              const bookmarkCount = post.inner_hits.bookmark.hits.total.value
              const nowDate = new Date()
              const postDate = new Date(publishDate)
              const todayMonth = (nowDate.getMonth() + 1).toString().length === 1 ? `0${nowDate.getMonth() + 1}` : nowDate.getMonth() + 1
              const todayDate = nowDate.getDate().toString().length === 1 ? `0${nowDate.getDate()}` : nowDate.getDate()
              const todayString = `${nowDate.getFullYear()}-${todayMonth}-${todayDate}`
              const today = new Date(todayString)
              const postDateMonth =
                (postDate.getMonth() + 1).toString().length === 1 ? `0${postDate.getMonth() + 1}` : postDate.getMonth() + 1
              const postDateDate = postDate.getDate().toString().length === 1 ? `0${postDate.getDate()}` : postDate.getDate()
              const postDateString = `${postDate.getFullYear()}-${postDateMonth}-${postDateDate}`
              const postDay = new Date(postDateString)
              const dateDiffer = Math.floor((today.getTime() - postDay.getTime()) / 60 / 1000 / 60 / 24)
              const dateDifferString = dateDiffer === 0 ? `오늘` : `${dateDiffer}일 전`

              return (
                <li key={id} className={cssListItem}>
                  <a
                    href={id}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={title}
                    onClick={clickHandling}
                    onAuxClick={clickHandling}
                    title={title}
                  >
                    <p className={cssPostTitle}>{title}</p>
                  </a>
                  <ul className={cssItemDetail}>
                    <li className={cssItemDetailLeft}>
                      {icons[company] && (
                        <div className={cssCompanyIcon}>
                          <Image src={`${iconsCtx}${icons[company]}`} alt={company} layout="fill" />
                        </div>
                      )}
                      {company}
                    </li>
                    <li>
                      <time dateTime={postDate.toISOString()}>{dateDiffer < 8 ? dateDifferString : postDateString}</time>
                    </li>
                    <li>
                      <div className={cssItemDetailItem}>
                        <Icon iconName="eye" />
                        {viewCount}
                      </div>
                    </li>
                    <li>
                      <Bookmark count={bookmarkCount} parent={id} />
                    </li>
                  </ul>
                </li>
              )
            })}
          </ul>
        )}
        {!error && sort && (
          <Button
            onClick={infiniteScrollHandling}
            ref={morePostsButtonRef}
            className={cx({ [cssMoreButton]: true, [cssMorePostLoading]: isInfiniteLoad === 'on' })}
          >
            {isInfiniteLoad === 'on' ? (
              <Icon iconName="spinner" isSpin />
            ) : (
              <>
                <span>More</span>
                <div role="img" aria-label="More posts" className={cssBounce}>
                  <Icon iconName="magnetColored" />
                </div>
              </>
            )}
          </Button>
        )}
        {error && (
          <ErrorSection message={error[1]} statusCode={error[0]}>
            <Button ariaLabel="Retry" onClick={getPosts}>
              <Icon iconName="redo" />
            </Button>
          </ErrorSection>
        )}
      </section>
    </>
  )
}

const cssPosts = css`
  max-width: ${globalCss.common.maxWidth};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 5rem;
  margin: auto;
  margin-top: 1rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    margin-top: 0;
    padding: 0 1.25rem;
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    padding: 0 3rem;
  }
`

const cssLoading = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  color: ${globalCss.color.secondaryBrandColor};
  margin: 5rem 0;
`

const cssList = css`
  list-style: none;
`

const cssListItem = css`
  padding: 1rem 0;
  border-bottom: ${rem(2)} solid ${globalCss.color.groupColor};

  &:nth-last-child(1) {
    border-bottom: none;
  }

  a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: ${globalCss.color.color};

    p:first-child {
      margin-bottom: 0.25rem;
    }

    &:visited {
      color: ${globalCss.color.colorDown};
    }

    &:active {
      color: ${globalCss.color.color};
    }
  }
`

const cssPostTitle = css`
  font-size: 1rem;
  font-weight: ${globalCss.common.fontNormal};
`

const cssItemDetail = css`
  font-size: 0.9rem;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  color: ${globalCss.color.colorDown};

  li {
    margin-right: 0.5rem;
    display: flex;
    align-items: center;

    &:nth-child(1) {
      margin-right: auto;
    }

    &:nth-last-child(1) {
      margin-right: 0;
    }
  }
`

const cssItemDetailItem = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: none;
  background: none;
  color: ${globalCss.color.colorDown};
  height: 100%;

  svg {
    height: 100%;
    margin-right: 0.25rem;
    margin-top: 0.1rem;
  }
`

const cssItemDetailLeft = css`
  display: flex;
  align-items: center;
`

const cssItemDetailRight = css`
  display: flex;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
`

const cssMoreButton = css`
  margin: auto;
`

const cssMorePostLoading = css`
  background-color: transparent;
  color: ${globalCss.color.secondaryBrandColor};
  cursor: default;
`

const keyFramesBounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, ${rem(-7)}, 0);
  }

  70% {
    transform: translate3d(0, ${rem(-3)}, 0);
  }

  90% {
    transform: translate3d(0,-${rem(-1)},0);
  }
`

const cssBounce = css`
  margin-left: 0.25rem;
  margin-top: 0.1rem;
  animation: ${keyFramesBounce} 1s ease infinite;
`

const cssCompanyIcon = css`
  position: relative;
  width: 1rem;
  height: 1rem;
  display: inline-block;
  margin-right: 0.25rem;
  margin-top: 0.15rem;
`

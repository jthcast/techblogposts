'use client'

import * as styles from '@/app/[locale]/test-rss/page.css'
import * as Post from '@/components/atom/Post/Post'
import { useState } from 'react'
import Parser from 'rss-parser'
import { decode } from 'html-entities'
import { Button } from '@/components/atom/Button/Button'
import { Search } from '@/components/atom/Icon'

interface Rss {
  title: string
  link: string
  publishDate: number
}

export default function TestRssPage() {
  const [postsData, setPostsData] = useState<Rss[]>([])
  const [url, setUrl] = useState('')

  const parser = new Parser({
    timeout: 10000,
    headers: {
      Accept:
        'application/rss+xml, application/xml, application/atom+xml;charset=UTF-8',
    },
  })

  const getRss = async () => {
    const feed = await parser.parseURL(url)
    const items = feed.items.reduce<Rss[]>((acc, item) => {
      acc.push({
        title: decode(item.title),
        link: decode(item.link),
        publishDate: new Date(item.pubDate || 0).getTime(),
      })

      return acc
    }, [])

    const postsData = items.sort((a, b) => b.publishDate - a.publishDate)

    setPostsData(postsData)
  }

  return (
    <main>
      <section className={styles.section}>
        <div>
          <input value={url} onChange={(e) => setUrl(e.target.value)} />
          <Button onClick={getRss}>
            <Search />
          </Button>
        </div>
        {!!postsData?.length && (
          <Post.List>
            {postsData?.map(({ title, publishDate, link }) => {
              return (
                <Post.Item key={publishDate}>
                  <Post.Title id={link} title={title}>
                    {title}
                  </Post.Title>
                  <Post.Content>
                    <Post.RightContent>
                      <Post.Time time={publishDate} />
                    </Post.RightContent>
                  </Post.Content>
                </Post.Item>
              )
            })}
          </Post.List>
        )}
      </section>
    </main>
  )
}

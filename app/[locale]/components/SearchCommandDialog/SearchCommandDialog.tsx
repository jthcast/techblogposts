'use client'

import * as Command from '@/components/atom/Command/Command'
import * as Dialog from '@/components/atom/Dialog/Dialog'
import * as Post from '@/components/atom/Post/Post'
import { useEffect, useState } from 'react'
import { Button } from '@/components/atom/Button/Button'
import { Search } from '@/components/atom/Icon'
import { useTranslations } from 'next-intl'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/providers/ReactQueryClientProvider/ReactQueryClientProvider'
import {
  getPosts,
  getPostsSearch,
  putPostsViewCount,
} from '@/app/api/v1/posts/posts'
import { useDebounce } from '@/hooks/useDebounce/useDebounce'
import { ExternalLink } from '@/components/atom/ExternalLink/ExternalLink'

export function SearchCommandDialog() {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const { value: query } = useDebounce({ value })

  const { data: recentPosts } = useQuery({
    queryKey: queryKeys.getPosts({ cursor: '' }),
    queryFn: () => getPosts({ cursor: '' }),
    enabled: isOpen,
  })

  const { data: results, isLoading } = useQuery({
    queryKey: queryKeys.getPostsSearch({ query }),
    queryFn: () => getPostsSearch({ query }),
    enabled: !!query,
  })

  const { mutate: postsViewCount } = useMutation({
    mutationFn: putPostsViewCount,
  })

  const openCommandDialog = () => {
    setIsOpen(true)
  }

  const search = (value: string) => {
    setValue(value)
  }

  const openPost = ({ id }: { id: string }) => {
    postsViewCount({ id })
    window.open(id, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === ' ') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', keyDown)

    return () => document.removeEventListener('keydown', keyDown)
  }, [])

  return (
    <>
      <Button shape="round" color="secondary" onClick={openCommandDialog}>
        <Search />
      </Button>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content>
          <Command.Root shouldFilter={false}>
            <Command.Input
              placeholder={t('SearchCommandDialog.placeholder')}
              value={value}
              onValueChange={search}
            />
            <Command.List>
              {isLoading && <Command.Loading />}
              {!!results?.posts.length && (
                <Command.Group heading={t('SearchCommandDialog.results')}>
                  {results?.posts.map(({ _source }) => {
                    const { company, id, publishDate, title, viewCount } =
                      _source

                    return (
                      <Command.Item key={id} onSelect={() => openPost({ id })}>
                        <Post.Item key={id}>
                          <ExternalLink
                            href={id}
                            aria-label={title}
                            onClick={() => postsViewCount({ id })}
                            onAuxClick={() => postsViewCount({ id })}
                            title={title}
                            isShowVisited
                          >
                            <Post.Title>{title}</Post.Title>
                          </ExternalLink>
                          <Post.Content>
                            <Post.LeftContent>
                              <Post.CompanyIcon company={company} />
                              <Post.Company>{company}</Post.Company>
                            </Post.LeftContent>
                            <Post.RightContent>
                              <Post.Time time={publishDate} />
                              <Post.ViewCount>{viewCount}</Post.ViewCount>
                            </Post.RightContent>
                          </Post.Content>
                        </Post.Item>
                      </Command.Item>
                    )
                  })}
                </Command.Group>
              )}
              {query && !isLoading && !results?.posts.length && (
                <Command.PureEmpty>
                  {t('SearchCommandDialog.noResults')}
                </Command.PureEmpty>
              )}
              {(!query || !results?.posts.length) &&
                !!recentPosts?.posts.length && (
                  <Command.Group heading={t('SearchCommandDialog.recentPosts')}>
                    {recentPosts?.posts.map(({ _source }) => {
                      const { company, id, publishDate, title, viewCount } =
                        _source

                      return (
                        <Command.Item
                          key={id}
                          onSelect={() => openPost({ id })}
                        >
                          <Post.Item key={id}>
                            <ExternalLink
                              href={id}
                              aria-label={title}
                              onClick={() => postsViewCount({ id })}
                              onAuxClick={() => postsViewCount({ id })}
                              title={title}
                            >
                              <Post.Title>{title}</Post.Title>
                            </ExternalLink>
                            <Post.Content>
                              <Post.LeftContent>
                                <Post.CompanyIcon company={company} />
                                <Post.Company>{company}</Post.Company>
                              </Post.LeftContent>
                              <Post.RightContent>
                                <Post.Time time={publishDate} />
                                <Post.ViewCount>{viewCount}</Post.ViewCount>
                              </Post.RightContent>
                            </Post.Content>
                          </Post.Item>
                        </Command.Item>
                      )
                    })}
                  </Command.Group>
                )}
            </Command.List>
          </Command.Root>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}

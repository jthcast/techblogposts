import { client } from '@/libs/elasticSearch/elasticSearch'
import { SearchResponse } from '@elastic/elasticsearch/api/types.js'
import { NextResponse } from 'next/server'

interface PostsQuery {
  dataType: string
  isShow: boolean
  publishDate: {
    order: string
  }
}

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cursor = searchParams.get('cursor')

  const query = {
    size: 10,
    body: {
      query: {
        bool: {
          filter: [
            {
              term: {
                dataType: 'post',
              },
            },
            {
              term: {
                isShow: true,
              },
            },
          ],
          should: [
            {
              has_child: {
                type: 'bookmark',
                inner_hits: {
                  _source: false,
                  size: 0,
                },
                query: {
                  match_all: {},
                },
              },
            },
          ],
        },
      },
      sort: [
        {
          publishDate: {
            order: 'desc',
          },
        },
        {
          'id.keyword': {
            order: 'asc',
          },
        },
      ],
      search_after: undefined as [number, string] | undefined,
    },
  }

  if (cursor) {
    const [publishDate, id] = cursor.split(':')

    if (query.body) {
      query.body['search_after'] = [Number(publishDate), id]
    }
  }

  const response = await client.search<SearchResponse<PostsQuery>>(query)

  if (response.statusCode === 200) {
    const hits = response.body.hits.hits
    const posts = cursor ? hits.slice(1) : hits

    let newCursor = ''

    if (posts?.length > 0) {
      const [publishDate, id] = posts[posts.length - 1].sort as [number, string]

      newCursor = `${publishDate}:${id}`
    }

    return NextResponse.json({ posts, cursor: newCursor })
  }

  return NextResponse.json(undefined, {
    status: response.statusCode ?? 500,
  })
}

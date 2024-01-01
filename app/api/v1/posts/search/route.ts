import { client } from '@/libs/elasticSearch/elasticSearch'
import { SearchResponse } from '@elastic/elasticsearch/api/types.js'
import { NextResponse } from 'next/server'

interface PostsQuery {
  dataType: string
  isShow: boolean
  publishDate: string
  company: string
  title: string
  id: string
}

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  const searchQuery = {
    size: 100,
    body: {
      query: {
        function_score: {
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
              must: [
                {
                  multi_match: {
                    query,
                    fields: ['title', 'company'],
                  },
                },
              ],
            },
          },
          functions: [
            {
              gauss: {
                publishDate: {
                  origin: new Date().getTime(),
                  scale: 1000 * 60 * 60 * 24 * 10,
                },
              },
            },
          ],
        },
      },
    },
  }

  const response = await client.search<SearchResponse<PostsQuery>>(searchQuery)

  if (response.statusCode === 200) {
    const posts = response.body.hits.hits

    return NextResponse.json({ posts })
  }
}

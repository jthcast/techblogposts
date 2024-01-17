import { client } from '@/libs/elasticSearch/elasticSearch'
import { SearchResponse } from '@elastic/elasticsearch/api/types.js'
import { NextResponse } from 'next/server'

interface PostsQuery {
  company: string
  dataType: string
  id: string
  isShow: boolean
  join: string
  publishDate: number
  title: string
  viewCount: number
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const uid = searchParams.get('uid')

  const searchQuery = {
    size: 100,
    body: {
      query: {
        has_child: {
          type: 'bookmark',
          query: {
            term: {
              'uid.keyword': uid,
            },
          },
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

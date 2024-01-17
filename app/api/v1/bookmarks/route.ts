import { client } from '@/libs/elasticSearch/elasticSearch'
import { SearchResponse } from '@elastic/elasticsearch/api/types.js'
import { NextResponse } from 'next/server'

interface BookmarksQuery {
  _source: {
    parent: string
    publishDate: number
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const uid = searchParams.get('uid')

  const searchQuery = {
    size: 100,
    _source_includes: ['parent', 'publishDate'],
    body: {
      query: {
        bool: {
          filter: [
            {
              term: {
                dataType: 'bookmark',
              },
            },
            {
              term: {
                'uid.keyword': uid,
              },
            },
          ],
        },
      },
    },
  }

  const response =
    await client.search<SearchResponse<BookmarksQuery>>(searchQuery)

  if (response.statusCode === 200) {
    const bookmarks = response.body.hits.hits

    return NextResponse.json({ bookmarks })
  }
}

import { client } from '@/libs/elasticSearch/elasticSearch'
import { SearchResponse } from '@elastic/elasticsearch/api/types.js'
import { NextResponse } from 'next/server'

interface BlogsQuery {
  cron: boolean
  dataType: string
}

export const dynamic = 'force-dynamic'

export async function GET() {
  const searchQuery = {
    size: 200,
    body: {
      query: {
        bool: {
          filter: [
            {
              term: {
                dataType: 'blog',
              },
            },
            {
              term: {
                cron: true,
              },
            },
          ],
        },
      },
      sort: [
        {
          lastUpdated: {
            order: 'desc',
          },
        },
      ],
    },
  }

  const response = await client.search<SearchResponse<BlogsQuery>>(searchQuery)

  if (response.statusCode === 200) {
    const blogs = response.body.hits.hits

    return NextResponse.json({ blogs })
  }
}

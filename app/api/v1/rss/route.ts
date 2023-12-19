import { client } from '@/libs/elasticSearch/elasticSearch'
import { SearchResponse } from '@elastic/elasticsearch/api/types.js'
import { NextResponse } from 'next/server'

interface RssQuery {
  dataType: string
  isShow: boolean
  publishDate: string
  company: string
  title: string
  id: string
}

export const dynamic = 'force-dynamic'

export async function GET() {
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
    },
  }

  const response = await client.search<SearchResponse<RssQuery>>(query)

  if (response.statusCode === 200) {
    const posts = response.body.hits.hits
    const title = 'TechBlogPosts'
    const siteUrl = 'https://techblogposts.com'
    const lastModified = new Date(
      posts[0]._source?.publishDate || new Date(),
    ).toISOString()
    const xml = `<?xml version="1.0" encoding="utf-8"?>`

    const head = `
      <title>${title}</title>
      <link href="${siteUrl}" />
      <updated>${lastModified}</updated>
      <id>${siteUrl}</id>`

    const entries = posts
      .map(({ _source }) => {
        if (_source) {
          const { title, id, publishDate, company } = _source

          return `
        <entry>
          <title>${title}</title>
          <link href="${id}"/>
          <id>${id}</id>
          <author>
            <name>${company}</name>
          </author>
          <published>${new Date(publishDate).toISOString()}</published>
        </entry>`
        }
      })
      .join('')

    const atom = `${xml}
      <feed xmlns="http://www.w3.org/2005/Atom">
        ${head}${entries}
      </feed>`

    return new Response(atom, {
      headers: {
        'Content-Type': 'application/atom+xml;charset=UTF-8',
        'Last-Modified': lastModified,
      },
    })
  }

  return NextResponse.json(undefined, {
    status: response.statusCode ?? 500,
  })
}

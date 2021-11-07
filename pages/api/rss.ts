import { client, index } from '../../lib/utils/elasticSearch'
import { NowRequest, NowResponse } from '@vercel/node'
import config from '../../config'

interface AtomPostItem {
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

export default async function atom(req: NowRequest, res: NowResponse) {
  const getPosts = async () => {
    const query = {
      index,
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
            ]
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

    try{
      const { body } = await client.search(query)
      return body.hits.hits
    }catch(e){
      res.status(500).send({ error: 'failed to fetch data from ES' })
    }
  }
  
  const { title, siteUrl } = config
  const posts: AtomPostItem[] = await getPosts()
  const lastModified = new Date(posts[0]._source.publishDate).toISOString()
  const xml = `<?xml version="1.0" encoding="utf-8"?>`
  const head = `
  <title>${title}</title>
  <link href="${siteUrl}" />
  <updated>${lastModified}</updated>
  <id>${siteUrl}</id>
`
  
  const entries = posts.map(({_source}) => {
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
  }).join('')
  const atom = `${xml}
<feed xmlns="http://www.w3.org/2005/Atom">
  ${head}${entries}
</feed>
`

  try {
    res.setHeader('Content-Type', 'application/atom+xml;charset=UTF-8')
    res.setHeader('Last-Modified', lastModified)
    res.send(atom)
  } catch (err) {
    res.status(500).send({ error: 'failed to response' })
  }
}

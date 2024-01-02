import { SortResults } from '@elastic/elasticsearch/api/types.js'

export interface GetBlogsResponse {
  blogs: {
    _index: string
    _type: string
    _id: string
    _score: number | null
    _source: {
      cron: boolean
      lastUpdated: number
      lastUpdatedDate: string
      dataType: string
      id: string
      title: string
      rssURL: string
    }
    sort: SortResults
  }[]
}

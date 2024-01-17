import { SortResults } from '@elastic/elasticsearch/api/types.js'

export interface GetPostsRequest {
  cursor?: string
}

export interface GetPostsResponse {
  posts: {
    _index: string
    _type: string
    _id: string
    _score: number | null
    _source: {
      dataType: string
      publishDate: number
      company: string
      id: string
      viewCount: number
      title: string
      isShow: boolean
      join: string
    }
    sort: SortResults
    inner_hits: {
      bookmark: {
        hits: {
          total: {
            value: number
            relation: string
          }
          max_score: number | null
          hits: string[]
        }
      }
    }
  }[]
  cursor?: string
}

export interface PostPostsViewCountRequest {
  id: string
}

export type PostPostsViewCountResponse = null

export interface GetPostsSearchRequest {
  query: string
}

export interface GetPostsSearchResponse {
  posts: {
    _index: string
    _type: string
    _id: string
    _score: number | null
    _source: {
      dataType: string
      publishDate: number
      company: string
      id: string
      viewCount: number
      title: string
      isShow: boolean
      join: string
    }
    sort: SortResults
    inner_hits: {
      bookmark: {
        hits: {
          total: {
            value: number
            relation: string
          }
          max_score: number | null
          hits: string[]
        }
      }
    }
  }[]
  cursor?: string
}

export interface PutPostsBookmarkRequest {
  uid: string
  parent: string
}

export type PutPostsBookmarkResponse = null

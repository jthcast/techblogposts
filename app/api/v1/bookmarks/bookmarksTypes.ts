export interface GetBookmarksRequest {
  uid: string
}

export interface GetBookmarksResponse {
  bookmarks: {
    _index: string
    _type: string
    _id: string
    _score: number | null
    _routing: string
    _source: {
      parent: string
      publishDate: number
    }
  }[]
}

export interface GetBookmarksPostsRequest {
  uid: string
}

export interface GetBookmarksPostsResponse {
  posts: {
    _index: string
    _type: string
    _id: string
    _score: number | null
    _source: {
      company: string
      dataType: string
      id: string
      isShow: boolean
      join: string
      publishDate: number
      title: string
      viewCount: number
    }
  }[]
}

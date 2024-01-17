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

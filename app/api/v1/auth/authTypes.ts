export interface GetAuthResponse {
  isAuthenticated: boolean
  isMember: boolean
  user?: {
    email?: string
    creationTime?: string
    providerId?: string
    uid?: string
  }
}

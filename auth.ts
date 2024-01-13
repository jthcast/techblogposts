import NextAuth from 'next-auth'
import type { NextAuthConfig, User } from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'

declare module 'next-auth' {
  interface Session {
    user: {
      picture?: string
    } & User
  }
}

export const authConfig = {
  providers: [Google, GitHub],
  callbacks: {
    authorized(params) {
      return !!params.auth?.user
    },
  },
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig)

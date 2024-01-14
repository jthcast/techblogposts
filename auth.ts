import NextAuth from 'next-auth'
import type { NextAuthConfig, User } from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth'
import { routes } from '@/constants/routes'

declare module 'next-auth' {
  interface Session {
    user: {
      uid?: string
      creationTime?: string
      providerId?: string
    } & User
  }
}

const firebaseConfig = {
  apiKey: process.env.FB_AUTH_API_KEY,
  authDomain: process.env.FB_AUTH_AUTH_DOMAIN,
  projectId: process.env.FB_AUTH_PROJECT_ID,
  storageBucket: process.env.FB_AUTH_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_AUTH_MESSAGING_SENDER_ID,
  appId: process.env.FB_AUTH_APP_ID,
  measurementId: process.env.FB_AUTH_MEASUREMENT_ID,
}
const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)

const authConfig = {
  providers: [Google, GitHub],
  callbacks: {
    async signIn({ account }) {
      try {
        if (account) {
          const {
            provider,
            id_token: idToken,
            access_token: accessToken,
          } = account

          if (provider === 'google') {
            const credential = GoogleAuthProvider.credential(idToken)

            const userCredential = await signInWithCredential(
              firebaseAuth,
              credential,
            )

            return !!userCredential
          }

          if (provider === 'github' && accessToken) {
            const credential = GithubAuthProvider.credential(accessToken)

            const userCredential = await signInWithCredential(
              firebaseAuth,
              credential,
            )

            return !!userCredential
          }
        }

        return false
      } catch (e) {
        return false
      }
    },
    async session({ session }) {
      const auth = getAuth()
      const user = auth.currentUser

      if (user) {
        const { uid, providerData, metadata } = user
        const { creationTime } = metadata
        const { providerId } = providerData[0]

        session.user.uid = uid
        session.user.creationTime = creationTime
        session.user.providerId = providerId
      }

      return session
    },
  },
  pages: {
    error: routes.landingError,
  },
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(authConfig)

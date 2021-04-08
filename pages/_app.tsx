import { AppProps } from 'next/app'
import '../styles/normalize.css'
import '../styles'
import { ThemeProvider } from '../context/ThemeContext'
import { InfiniteScrollProvider } from '../context/InfiniteScrollContext'
import { HeaderMessageProvider } from '../context/HeaderMessageContext'
import { LoginModalProvider } from '../context/LoginModalContext'
import { LoginProvider } from '../context/LoginContext'
import firebase from 'firebase/app';
import 'firebase/auth';
import { BookmarkProvider } from '../context/BookmarkContext'

function App({ Component, pageProps }: AppProps) {
  const firebaseConfig = {
    apiKey: process.env.FB_AUTH_API_KEY,
    authDomain: process.env.FB_AUTH_AUTH_DOMAIN,
    projectId: process.env.FB_AUTH_PROJECT_ID,
    storageBucket: process.env.FB_AUTH_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_AUTH_MESSAGING_SENDER_ID,
    appId: process.env.FB_AUTH_APP_ID,
    measurementId: process.env.FB_AUTH_MEASUREMENT_ID
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  return (
    <LoginProvider>
      <BookmarkProvider>
        <ThemeProvider>
          <InfiniteScrollProvider>
            <HeaderMessageProvider>
              <LoginModalProvider>
                <Component {...pageProps} />
              </LoginModalProvider>
            </HeaderMessageProvider>
          </InfiniteScrollProvider>
        </ThemeProvider>
      </BookmarkProvider>
    </LoginProvider>
  )
}

export default App

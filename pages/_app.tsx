import { AppProps } from 'next/app'
import '../styles/normalize.css'
import '../styles'
import { ThemeProvider } from '../context/ThemeContext'
import { InfiniteScrollProvider } from '../context/InfiniteScrollContext'
import { HeaderMessageProvider } from '../context/HeaderMessageContext'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <InfiniteScrollProvider>
        <HeaderMessageProvider>
          <Component {...pageProps} />
        </HeaderMessageProvider>
      </InfiniteScrollProvider>
    </ThemeProvider>
  )
}

export default App

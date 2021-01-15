import { AppProps } from 'next/app'
import '../styles/normalize.css'
import '../styles'
import { ThemeProvider } from '../context/ThemeContext'
import { InfiniteScrollProvider } from '../context/InfiniteScrollContext'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <InfiniteScrollProvider>
        <Component {...pageProps} />
      </InfiniteScrollProvider>
    </ThemeProvider>
  )
}

export default App

import { AppProps } from 'next/app'
import '../styles/normalize.css'
import '../styles'
import { ThemeProvider } from '../context/ThemeContext'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App

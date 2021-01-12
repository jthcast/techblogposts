import { AppProps } from 'next/app'
import '../styles/normalize.css'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App

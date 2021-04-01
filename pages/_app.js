import '../styles/global.css'
import '../styles/prism-theme-night-owl.css'
import Layout from '../components/Layout'
import config from '../foamy.config'

export default function App({ Component, pageProps }) {
  console.log('pageProps', pageProps)
  return (
    <Layout config={config}>
      <Component {...pageProps} />
    </Layout>
  )
}

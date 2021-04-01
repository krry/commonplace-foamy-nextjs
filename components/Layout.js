import Head from 'next/head'
import Header from './Header'

export default function Layout({ children, config }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content={config.siteAuthor} />
        <meta name="description" content={config.siteDescription} />
        <title>{config.siteTitle}</title>
      </Head>
      <Header siteTitle={config.siteTitle} />
      <main className="container">
        {children}
      </main>
    </>
  )
}
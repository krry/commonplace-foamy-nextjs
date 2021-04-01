import Meta from '../../foamy-nextjs/components/Meta'
import SideBar from './SideBar'
import Header from './Header'

export default function Layout({ children, config }, ...frontMatter) {
  return (
    <>
			<Meta />
      <Header siteTitle={config.siteTitle} />
      <main className="container">
				<article className="noteBody">{children}</article>
				<SideBar {...frontMatter} />
      </main>
    </>
  )
}

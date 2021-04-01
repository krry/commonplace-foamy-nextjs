import Meta from './Meta'
import SideBar from './SideBar'
import Header from './Header'
import config from '../site.config'

export default function Layout({ children }, ...frontMatter) {
	return (
		<>
			<Meta />
			<Header siteTitle={config.site.title} />
			<main className="container">
				<article className="noteBody">{children}</article>
				<SideBar {...frontMatter} />
			</main>
		</>
	)
}

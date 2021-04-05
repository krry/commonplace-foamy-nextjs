import Meta from './Meta'
import SideBar from './SideBar'
import Header from './Header'
import config from '../site.config'

export default function Layout({ children, metadata }) {
	// console.log('layout props', metadata)
	return (
		<>
			<Meta />
			<Header siteTitle={config.site.title} />
			<main className="container">
				<article className="noteBody">{children}</article>
				<SideBar metadata={metadata} />
			</main>
		</>
	)
}

import Meta from './Meta'
import SideBar from './SideBar'
import Header from './Header'

export default function Layout({ children, metadata }) {
	// console.log('layout props', metadata)
	return (
		<>
			<Meta />
			<Header />
			<main className="container">
				<article className="fuselage">{children}</article>
				<SideBar metadata={metadata} />
			</main>
		</>
	)
}

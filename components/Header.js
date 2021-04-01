import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'

export default function Header({ siteTitle }) {
	return (
		<>
			<header className="header">
				<nav className="nav">
					<ThemeSwitch />
					<h1>
						<small>The </small>
						<Link href="/">Commonplace</Link>
						<small> of an Atmanaut</small>
					</h1>
				</nav>
			</header>
		</>
	)
}

import {useRef} from 'react'
import Link from 'next/link'
import Search from './Search'
import ThemeSwitch from './ThemeSwitch'

export default function Header({ siteTitle }) {
	const searchRef = useRef(null)
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
				<Search ref={searchRef} />
			</header>
		</>
	)
}

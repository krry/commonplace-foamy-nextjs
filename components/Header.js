import { useRef } from 'react'
import Link from 'next/link'
import Search from './Search'
import ThemeSwitch from './ThemeSwitch'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Header({ siteTitle }) {
	const [session, loading] = useSession()

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
				{!session && (
					<>
						Not signed in <br />
						<button
							onClick={(e) => {
								e.preventDefault()
								signIn()
							}}>
							Sign in
						</button>
					</>
				)}
				{session && (
					<>
						Signed in as {session.user.email ?? session.user.name} <br />
						{session.user.image && (
							<span style={{ backgroundImage: `url(${session.user.image})` }} className="avatar" />
						)}
						<Search ref={searchRef} />
						<button
							onClick={() => {
								e.preventDefault()
								signOut()
							}}>
							Sign out
						</button>
					</>
				)}
			</header>
		</>
	)
}

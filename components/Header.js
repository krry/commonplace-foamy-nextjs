import { useRef } from 'react'
import Link from 'next/link'
import Search from './Search'
import ThemeSwitch from './ThemeSwitch'
import { signIn, signOut, useSession } from 'next-auth/client'
import {FaStroopwafel} from 'react-icons/fa'

export default function Header({ siteTitle }) {
	const [session, loading] = useSession()

	const searchRef = useRef(null)
	return (
		<>
			<header className="header">
				<nav className="nav">
					<ThemeSwitch />
					<h1>
						<FaStroopwafel className="icon" />
						<Link href="/">Commonplace</Link>
						<small>&nbsp;&nbsp;of an Atmanaut</small>
					</h1>
				</nav>
				{!session && (
					<div className="signin">
						<button
							className="btn"
							onClick={(e) => {
								e.preventDefault()
								signIn()
							}}>
							👑 Sign in

						</button>
					</div>
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

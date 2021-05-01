import Link from 'next/link'
import Search from './Search'
import ThemeSwitch from './ThemeSwitch'
import { GiMeshNetwork, GiSpinningRibbons } from 'react-icons/gi'
import { GoSignOut } from 'react-icons/go'
import { signIn, signOut, useSession } from 'next-auth/client'

const Header = () => {
	const [session, loading] = useSession()

	return (
		<>
			<header className='header'>
				<nav className='nav'>
					<ThemeSwitch />
					<h1>
						<GiMeshNetwork className='icon' />
						<Link href='/'>Kerrbear.wtf</Link>
					</h1>
				</nav>
				{!session && loading && (
					<button disabled className='btn loading'>
						<GiSpinningRibbons className='icon spinning' />
					</button>
				)}
				{!session && !loading && (
					<div className='signin'>
						<button
							className='btn'
							onClick={e => {
								e.preventDefault()
								signIn()
							}}>
							👑 Sign in
						</button>
					</div>
				)}
				{session && (
					<>
						<Search />
						{session.user.image && (
							<button
								className='naked avatar'
								style={{ backgroundImage: `url(${session.user.image})` }}
								onClick={evt => {
									evt.preventDefault()
									if (confirm('You sure?')) signOut()
								}}>
								<GoSignOut className='showOnHover' />
							</button>
						)}
					</>
				)}
			</header>
		</>
	)
}

Header.displayName = 'Header'

export default Header

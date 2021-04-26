import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Clock from '../components/Clock'

// pages/404.js
export default function Custom404() {
	const router = useRouter()
	return (
		<Layout>
			<h1>404</h1>
			<h2>No Not(e) Found</h2>
			<nav>
				<ul>
					<li>
						<button
							className='btn'
							onClick={() => router.back()}>
							Jump back
						</button>
					</li>
					<li>
						<Link href='/'>Back to the Index</Link>
					</li>
				</ul>
			</nav>
			<Clock />
		</Layout>
	)
}

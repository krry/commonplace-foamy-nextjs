import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Clock from '../components/Clock'

// pages/404.js
export default function Custom404() {
	const router = useRouter()
	return (
		<Layout metadata=''>
			<div className='fixed full flex centered ghost'>
				<h1>404</h1>
				<h2>No Not(e) Found</h2>
				<button className='btn' onClick={() => router.back()}>
					Jump back
				</button>
				<Clock />
			</div>
		</Layout>
	)
}

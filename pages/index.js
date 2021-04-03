import Link from 'next/link'
import Layout from '../components/Layout'
import SiteNav from '../components/SiteNav'
import CopyLeft from '../components/CopyLeft'

export default function Index () {
	return (
		<Layout>
			<SiteNav location="home" />
			<hr />
			<footer style={{ textAlign: 'center' }}>
				<p>
					Welcome to the <Link href="/intend/commonplace-book">Commonplace Book</Link> of{' '}
					<Link href="/intend/who-i-am">Kerry Snyder</Link>
				</p>
				<p>
					<CopyLeft />
				</p>
			</footer>
		</Layout>
	)
}

// export const getStaticProps = async () => {
// 	const configData = await import('../site.config')
// 	return {
// 		...configData,
// 	}
// }

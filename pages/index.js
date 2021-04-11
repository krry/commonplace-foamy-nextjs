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
					Welcome to the <Link href="/intend/commonplace-book">Commonplace&nbsp;Book</Link> of&nbsp;<Link href="/intend/who-i-am">Kerry&nbsp;Snyder</Link>
				</p>
				<CopyLeft />
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

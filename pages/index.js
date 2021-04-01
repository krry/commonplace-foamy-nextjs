import Link from 'next/link'
import Layout from '../components/Layout'
import SiteNav from '../components/SiteNav'
import CopyLeft from '../components/CopyLeft'

export default function Index() {
	return (
		<Layout>
			<SiteNav location="home" />
			<hr />
			<footer style={{ textAlign: 'center' }}>
				<p>
					Welcome to the <Link href="/projects/commonplace">Commonplace Book</Link> of{' '}
					<Link href="/projects/commonplace/who">Kerry Snyder</Link>
				</p>
				<p>
					<CopyLeft />
				</p>
			</footer>
		</Layout>
	)
}
// export { default, getStaticProps } from './[...slug]'

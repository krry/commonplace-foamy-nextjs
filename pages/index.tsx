import Link from 'next/link'
import Layout from '../components/Layout'
import SiteNav from '../components/SiteNav'
import CopyLeft from '../components/CopyLeft'
import { GiFlyingTrout } from 'react-icons/gi'

export default function Index(): JSX.Element {
	return (
		<Layout metadata="">
			<SiteNav location='home' />
			<hr />
			<footer style={{ textAlign: 'center' }}>
				<p>
					<GiFlyingTrout className='icon flipX after' /> Welcome to the{' '}
					<Link href='/intend/commonplace-book'>Commonplace&nbsp;Book</Link>{' '}
					of&nbsp;<Link href='/intend/who-i-am'>Kerry&nbsp;Snyder</Link>{' '}
					<GiFlyingTrout className='icon' />
				</p>
				<CopyLeft />
			</footer>
		</Layout>
	)
}

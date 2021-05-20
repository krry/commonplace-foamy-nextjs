import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { GiFlyingTrout } from 'react-icons/gi'

import Layout from '../components/Layout'
import SiteNav from '../components/SiteNav'
import CopyLeft from '../components/CopyLeft'

export default function Home({ file }): JSX.Element {
	const data = file.data
	return (
		<Layout metadata={{ title: data.title }}>
			<SiteNav location='home' />
			<hr />
			<footer style={{ textAlign: 'center' }}>
				<p>
					<GiFlyingTrout className='icon flipX after' /> Welcome to the{' '}
					<Link href='/intend/commonplace'>Commonplace</Link> of&nbsp;
					<Link href='/intend/who-i-am'>Kerrbear</Link>{' '}
					<GiFlyingTrout className='icon' />
				</p>
				<CopyLeft />
			</footer>
		</Layout>
	)
}

export const getStaticProps: GetStaticProps = async function ({
	preview,
	previewData,
}) {
	if (preview) {
		return getGithubPreviewProps({
			...previewData,
			fileRelativePath: 'content/home.json',
			parse: parseJson,
		})
	}
	return {
		props: {
			sourceProvider: null,
			error: null,
			preview: false,
			file: {
				fileRelativePath: 'content/home.json',
				data: (await import('../content/home.json')).default,
			},
		},
	}
}

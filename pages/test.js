import path from 'path'
import Layout from '../components/Layout'
import { patchMissingFrontMatter } from '../lib/mdx'

const root = process.cwd()

export default function Test({ results }) {
	return (
		<Layout>
			<h1>Patching Front Matter</h1>
			<ul></ul>
		</Layout>
	)
}

export async function getStaticProps() {
	const dirPath = path.join(root, '_notes', 'archives', 'folio')
	const results = await patchMissingFrontMatter(dirPath)

	return {
		props: { results },
	}
}

import path from 'path'
import Layout from '../components/Layout'
import { patchMissingFrontMatter } from '../lib/frontmatter'

const root = process.cwd();


export default function Test ({ filesFixed }) {
	return (
		<Layout>
			<h1>Patching Front Matter</h1>
			<div className="flex row">
				<div className="flex col">
					<h2>Files Fixed</h2>
					<ul className="microlist">
						{filesFixed.map((file, index) => (
							<li key={index}>{file}</li>
						))}
					</ul>
				</div>
			</div>
		</Layout>
	)
}

export async function getStaticProps () {
	const dirPath = path.join(root, 'private')
	const results = await patchMissingFrontMatter(dirPath)

	return {
		props: results,
	}
}

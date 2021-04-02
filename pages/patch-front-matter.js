import path from 'path'
import Layout from '../components/Layout'
import { patchMissingFrontMatter } from '../lib/mdx'

const root = process.cwd()

export default function Test ({ files, filesFixed }) {
	return (
		<Layout>
			<h1>Patching Front Matter</h1>
			<div className="row flex">
				<div className="col flex">
					<h2>Files Fixed</h2>
					<ul>
						{filesFixed.map((file, index) => (
							<li key={index}>{file}</li>
						))}
					</ul>
				</div>
				{/* <div className="col half flex">
					<h2>Files Scanned</h2>
					<ul>
						{files.map((file) => (
							<li>{file}</li>
						))}
					</ul>
				</div> */}
			</div>
		</Layout>
	)
}

export async function getStaticProps () {
	const dirPath = path.join(root, '_notes', 'journal')
	const results = await patchMissingFrontMatter(dirPath)

	return {
		props: results,
	}
}

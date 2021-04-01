import Layout from '../components/Layout'
import { getAllFilesFrontMatter } from '../lib/mdx'

export default function AllNotes({ metas }) {
	return (
		<Layout>
			<h1>All Notes</h1>
			<ul>
				{metas.slice().map((note, index) => (
					<div key={index}>
						<dt>{note.meta.title || ''}</dt>
						<dd>
							<a href={note.meta.slug}>{note.meta.slug}</a>
						</dd>
					</div>
				))}
			</ul>
		</Layout>
	)
}

export async function getStaticProps() {
	const allNotes = getAllFilesFrontMatter()
	const metas = allNotes.map((note) => note.title)

	return {
		props: { metas },
	}
}

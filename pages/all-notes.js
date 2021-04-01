import Layout from '../components/Layout'
import { getAllNotes } from '../api/notes'

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
	const allNotes = getAllNotes(['title', 'time', 'tags', 'slug'])
	const metas = allNotes.map((note) => note.meta)

	return {
		props: { metas },
	}
}

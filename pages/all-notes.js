import Layout from '../components/Layout'
import { getAllFilesFrontMatter } from '../lib/mdx'

export default function AllNotes({ allNotes }) {
	return (
		<Layout>
			<h1>All Notes</h1>
			<ul>
				{allNotes.slice().map((note, index) => (
					<div key={index}>
						<dt>{note.title || ''}</dt>
						<dd>
							<a href={note.slug}>{note.slug}</a>
						</dd>
					</div>
				))}
			</ul>
		</Layout>
	)
}

export async function getStaticProps() {
	const allNotes = await getAllFilesFrontMatter()

	return {
		props: { allNotes },
	}
}

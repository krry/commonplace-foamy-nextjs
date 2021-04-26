import Link from 'next/link'
import { useRouter } from 'next/router'
import { getAllTerms, getNotesWithTerm } from '../../lib/mdx'
import Loading from '../../components/Loading'
import Layout from '../../components/Layout'
// looks through the mdx docs for #terms
// makes a page for each one at /terms/[term]

export const getStaticPaths = async () => {
	// search the mdx files for #terms, compiling them in an array
	const terms = [...new Set(await getAllTerms())]
	// console.log('terms count', terms.length)
	// console.log('terms', terms)
	// sort the array alphabetically
	// dedupe the items in the array with a Set
	// construct a paths object with the terms
	const paths = terms.sort().map(term => ({
		params: {
			slug: `/terms/${term.slice(1)}`,
			term: term.slice(1),
		},
	}))
	// console.log('paths count', paths.length)
	// console.log('paths', paths)
	// an array containing the #terms found in the mdx docs
	return {
		paths: paths,
		fallback: true,
	}
}

export const getStaticProps = async ({ params }) => {
	const notes = await getNotesWithTerm(params.term)
	// console.log('props received notes with term', params.term, notes)
	if (!notes) {
		return {
			notFound: true,
		}
	}
	return {
		props: { notes },
	}
}

const TermPage = ({ notes }) => {
	const router = useRouter()
	const term = notes?.length ? notes[0].term : 'term'

	if (router.isFallback) {
		return (
			<Layout>
				<Loading />
			</Layout>
		)
	} else {
		return (
			<Layout>
				<h1>{'#' + term}</h1>
				{notes.slice().map((note, index) => (
					<Link href={'/' + note?.slug} key={index}>
						<div className='termLink'>
							<h2>👉 {note.title}</h2>
							<pre>{note.excerpt}</pre>
						</div>
					</Link>
				))}
			</Layout>
		)
	}
}

export default TermPage

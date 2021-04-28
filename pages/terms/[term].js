import Link from 'next/link'
import { useRouter } from 'next/router'
import { getAllTerms, getNotesWithTerm } from '../../lib/mdx'
import Loading from '../../components/Loading'
import Layout from '../../components/Layout'
import hydrate from 'next-mdx-remote/hydrate'
import MDXComponents from '../components/MDXComponents'
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
	const paths = terms.sort().map(term => {
		if (!term || !term.slice(1)) return

		return {
			params: {
				slug: `/terms/${term.slice(1).toLowerCase()}`,
				term: term.slice(1).toLowerCase(),
			},
		}
	})
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
	if (!notes || !notes.length || !notes[0].term) {
		return {
			notFound: true,
			props: { notes: [{ term: 'null' }] },
		}
	}
	return {
		props: { notes },
	}
}

const TermPage = ({ notes }) => {
	const router = useRouter()

	if (router.isFallback) {
		return (
			<Layout>
				<Loading />
			</Layout>
		)
	}
	const term = notes[0].term ?? 'term'
	return (
		<Layout>
			<h1>{'#' + term}</h1>
			{notes.slice().map((note, index) => {
				const content = hydrate(note.excerpt, { components: MDXComponents })
				return (
					<Link href={'/' + note?.slug} key={index}>
						<div className='termLink'>
							<h2>👉 {note.title}</h2>
							<pre>{content}</pre>
						</div>
					</Link>
				)
			})}
		</Layout>
	)
}

export default TermPage

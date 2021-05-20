import Link from 'next/link'
import { useRouter } from 'next/router'
import { getAllTerms, getNotesWithTerm } from '../../lib/mdx'
import Loading from '../../components/Loading'
import Layout from '../../components/Layout'
import Custom404 from '../404'
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
	const term = params?.term ?? 'term'
	const notes = await getNotesWithTerm(term)
	if (!notes || !notes.length) {
		return {
			notFound: true,
		}
	}
	return {
		props: {
			term,
			notes,
		},
	}
}

const TermPage = ({ term, notes, notFound }) => {
	const router = useRouter()
	if (notFound) return <Custom404 />
	if (router.isFallback) {
		return (
			<Layout metadata=''>
				<Loading />
			</Layout>
		)
	}
	return (
		<Layout metadata=''>
			<h1>{'#' + term}</h1>
			{notes.slice().map((note, index) => {
				return (
					<Link href={'/' + note?.slug} key={index}>
						<div className='termLink'>
							<h2>👉 {note.title}</h2>
							<p>{note.excerpt}</p>
						</div>
					</Link>
				)
			})}
		</Layout>
	)
}

export default TermPage

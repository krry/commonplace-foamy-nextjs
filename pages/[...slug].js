import ErrorPage from 'next/error'
import Layout from '../components/Layout'
import hydrate from 'next-mdx-remote/hydrate'
import MDXComponents from '../components/MDXComponents'
import { mdxFilePaths, getFileBySlug } from '../lib/mdx'

export const getStaticPaths = async () => {
	const paths = mdxFilePaths
		// Remove file extensions for page paths
		.map((path) => path.replace(/\.mdx?$/, ''))
		// Map the path into the static paths object required by Next.js
		.map((slug) => ({ params: { slug: slug.split('/') } }))

	return {
		paths,
		fallback: false
	}
}

export const getStaticProps = async ({ params }) => {
	let slug = 'index'

	if (params?.slug) {
		slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
	}

	const note = await getFileBySlug(slug)

	return { props: note }
}

export default function NotePage ({ mdxSource, frontMatter }) {
	// console.log('frontMatter', frontMatter);
	if (!mdxSource) return <ErrorPage statusCode={404} />
	const content = hydrate(mdxSource, { components: MDXComponents })
	return <Layout metadata={frontMatter}> {content} </Layout>
}

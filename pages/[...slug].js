import ErrorPage from 'next/error'
import Layout from '../components/Layout'
import hydrate from 'next-mdx-remote/hydrate'
import MDXComponents from '../components/MDXComponents'
import { mdxFilePaths, getFileBySlug } from '../lib/mdx'

export default function NotePage({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, { components: MDXComponents })
  return <Layout {...frontMatter}> {content} </Layout>
}

export const getStaticProps = async ({ params }) => {
  let slug = 'index'

  if (params && params.slug) {
    slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
  }

  const note = await getFileBySlug(slug)

  return { props: note }
}

export const getStaticPaths = async () => {
  const paths = mdxFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug: slug.split('/') } }))

  return {
    paths,
    fallback: false,
  }
}

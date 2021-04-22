import fs from 'fs'
import path from 'path'
import read from 'fs-readdir-recursive'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import MDXComponents from '../components/MDXComponents'
import remarkPlugins from './remark'

const root = process.cwd()
const mdxDirPath = path.join(root, '_notes')
const allFilesInMdxDir = read(mdxDirPath)

export const mdxFilePaths = allFilesInMdxDir.filter((path) => /\.mdx?$/.test(path))

export async function getFileBySlug (slug) {
	const mdxFilePath = path.join(mdxDirPath, `${slug}.mdx`)
	const source = fs.readFileSync(mdxFilePath, 'utf8')

	const { data, content } = matter(source)
	const mdxSource = await renderToString(content, {
		components: MDXComponents,
		mdxOptions: { remarkPlugins, },
		scope: data,
	})

	return {
		mdxSource,
		frontMatter: {
			slug: slug || null,
			...data,
		},
	}
}

export async function getAllFilesFrontMatter () {
	const files = read(mdxDirPath)

	return files.reduce((allNotes, noteSlug) => {
		const source = fs.readFileSync(path.join(mdxDirPath, noteSlug), 'utf8')
		const { data } = matter(source)

		return [
			{
				...data,
				slug: noteSlug.replace('.mdx', ''),
			},
			...allNotes,
		]
	}, [])
}

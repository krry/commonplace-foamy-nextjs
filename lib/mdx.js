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

export const mdxFilePaths = allFilesInMdxDir.filter(path =>
	/\.mdx?$/.test(path)
)

export async function getFileBySlug(slug) {
	const mdxFilePath = path.join(mdxDirPath, `${slug}.mdx`)
	const source = fs.readFileSync(mdxFilePath, 'utf8')

	const { data, content } = matter(source)
	const mdxSource = await renderToString(content, {
		components: MDXComponents,
		mdxOptions: { remarkPlugins },
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

const collectFrontMatter = (allNotes, noteSlug) => {
	const source = fs.readFileSync(path.join(mdxDirPath, noteSlug), 'utf8')
	const { data } = matter(source)

	return [
		{
			...data,
			slug: noteSlug.replace('.mdx', ''),
		},
		...allNotes,
	]
}

export async function getAllFilesFrontMatter() {
	const files = read(mdxDirPath)

	return files.reduce(collectFrontMatter, [])
}

function findHashtags(text) {
	const hashtagPattern = /\B#\w\w+\b/g
	const tags = text.match(hashtagPattern)
	// console.log('finding hashtags', tags)
	return tags
}

function termFinder(allTerms, slug) {
	const source = fs.readFileSync(path.join(mdxDirPath, slug), 'utf8')
	const { content } = matter(source)
	const tags = findHashtags(content) ?? []
	// if (tags.length) console.log('body tags', tags)
	return [...tags, ...allTerms]
}

function clipTagsFromFrontMatter(allTags, nextNote) {
	const source = fs.readFileSync(path.join(mdxDirPath, nextNote), 'utf8')
	const { data } = matter(source)
	if (!data || !data.tags || typeof data.tags === 'undefined')
		return [...allTags]
	const tags = data.tags
		.split(',')
		.filter(tag => tag.length > 1)
		.map(tag => {
			return (
				'#' +
				tag
					.trim()
					.replace(/ /g, '-')
					.replace(/#/g, '')
					.replace(/[^a-zA-Z0-9\-&$@!?]/g, '_')
			)
		})
	return [...tags, ...allTags]
}

export async function getAllTerms() {
	// console.log('getting all terms')
	const files = read(mdxDirPath)
	const bodyTags = files.reduce(termFinder, [])
	const headTags = files.reduce(clipTagsFromFrontMatter, [])
	// console.log('headTags.length', headTags.length)
	// console.log('bodyTags.length', bodyTags.length)
	// https://robkendal.co.uk/blog/2020-02-04-creating-unique-merged-arrays-using-javascripts-set-and-more
	const allTags = new Set([...headTags, ...bodyTags])
	return [...allTags]
}

const cumulativeSum = sum => value => (sum += value)

async function extractExcerpt(text) {
	const excerpt = []
	const paragraphs = text.split('\n')
	// measure the lengths of the paragraphs
	const charCounts = paragraphs.map(p => p.length)
	// find the cumulative sums for each index
	const sums = charCounts.map(cumulativeSum(0))
	// return the greatest number of paragraphs whose total length
	// is less than two tweets (320 chars)
	sums.forEach((sum, i) => {
		if (sum < 192 && paragraphs[i].length > 0) {
			excerpt.push(paragraphs[i])
		}
	})
	excerpt.push('[more…]')
	return excerpt.join('\n')
}

export async function getNotesWithTerm(term) {
	const notesWithTerm = []
	// console.log('checking for', term)

	mdxFilePaths.map(async file => {
		const fullFilePath = path.join(mdxDirPath, file)
		const source = fs.readFileSync(fullFilePath, 'utf8')
		if (source) {
			const { data, content } = matter(source)
			if (term === 'untagged') {
				if (!/\B#\w+\B/.test(content) && !data.tags) {
					const untagged = {
						slug: file.replace(/.mdx$/, '').toLowerCase(),
						title: data.title,
						term: 'untagged',
						excerpt: await extractExcerpt(content),
					}
					notesWithTerm.push(untagged)
				}
			} else if (
				content
					.toLowerCase()
					.replace(/[^a-zA-Z0-9\-&$@!?]/g, '_')
					.includes('#' + term.toLowerCase()) ||
				data.tags
					?.toLowerCase()
					.replace(/[^a-zA-Z0-9\-&$@!?]/g, '_')
					.includes(term.replace(/-/g, ' ').toLowerCase()) ||
				data.tags?.toLowerCase().includes(term.toLowerCase())
			) {
				const result = {
					slug: file.replace(/.mdx$/, '').toLowerCase(),
					title: data.title,
					term: term.replace(/ /g, '-'),
					excerpt: await extractExcerpt(content),
				}
				notesWithTerm.push(result)
				// console.log('notesWithTerm', notesWithTerm)
			}
		} else console.error('could not find', file)
	})
	return notesWithTerm
}

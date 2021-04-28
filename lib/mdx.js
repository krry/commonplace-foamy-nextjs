import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remarkPlugins from './remark'
import read from 'fs-readdir-recursive'
import MDXComponents from '../components/MDXComponents'
import renderToString from 'next-mdx-remote/render-to-string'

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

function findTerms(text) {
	const termPattern = /\B#\w\w+\b/g
	const terms = text.match(termPattern)
	return terms
}

function termFinder(allTerms, slug) {
	const source = fs.readFileSync(path.join(mdxDirPath, slug), 'utf8')
	const { content } = matter(source)
	const terms = findTerms(content) ?? []
	// if (terms.length) console.log('body terms', terms)
	return [...terms, ...allTerms]
}

function clipTermsFromFrontMatter(allTerms, nextNote) {
	const source = fs.readFileSync(path.join(mdxDirPath, nextNote), 'utf8')
	const { data } = matter(source)
	if (!data || !data.terms || typeof data.terms === 'undefined')
		return [...allTerms]
	const terms = data.terms
		.split(',')
		.filter(term => term.length > 1)
		.map(term => {
			return (
				'#' +
				term
					.trim()
					.replace(/ /g, '-')
					.replace(/#/g, '')
					.replace(/[^a-zA-Z0-9$&?!@]/g, '_')
			)
		})
	return [...terms, ...allTerms]
}

export async function getAllTerms() {
	// console.log('getting all terms')
	const files = read(mdxDirPath)
	const bodyTerms = files.reduce(termFinder, [])
	const headTerms = files.reduce(clipTermsFromFrontMatter, [])
	// console.log('headTerms.length', headTerms.length)
	// console.log('bodyTerms.length', bodyTerms.length)
	// https://robkendal.co.uk/blog/2020-02-04-creating-unique-merged-arrays-using-javascripts-set-and-more
	const allTerms = new Set([...headTerms, ...bodyTerms])
	return [...allTerms]
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
	const mdxSource = await renderToString(excerpt.join('\n'), {
		components: MDXComponents,
		mdxOptions: { remarkPlugins },
	})
	return mdxSource
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
				if (!/\B#\w+\B/.test(content) && !data.terms) {
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
					.replace(/[^a-zA-Z0-9&$@!?]/g, '_')
					.toLowerCase()
					.includes('#' + term.toLowerCase()) ||
				data.terms
					?.replace(/[^a-zA-Z0-9&$@!?]/g, '_')
					.toLowerCase()
					.includes(term.replace(/-/g, ' ').toLowerCase()) ||
				data.terms?.toLowerCase().includes(term.toLowerCase())
			) {
				const result = {
					slug: file.replace(/.mdx$/, '').toLowerCase(),
					title: data.title,
					term: term.replace(/ /g, '-'),
					excerpt: await extractExcerpt(content),
				}
				notesWithTerm.push(result)
			}
		} else console.error('could not find', file)
	})
	return notesWithTerm
}

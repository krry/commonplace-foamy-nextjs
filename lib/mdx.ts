import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remarkPlugins from './remark'
import read from 'fs-readdir-recursive'
import MDXComponents from '../components/MDXComponents'
import renderToString from 'next-mdx-remote/render-to-string'

const root = process.cwd()
const mdxDirPath = path.join(root, 'docs')
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

const exceptAcceptables = /[^a-zA-Z0-9&$@!?-]/g

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
					.replace(exceptAcceptables, '_')
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

function extractExcerpt(text) {
	const excerpt = []
	const paragraphs = text
		.replace(/^`{3}([\S]+)?\n([\s\S]+)\n`{3}/, '')
		.split('\n')
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
	excerpt.push('more…')
	// TODO: figure out if we can renderToString and then hydrate this excerpt in the template like we do in [...slug].js
	return excerpt.join('\n')
}

function wrapUpNote(term, file, data, content) {
	return {
		slug: file.replace(/.mdx$/, '').toLowerCase(),
		title: data.title,
		term: term.replace(/ /g, '-'),
		excerpt: extractExcerpt(content),
	}
}

export async function getNotesWithTerm(term) {
	const notesWithTerm = mdxFilePaths.map(file => {
		if (!file) return
		const fullFilePath = path.join(mdxDirPath, file)
		const fileContents = fs.readFileSync(fullFilePath, 'utf8')
		const { data, content } = matter(fileContents)
		if (
			content.toLowerCase().includes('#' + term.toLowerCase()) ||
			data.terms?.toLowerCase().includes(term.toLowerCase()) ||
			data.terms
				?.replace(/ /g, '-')
				.replace(/#/g, '')
				.replace(exceptAcceptables, '_')
				.toLowerCase()
				.includes(term.toLowerCase()) ||
			(term === 'untagged' && !/\B#\w+\B/.test(content) && !data.terms)
		) {
			return wrapUpNote(term, file, data, content)
		}
	})
	return notesWithTerm.filter(Boolean)
}

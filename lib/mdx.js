import fs, { truncateSync } from 'fs'
import path from 'path'
import read from 'fs-readdir-recursive'
import prepend from 'prepend-file'
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
		mdxOptions: {
			remarkPlugins,
		},
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

export async function patchMissingFrontMatter (dirPath) {
	// takes in an array of filepaths
	console.log('=============================')
	console.log('patching missing front matter')
	const files = read(dirPath)
	const filesFixed = []
	files.forEach((file) => {
		const filename = path.join(dirPath, file)
		const source = fs.readFileSync(filename, 'utf8')
		// checks each file for front matter
		const { data, content } = matter(source)
		console.log('existing front matter data', data)
		// first we check if there is no frontmatter data at all
		// an empty object check is complicated
		// https://flaviocopes.com/javascript-check-empty-object/
		// if (Object.keys(data).length === 0 && data.constructor === Object) {
		// 	console.log('frontmatter is empty', isEmpty)
		// 	// looks for a line with a yaml fence
		// 	const fenceLine = content.split('\n').findIndex((line) => line === '---')
		// 	// if there is no fence in the first three lines, make one
		// 	if (fenceLine < 0 || fenceLine > 2) {
		// 		data.fence_open = '---'
		// 		data.fence_close = '---\n'
		// 	}
		// }
		// otherwise we have existing frontmatter and must be careful
		if (typeof data.title === 'undefined') {
			// looks for an h1 headline in the markdown
			const headline = content.split('\n').find((line) => line.startsWith('# '))
			console.log('headline is', headline)
			const headlineIndex = content.split('\n').findIndex((line) => line.startsWith('# '))
			console.log('headlineIndex is', headlineIndex)
			// if there is a headline and it is within the first ten lines of the doc,
			// we use it as the title, otherwise we use the filename converted to Title Case
			let titleStr
			if (headlineIndex !== -1 && headlineIndex < 10) {
				titleStr = headline.slice(2)
			} else {
				const fileTitle = file
					.replace(/\.mdx?$/, '')
					.split('-')
					.map((word) => {
						return word.charAt(0).toUpperCase() + word.slice(1)
					})
				function allNumbers (arr) {
					return arr.every(node => {
						console.log('node', typeof node)
						return typeof node === 'number'
					})
				}
				titleStr = allNumbers(fileTitle) ? fileTitle.join('-') : fileTitle.join(' ')
			}
			// we append a newline to this new title and cache it in our newFrontMatter obj
			data.title = titleStr
		}
		// if there is a time already, we copy that to the `created` field
		if (data.time?.toLocaleString()) {
			data.created = data.time
		} else {
			// if not we pull in timestamps from the file's metadata
			// fs.stat can synchronously read the created and modified dates for the file
			const { birthtime, mtime } = fs.statSync(path.join(filename))
			if (birthtime && typeof data.created === 'undefined') {
				data.created = birthtime
			}
			if (mtime && typeof data.modified === 'undefined') {
				data.modified = mtime
			}
			// with the dates cached in our data obj we proceed to the prependerance
		}
		// // it's a little more complicated than you might expect to
		// // remove the first line of dashes `---` if present
		console.log('looking at file')
		fs.readFile(filename, function (err, data) {
			// read file to memory
			if (!err) {
				data = data.toString() // stringify buffer
				// find the position of any divider line element
				const openFencePosition = data.toString().indexOf('---\n')
				if (openFencePosition !== -1) {
					// if new line element found
					const closeFencePosition = data
						.toString()
						.substr(openFencePosition + 1)
						.indexOf('---\n')
					if (closeFencePosition !== -1) {
						// subtract string based on first line length
						data = data.substr(closeFencePosition + 5)
						console.log('removing front matter')
						// save this as the file
						fs.writeFile(filename, data, function (err) {
							if (err) console.log(err)
						})
					}
				} else {
					console.log('no frontmatter found')
				}
			} else {
				console.log(err)
			}
		})
		const fence = '---\n'
		const matt = []
		Object.entries(data).forEach(([k, v]) => {
			matt.push(k + ': ' + v.toString() + '\n')
		})
		const frontmatter = fence + matt.join('') + fence
		;(async function () {
			await prepend(filename, frontmatter)
		})()
		filesFixed.push(file)
	})
	return { files, filesFixed }
}

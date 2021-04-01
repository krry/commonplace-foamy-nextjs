import fs from 'fs'
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

export async function getFileBySlug(slug) {
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

export async function getAllFilesFrontMatter() {
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

export async function patchMissingFrontMatter(dirPath) {
	// takes in an array of filepaths
	const files = read(dirPath)

	return files.forEach((file) => {
		const filename = path.join(dirPath, file)
		const source = fs.readFileSync(filename, 'utf8')
		// checks each file for front matter
		const { data, content, isEmpty } = matter(source)
		console.log('front matter data', data)
		const nfm = {
			fence_open: '',
			title: '',
			created: '',
			modified: '',
			fence_close: '',
			...data,
		}
		if (!data.title) {
			// looks for a title near the top
			const headingLine = content.split('\n').find((node) => node.startsWith('# '))
			const headingLineIndex = content.split('\n').findIndex((node) => node.startsWith('# '))
			nfm.title =
				headingLineIndex > -1
					? headingLine.slice(2)
					: file.split('-').map((word) => {
							return word.charAt(0).toUpperCase + word.slice(1)
					  })
			nfm.title = '\ntitle: ' + nfm.title
		}
		if (!data.time) {
			// reads the created and modified dates for the file
			const { birthtime, mtime } = fs.statSync(path.join(filename))
			nfm.created = '\ncreated: ' + birthtime.toISOString()
			nfm.modified = '\nmodified: ' + mtime.toISOString()
		}
		if (!data) {
			console.log('isEmpty', isEmpty)
			// adds front matter using these data
			let frontmatterFenceLine = content.split('\n').findIndex('---')
			if (frontmatterFenceLine < 0) {
				nfm.fence_open = '---'
				nfm.fence_close = '\n---'
			}
			prepend(filename, nfm.open_fence + nfm.title + nfm.created + nfm.modified + nfm.fence_close)
		} else {
			var filePath = filename // path to file

			fs.readFile(filePath, function (err, data) {
				// read file to memory
				if (!err) {
					data = data.toString() // stringify buffer
					var position = data.toString().indexOf('\n') // find position of new line element
					if (position != -1) {
						// if new line element found
						data = data.substr(position + 1) // subtract string based on first line length

						fs.writeFile(filePath, data, function (err) {
							// write file
							if (err) {
								// if error, report
								console.log(err)
							}
						})
					} else {
						console.log('no lines found')
					}
				} else {
					console.log(err)
				}
			})
			prepend(filename, '---' + nfm.title + nfm.created + nfm.modified + '\n---')
		}
	})
}

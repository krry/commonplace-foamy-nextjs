import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import prepend from 'prepend-file'
import read from 'fs-readdir-recursive'
let titless

export function removeFrontMatter(filename) {
	fs.readFile(filename, function (err, data) {
		if (!err) {
			data = data.toString()
			const openFencePosition = data.toString().indexOf('---\n')
			if (openFencePosition !== -1) {
				const closeFencePosition = data
					.toString()
					.substr(openFencePosition + 1)
					.indexOf('---\n')
				if (closeFencePosition !== -1) {
					data = data.substr(closeFencePosition + 5)
					fs.writeFile(filename, data, function (err) {
						if (err) console.error('error writing file', err)
					})
				}
			} else {
				console.warn('no frontmatter found')
			}
		} else {
			console.error(err)
		}
	})
}

function allNumbers(arr) {
	return arr.every(node => {
		return typeof node === 'number'
	})
}

function cleanseSymbols(str) {
	return str.replace(':', '-')
}

function cleanTitle(file, content) {
	// looks for an h1 headline in the markdown
	const headline = content.split('\n').find(line => line.startsWith('# '))
	// console.log('headline is',headline)
	const headlineIndex = content
		.split('\n')
		.findIndex(line => line.startsWith('# '))
	// console.log('headlineIndex is',headlineIndex)
	// if there is a headline and it is within the first ten lines of the doc,
	// we use it as the title, otherwise we use the filename converted to Title Case
	let titleStr
	if (headlineIndex !== -1 && headlineIndex < 10) {
		titleStr = cleanseSymbols(headline.slice(2))
		titless = false
	} else {
		titless = true
		const fileTitle = file
			.replace(/\.mdx?$/, '')
			.split('/')
			.slice(-1)[0]
			.split('-')
			.map(word => {
				return word.charAt(0).toUpperCase() + word.slice(1)
			})
		titleStr = allNumbers(fileTitle) ? fileTitle.join('-') : fileTitle.join(' ')
	}
	// we append a newline to this new title and cache it in our newFrontMatter obj
	return { title: cleanseSymbols(titleStr) }
}

function combForTags(content, tags) {
	if (tags.length > 0) {
		// keep those tags
	}
	return content
		.split('\n')
		.split(' ')
		.filter(word => {
			return (
				word.startsWith('#') &&
				word.length > 1 &&
				/[a-zA-Z0-9_.-]*/.test(word.substr(1))
			)
		})
		.map(tag => tag.slice(1))
}

async function prependFrontMatterToFile(data, file, filename) {
	const fence = '---\n'
	const matt = []
	Object.entries(data).forEach(([k, v]) => {
		if (v === null) return
		matt.push(k + ': ' + v.toString() + '\n')
	})
	let frontmatter = fence + matt.join('') + fence
	if (titless) {
		frontmatter += `\n# ${data.title}\n\n`
		await prepend(filename, frontmatter)
	}
	return file
}

export async function patchMissingFrontMatter(dirPath) {
	// takes in an array of filepaths
	// console.log('=============================')
	// console.log('patching missing front matter')
	const files = read(dirPath)
	const filesFixed = []

	files.forEach(file => {
		const filename = path.join(dirPath, file)
		const source = fs.readFileSync(filename, 'utf8')
		// checks each file for front matter
		// console.log('file to patch', file)
		const { data, content } = matter(source)
		// console.log('existing front matter data', data)
		if (/[:/[\]]/.test(data.title)) {
			// console.log('OOPS clearing symbols from the title')
			data.title = ''
		}
		// if no title field, make one with the heading
		if (typeof data.title === 'undefined') {
			data.title = cleanTitle(file, content)
		}
		// if there is no tags field, make one
		// if there is a tags field, preserve its data
		// and fill it with any tags in the content
		data.tags = combForTags(content, data.tags || null)

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
			// with the dates cached in our data obj we proceed to the prepending
		}
		removeFrontMatter(filename)
		const fixedFile = prependFrontMatterToFile(data, file, filename)
		filesFixed.push(fixedFile)
	})
	return { filesFixed }
}

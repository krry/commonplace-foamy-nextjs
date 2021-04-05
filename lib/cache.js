/*
 * cache for search
 * following [@matswainson's lead](https://medium.com/@matswainson/building-a-search-component-for-your-next-js-markdown-blog-9e75e0e7d210)
 */

const fs = require('fs')
const path = require('path')
const read = require('fs-readdir-recursive')
const matter = require('gray-matter')

function getNotes () {
	const notesDir = path.join(process.cwd(), '_notes')
	// const notesDir = path.join(process.cwd(), 'private')
	const filenames = read(notesDir)
	const notes = filenames.map(file => {
		const slug = file.replace(/\.mdx?$/, '')
		const fullPath = path.join(notesDir, file)
		const fileContents = fs.readFileSync(fullPath, 'utf8')
		const {data} = matter(fileContents)
		return {
			slug,
			title: data.title
		}
	})
	return JSON.stringify(notes)
}

const fileContents = `export const notes = ${getNotes()}`

try {
	fs.readdirSync('_cache')
} catch (e) {
	fs.mkdirSync('_cache')
}

fs.writeFile('_cache/data.js', fileContents, function(err) {
	if (err) return console.error('error writing to cache', err)
	console.log('notes cached for search')
})
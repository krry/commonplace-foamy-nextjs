const fs = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')
const read = require('fs-readdir-recursive')

const root = process.cwd()
const mdxDirPath = path.join(root, '_notes')

function collectFrontMatter(allNotes, noteSlug) {
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

function getAllFilesFrontMatter() {
	const files = read(mdxDirPath)
	// console.log('files size', files.length)
	return files.reduce(collectFrontMatter, [])
}

/* lets create an rss feed */
const feed = new RSS({
	title: 'The Commonplace of Kerrbear',
	description:
		'A zettelkasten-style digital garden full of half-baked poetry and other musings.',
	site_url: 'https://kerrbear.wtf',
	feed_url: 'https://kerrbear.wtf/rss.xml',
	image_url: 'https://kerrbear.wtf/favicons/favicon-512x512.png',
	// docs: 'https://kerrbear.wtf/rss/docs.html',
	author: 'Kerrbear',
	managingEditor: 'Kerrence Atmanaut Syndertron',
	webMaster: 'Kerrbear',
	dungeonMaster: 'Sir Bearskin the Spicerabbit',
	copyleft: '2021 Kerrbear',
	language: 'en',
	pubDate: '2021-04-28T02:47:09.481-0700',
	ttl: '60',
})

const matters = getAllFilesFrontMatter()

function generateRss() {
	/* loop over data and add to feed */
	matters.map(note => {
		// console.log('note here', note)
		const slug = note.slug ?? '/'
		feed.item({
			title: note?.title ?? 'titless',
			// description: note.excerpt,
			url: `https://kerrbear.wtf/${slug}`, // link to the item
			terms: note?.terms ?? ['untagged'],
			date:
				note.modified ??
				note.created ??
				note.time ??
				new Date().toLocaleString(), // any format that js Date can parse.
		})
	})
	// cache the xml to send to clients
	const rss = feed.xml({ indent: true })
	fs.writeFileSync('./public/feed.xml', rss)
}

generateRss()

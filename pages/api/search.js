import FuzzySearch from 'fuzzy-search'
import {notes} from '../../_cache/data'

const searcher = new FuzzySearch(notes, ['slug', 'title'], {
  // caseSensitive: false,
	sort: true
})

export default (req, res) => {
	console.log('notes', notes);
	if (req.query.q) {
		const results = notes.filter(note => {
			if (!note.title) {
				console.error('note without title', note)
			}
			if (typeof note.title === 'string') {
				return note.title.toLowerCase().includes(req.query.q)
			}
		})
		// const results = searcher.search(req.query.q)
		console.log('results', results);
		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify({results}))
	}
}

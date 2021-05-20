function arrayFromCommaList(list) {
	return list.split(',').map(w => w.trim())
}

export default function NoteFields({ metadata }): JSX.Element {
	const terms = metadata?.terms ?? 'untagged'
	const time = metadata?.time ?? metadata?.created ?? new Date()

	// console.log('time', typeof time);

	const fields = {
		title: metadata?.title ?? 'Untitled',
		time: time.toLocaleString().split(' ').slice(0, -4).join(' '),
		terms: arrayFromCommaList(terms),
	}
	return (
		<>
			<dl className='fields'>
				<dt>Title</dt>
				<dd>{fields.title}</dd>
				<dt>Time</dt>
				<dd>{fields.time}</dd>
				<dt>Terms</dt>
				{fields.terms.map((term, index) => (
					<dd key={index}>
						<a href={'/terms/' + term.replace(/ /g, '-').toLowerCase()}>
							{'#' + term}
						</a>
					</dd>
				))}
			</dl>
		</>
	)
}

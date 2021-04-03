function arrayFromCommaList(list) {
	return list.split(',').map((w) => w.trim())
}

export default function NoteFields({ metadata }) {
	const tags = metadata?.tags ?? 'untagged'
	const time = metadata?.time ?? new Date()

	const fields = {
		title: metadata?.title ?? 'Untitled',
		time: time.toLocaleString().replace(',', ''),
		tags: arrayFromCommaList(tags),
	}
	return (
		<>
			<dl>
				<dt>Title</dt>
				<dd>{fields.title}</dd>
				<dt>Time</dt>
				<dd>{fields.time}</dd>
				<dt>Tags</dt>
				{fields.tags.map((tag, index) => (
					<dd key={index}>
						<a href={'/' + tag}>#{tag}</a>
					</dd>
				))}
			</dl>
		</>
	)
}

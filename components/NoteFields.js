function arrayFromCommaList(list) {
	return list.split(',').map((w) => w.trim())
}

export default function NoteFields({ frontMatter }) {
	const tags = frontMatter?.tags ?? 'untagged'
	const time = frontMatter?.time ?? new Date()

	const metadata = {
		title: frontMatter?.title ?? 'Untitled',
		time: time.toLocaleString().replace(',', ''),
		tags: arrayFromCommaList(tags),
	}
	return (
		<>
			<dl>
				<dt>Title</dt>
				<dd>{metadata.title}</dd>
				<dt>Time</dt>
				<dd>{metadata.time}</dd>
				<dt>Tags</dt>
				{metadata.tags.map((tag, index) => (
					<dd key={index}>
						<a href={'/' + tag}>#{tag}</a>
					</dd>
				))}
			</dl>
		</>
	)
}

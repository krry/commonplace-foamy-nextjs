import Link from 'next/link'

const now = new Date()
const thisYear = now.getFullYear()

export default function CopyLeft(): JSX.Element {
	return (
		<h6>
			<span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>
				©
			</span>
			<span> {thisYear} </span>
			<Link href='https://krry.dev'>Atmanautica</Link>
		</h6>
	)
}

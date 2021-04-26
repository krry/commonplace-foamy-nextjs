import Link from 'next/link'

const now = new Date()
const thisYear = now.getFullYear()

export default function CopyLeft() {
	return (
		<h6>
			<span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>©</span>
			<span> {thisYear} </span>
			<Link href='https://atmanautica.com'>Atmanautica</Link>
		</h6>
	)
}

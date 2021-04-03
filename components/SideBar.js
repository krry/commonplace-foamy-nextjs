import Link from 'next/link'
import NoteFields from './NoteFields'
import CopyLeft from './CopyLeft'

export default function SideBar({metadata}) {
	// console.log('metadata', metadata);
	if (!metadata.slug) return null
	return (
		<aside className="sidebar">
			<NoteFields metadata={metadata} />
			<hr className="part" />
			<SiteNav location="side" />
			<h4>
				<Link href="/">Commonplace</Link>
			</h4>
			<CopyLeft />
		</aside>
	)
}

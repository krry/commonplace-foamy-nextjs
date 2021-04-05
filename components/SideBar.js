import Link from 'next/link'
import NoteFields from './NoteFields'
import CopyLeft from './CopyLeft'
import SiteNav from './SiteNav'

export default function SideBar({metadata}) {
	// console.log('metadata', metadata);
	if (!metadata?.slug) return null
	return (
		<aside className="sidebar">
			<NoteFields metadata={metadata} />
			<hr className="part" />
			<SiteNav location="side" />
			<h4>
				<Link href="/">🏠</Link>
			</h4>
			<CopyLeft />
		</aside>
	)
}

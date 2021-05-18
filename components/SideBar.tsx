import NoteFields from './NoteFields'
import CopyLeft from './CopyLeft'
import SiteNav from './SiteNav'

export default function SideBar({ metadata }): JSX.Element {
	// console.log('metadata', metadata);
	if (!metadata?.slug) return null
	return (
		<aside className='sidebar'>
			<NoteFields metadata={metadata} />
			<hr className='part' />
			<SiteNav location='side' />
			<CopyLeft />
		</aside>
	)
}

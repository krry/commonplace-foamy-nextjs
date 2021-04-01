import Link from 'next/link'

export default function SiteNav({ location }) {
	return (
		<nav className={'tree ' + location}>
			<ul className="top">
				<li className="primary">
					<Link href="/projects">Projects</Link>
					<ul className="second">
						<li className="tertiary">
							<Link href="/projects/nameless">Nameless</Link>
						</li>
						<li className="tertiary">
							<Link href="/projects/the-well-of-being">The Well of Being</Link>
						</li>
						<li className="tertiary">
							<Link href="/projects/this-is-it">This is It</Link>
						</li>
						<li className="tertiary">
							<Link href="/projects/commonplace">Commonplace</Link>
						</li>
						<li className="tertiary">
							<Link href="/projects/easeness">Easeness</Link>
						</li>
					</ul>
				</li>
				<li className="primary">
					<Link href="/areas">Areas</Link>
					<ul className="second">
						<li className="tertiary">
							<Link href="/areas/atmanaut">Atmanaut</Link>
						</li>
						<li className="tertiary">
							<Link href="/areas/get-real">Get Real</Link>
						</li>
						<li className="tertiary">
							<Link href="/areas/sovereignty">Sovereignty</Link>
						</li>
						<li className="tertiary">
							<Link href="/areas/full-smile">Full Smile</Link>
						</li>
					</ul>
				</li>
				<li className="secondary">
					<Link href="/resources">Resources</Link>
				</li>
				<li className="secondary">
					<Link href="/archives">Archives</Link>
				</li>
				<li className="secondary">
					<Link href="/projects/commonplace">Meta</Link>
				</li>
			</ul>
		</nav>
	)
}

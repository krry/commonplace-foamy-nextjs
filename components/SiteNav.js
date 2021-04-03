import Link from 'next/link'

export default function SiteNav({ location }) {
	return (
		<nav className={'tree ' + location}>
			<ul className="top">
				<li className="primary">
					<Link href="/intend">Intend</Link>
					<ul className="second">
						<li className="tertiary">
							<Link href="/intend/nameless">Nameless</Link>
						</li>
						<li className="tertiary">
							<Link href="/intend/the-well-of-being">The Well of Being</Link>
						</li>
						<li className="tertiary">
							<Link href="/intend/this-is-it">This is It</Link>
						</li>
						<li className="tertiary">
							<Link href="/intend/commonplace">Commonplace</Link>
						</li>
						<li className="tertiary">
							<Link href="/intend/easeness">Easeness</Link>
						</li>
					</ul>
				</li>
				<li className="primary">
					<Link href="/attend">Attend</Link>
					<ul className="second">
						<li className="tertiary">
							<Link href="/attend/atmanaut">Atmanaut</Link>
						</li>
						<li className="tertiary">
							<Link href="/attend/get-real">Get Real</Link>
						</li>
						<li className="tertiary">
							<Link href="/attend/sovereignty">Sovereignty</Link>
						</li>
						<li className="tertiary">
							<Link href="/attend/full-smile">Full Smile</Link>
						</li>
					</ul>
				</li>
				<li className="secondary">
					<Link href="/remember">Remember</Link>
				</li>
				<li className="secondary">
					<Link href="/forget">Forget</Link>
				</li>
				<li className="secondary">
					<Link href="/intend/commonplace">Meta</Link>
				</li>
			</ul>
		</nav>
	)
}

import Link from 'next/link'
import { GiLightningBow, GiElephantHead, GiSpyglass, GiBottleVapors, GiSpellBook, GiFairyWings, GiWell, GiSwanBreeze, GiFlyingTrout, GiFlamedLeaf, GiDropletSplash, GiMagicGate, GiDiamondsSmile, GiCrownedHeart } from 'react-icons/gi'

export default function SiteNav({ location }) {
	return (
		<nav className={'tree ' + location}>
			<ul className="top">
				<li className="primary">
					<Link href="/intend">
						<a>
							<GiLightningBow className="icon"/>
							Intend
							<GiLightningBow className="icon flipX"/>
						</a>
					</Link>
					<ul className="second">
						<li className="tertiary">
							<Link href="/intend/commonplace">
								<a>
									Commonplace
									<GiSpellBook
										className="icon"/>
								</a>
							</Link>
						</li>
						<li className="tertiary">
							<Link href="/intend/nameless">
								<a>
									Nameless
									<GiFlyingTrout
										className="icon"/>
								</a>
							</Link>
						</li>
						<li className="tertiary">
							<Link href="/intend/easeness">
								<a>
									Easeness
									<GiSwanBreeze className="icon"/>
								</a>
							</Link>
						</li>
						<li className="tertiary">
							<Link href="/intend/this-is-it">
								<a>
									This is It
									<GiFlamedLeaf className="icon"/>
								</a>
							</Link>
						</li>
						<li className="tertiary">
							<Link href="/intend/the-well-of-being">
								<a>
									The Well of Being
									<GiWell className="icon"/>
								</a>
							</Link>
						</li>
					</ul>
				</li>
				<li className="primary">
					<Link href="/attend">
						<a>
							<GiSpyglass className="icon flipXY"/>
							Attend
							<GiSpyglass className="icon flipY"/>
						</a>
					</Link>
					<ul className="second">
						<li className="tertiary">
							<Link href="/attend/atmanaut">
								<a>
									Atmanaut
									<GiDropletSplash className="icon"/>
								</a>
							</Link>
						</li>
						<li className="tertiary">
							<Link href="/attend/get-real">
								<a>
									Get Real
									<GiMagicGate className="icon"/>
								</a>
							</Link>
						</li>
						<li className="tertiary">
							<Link href="/attend/sovereignty">
								<a>
									Sovereignty
									<GiCrownedHeart className="icon"/>
								</a>
							</Link>
						</li>
						<li className="tertiary">
							<Link href="/attend/full-smile">
								<a>
									Full Smile
									<GiDiamondsSmile className="icon"/>
								</a>
							</Link>
						</li>
					</ul>
				</li>
				<div className="primary trans">
					<li className="secondary">
						<Link href="/remember">
							<a>
								Remember
								<GiElephantHead className="icon"/>
							</a>
						</Link>
					</li>
					<li className="secondary">
						<Link href="/forget">
							<a>
								Forget
								<GiBottleVapors className="icon"/>
							</a>
						</Link>
					</li>
					<li className="secondary">
						<Link href="/intend/commonplace">
							<a>
								Meta
								<GiSpellBook className="icon"/>
							</a>
						</Link>
					</li>
					<li className="secondary">
						<Link href="/intend/fair-method">
							<a>
								F.A.I.R.
								<GiFairyWings className="icon"/>
							</a>
						</Link>
					</li>
				</div>
			</ul>
		</nav>
	)
}

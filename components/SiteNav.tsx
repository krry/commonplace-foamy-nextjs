import Link from 'next/link'
import {
	GiLightningBow,
	GiElephantHead,
	GiSpyglass,
	GiBottleVapors,
	GiSpellBook,
	GiFairyWings,
	GiWell,
	GiSwanBreeze,
	GiFlyingTrout,
	GiFlamedLeaf,
	GiDropletSplash,
	GiMagicGate,
	GiDiamondsSmile,
	GiCrownedHeart,
	GiBabyFace,
} from 'react-icons/gi'

export default function SiteNav({ location }): JSX.Element {
	return (
		<nav className={'tree ' + location}>
			<ul className='top'>
				<li className='primary'>
					<Link href='/intend'>
						<a>
							<GiLightningBow className='icon before' />
							Intend
							<GiLightningBow className='icon flipX after' />
						</a>
					</Link>
					<ul className='second'>
						<li className='tertiary'>
							<Link href='/intend/commonplace'>
								<a>
									Commonplace
									<GiSpellBook className='icon after' />
								</a>
							</Link>
						</li>
						<li className='tertiary'>
							<Link href='/intend/nameless'>
								<a>
									Nameless
									<GiFlyingTrout className='icon after' />
								</a>
							</Link>
						</li>
						<li className='tertiary'>
							<Link href='/intend/easeness'>
								<a>
									Easeness
									<GiSwanBreeze className='icon after' />
								</a>
							</Link>
						</li>
						<li className='tertiary'>
							<Link href='/intend/this-is-it'>
								<a>
									This is It
									<GiFlamedLeaf className='icon after' />
								</a>
							</Link>
						</li>
						<li className='tertiary'>
							<Link href='/intend/the-well-of-being'>
								<a>
									The Well of Being
									<GiWell className='icon after' />
								</a>
							</Link>
						</li>
					</ul>
				</li>
				<li className='primary'>
					<Link href='/attend'>
						<a>
							<GiSpyglass className='icon flipXY before' />
							Attend
							<GiSpyglass className='icon flipY after' />
						</a>
					</Link>
					<ul className='second'>
						<li className='tertiary'>
							<Link href='/attend/atmanaut'>
								<a>
									Atmanaut
									<GiDropletSplash className='icon after' />
								</a>
							</Link>
						</li>
						<li className='tertiary'>
							<Link href='/attend/get-real'>
								<a>
									Get Real
									<GiMagicGate className='icon after' />
								</a>
							</Link>
						</li>
						<li className='tertiary'>
							<Link href='/attend/sovereignty'>
								<a>
									Sovereignty
									<GiCrownedHeart className='icon after' />
								</a>
							</Link>
						</li>
						<li className='tertiary'>
							<Link href='/attend/full-smile'>
								<a>
									Full Smile
									<GiDiamondsSmile className='icon after' />
								</a>
							</Link>
						</li>
					</ul>
				</li>
				<div className='primary trans'>
					<li className='secondary'>
						<Link href='/remember'>
							<a>
								Remember
								<GiElephantHead className='icon after' />
							</a>
						</Link>
					</li>
					<li className='secondary'>
						<Link href='/forget'>
							<a>
								Forget
								<GiBottleVapors className='icon after' />
							</a>
						</Link>
					</li>
					<li className='secondary'>
						<Link href='/intend/commonplace'>
							<a>
								Meta
								<GiSpellBook className='icon after' />
							</a>
						</Link>
					</li>
					<li className='secondary'>
						<Link href='/intend/fair-method'>
							<a>
								F.A.I.R.
								<GiFairyWings className='icon after' />
							</a>
						</Link>
					</li>
					<li className='secondary'>
						<Link href='/intend/gratitude'>
							<a>
								Gratitude
								<GiBabyFace className='icon after' />
							</a>
						</Link>
					</li>
				</div>
			</ul>
		</nav>
	)
}

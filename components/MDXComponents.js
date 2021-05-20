import AnchorTag from './AnchorTag'
import CodeBlock from './CodeBlock'
import Image from './Image'
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

const MDXComponents = {
	a: props => <AnchorTag {...props} />,
	code: CodeBlock,
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
	img: props => (
		<div className='nextImageWrapper'>
			<Image {...props} />
		</div>
	),
	Image: props => (
		<div className='nextImageWrapper'>
			<Image {...props} />
		</div>
	),
}

MDXComponents.a.displayName = 'AnchorTag'
MDXComponents.code.displayName = 'CodeBlock'
MDXComponents.img.displayName = 'Image'
MDXComponents.Image.displayName = 'Image'

export default MDXComponents

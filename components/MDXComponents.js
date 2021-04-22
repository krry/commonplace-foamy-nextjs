import AnchorTag from '../components/AnchorTag'
import CodeBlock from '../components/CodeBlock'
import Image from '../components/Image'

const MDXComponents = {
	a: (props) => <AnchorTag {...props} />,
	code: CodeBlock,
	img: (props) => (
		<div className="nextImageWrapper">
			<Image {...props} />
		</div>
	),
	Image: (props) => (
		<div className="nextImageWrapper">
			<Image {...props} />
		</div>
	),
}

MDXComponents.a.displayName = 'AnchorTag'
MDXComponents.code.displayName = 'CodeBlock'
MDXComponents.img.displayName = 'Image'
MDXComponents.Image.displayName = 'Image'

export default MDXComponents

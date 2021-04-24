import {useState} from 'react'
import {css} from '@emotion/react'
import CircleLoader from 'react-spinners/CircleLoader'

const override = css`
	display: block;
	margin: 0 auto;
	border-color: blue;
`

export default function Loading() {
	const windowed = typeof window !== 'undefined'
	const flair = windowed ? getComputedStyle(document.documentElement).getPropertyValue('--flair') : '#1bd9d9'
	const loaderHeight = windowed ? document.documentElement.offsetHeight / 3 : 360
	let [loading] = useState(true)
	let [color] = useState(flair)
	return (
		<div className="loading-rack">
			<CircleLoader color={color} loading={loading} css={override} size={loaderHeight} />
			{/* <button className="btn" onClick={() => setLoading(!loading)}>Toggle Loader</button> */}
			{/* <input
				value={color}
				onChange={(input) => setColor(input.target.value)}
				placeholder="Color of the loader"
			/> */}

		</div>
	)
}

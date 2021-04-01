const Button = ({ children }) => {
	return (
		<button
			style={{
				borderRadius: '0.25em',
				border: '1px solid var(--capri)',
				backgroundColor: 'var(--zephyr)',
				padding: '0.33em 0.67em',
				cursor: 'pointer',
				fontSize: '1.25em',
			}}>
			{children}
		</button>
	)
}

export default Button

import { useEffect, useState } from 'react'

export default function Clock() {
	const [ms, setMs] = useState(1)

	useEffect(() => {
		const timer = setInterval(() => {
			setMs(ms + 2)
		}, 2)
		// clearing interval
		return () => clearInterval(timer)
	})

	return <h3 className="clock brobding">{ms}</h3>
}

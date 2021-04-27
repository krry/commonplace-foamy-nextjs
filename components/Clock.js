import { useEffect, useState } from 'react'
import Animals from './Animals'

export default function Clock() {
	const [ms, setMs] = useState(1)

	useEffect(() => {
		const timer = setInterval(() => {
			setMs(ms + 2)
		}, 72)
		// clearing interval
		return () => clearInterval(timer)
	})

	return <Animals count={5} />
}

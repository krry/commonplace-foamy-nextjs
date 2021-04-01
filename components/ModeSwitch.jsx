import React, { useEffect, useState } from 'react'

let fresh = true

const checkDarkMode = () => {
	if (!matchMedia) return
	const userPrefDark = matchMedia && matchMedia('(prefers-color-scheme: dark)').matches
	const storedPrefDark = localStorage && localStorage.getItem('mode') === 'dark'
	return userPrefDark || storedPrefDark
}

const watchDarkMode = () => {
	if (!matchMedia) return
	const darkMediaQuery = matchMedia('(prefers-color-scheme: dark)')
	darkMediaQuery.addEventListener('change', applyDarkMode)
}

const applyDarkMode = (_, darkMode) => {
	if (!window || !document) return
	const prevDark = checkDarkMode && fresh
	if (prevDark || darkMode) {
		localStorage.setItem('mode', 'dark')
		document.documentElement.classList.add('dark')
		document.documentElement.classList.remove('light')
	} else {
		localStorage.setItem('mode', 'light')
		document.documentElement.classList.add('light')
		document.documentElement.classList.remove('dark')
	}
}

const ModeSwitch = () => {
	const [darkMode, setDarkMode] = useState(false)
	const flipMode = () => {
		fresh = false
		setDarkMode(!darkMode)
	}

	useEffect(() => {
		setDarkMode(checkDarkMode())
		watchDarkMode()
	}, [])

	useEffect(() => {
		applyDarkMode(null, darkMode)
	}, [darkMode])

	return (
		<>
			<button
				type="button"
				className="modeSwitch"
				aria-pressed={darkMode ? 'true' : 'false'}
				onClick={flipMode}>
				<span>{darkMode ? '🌝' : '🌚'}</span>
				<span aria-hidden="true" hidden>
					{darkMode ? 'dark mode' : 'light mode'}
				</span>
			</button>
		</>
	)
}

export default ModeSwitch

import {useCallback, useRef, useState, useEffect} from 'react'
import Link from 'next/link'
// import {useHotkeys} from 'react-hotkeys-hook'

export default function Search () {
	const searchRef = useRef(null)
	const [query, setQuery] = useState('')
	const [active, setActive] = useState(false)
	const [results, setResults] = useState([])

	// useHotkeys('command+k', () => searchRef.current.focus())
	// useHotkeys('esc', () => searchRef.current.blur())

	const searchEndpoint = query => `api/search?q=${query}`
	const controller = new AbortController()
	const signal = controller.signal

	const onChange = useCallback((event) => {
		const query = event.target.value
		setQuery(query)
		if (query.length) {
			// controller.abort()
			fetch(searchEndpoint(query), {signal})
				.then(res => res.json())
				.then(res => {
					setResults(res.results)
				})
		} else setResults([])
	}, [])

	const onFocus = useCallback(() => {
		setActive(true)
		window.addEventListener('click', onClick)
	}, [])

	const onClick = useCallback((event) => {
		if (searchRef.current && !searchRef.current.contains(event.target)) {
			setActive(false)
			window.removeEventListener('click', onClick)
		}
	}, [])

	return (
		<div
			className="searchContainer"
			ref={searchRef}
		>
			<input
				type="search"
				className="search"
				onChange={onChange}
				onFocus={onFocus}
				placeholder="Search notes…"
				value={query}
			/>
			{active && results.length > 0 && (
				<ul className="results">
					{results.map(({slug, title}) => {
						return (
							<li className="result" key={slug}>
								<Link href="/[slug]" as={`/${slug}`}>
									<a>{title}</a>
								</Link>
							</li>
						)
					}
					)}
				</ul>
			)}
		</div>
	)
}

import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import { useHotkeys } from 'react-hotkeys-hook'

export default function Search(): JSX.Element {
	const searchRef = useRef(null)
	const inputRef = useRef(null)
	const [query, setQuery] = useState('')
	const [active, setActive] = useState(false)
	const [results, setResults] = useState([])

	useHotkeys('command+k', () => {
		// console.log('commanded', event.key)
		inputRef.current.focus()
		inputRef.current.addEventListener('keydown', handleKeydown)
	})

	function handleKeydown(evt) {
		if (evt.key === 'Escape') {
			inputRef.current.blur()
			// console.log('escaped', evt.key)
		}
		if (evt.key === 'ArrowDown') {
			// TODO: advance focus down the results list
		}
		if (evt.key === 'ArrowUp') {
			// TODO: advance focus up the results list
		}
	}

	const searchEndpoint = query => `/api/search?q=${query}`

	const onChange = useCallback(event => {
		const query = event.target.value
		setQuery(query)
		if (query.length) {
			fetch(searchEndpoint(query))
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

	const onClick = useCallback(event => {
		if (searchRef.current && !searchRef.current.contains(event.target)) {
			setActive(false)
			window.removeEventListener('click', onClick)
		}
	}, [])

	return (
		<div className='searchContainer' ref={searchRef}>
			<input
				ref={inputRef}
				type='search'
				className='search'
				onChange={onChange}
				onFocus={onFocus}
				placeholder='Search notes…'
				value={query}
			/>
			{active && results.length > 0 && (
				<ul className='results'>
					{results.map(({ slug, title }, index) => {
						return (
							<li className='result' key={slug} tabIndex={index + 1}>
								<Link href='/[slug]' as={`/${slug}`}>
									<a>{title}</a>
								</Link>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}

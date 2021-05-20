import { useTheme } from 'next-themes'

export const themes = [
	{ name: 'system', emoji: '💻' },
	{ name: 'light', emoji: '🌞' },
	{ name: 'dark', emoji: '🌛' },
	{ name: 'land', emoji: '🌳' },
	{ name: 'sea', emoji: '🐳' },
	{ name: 'fuch', emoji: '🌺' },
]

export default function ThemeSwitch(): JSX.Element {
	const { theme, setTheme } = useTheme()
	let dex = themes.findIndex(node => node.name === theme) ?? 0
	let themoji = themes[dex]?.emoji ?? '🌳'

	const nextTheme = () => {
		dex = dex + 1 < themes.length ? dex + 1 : 0
		setTheme(themes[dex].name)
		themoji = themes[dex].emoji
	}

	return (
		<>
			<button type='button' className='themeSwitch' onClick={nextTheme}>
				<span>{themoji}</span>
				<span aria-hidden='true' hidden>
					{theme + 'mode'}
				</span>
			</button>
		</>
	)
}

import { ThemeProvider } from 'next-themes'
import { themes } from '../components/ThemeSwitch'
import '@fontsource/quicksand/400.css'
import '@fontsource/quicksand/variable.css'
import '@fontsource/inconsolata/400.css'
import '@fontsource/inconsolata/variable.css'
import '@fontsource/museomoderno/400.css'
import '@fontsource/museomoderno/variable.css'
import '../styles/global.css'
import '../styles/prism-theme-synthwave.css'

// export const reportWebVitals = (metric) => console.log(metric)

export default function App ({ Component, pageProps }) {
	const themeNames = themes.map((t) => t.name)
	return (
		<ThemeProvider attribute="class" themes={themeNames}>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

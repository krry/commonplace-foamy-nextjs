import dynamic from 'next/dynamic'
import { ThemeProvider } from 'next-themes'
import { Provider } from 'next-auth/client'
import { useRouter } from 'next/router'
import { themes } from '../components/ThemeSwitch'
import '../styles/global.css'
import '../styles/prism-theme-synthwave.css'
import '../styles/recursive-font.css'

const TinaWrapper = dynamic(() => import('../components/TinaWrapper'))

export default function App({ Component, pageProps }) {
	const router = useRouter()
	const themeNames = themes.map(t => t.name)

	const Guts = (
		<ThemeProvider attribute='class' themes={themeNames}>
			<Provider
				options={{ keepAlive: 0, clientMaxAge: 0 }}
				session={pageProps.session}>
				<Component {...pageProps} />
			</Provider>
		</ThemeProvider>
	)

	if (router.pathname.startsWith('/admin')) {
		return <TinaWrapper>{Guts}</TinaWrapper>
	}

	return Guts
}

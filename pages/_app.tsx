import App from 'next/app'
import { TinaCMS, TinaProvider } from 'tinacms'
import { GithubClient, TinacmsGithubProvider } from 'react-tinacms-github'
import { NextGithubMediaStore } from 'next-tinacms-github'
import { ThemeProvider } from 'next-themes'
import { themes } from '../components/ThemeSwitch'
import '../styles/global.css'
import '../styles/prism-theme-synthwave.css'
import '../styles/recursive-font.css'

export default class Site extends App {
	cms: TinaCMS
	constructor(props) {
		super(props)
		const github = new GithubClient({
			proxy: '/api/proxy-github',
			authCallbackRoute: '/api/create-github-access-token',
			clientId: process.env.GITHUB_CLIENT_ID,
			baseRepoFullName: process.env.REPO_FULL_NAME, // e.g.: tinacms/tinacms.org,
			baseBranch: process.env.BASE_BRANCH, // e.g., 'main'
			authScope: 'repo', // normally defaults to 'public_repo'
		})

		this.cms = new TinaCMS({
			enabled: !!props.pageProps.preview,
			apis: {
				github,
			},
			media: new NextGithubMediaStore(github),
			sidebar: props.pageProps.preview,
			toolbar: props.pageProps.preview,
		})
	}

	render() {
		const { Component, pageProps } = this.props
		// const router = useRouter()
		const themeNames = themes.map(t => t.name)
		return (
			<TinaProvider cms={this.cms}>
				<TinacmsGithubProvider
					onLogin={onLogin}
					onLogout={onLogout}
					error={pageProps.error}>
					{/** */}
					<EditLink cms={this.cms} />
					<ThemeProvider attribute='class' themes={themeNames}>
						<Component {...pageProps} />
					</ThemeProvider>
				</TinacmsGithubProvider>
			</TinaProvider>
		)
	}
}

const onLogin = async () => {
	const token = localStorage.getItem('tinacms-github-token') || null
	const headers = new Headers()

	if (token) {
		headers.append('Authorization', 'Bearer ' + token)
	}

	const resp = await fetch(`/api/preview`, { headers: headers })
	const data = await resp.json()

	if (resp.status == 200) window.location.href = window.location.pathname
	else throw new Error(data.message)
}

const onLogout = () => {
	return fetch(`/api/reset-preview`).then(() => {
		window.location.reload()
	})
}

export interface EditLinkProps {
	cms: TinaCMS
}

export const EditLink = ({ cms }: EditLinkProps) => {
	return (
		<button
			onClick={() => cms.toggle()}
			className={['btn', 'sm', 'buoy', 'b', 'r'].join(' ')}>
			{cms.enabled ? 'Done Editing' : 'Start Editing'}
		</button>
	)
}

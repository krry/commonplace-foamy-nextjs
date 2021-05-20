import { useGithubAuthRedirect } from 'react-tinacms-github'
import { GoOctoface } from 'react-icons/go'

// Our GitHub app redirects back to this page with auth code
export default function Authorizing() {
	// Let the main app know, that we received an auth code from the GitHub redirect
	useGithubAuthRedirect()

	return (
		<div className={['centered', 'flex', 'full'].join(' ')}>
			<h2>Please stand by…</h2>
			<GoOctoface color='var(--flair)' size='25vh' />
			<h2>Auth'ing with GitHub</h2>
		</div>
	)
}

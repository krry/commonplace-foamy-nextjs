import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
const { GITHUB_ID, GITHUB_SECRET, GITHUB_USER } = process.env

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		Providers.GitHub({
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET,
		}),
		// ...add more providers here
	],
	// https://next-auth.js.org/configuration/callbacks
	callbacks: {
		async signIn(user, account, profile) {
			// console.log('user signed in', user)
			// console.log('account signed in', account)
			// console.log('profile signed in', profile)
			return profile.login === GITHUB_USER
		},
		async jwt(token, user, account, profile, isNewUser) {
			// Add access_token to the token right after signin
			if (account?.accessToken) {
				token.accessToken = account.accessToken
			}
			// if (user) console.log('nextauth user', user)
			if (profile) console.log('nextauth profile', profile)
			// if (account) console.log('nextauth account', account)
			if (isNewUser) console.log('nextauth isNewUser', isNewUser)
			return token
		},
		async session(session, token) {
			// Add property to session, like an access_token from a provider.
			// console.log('nextauth session', session)
			// console.log('nextauth token', token)
			session.accessToken = token.accessToken
			return session
		},
	},
	// pages: {
	// signIn: '/auth/signin',
	// signOut: '/auth/signout',
	// error: '/auth/error', // Error code passed in query string as ?error=
	// newUser: null // If set, new users will be directed here on first sign in
	// },
})

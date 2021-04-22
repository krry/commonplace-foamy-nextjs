import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
const { GITHUB_ID, GITHUB_SECRET, GITHUB_USER } = process.env

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		Providers.GitHub({
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET
		}),
		// ...add more providers here
	],
	callbacks: {
		async signIn(user, account, profile) {
			console.log('user signed in', user)
			console.log('account signed in', account)
			console.log('profile signed in', profile)
			return profile.login === GITHUB_USER
		},
	},
	// pages: {
	// signIn: '/auth/signin',
	// signOut: '/auth/signout',
	// error: '/auth/error', // Error code passed in query string as ?error=
	// verifyRequest: '/auth/verify-request', // (used for check email message)
	// newUser: null // If set, new users will be directed here on first sign in
	// },
	// A database is optional, but required to persist accounts in a database
	// database: process.env.DATABASE_URL,
})

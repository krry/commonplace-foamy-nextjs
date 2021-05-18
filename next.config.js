const withPWA = require('next-pwa')
require('dotenv').config()

module.exports = withPWA({
	env: {
		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		REPO_FULL_NAME: process.env.REPO_FULL_NAME,
		BASE_BRANCH: process.env.BASE_BRANCH,
	},
	pwa: {
		dest: 'public',
	},
	future: {
		webpack5: true,
	},
	target: 'experimental-serverless-trace',
})

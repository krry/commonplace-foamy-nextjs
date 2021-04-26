module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		'jsx-quotes': ['error', 'prefer-single'],
		semi: ['error', 'never'],
		'linebreak-style': ['error', 'unix'],
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
	},
}

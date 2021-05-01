module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	plugins: ['react'],
	settings: {
		react: {
			version: 'detect',
		},
		'mdx/code-blocks': true,
	},
	extends: [
		'eslint:recommended',
		'plugin:mdx/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
		semi: ['error', 'never'],
		indent: ['error', 'tab'],
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'linebreak-style': ['error', 'unix'],
		'jsx-quotes': ['error', 'prefer-single'],
	},
}

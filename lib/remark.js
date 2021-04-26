const remarkImages = require('remark-images')
const remarkFootnote = require('remark-numbered-footnote-labels')
const remarkInlineLinks = require('remark-inline-links')
const remarkExternalLinks = require('remark-external-links')
const remarkUnwrapImages = require('remark-unwrap-images')
const remarkWikiLink = require('remark-wiki-link')

const remarkPlugins = [
	remarkImages,
	remarkFootnote,
	remarkInlineLinks,
	remarkExternalLinks,
	remarkUnwrapImages,
	[
		remarkWikiLink,
		{
			hrefTemplate: permalink => `${permalink}`,
			pageResolver: name => [name.replace(/ /g, '-').toLowerCase()],
		},
	],
]

module.exports = remarkPlugins

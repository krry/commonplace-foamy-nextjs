import remarkImages from 'remark-images'
import remarkFootnote from 'remark-numbered-footnote-labels'
import remarkInlineLinks from 'remark-inline-links'
import remarkExternalLinks from 'remark-external-links'
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkWikiLink from 'remark-wiki-link'

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

export default remarkPlugins

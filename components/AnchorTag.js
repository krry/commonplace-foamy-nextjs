import Link from 'next/link'
import { useRouter } from 'next/router'

function verifyRelativityOfHref(href) {
	const router = useRouter()
	// console.log('href of link is', href)
	// does the `href` start with something besides a letter or number?
	// this is likely a sign that the path is already properly relative
	// e.g. '../path/to/note' which we leave be
	if (!/[0-9]|[a-z]|[A-Z]/.test(href.substr(0, 1))) return href
	// if so, does the href of the link start with `http`?
	// we can leave external links be as well
	if (href.substr(0, 4) === 'http') return href
	// if not, parse the current directory from the router's path
	// and prepend this to the href for the link
	else {
		// console.log('router?.asPath', router?.asPath)
		const pathPrefix = router?.asPath ? router.asPath.split('/').slice(1, -1).join('/') : '.'
		return pathPrefix + '/' + href
	}
}

const AnchorTag = (props) => {
	const { href, title, target, children } = props
	const shouldBeSimpleLink = target || href.startsWith('#')
	if (shouldBeSimpleLink) {
		return <a {...props}>{children}</a>
	}
	const verifiedHref = verifyRelativityOfHref(href)
	return (
		<Link href={verifiedHref}>
			<a>{title || children}</a>
		</Link>
	)
}

export default AnchorTag

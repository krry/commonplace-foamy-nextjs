import Link from 'next/link'
import { getAllTerms } from '../../lib/mdx'
import Layout from '../../components/Layout'

export const getStaticProps = async () => {
	const terms = await getAllTerms()
	return {
		props: { terms: terms.sort() },
	}
}

const TermsPage = ({ terms }) => {
	if (terms) {
		return (
			<Layout>
				<h1>All Terms</h1>
				<ul className='termList'>
					{terms.slice().map((term, index) => (
						<li key={index}>
							<Link href={'/terms/' + term.slice(1)}>
								<a>{term}</a>
							</Link>
						</li>
					))}
				</ul>
			</Layout>
		)
	}
}

export default TermsPage

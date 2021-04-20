import { useState, useEffect } from 'react'
import AccessDenied from '../components/AccessDenied'
import Layout from '../components/Layout'
import { getAllFilesFrontMatter } from '../lib/mdx'
import { useSession, getSession } from 'next-auth/client'

export async function getStaticProps(context) {
	const session = await getSession({ context })
	const allNotes = await getAllFilesFrontMatter()

	if (session) {
		return {
			props: { session, allNotes },
		}
	} else {
		return {
			props: {
				title: 'Not logged in',
				slug: '/login',
			},
		}
	}
}

export default function AllNotes({ allNotes }) {
	const [session, loading] = useSession()
	const [content, setContent] = useState()

	// Fetch content from protected route
	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('/api/examples/protected')
			const json = await res.json()
			if (json.content) {
				setContent(json.content)
			}
		}
		fetchData()
	}, [session])

	// When rendering client side don't display anything until loading is complete
	if (typeof window !== 'undefined' && loading) return null

	// If no session exists, display access denied message
	if (!session) {
		return (
			<Layout>
				<AccessDenied />
			</Layout>
		)
	}

	// If session exists, display content
	return (
		<Layout>
			<h1>All Notes</h1>
			<ul>
				{allNotes.slice().map((note, index) => (
					<div key={index}>
						<dt>{note.title || ''}</dt>
						<dd>
							<a href={note?.slug}>{note.slug}</a>
						</dd>
					</div>
				))}
			</ul>
		</Layout>
	)
}

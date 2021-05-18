// import { useState, useEffect } from 'react'
import Link from 'next/link'
import AccessDenied from '../components/AccessDenied'
import Layout from '../components/Layout'
import { getAllFilesFrontMatter } from '../lib/mdx'
import { useSession } from 'next-auth/client'

export async function getStaticProps() {
	const allNotes = await getAllFilesFrontMatter()
	// console.log('allNotes to props', allNotes.length)
	return {
		props: { allNotes },
	}
}

export default function AllNotes({ allNotes }) {
	const [session, loading] = useSession()
	// console.log('allNotes to template', allNotes.length)

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
			<dl>
				{allNotes.slice().map((note, index) => (
					<div key={index}>
						<dt>{note.title || ''}</dt>
						<dd>
							<Link href={note?.slug}>
								<a>{note.slug}</a>
							</Link>
						</dd>
					</div>
				))}
			</dl>
		</Layout>
	)
}

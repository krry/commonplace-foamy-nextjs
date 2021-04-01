import Link from 'next/link'

export default function Header({ siteTitle }) {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <Link href="/"><a>{siteTitle}</a></Link>
        </nav>
      </header>
    </>
  )
}
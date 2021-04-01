import Link from 'next/link'
import ModeSwitch from './ModeSwitch'

export default function Header({ siteTitle }) {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <ModeSwitch />
          <Link href="/"><a>{siteTitle}</a></Link>
        </nav>
      </header>
    </>
  )
}
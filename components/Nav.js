'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Icons';

const LINKS = [['Library', '/library'], ['Open source', '/open-source'], ['How it works', '/how'], ['Changelog', '/changelog']];

export default function Nav({ signedIn }) {
  const path = usePathname();
  return (
    <header className="nav">
      <nav aria-label="Primary" className="nav-inner">
        <Link href="/" aria-label="CopyThat home" className="brand"><Logo /><span>CopyThat</span></Link>
        <div className="nav-links">
          {LINKS.map(([label, href]) => (
            <Link key={href} href={href} aria-current={path.startsWith(href) ? 'page' : undefined}>{label}</Link>
          ))}
        </div>
        <div className="nav-right">
          {signedIn ? <Link className="link" href="/account">Account</Link> : <Link className="link" href="/signin">Sign in</Link>}
          <Link className="btn btn-light btn-sm" href="/submit">Submit a prompt</Link>
        </div>
      </nav>
    </header>
  );
}

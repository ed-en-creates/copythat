import Link from 'next/link';
import { Logo } from './Icons';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link href="/" className="brand"><Logo size={18} /><span style={{ fontSize: 15 }}>CopyThat</span><span style={{ fontSize: 13, color: 'var(--faint)', marginLeft: 8, fontWeight: 400 }}>© {new Date().getFullYear()}</span></Link>
        <nav aria-label="Footer" className="footer-links">
          <a href="https://github.com/ed-en-creates/copythat" target="_blank" rel="noopener noreferrer">GitHub</a>
          <Link href="/open-source">Open source</Link>
          <Link href="/feedback">Feedback</Link>
          <Link href="/submit">Submit a prompt</Link>
          <Link href="/how#creators">For creators</Link>
                    <Link href="/how#terms">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}

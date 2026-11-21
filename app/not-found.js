import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="wrap page-main" style={{ minHeight: '70vh' }}>
      <p className="eyebrow">404</p>
      <h1 className="h-display">Nothing to copy here.</h1>
      <p className="lede">That page doesn’t exist, or it moved.</p>
      <div className="row" style={{ marginTop: 32, gap: 12 }}><Link className="btn btn-accent" href="/library">Browse the library</Link><Link className="btn btn-ghost" href="/">Home</Link></div>
    </main>
  );
}

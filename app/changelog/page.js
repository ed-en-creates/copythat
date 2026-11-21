import Link from 'next/link';
import Footer from '@/components/Footer';
import { Arrow } from '@/components/Icons';

export const metadata = { title: 'Changelog', description: 'New prompts, re-tests and fixes, as they ship.' };

const ENTRIES = [
  ['Nov 2026', 'New', 'CopyThat is open source', 'Every prompt is now free under CC BY 4.0, and the site’s code is on GitHub under MIT. Pro is on hold until the library is much bigger.', '/open-source'],
  ['Nov 2026', 'New', 'Motion Brand Showcase', 'A workflow that turns a brand guideline into a finished brand film. Example: the Fluxa Pay film.', '/p/motion-brand-showcase'],
  ['Nov 2026', 'New', 'Three-beat logo reveal', 'Free motion prompt with a live customiser for colour, stagger and hold.', '/p/three-beat-logo-reveal'],
  ['Nov 2026', 'New', 'Feedback and “Did this work?”', 'Tell us what to build, and flag any prompt that stopped working.', '/feedback'],
  ['Nov 2026', 'Launch', 'CopyThat opens', 'The first twelve prompts go live, across motion, UI, branding, product, websites and code.', '/library'],
];

export default function Changelog() {
  return (
    <>
      <main className="wrap-narrow page-main">
        <p className="eyebrow up" style={{ animationDelay: '.5s' }}>Changelog</p>
        <h1 className="h-display up" style={{ animationDelay: '.58s' }}>What’s new.</h1>
        <p className="lede up" style={{ animationDelay: '.66s' }}>New prompts, re-tests and fixes, as they ship. The Friday email has the highlights.</p>
        <ol style={{ listStyle: 'none', margin: '64px 0 0', padding: 0, borderBottom: '1px solid var(--line-2)' }}>
          {ENTRIES.map(([d, t, h, b, href], i) => (
            <li key={h} className="up" style={{ animationDelay: `${(0.8 + i * 0.08).toFixed(2)}s`, display: 'grid', gridTemplateColumns: 'minmax(110px, 160px) minmax(0, 1fr)', gap: 32, padding: '36px 0', borderTop: '1px solid var(--line-2)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><span className="mono" style={{ fontSize: 12, color: 'var(--faint)' }}>{d}</span><span className={'tag ' + (t === 'New' ? 'tag-pro' : 'tag-light')} style={{ alignSelf: 'flex-start' }}>{t}</span></div>
              <div><h2 style={{ margin: 0, fontSize: 26, fontWeight: 500, letterSpacing: '-.025em' }}>{h}</h2><p className="body" style={{ margin: '10px 0 0', maxWidth: 620 }}>{b}</p><Link className="link" href={href}>Open <Arrow /></Link></div>
            </li>
          ))}
        </ol>
      </main>
      <Footer />
    </>
  );
}

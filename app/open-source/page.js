import Link from 'next/link';
import Footer from '@/components/Footer';
import { WaitlistForm } from '@/components/Forms';
import { Arrow } from '@/components/Icons';

export const metadata = { title: 'Open source', description: 'Every CopyThat prompt is free under CC BY 4.0, and the site’s code is open source under MIT.' };

const GH = 'https://github.com/ed-en-creates/copythat';

const WAYS = [
  ['Use them', 'Copy any prompt into your own and client work. Adapt it, remix it, ship it. Just credit CopyThat.'],
  ['Submit yours', 'Wrote a prompt that works? Send it with its result. If it passes testing, it goes live with your name on it.'],
  ['Open a pull request', 'Prompts and code live on GitHub. Fix a typo, improve a prompt, or build a feature.'],
  ['Tell us what broke', 'Hit “Did this work?” on any prompt. That’s how the library stays tested.'],
];

export default function OpenSource() {
  return (
    <>
      <main className="wrap page-main">
        <p className="eyebrow up" style={{ animationDelay: '.5s' }}><span className="dot" />Open source</p>
        <h1 className="h-display up" style={{ animationDelay: '.58s', maxWidth: 1100 }}>Every prompt is free.<br />Take it. Make it better.</h1>
        <p className="lede up" style={{ animationDelay: '.66s' }}>CopyThat is an open library of AI prompts and workflows for creatives, built in public. New prompts land every week, each with the result it made.</p>
        <div className="row up" style={{ animationDelay: '.74s', marginTop: 36, gap: 12 }}>
          <Link className="btn btn-accent btn-lg" href="/library">Browse the library</Link>
          <a className="btn btn-ghost btn-lg" href={GH} target="_blank" rel="noopener noreferrer">View on GitHub <Arrow /></a>
        </div>

        <section aria-labelledby="lic-h" className="grid-fit" style={{ marginTop: 120 }}>
          <h2 id="lic-h" className="sr-only">Licences</h2>
          <div className="panel" style={{ padding: 32, borderRadius: 22 }}>
            <p className="label" style={{ margin: 0 }}>The prompts</p>
            <p style={{ margin: '14px 0 0', fontSize: 40, fontWeight: 500, letterSpacing: '-.04em' }}>CC BY 4.0</p>
            <p className="body" style={{ margin: '12px 0 0', fontSize: 15 }}>Copy, adapt and share them — even commercially. The one rule: give credit to CopyThat (and the original author, where named).</p>
          </div>
          <div className="panel" style={{ padding: 32, borderRadius: 22 }}>
            <p className="label" style={{ margin: 0 }}>The website code</p>
            <p style={{ margin: '14px 0 0', fontSize: 40, fontWeight: 500, letterSpacing: '-.04em' }}>MIT</p>
            <p className="body" style={{ margin: '12px 0 0', fontSize: 15 }}>The Next.js + Supabase code that runs this site. Fork it, learn from it, build on it.</p>
          </div>
        </section>

        <section aria-labelledby="ways-h" className="row" style={{ marginTop: 140, gap: 48 }}>
          <div style={{ flex: '1 1 340px', maxWidth: 460 }}><p className="eyebrow">Get involved</p><h2 id="ways-h" className="h-section">Four ways to help it grow.</h2></div>
          <ol className="numlist bottom" style={{ flex: '999 1 560px' }}>
            {WAYS.map(([t, d], i) => (
              <li key={t}><span className="num">0{i + 1}</span><div><h3 style={{ margin: 0, fontSize: 24, fontWeight: 500, letterSpacing: '-.025em' }}>{t}</h3><p className="body" style={{ margin: '10px 0 0', maxWidth: 620 }}>{d}</p></div></li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="next-h" className="panel" style={{ marginTop: 140, borderRadius: 26, padding: 'clamp(28px, 5vw, 64px)', display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 520px' }}>
            <p className="eyebrow">What’s next</p>
            <h2 id="next-h" className="h-section">Free now. Built to last.</h2>
            <p className="body" style={{ margin: '20px 0 0', maxWidth: 560 }}>Everything published here stays free under its licence. Later, once the library is big, there may be optional paid extras — like done-for-you workflow packs — to keep the project going. You’ll hear about it first in the Friday email.</p>
          </div>
          <div style={{ flex: '1 1 380px', maxWidth: 480 }}><WaitlistForm /></div>
        </section>
      </main>
      <Footer />
    </>
  );
}

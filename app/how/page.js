import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = { title: 'How it works', description: 'Every prompt is collected, checked, tested, published with credit, and kept current.' };

const STEPS = [
  ['Collected', 'The library is built from original CopyThat prompts, open sources with permissive licences, and creators who submit their own.'],
  ['Checked', 'Duplicates are merged. Anything that touches files, passwords or the network is held for a human to review before it goes anywhere near you.'],
  ['Tested', 'The prompt is run on the model it was written for. The model and the date are saved next to it, and the page says plainly when testing is still in progress.'],
  ['Published', 'It goes live with full credit to the person who wrote it and a link back to where it came from.'],
  ['Kept current', 'When a model changes, prompts are re-run. Users can flag one that stopped working. Broken ones get fixed or retired.'],
];

export default function How() {
  return (
    <>
      <main className="wrap page-main">
        <p className="eyebrow up" style={{ animationDelay: '.5s' }}>How it works</p>
        <h1 className="h-display up" style={{ animationDelay: '.58s', maxWidth: 1000 }}>Nothing goes live<br />until it works.</h1>
        <p className="lede up" style={{ animationDelay: '.66s' }}>Most prompt sites are lists of text and hope. Here’s the process every prompt goes through before you see it.</p>
        <ol className="numlist bottom" style={{ marginTop: 72 }}>
          {STEPS.map(([t, d], i) => (
            <li key={t} className="up" style={{ animationDelay: `${(0.8 + i * 0.08).toFixed(2)}s` }}>
              <span className="num">0{i + 1}</span>
              <div><h3 style={{ margin: 0, fontSize: 26, fontWeight: 500, letterSpacing: '-.025em' }}>{t}</h3><p className="body" style={{ margin: '10px 0 0', maxWidth: 640 }}>{d}</p></div>
            </li>
          ))}
        </ol>

        <section id="licensing" aria-labelledby="lic-h" className="row" style={{ marginTop: 140, gap: 48, scrollMarginTop: 120 }}>
          <div style={{ flex: '1 1 340px', maxWidth: 460 }}><p className="eyebrow">Licensing &amp; credits</p><h2 id="lic-h" className="h-section">Credit where it’s due.</h2></div>
          <div className="grid-fit" style={{ flex: '999 1 560px' }}>
            <div className="card" style={{ padding: 24 }}><h3 style={{ margin: 0, fontSize: 19, fontWeight: 500 }}>Open licence</h3><p className="body" style={{ margin: '10px 0 0', fontSize: 15 }}>Prompts under licences like CC0 or MIT are shown in full, with the licence and author named.</p></div>
            <div className="card" style={{ padding: 24 }}><h3 style={{ margin: 0, fontSize: 19, fontWeight: 500 }}>Everything else</h3><p className="body" style={{ margin: '10px 0 0', fontSize: 15 }}>We show a short summary and the result, then link to the original. We never copy someone’s paid or personal work.</p></div>
            <div className="card" style={{ padding: 24 }}><h3 style={{ margin: 0, fontSize: 19, fontWeight: 500 }}>Your prompt here?</h3><p className="body" style={{ margin: '10px 0 0', fontSize: 15 }}>If you’d like a credit changed or a prompt removed, tell us and it’s handled within two working days.</p><Link className="link" href="/feedback">Contact us</Link></div>
          </div>
        </section>

        <section id="creators" aria-labelledby="cr-h" className="panel" style={{ marginTop: 140, borderRadius: 26, padding: 'clamp(28px, 5vw, 64px)', display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-end', justifyContent: 'space-between', scrollMarginTop: 120 }}>
          <div style={{ flex: '1 1 520px' }}><p className="eyebrow">For creators</p><h2 id="cr-h" className="h-section">Wrote a prompt that works? Put your name on it.</h2><p className="body" style={{ margin: '20px 0 0', maxWidth: 560 }}>Submit it with the result it made. If it passes testing, it goes live with your name and link on it. Paid creator packs with a revenue share are coming next.</p></div>
          <Link className="btn btn-accent btn-lg" href="/submit">Submit a prompt</Link>
        </section>

        <section id="terms" aria-labelledby="t-h" className="row" style={{ marginTop: 140, gap: 48, scrollMarginTop: 120 }}>
          <div style={{ flex: '1 1 340px', maxWidth: 460 }}><p className="eyebrow">Terms, in plain words</p><h2 id="t-h" className="h-section">The short version.</h2></div>
          <ul style={{ flex: '999 1 560px', listStyle: 'none', margin: 0, padding: 0, borderBottom: '1px solid var(--line-2)' }}>
            {['Use anything you make with CopyThat prompts in your own and client work.', 'Prompts are shared under CC BY 4.0: copy, adapt and share them, even commercially — just credit CopyThat.', 'Results from AI models vary. We test, but we can’t promise identical output.', 'We only collect what we need: your email if you give it, and what you send us. We never sell it.', 'The site’s code is open source under the MIT licence on GitHub.'].map((t) => (
              <li key={t} className="body" style={{ padding: '22px 0', borderTop: '1px solid var(--line-2)' }}>{t}</li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

import Footer from '@/components/Footer';
import Link from 'next/link';
import { FeedbackForm } from '@/components/Forms';

export const metadata = { title: 'Feedback', description: 'An idea, a bug, a prompt that didn’t work, or something you love. We read everything.' };

const ROAD = [
  ['In progress', 'var(--accent)', [['Payments', 'Pro and packs, in dollars or naira, by card, transfer or USSD.'], ['Saved collections', 'Keep the prompts you use most in one place.']]],
  ['Planned', '#EDEDEA', [['Result uploads', 'Attach the image or video your prompt made when you submit it.'], ['Creator packs', 'Sell your own workflows here, with a revenue share.']]],
  ['Shipped', 'var(--pass)', [['Library filters', 'Category, Free or Pro, and search.'], ['Live customiser', 'Change a prompt’s values and watch the result update.']]],
];

export default async function Feedback({ searchParams }) {
  const sp = await searchParams;
  return (
    <>
      <main className="wrap page-main">
        <div className="row" style={{ gap: 64, alignItems: 'flex-start' }}>
          <div className="up" style={{ animationDelay: '.5s', flex: '1 1 380px', maxWidth: 480 }}>
            <p className="eyebrow">Feedback</p>
            <h1 style={{ margin: '20px 0 0', fontSize: 'clamp(48px, 6vw, 92px)', lineHeight: .92, fontWeight: 500, letterSpacing: '-.05em' }}>Tell us.<br />We read<br />everything.</h1>
            <p className="body" style={{ margin: '24px 0 0' }}>An idea, a bug, a prompt that didn’t work for you, or something you love. It goes straight to the founder, not a support queue.</p>
            <ol className="mini-steps">
              <li><span className="mono">01</span>Every message is read, usually within two days</li>
              <li><span className="mono">02</span>Leave an email and you’ll get a reply</li>
              <li><span className="mono">03</span>Good ideas land on the roadmap below</li>
            </ol>
          </div>
          <div className="up panel" style={{ animationDelay: '.6s', flex: '999 1 560px', minWidth: 0, borderRadius: 26, padding: 'clamp(24px, 4vw, 44px)' }}>
            <FeedbackForm from={typeof sp?.from === 'string' ? sp.from.slice(0, 200) : ''} />
          </div>
        </div>
        <section aria-labelledby="road-h" style={{ marginTop: 140 }}>
          <div className="row between end">
            <div><p className="eyebrow">Roadmap</p><h2 id="road-h" className="h-section">You asked. Here’s where it is.</h2></div>
            <Link className="link" href="/changelog">Full changelog</Link>
          </div>
          <div className="grid-fit" style={{ marginTop: 40, gap: 24 }}>
            {ROAD.map(([name, dot, items]) => (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p className="label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: dot }} />{name}</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {items.map(([t, d]) => <li key={t} className="panel" style={{ borderRadius: 14, padding: 16 }}><p style={{ margin: 0, fontSize: 15, fontWeight: 500 }}>{t}</p><p className="small" style={{ marginTop: 6, fontSize: 13 }}>{d}</p></li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

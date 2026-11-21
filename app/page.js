import Link from 'next/link';
import PromptMachine from '@/components/PromptMachine';
import PromptCard from '@/components/PromptCard';
import Footer from '@/components/Footer';
import { WaitlistForm } from '@/components/Forms';
import { Arrow } from '@/components/Icons';
import { listPrompts } from '@/lib/data';
import HomeFilm from '@/components/HomeFilm';

export const revalidate = 300;

const STEPS = [
  ['Collected', 'From open sources and creators who opt in, credited every time.'],
  ['Tested', 'Run on the model it was written for. The result sits next to the prompt.'],
  ['Kept current', 'Re-tested when models change. Fixed or retired, never left broken.'],
];

export default async function Home() {
  const prompts = (await listPrompts()).slice(0, 4);
  return (
    <>
      <main>
        <PromptMachine />

        <section className="section" aria-labelledby="film-h">
          <div className="wrap">
            <div className="row between end">
              <div><p className="eyebrow">Made with CopyThat</p><h2 id="film-h" className="h-section">One prompt.<br />A finished brand film.</h2></div>
              <Link className="btn btn-light" href="/p/motion-brand-showcase">See the workflow <Arrow /></Link>
            </div>
            <HomeFilm />
          </div>
        </section>

        <section className="section" aria-labelledby="new-h">
          <div className="wrap">
            <div className="row between end">
              <div><p className="eyebrow">The library</p><h2 id="new-h" className="h-section">New this week</h2></div>
              <Link className="link" href="/library">View all prompts <Arrow /></Link>
            </div>
            <div className="grid-cards" style={{ marginTop: 40 }}>
              {prompts.map((p) => <PromptCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="proof-h">
          <div className="wrap row" style={{ gap: 48 }}>
            <div style={{ flex: '1 1 360px', maxWidth: 460 }}>
              <p className="eyebrow">Why trust it</p><h2 id="proof-h" className="h-section">Proof, not promises.</h2>
              <Link className="link" href="/how" style={{ marginTop: 20 }}>How it works <Arrow /></Link>
            </div>
            <ol className="numlist tight bottom" style={{ flex: '999 1 560px' }}>
              {STEPS.map(([t, d], i) => (
                <li key={t}><span className="num">0{i + 1}</span><div><h3 style={{ margin: 0, fontSize: 22, fontWeight: 500, letterSpacing: '-.02em' }}>{t}</h3><p className="body" style={{ margin: '8px 0 0', fontSize: 15 }}>{d}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="price-h" style={{ padding: '0 var(--pad) 120px' }}>
          <div className="panel" style={{ maxWidth: 1360, margin: '0 auto', borderRadius: 28, padding: 'clamp(28px, 5vw, 64px)', display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 520px' }}>
              <p className="eyebrow">Pricing</p><h2 id="price-h" className="h-section">Free to start. Pays for itself on one job.</h2>
              <p className="body" style={{ margin: '20px 0 0', maxWidth: 560 }}>The whole free library costs nothing, forever. Pro unlocks every workflow, plus a new one each month.</p>
            </div>
            <div className="row" style={{ gap: 12 }}>
              <Link className="btn btn-accent btn-lg" href="/pricing">See pricing</Link>
              <Link className="btn btn-ghost btn-lg" href="/library">Start free</Link>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="drop-h">
          <div className="wrap row between end" style={{ gap: 48 }}>
            <div style={{ flex: '1 1 420px' }}>
              <h2 id="drop-h" style={{ margin: 0, fontSize: 'clamp(40px, 5.6vw, 84px)', fontWeight: 500, letterSpacing: '-.045em', lineHeight: .95 }}>New prompts,<br />every Friday.</h2>
              <p className="body" style={{ margin: '24px 0 0', maxWidth: 440 }}>The week’s best tested prompts and first access to new workflows. One email. No noise.</p>
            </div>
            <div style={{ flex: '1 1 420px', maxWidth: 520 }}><WaitlistForm /></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

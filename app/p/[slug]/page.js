import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPrompt, listPrompts, CATEGORY_LABELS } from '@/lib/data';
import { getUser } from '@/lib/supabase/server';
import Footer from '@/components/Footer';
import FeedbackPill from '@/components/FeedbackPill';
import ThreeBeat from '@/components/ThreeBeat';
import FilmPlayer from '@/components/FilmPlayer';
import ProSteps from '@/components/ProSteps';
import CopyButton from '@/components/CopyButton';
import HighlightedPrompt from '@/components/HighlightedPrompt';
import PromptCard from '@/components/PromptCard';
import Thumb from '@/components/Thumb';
import { VoteWidget } from '@/components/Forms';
import { Arrow, Lock } from '@/components/Icons';
import { modelInfo } from '@/lib/model';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getPrompt(slug);
  if (!p) return { title: 'Not found' };
  return { title: p.title, description: p.summary, openGraph: { title: `${p.title} · CopyThat`, description: p.summary, images: [p.preview_url || '/media/fluxa-poster.webp'] } };
}

function tested(p) {
  if (!p.tested_model) return 'Testing in progress';
  const d = p.tested_at ? new Date(p.tested_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : '';
  return `${p.tested_model}${d ? ' · ' + d : ''}`;
}

function ModelPanel({ p }) {
  const mi = modelInfo(p);
  return (
    <div className="model-panel" aria-label="Model used for this result">
      <div><span className="label">{mi.label}</span><span className="v">{mi.tested && <span className="ok" aria-hidden="true" />}{mi.model}</span></div>
      <div><span className="label">{mi.tested ? 'Tested' : 'Status'}</span><span className="s">{mi.tested ? (p.tested_at ? new Date(p.tested_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Yes') : 'Testing in progress'}</span></div>
      {mi.also.length > 0 && <div><span className="label">Also works with</span><span className="s">{mi.also.join(' · ')}</span></div>}
    </div>
  );
}

function Meta({ p }) {
  return (
    <dl className="meta-grid">
      <div><dt className="label">Source</dt><dd>{p.creator_name === 'CopyThat Studio' ? 'Original · CopyThat Studio' : p.creator_name}</dd></div>
      <div><dt className="label">Licence</dt><dd>{p.license || '—'}</dd></div>
    </dl>
  );
}

function Tags({ p }) {
  return (
    <div className="row" style={{ gap: 8 }}>
      {p.tier === 'pro' && <span className="tag tag-pro">PRO</span>}
      <span className="tag">{CATEGORY_LABELS[p.category_slug]}</span>
      {p.tier === 'free' && <span className="tag">Free</span>}
      {p.tested_model && <span className="tag tag-light"><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--pass)' }} />Passing</span>}
    </div>
  );
}

const SHOWCASE_STEPS = ['Role', 'Extract the brand', 'Build it as a reusable, config-driven film', 'Scene structure — twelve scenes', 'Motion language', 'Test, export, deliver'];
const TEASER = 'This step is part of the Pro workflow. Unlock it to read the full instructions, copy the complete prompt and run it on your own brand guideline.';

function splitShowcase(text) {
  // "ROLE\n...\n\nSTEP 1 — ...\n..." → bodies in order
  const chunks = String(text).split(/\n(?=STEP \d)/);
  return chunks.map((c) => c.replace(/^(ROLE|STEP \d+ — [^\n]+)\n/, '').trim());
}

async function Related({ current }) {
  const all = await listPrompts();
  const rel = all.filter((x) => x.slug !== current.slug && x.category_slug === current.category_slug).concat(all.filter((x) => x.slug !== current.slug && x.category_slug !== current.category_slug)).slice(0, 3);
  return (
    <section aria-labelledby="rel-h" style={{ marginTop: 112 }}>
      <div className="row between end">
        <h2 id="rel-h" style={{ margin: 0, fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 500, letterSpacing: '-.035em' }}>Pairs well with</h2>
        <Link className="link" href="/library">Back to library</Link>
      </div>
      <div className="grid-cards" style={{ marginTop: 24 }}>{rel.map((r) => <PromptCard key={r.id} p={r} />)}</div>
    </section>
  );
}

function Crumbs({ p }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs up" style={{ animationDelay: '.5s' }}>
      <Link href="/library">Library</Link><span aria-hidden="true">/</span>
      <Link href={`/library?c=${p.category_slug}`}>{CATEGORY_LABELS[p.category_slug]}</Link><span aria-hidden="true">/</span>
      <span style={{ color: 'var(--text-2)' }}>{p.title}</span>
    </nav>
  );
}

export default async function PromptPage({ params }) {
  const { slug } = await params;
  const p = await getPrompt(slug);
  if (!p) notFound();
  const user = await getUser();
  const unlocked = p.tier === 'free' || !!p.proBody;

  /* ---------- Motion Brand Showcase (Pro film page) ---------- */
  if (slug === 'motion-brand-showcase') {
    const freeBodies = splitShowcase(p.preview_text || '');
    const fullText = p.proBody || (p.tier === 'free' ? p.body : null);
    const fullBodies = fullText ? splitShowcase(fullText) : null;
    const steps = SHOWCASE_STEPS.map((title, i) => fullBodies ? { title, body: fullBodies[i] || '' } : (i < freeBodies.length ? { title, body: freeBodies[i] } : { title, body: TEASER + ' ' + TEASER, locked: true }));
    return (
      <>
        <main className="wrap" style={{ paddingTop: 32, paddingBottom: 120 }}>
          <Crumbs p={p} />
          <div className="row between end" style={{ marginTop: 24, gap: 32 }}>
            <div style={{ flex: '1 1 620px', minWidth: 0 }}>
              <div className="up" style={{ animationDelay: '.55s' }}><Tags p={p} /></div>
              <h1 className="up" style={{ animationDelay: '.62s', margin: '22px 0 0', fontSize: 'clamp(52px, 7.4vw, 112px)', lineHeight: .92, fontWeight: 500, letterSpacing: '-.05em' }}>Motion Brand<br />Showcase</h1>
              <p className="lede up" style={{ animationDelay: '.7s' }}>Hand it a brand guideline. Get back a finished, cinematic brand film — built in code, tested frame by frame, rendered to MP4.</p>
              <div className="up" style={{ animationDelay: '.74s', marginTop: 28, maxWidth: 640 }}><ModelPanel p={p} /></div>
            </div>
            <div className="up" style={{ animationDelay: '.78s', display: 'flex', flexDirection: 'column', gap: 10, minWidth: 260 }}>
              {unlocked
                ? <div style={{ display: 'flex' }}><CopyButton text={fullText} label="Copy full prompt" /></div>
                : <Link className="btn btn-accent btn-lg btn-block" href="/pricing"><Lock />Unlock with Pro</Link>}
              <span style={{ fontSize: 13, color: 'var(--faint)', textAlign: 'center' }}>{unlocked ? 'Free · open source · CC BY 4.0' : 'Coming soon'}</span>
            </div>
          </div>

          <FilmPlayer />

          <section aria-labelledby="get-h" style={{ marginTop: 120 }}>
            <p className="eyebrow">What it delivers</p>
            <h2 id="get-h" className="h-section">One prompt. A finished film.</h2>
            <div className="grid-fit" style={{ marginTop: 40 }}>
              {[['Reads the guideline', 'Pulls the logo apart into symbol and wordmark, plus colours, type, pattern, mission line and mockups.'],
                ['Builds a reusable film', 'One HTML file on a single GSAP timeline. Every brand value lives in one config, so the next client is a swap, not a rebuild.'],
                ['Twelve directed scenes', 'Assemble to outro, in 16:9 and 9:16, with play controls, a scrubber and a clean mode for recording.'],
                ['Checks its own work', 'Screenshots every scene, fixes what’s off, then renders the MP4 and a contact sheet.']].map(([t, d], i) => (
                <div key={t} className="card text-card"><span className="num">0{i + 1}</span><h3 className="h-card">{t}</h3><p className="small">{d}</p></div>
              ))}
            </div>
          </section>

          <section aria-labelledby="prompt-h" className="row" style={{ marginTop: 120, gap: 48, alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 320px', maxWidth: 400 }}>
              <p className="eyebrow">The prompt</p>
              <h2 id="prompt-h" className="h-section">Six parts.<br />No guesswork.</h2>
              <dl style={{ margin: '32px 0 0', display: 'flex', flexDirection: 'column', gap: 18, fontSize: 14 }}>
                <div><dt className="label">Runs on</dt><dd style={{ margin: '6px 0 0' }}>An AI agent that can run code, open a browser and use ffmpeg — e.g. Claude Code</dd></div>
                <div><dt className="label">You attach</dt><dd style={{ margin: '6px 0 0' }}>The brand guideline, logo files and any mockups</dd></div>
                <div><dt className="label">You get</dt><dd style={{ margin: '6px 0 0' }}>HTML film · MP4 (16:9, 9:16) · contact sheet · list of assumptions</dd></div>
                <div><dt className="label">Last tested</dt><dd style={{ margin: '6px 0 0' }}>{tested(p)}</dd></div>
              </dl>
            </div>
            <div style={{ flex: '999 1 560px', minWidth: 0 }}><ProSteps steps={steps} /></div>
          </section>

          <section aria-label="About the example" className="row between center" style={{ marginTop: 96, borderTop: '1px solid var(--line)', paddingTop: 32 }}>
            <p className="small" style={{ maxWidth: 640 }}>Example film: Fluxa Pay, a brand identity by Eden, CopyThat’s founder, animated with this prompt.</p>
            <div style={{ minWidth: 320, flex: '0 1 520px' }}><VoteWidget slug={p.slug} /></div>
          </section>
          <Related current={p} />
          <FeedbackPill />
        </main>
        <Footer />
      </>
    );
  }

  const header = (
    <>
      <Tags p={p} />
      <h1>{p.title}</h1>
      <p className="body" style={{ margin: 0 }}>{p.summary}</p>
      <ModelPanel p={p} />
    </>
  );
  const footer = (<><VoteWidget slug={p.slug} /><Meta p={p} /></>);

  /* ---------- Three-beat (live customiser) ---------- */
  if (slug === 'three-beat-logo-reveal') {
    return (
      <>
        <main className="wrap" style={{ paddingTop: 32, paddingBottom: 120 }}>
          <Crumbs p={p} />
          <ThreeBeat header={header} footer={footer} />
          <section aria-labelledby="hist-h" className="row" style={{ marginTop: 112, gap: 48 }}>
            <div style={{ flex: '1 1 320px', maxWidth: 420 }}>
              <p className="eyebrow">Kept current</p>
              <h2 id="hist-h" className="h-section" style={{ fontSize: 'clamp(32px, 3.4vw, 48px)' }}>Test history</h2>
              <p className="body" style={{ margin: '18px 0 0', fontSize: 15 }}>Every time a model updates, this prompt is run again. Results and fixes are logged here.</p>
            </div>
            <ol className="history" style={{ flex: '1 1 560px', listStyle: 'none', margin: 0, padding: 0, borderBottom: '1px solid var(--line-2)' }}>
              <li><span className="num">v1</span><div><p style={{ margin: 0, fontSize: 16 }}>Published</p><p className="small" style={{ marginTop: 4, fontSize: 13 }}>{tested(p)}</p></div><span className="mono" style={{ fontSize: 12, color: 'var(--faint)' }}>{new Date(p.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span></li>
            </ol>
          </section>
          <Related current={p} />
          <FeedbackPill />
        </main>
        <Footer />
      </>
    );
  }

  /* ---------- Generic prompt ---------- */
  const text = p.tier === 'free' ? p.body : (p.proBody || p.preview_text);
  return (
    <>
      <main className="wrap" style={{ paddingTop: 32, paddingBottom: 120 }}>
        <Crumbs p={p} />
        <div className="detail">
          <div className="detail-stage up" style={{ animationDelay: '.58s' }}>
            <div className="big-stage card pcard" style={{ borderRadius: 24, transform: 'none' }}>
              <div className="grid" aria-hidden="true" />
              <div style={{ transform: 'scale(1.6)' }}><Thumb prompt={{ ...p, preview_url: p.preview_url }} /></div>
              <span className="cap">Preview · results are added as they’re tested</span>
            </div>
          </div>
          <div className="detail-info up" style={{ animationDelay: '.66s' }}>
            {header}
            <div className="prompt-box">
              <div className="prompt-box-head"><span className="label">Prompt</span><span className="label">{unlocked ? 'Change the highlighted parts' : 'Preview'}</span></div>
              <div className="prompt-text" style={{ position: 'relative' }}>
                <HighlightedPrompt text={text} />
                {!unlocked && <div className="locked-overlay" style={{ alignItems: 'flex-end', paddingBottom: 20 }}><Link className="btn btn-light btn-sm" href="/pricing"><Lock />Unlock the full prompt with Pro</Link></div>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {unlocked ? <CopyButton text={text} /> : <Link className="btn btn-accent btn-lg btn-block" href={user ? '/pricing' : '/signin'}>{user ? 'Get Pro' : 'Sign in or get Pro'}</Link>}
            </div>
            {footer}
          </div>
        </div>
        <Related current={p} />
        <FeedbackPill />
      </main>
      <Footer />
    </>
  );
}

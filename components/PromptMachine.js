'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Arrow, Check, CopyIcon, Logo } from './Icons';
import { copyText } from './Stamp';

const SUBJECTS = [{ id: 'logo', label: 'a logo' }, { id: 'product', label: 'a product' }, { id: 'poster', label: 'a poster' }, { id: 'screen', label: 'an app screen' }];
const MOTIONS = [{ id: 'rises', label: 'rises' }, { id: 'orbits', label: 'orbits' }, { id: 'glitches', label: 'glitches' }, { id: 'breathes', label: 'breathes' }];
const MOODS = [
  { id: 'midnight', label: 'midnight', bg: '#07080C', fg: '#EDEDEA', accent: '#8FB2FF', muted: '#7C8496', grid: '#12141B' },
  { id: 'ember', label: 'ember', bg: '#140904', fg: '#FFE9DC', accent: '#FF5A1F', muted: '#A27A66', grid: '#22130B' },
  { id: 'paper', label: 'paper', bg: '#ECE9E2', fg: '#141413', accent: '#1F4BFF', muted: '#6B6A65', grid: '#DCD8CF' },
  { id: 'acid', label: 'acid', bg: '#0B0D05', fg: '#F2F5E6', accent: '#D6FF3D', muted: '#8A9070', grid: '#171A0C' },
];
const FRAG_A = 'kinetic logo reveal · bento pricing grid · editorial product hero · type specimen poster · scroll-told case study · tokens from a screenshot · empty states that teach · brand film from a guideline · ';
const FRAG_B = '--ar 16:9 · ease-out-expo · 40ms stagger · soft studio light · grain 4% · seamless loop · 24fps · hex #FF5A1F · ';
const FRAG_C = 'Animate a logo that rises · Design an app screen that breathes · Render a product in ember light · Build a poster that glitches · ';

function Preloader() {
  const [load, setLoad] = useState(0);
  const [phase, setPhase] = useState('hidden');
  const timers = useRef([]);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('ct-intro') === '1'; } catch {}
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reduce) return;
    setPhase('loading');
    let n = 0;
    const iv = setInterval(() => {
      n = Math.min(100, n + 4 + Math.floor(Math.random() * 7));
      setLoad(n);
      if (n >= 100) {
        clearInterval(iv);
        setPhase('stamp');
        timers.current.push(setTimeout(() => setPhase('done'), 650));
        try { sessionStorage.setItem('ct-intro', '1'); } catch {}
      }
    }, 55);
    timers.current.push(iv);
    return () => timers.current.forEach((t) => { clearInterval(t); clearTimeout(t); });
  }, []);
  if (phase === 'hidden') return null;
  const skip = () => { timers.current.forEach((t) => { clearInterval(t); clearTimeout(t); }); try { sessionStorage.setItem('ct-intro', '1'); } catch {} setPhase('done'); };
  return (
    <div className={'loader' + (phase === 'done' ? ' gone' : '')} aria-hidden={phase === 'done'}>
      <div className="loader-mark"><div className="o" /><div className="f" /></div>
      {phase === 'loading' ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div className="mono" style={{ fontSize: 13, color: 'var(--muted)', letterSpacing: '.08em' }}>{String(load).padStart(3, '0')} — collecting prompts</div>
          <div className="loader-bar"><div style={{ width: load + '%' }} /></div>
        </div>
      ) : <div className="loader-stamp">Copy that.</div>}
      {phase !== 'done' && <button type="button" className="btn btn-ghost btn-sm loader-skip" onClick={skip}>Skip intro</button>}
    </div>
  );
}

function Subject({ id, mood }) {
  if (id === 'logo') return (
    <div style={{ position: 'relative', width: 150, height: 150 }}>
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: 110, height: 124, border: `3px solid ${mood.fg}`, borderRadius: 22 }} />
      <div style={{ position: 'absolute', right: 0, top: 0, width: 110, height: 124, borderRadius: 22, background: mood.accent }} />
    </div>
  );
  if (id === 'product') return (
    <div style={{ position: 'relative', width: 200, height: 230, display: 'flex', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', bottom: 0, width: 200, height: 40, border: `1.5px solid ${mood.muted}`, borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: 20, width: 86, height: 168, border: `2.5px solid ${mood.fg}`, borderRadius: '26px 26px 16px 16px' }} />
      <div style={{ position: 'absolute', bottom: 104, width: 86, height: 34, background: mood.accent }} />
      <div style={{ position: 'absolute', bottom: 186, width: 36, height: 28, borderRadius: 6, background: mood.fg }} />
    </div>
  );
  if (id === 'poster') return (
    <div style={{ width: 190, height: 260, border: `2px solid ${mood.fg}`, borderRadius: 6, padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 92, fontWeight: 600, letterSpacing: '-.06em', lineHeight: .8, color: mood.fg }}>Aa</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ height: 4, width: '80%', background: mood.accent }} />
        <div style={{ height: 4, width: '56%', background: mood.muted }} />
        <div style={{ height: 4, width: '66%', background: mood.muted }} />
      </div>
    </div>
  );
  return (
    <div style={{ width: 160, height: 300, border: `2.5px solid ${mood.fg}`, borderRadius: 30, padding: '22px 12px 12px', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gridAutoRows: 'min-content', gap: 8 }}>
      <div style={{ gridColumn: 'span 2', height: 12, width: '60%', background: mood.fg, borderRadius: 3 }} />
      <div style={{ gridColumn: 'span 2', height: 82, borderRadius: 12, background: mood.accent }} />
      <div style={{ height: 64, borderRadius: 12, border: `1.5px solid ${mood.muted}` }} />
      <div style={{ height: 64, borderRadius: 12, border: `1.5px solid ${mood.muted}` }} />
      <div style={{ gridColumn: 'span 2', height: 40, borderRadius: 12, border: `1.5px solid ${mood.muted}` }} />
    </div>
  );
}

export default function PromptMachine() {
  const [s, setS] = useState(0);
  const [m, setM] = useState(0);
  const [l, setL] = useState(1);
  const [built, setBuilt] = useState(1);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [rolling, setRolling] = useState(false);
  const [copied, setCopied] = useState(false);
  const raf = useRef(null);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach((t) => { clearInterval(t); clearTimeout(t); }), []);

  const subj = SUBJECTS[s], mot = MOTIONS[m], mood = MOODS[l];
  const bump = () => setBuilt((b) => b + 1);
  const pick = (setter, i) => { setter(i); bump(); };
  const fullPrompt = `Animate ${subj.label} that ${mot.label} in ${mood.label} light. Background ${mood.bg}, key colour ${mood.accent}. Slow, minimal, premium motion: one idea, no particles, no lens flares. Clean geometric forms, soft depth, 1920×1080, 24fps, 6-second seamless loop.`;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => { raf.current = null; setTilt({ ry: +(x * 14).toFixed(2), rx: +(-y * 12).toFixed(2) }); });
  };
  const shuffle = () => {
    let ticks = 0;
    setRolling(true);
    const iv = setInterval(() => {
      ticks++;
      setS(Math.floor(Math.random() * 4)); setM(Math.floor(Math.random() * 4)); setL(Math.floor(Math.random() * 4));
      if (ticks >= 9) { clearInterval(iv); setRolling(false); bump(); }
    }, 75);
    timers.current.push(iv);
  };
  const copy = async () => {
    await copyText(fullPrompt);
    setCopied(true);
    timers.current.push(setTimeout(() => setCopied(false), 1800));
  };
  const Row = ({ label, items, cur, setter, swatch }) => (
    <div className="chip-row">
      <span className="label">{label}</span>
      {items.map((o, i) => (
        <button key={o.id} type="button" className="chip" aria-pressed={i === cur} onClick={() => pick(setter, i)} style={swatch ? { paddingLeft: 10 } : undefined}>
          {swatch && <span className="swatch" style={{ background: o.accent }} />}{o.label}
        </button>
      ))}
    </div>
  );

  return (
    <section className="hero" aria-label="The prompt machine">
      <Preloader />
      <div className="marquee" aria-hidden="true">
        <div><span className="marq">{FRAG_A.repeat(4)}</span></div>
        <div><span className="marq-r">{FRAG_B.repeat(6)}</span></div>
        <div><span className="marq">{FRAG_C.repeat(4)}</span></div>
        <div><span className="marq-r">{FRAG_A.repeat(4)}</span></div>
        <div><span className="marq">{FRAG_B.repeat(6)}</span></div>
      </div>
      <div className="hero-main">
        <div className="hero-left">
          <p className="eyebrow"><span className="dot" />The prompt machine · try it</p>
          <h1>Prompts that<br />already worked.</h1>
          <div className="sentence-box">
            <div className="row between center" style={{ marginBottom: 14, gap: 12 }}>
              <span className="label">Your prompt · tap a word to change it</span>
              <span className="label">#{String(built * 7 + 35).padStart(4, '0')}</span>
            </div>
            <p className="sentence" aria-live="polite">
              Animate <button type="button" className="token" aria-label={`Subject: ${subj.label}. Change`} onClick={() => pick(setS, (s + 1) % 4)}>{subj.label}</button> that{' '}
              <button type="button" className="token" aria-label={`Motion: ${mot.label}. Change`} onClick={() => pick(setM, (m + 1) % 4)}>{mot.label}</button> in{' '}
              <button type="button" className="token" aria-label={`Light: ${mood.label}. Change`} onClick={() => pick(setL, (l + 1) % 4)}>{mood.label}</button> light.<span className="caret" />
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Row({ label: "Subject", items: SUBJECTS, cur: s, setter: setS })}
            {Row({ label: "Motion", items: MOTIONS, cur: m, setter: setM })}
            {Row({ label: "Light", items: MOODS, cur: l, setter: setL, swatch: true })}
          </div>
          <div className="row center" style={{ gap: 10 }}>
            <button type="button" className="btn btn-accent btn-lg" onClick={copy}>
              {copied ? <><Check color="#0A0A0A" /><span>Copy that.</span></> : <><CopyIcon /><span>Copy this prompt</span></>}
            </button>
            <button type="button" className="btn btn-ghost btn-lg" onClick={shuffle}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1.5 4h3c2 0 3 1 4.2 3.2L9.6 9c1.1 2 2 3 4 3h1M1.5 12h3c1 0 1.8-.4 2.4-1M12.5 2l2 2-2 2M12.5 10l2 2-2 2M9.4 5.2c.7-.8 1.6-1.2 2.8-1.2h2.3" stroke="#EDEDEA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Shuffle
            </button>
            <Link className="link" href="/library" style={{ padding: '0 10px', height: 56 }}>or browse the library <Arrow /></Link>
          </div>
        </div>
        <div className="hero-right">
          <div className="stage" onMouseMove={onMove} onMouseLeave={() => setTilt({ rx: 0, ry: 0 })} style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}>
            <div className="stage-bg" style={{ background: mood.bg }} />
            <div className="stage-grid" aria-hidden="true" style={{ backgroundImage: `linear-gradient(${mood.grid} 1px, transparent 1px), linear-gradient(90deg, ${mood.grid} 1px, transparent 1px)` }} />
            {rolling && <div className="flash" aria-hidden="true" />}
            <div className="stage-bar" style={{ top: 0, color: mood.muted, paddingTop: 18 }}><span>Result preview</span><span>{subj.label} / {mot.label} / {mood.label}</span></div>
            <div role="img" aria-label={`Preview: ${subj.label} that ${mot.label} in ${mood.label} light`} className="stage-subject" style={{ transform: `translateZ(60px) translate(${(tilt.ry * 1.2).toFixed(1)}px, ${(-tilt.rx * 1.2).toFixed(1)}px)` }}>
              <div className="ring" style={{ border: `1px solid ${mood.accent}` }} />
              <div className="ring ring2" style={{ border: `1px solid ${mood.accent}` }} />
              <div className={'m-' + mot.id}><Subject id={subj.id} mood={mood} /></div>
            </div>
            <div className="stage-bar" style={{ bottom: 0, color: mood.muted, textTransform: 'none', letterSpacing: 0 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: mood.accent, flex: 'none' }} />
              <span style={{ flex: 1, height: 2, background: mood.grid, borderRadius: 2 }} />
              <span>{built} built this visit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

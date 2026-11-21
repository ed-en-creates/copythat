'use client';
import { useEffect, useState } from 'react';
import { PlayPause } from './Icons';
import CopyButton from './CopyButton';

export default function ThreeBeat({ header, footer }) {
  const [bg, setBg] = useState('#0B0B0D');
  const [stagger, setStagger] = useState(40);
  const [hold, setHold] = useState(1.2);
  const [playing, setPlaying] = useState(true);
  const [n, setN] = useState(0);
  const text = `Animate the logo as a three-beat reveal. Beat 1: the mark draws itself as one continuous stroke over 0.8s on a ${bg} field. Beat 2: the wordmark rises letter by letter, ${stagger}ms stagger, ease-out-expo. Beat 3: hold for ${hold}s, then scale softly to 96% and fade. Minimal motion only: no particles, no lens flares. 1920×1080, 24fps.`;
  const typing = n < text.length && n < 99999;
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(99999); return; }
    let iv;
    const t = setTimeout(() => { iv = setInterval(() => setN((x) => { if (x >= 99999) { clearInterval(iv); return x; } const nx = x + 4; if (nx >= 400) clearInterval(iv); return nx; }), 16); }, 1000);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, []);
  const settle = (fn) => (e) => { setN(99999); fn(e); };
  const hl = (v) => <span className="hl">{v}</span>;
  return (
    <div className="detail">
      <div className="detail-stage up" style={{ animationDelay: '.58s' }}>
        <div className={'big-stage' + (playing ? '' : ' paused')} style={{ background: bg }}>
          <div className="grid" aria-hidden="true" />
          <div role="img" aria-label="Result: a logo mark draws itself, the wordmark rises letter by letter, then everything settles and fades" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(18px, 2.4vw, 32px)' }}>
            <div style={{ position: 'relative', width: 'clamp(64px, 7vw, 96px)', height: 'clamp(70px, 7.6vw, 104px)' }}>
              <svg viewBox="0 0 96 104" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
                <rect className="b-draw" x="2" y="2" width="92" height="100" rx="20" pathLength="1" fill="none" stroke="#EDEDEA" strokeWidth="4" />
              </svg>
              <div className="b-fill" style={{ position: 'absolute', inset: 0, borderRadius: 20, background: 'var(--accent)' }} />
            </div>
            <div style={{ display: 'flex', overflow: 'hidden', padding: '.06em 0', fontSize: 'clamp(48px, 6.4vw, 92px)', fontWeight: 500, letterSpacing: '-.045em', lineHeight: 1 }}>
              {'Brand'.split('').map((c, i) => <span key={i} className="b-letter" style={{ animationDelay: `${(i * stagger / 1000).toFixed(3)}s` }}>{c}</span>)}
            </div>
          </div>
          <span className="cap">Live preview · 1920×1080 · 24fps</span>
        </div>
        <div className={'transport' + (playing ? '' : ' paused')}>
          <button type="button" className="round-btn" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause preview' : 'Play preview'}><PlayPause playing={playing} /></button>
          <div className="track"><div className="b-scrub" /></div>
          <span className="mono" style={{ fontSize: 12, color: 'var(--faint)' }}>3 beats · loop</span>
        </div>
      </div>
      <div className="detail-info up" style={{ animationDelay: '.66s' }}>
        {header}
        <div className="prompt-box">
          <div className="prompt-box-head"><span className="label">Prompt</span><span className="label">{text.split(/\s+/).length} words</span></div>
          <div className="prompt-text" style={{ minHeight: 210 }}>
            {typing ? <><span>{text.slice(0, n)}</span><span className="caret" style={{ width: 8, background: 'var(--accent)' }} /></> :
              <>Animate the logo as a three-beat reveal. Beat 1: the mark draws itself as one continuous stroke over 0.8s on a {hl(bg)} field. Beat 2: the wordmark rises letter by letter, {hl(`${stagger}ms`)} stagger, ease-out-expo. Beat 3: hold for {hl(`${hold}s`)}, then scale softly to 96% and fade. Minimal motion only: no particles, no lens flares. 1920×1080, 24fps.</>}
          </div>
        </div>
        <div className="box">
          <span className="label">Make it yours</span>
          <div className="custom-grid">
            <label>Background<input type="color" value={bg} onChange={settle((e) => setBg(e.target.value))} /></label>
            <label>Stagger · {stagger}ms<input type="range" min="20" max="140" step="10" value={stagger} onChange={settle((e) => setStagger(+e.target.value))} /></label>
            <label>Hold · {hold}s<input type="range" min="0.4" max="2.4" step="0.2" value={hold} onChange={settle((e) => setHold(+(+e.target.value).toFixed(1)))} /></label>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}><CopyButton text={text} /></div>
        {footer}
      </div>
    </div>
  );
}

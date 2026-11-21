'use client';
const FILM = process.env.NEXT_PUBLIC_FILM_URL || '/media/fluxa-brand-film.mp4';
import { useEffect, useRef, useState } from 'react';
import { PlayPause } from './Icons';

const CH = [['Assemble', 0], ['Construction', 3], ['Symbol', 6], ['Glyphs', 10], ['Wordmark', 14], ['Typography', 18], ['Colour', 24], ['System', 28], ['Manifesto', 31], ['Pattern', 37], ['Applications', 41], ['Outro', 47]];
const D = 56.5;

export default function FilmPlayer() {
  const v = useRef(null);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const el = v.current; if (!el) return;
    el.muted = true;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) el.play().catch(() => {});
  }, []);
  const go = (s) => { const el = v.current; if (!el) return; el.currentTime = s; el.play().catch(() => {}); setT(s); };
  const toggle = () => { const el = v.current; if (!el) return; el.paused ? el.play().catch(() => {}) : el.pause(); };
  let active = 0; CH.forEach(([, s], i) => { if (t >= s) active = i; });
  const fmt = (s) => '0:' + String(Math.max(0, Math.floor(s))).padStart(2, '0');
  return (
    <section aria-label="Film made with this prompt" className="reveal" style={{ marginTop: 56 }}>
      <div className="player">
        <video ref={v} src={FILM} poster="/media/fluxa-poster.webp" muted loop playsInline autoPlay preload="auto"
          onTimeUpdate={(e) => { const nt = e.currentTarget.currentTime; if (Math.abs(nt - t) > 0.2) setT(nt); }}
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Fluxa Pay brand film, made with this prompt" />
        <div className="overlay"><span>Made with this prompt</span><span>Fluxa Pay · 16:9 · 56s</span></div>
      </div>
      <div className="transport" style={{ marginTop: 14 }}>
        <button type="button" className="round-btn" onClick={toggle} aria-label={playing ? 'Pause film' : 'Play film'}><PlayPause playing={playing} /></button>
        <div className="chapters">
          {CH.map(([label, s], i) => {
            const e = i < CH.length - 1 ? CH[i + 1][1] : D;
            const f = t <= s ? 0 : t >= e ? 1 : (t - s) / (e - s);
            return <button key={label} type="button" onClick={() => go(s)} aria-label={`Jump to ${label}`} style={{ flexGrow: e - s }}><span className="bar"><span style={{ width: (f * 100).toFixed(1) + '%' }} /></span></button>;
          })}
        </div>
        <span className="mono" style={{ fontSize: 12, color: 'var(--faint)', minWidth: 92, textAlign: 'right' }}>{fmt(t)} / 0:56</span>
      </div>
      <div className="row" style={{ marginTop: 14, gap: 8 }}>
        {CH.map(([label, s], i) => (
          <button key={label} type="button" className="chip" aria-pressed={i === active} onClick={() => go(s)} style={{ height: 40, fontSize: 13 }}>
            <span className="mono" style={{ fontSize: 11, opacity: .7 }}>{String(i + 1).padStart(2, '0')}</span>{label}
          </button>
        ))}
      </div>
    </section>
  );
}

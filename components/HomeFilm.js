'use client';
const FILM = process.env.NEXT_PUBLIC_FILM_URL || '/media/fluxa-brand-film.mp4';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
export default function HomeFilm() {
  const v = useRef(null);
  useEffect(() => {
    const el = v.current; if (!el) return;
    el.muted = true;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.play().catch(() => {}); else el.pause(); }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Link href="/p/motion-brand-showcase" aria-label="Open Motion Brand Showcase" className="player" style={{ display: 'block', marginTop: 40 }}>
      <video ref={v} src={FILM} poster="/media/fluxa-poster.webp" muted loop playsInline preload="metadata" autoPlay aria-label="Fluxa Pay brand film, made with the Motion Brand Showcase workflow" />
      <span className="tag" style={{ position: 'absolute', left: 20, bottom: 18, color: 'var(--text)', background: 'rgba(10,10,10,.7)' }}>Fluxa Pay · free workflow</span>
    </Link>
  );
}

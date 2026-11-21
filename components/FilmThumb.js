'use client';
import { useEffect, useRef } from 'react';
export default function FilmThumb({ src, poster }) {
  const v = useRef(null);
  useEffect(() => {
    const el = v.current; if (!el) return;
    el.muted = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.play().catch(() => {}); else el.pause(); }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <video ref={v} src={src} poster={poster || undefined} muted loop playsInline preload="metadata" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />;
}

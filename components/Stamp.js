'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Check } from './Icons';

export function useStamp() {
  const [n, setN] = useState(0);
  const [show, setShow] = useState(false);
  const t = useRef();
  const fire = useCallback(() => {
    setShow(false);
    setN((x) => x + 1);
    requestAnimationFrame(() => setShow(true));
    clearTimeout(t.current);
    t.current = setTimeout(() => setShow(false), 1450);
  }, []);
  useEffect(() => () => clearTimeout(t.current), []);
  const el = show ? (
    <div key={n} className="stamp" role="status"><Check color="#0A0A0A" size={48} />Copy that.</div>
  ) : null;
  return [el, fire];
}

export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}

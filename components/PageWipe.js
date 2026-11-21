'use client';
import { usePathname } from 'next/navigation';
import { Logo } from './Icons';
export default function PageWipe() {
  const path = usePathname();
  if (path === '/') return null; // home has its own preloader
  return <div key={path} className="wipe" aria-hidden="true"><Logo size={44} /></div>;
}

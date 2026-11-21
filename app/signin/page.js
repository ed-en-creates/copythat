import { redirect } from 'next/navigation';
import { getUser } from '@/lib/supabase/server';
import { SignInForm } from '@/components/Forms';

export const metadata = { title: 'Sign in' };

export default async function SignIn({ searchParams }) {
  if (await getUser()) redirect('/account');
  const sp = await searchParams;
  return (
    <main className="wrap" style={{ paddingTop: 'clamp(40px, 6vw, 80px)', paddingBottom: 96, display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'stretch' }}>
      <div className="up" style={{ animationDelay: '.5s', flex: '1 1 420px', maxWidth: 520, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <SignInForm linkError={sp?.error === 'link'} />
      </div>
      <div className="up panel" aria-hidden="true" style={{ animationDelay: '.62s', flex: '1 1 480px', minHeight: 560, borderRadius: 28, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: 'var(--line-3)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#161615 1px, transparent 1px), linear-gradient(90deg, #161615 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div style={{ position: 'relative', width: 220, height: 240 }}>
          <div style={{ position: 'absolute', left: 0, bottom: 0, width: 160, height: 180, border: '3px solid #EDEDEA', borderRadius: 30 }} />
          <div className="si-copy" style={{ position: 'absolute', left: 0, bottom: 0, width: 160, height: 180, borderRadius: 30, background: 'var(--accent)' }} />
        </div>
        <p className="mono" style={{ position: 'absolute', left: 32, bottom: 28, margin: 0, fontSize: 12, color: 'var(--faint)' }}>Save prompts · customise · get the Friday drop</p>
      </div>
    </main>
  );
}

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase/server';
import { signOut } from '@/app/actions';

export const metadata = { title: 'Account' };
export const dynamic = 'force-dynamic';

export default async function Account() {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect('/signin');
  const { data: profile } = await sb.from('profiles').select('is_pro,pro_until,created_at').eq('id', user.id).maybeSingle();
  const pro = profile?.is_pro && (!profile.pro_until || new Date(profile.pro_until) > new Date());
  return (
    <main className="wrap-narrow page-main">
      <p className="eyebrow up" style={{ animationDelay: '.5s' }}>Account</p>
      <h1 className="h-display up" style={{ animationDelay: '.58s', fontSize: 'clamp(44px, 6vw, 88px)' }}>Copy that.<br />You’re in.</h1>
      <div className="panel up" style={{ animationDelay: '.66s', marginTop: 48, padding: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
        <div><p className="label" style={{ margin: 0 }}>Email</p><p style={{ margin: '8px 0 0', fontSize: 17, wordBreak: 'break-all' }}>{user.email}</p></div>
        <div><p className="label" style={{ margin: 0 }}>Plan</p><p style={{ margin: '8px 0 0', fontSize: 17 }}>{pro ? 'Pro' : 'Free'}</p></div>
        <div><p className="label" style={{ margin: 0 }}>Member since</p><p style={{ margin: '8px 0 0', fontSize: 17 }}>{new Date(profile?.created_at || user.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p></div>
      </div>
      <div className="row" style={{ marginTop: 32, gap: 12 }}>
        <Link className="btn btn-accent" href="/library">Browse the library</Link>
        {!pro && <Link className="btn btn-ghost" href="/pricing">Get Pro</Link>}
        <form action={signOut}><button type="submit" className="btn btn-ghost">Sign out</button></form>
      </div>
    </main>
  );
}

import Footer from '@/components/Footer';
import { SubmitForm } from '@/components/Forms';
import { supabaseServer } from '@/lib/supabase/server';

export const metadata = { title: 'Submit a prompt', description: 'Submit a prompt that works. If it passes testing, it goes live with your name on it.' };

export default async function Submit() {
  const sb = await supabaseServer();
  const { data: categories } = await sb.from('categories').select('slug,name').order('sort_order');
  return (
    <>
      <main className="wrap page-main" style={{ display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'flex-start' }}>
        <div className="up" style={{ animationDelay: '.5s', flex: '1 1 360px', maxWidth: 440 }}>
          <p className="eyebrow">Submit a prompt</p>
          <h1 style={{ margin: '20px 0 0', fontSize: 'clamp(44px, 5.4vw, 80px)', lineHeight: .94, fontWeight: 500, letterSpacing: '-.045em' }}>Show us what it makes.</h1>
          <p className="body" style={{ margin: '24px 0 0' }}>Every submission is tested on the model it was written for. If it works, it goes live with your name and link on it.</p>
          <ol className="mini-steps">
            <li><span className="mono">01</span>You submit the prompt</li>
            <li><span className="mono">02</span>We test it, usually within a week</li>
            <li><span className="mono">03</span>It goes live, credited to you</li>
          </ol>
        </div>
        <div className="up panel" style={{ animationDelay: '.6s', flex: '999 1 560px', minWidth: 0, borderRadius: 26, padding: 'clamp(24px, 4vw, 44px)' }}>
          <SubmitForm categories={categories || []} />
        </div>
      </main>
      <Footer />
    </>
  );
}

import { listPrompts } from '@/lib/data';
import LibraryClient from '@/components/LibraryClient';
import FeedbackPill from '@/components/FeedbackPill';

export const revalidate = 300;
export const metadata = { title: 'Library', description: 'Tested AI prompts for motion, UI, branding, product, websites and code — each with its result.' };

export default async function Library({ searchParams }) {
  const sp = await searchParams;
  const prompts = await listPrompts();
  return (
    <main className="wrap page-main">
      <div className="row between end" style={{ gap: 32 }}>
        <div>
          <p className="eyebrow up" style={{ animationDelay: '.5s' }}><span className="dot" />Updated regularly</p>
          <h1 className="up" style={{ animationDelay: '.58s', margin: '20px 0 0', fontSize: 'clamp(56px, 8vw, 120px)', lineHeight: .9, fontWeight: 500, letterSpacing: '-.05em' }}>Library</h1>
        </div>
        <p className="body up" style={{ animationDelay: '.66s', margin: 0, maxWidth: 380 }}>Every prompt here shows what it makes. Hover a card to see it move, open it to copy and customise.</p>
      </div>
      <LibraryClient prompts={prompts} initialCat={typeof sp?.c === 'string' ? sp.c : 'all'} />
      <FeedbackPill />
    </main>
  );
}

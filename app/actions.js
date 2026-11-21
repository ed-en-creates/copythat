'use server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase/server';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const str = (fd, k, max = 4000) => String(fd.get(k) ?? '').trim().slice(0, max);
const isBot = (fd) => str(fd, 'company').length > 0; // honeypot

async function siteUrl() {
  const h = await headers();
  const host = h.get('x-forwarded-host') || h.get('host');
  const proto = h.get('x-forwarded-proto') || 'http';
  return `${proto}://${host}`;
}

export async function joinWaitlist(_prev, fd) {
  if (isBot(fd)) return { ok: true };
  const email = str(fd, 'email', 320).toLowerCase();
  if (!EMAIL.test(email)) return { ok: false, error: 'That email doesn’t look right.' };
  const sb = await supabaseServer();
  const { error } = await sb.from('waitlist').insert({ email, interest: str(fd, 'interest', 40) || 'friday-drop' });
  if (error && error.code !== '23505') { console.error(error); return { ok: false, error: 'Something went wrong. Try again.' }; }
  return { ok: true };
}

export async function sendFeedback(_prev, fd) {
  if (isBot(fd)) return { ok: true };
  const message = str(fd, 'message');
  const kind = str(fd, 'kind', 20);
  const email = str(fd, 'email', 320);
  if (message.length < 3) return { ok: false, error: 'Write a few words first, so we know what you mean.' };
  if (email && !EMAIL.test(email)) return { ok: false, error: 'That email doesn’t look right.' };
  const sb = await supabaseServer();
  const { error } = await sb.from('feedback').insert({ kind: ['idea','bug','prompt','praise','other'].includes(kind) ? kind : 'other', message, email: email || null, page: str(fd, 'page', 200) || null });
  if (error) { console.error(error); return { ok: false, error: 'Something went wrong. Try again.' }; }
  return { ok: true, email };
}

export async function submitPrompt(_prev, fd) {
  if (isBot(fd)) return { ok: true };
  const title = str(fd, 'title', 140);
  const body = str(fd, 'body', 20000);
  const ownership = str(fd, 'ownership', 10) === 'source' ? 'source' : 'mine';
  const source_url = str(fd, 'source_url', 500);
  const email = str(fd, 'email', 320);
  if (title.length < 3) return { ok: false, error: 'Give it a title.' };
  if (body.length < 10) return { ok: false, error: 'Paste the full prompt.' };
  if (ownership === 'source' && !/^https?:\/\//.test(source_url)) return { ok: false, error: 'Add a link to where you found it.' };
  if (email && !EMAIL.test(email)) return { ok: false, error: 'That email doesn’t look right.' };
  const sb = await supabaseServer();
  const { error } = await sb.from('submissions').insert({
    title, body, ownership, source_url: source_url || null, email: email || null,
    category_slug: str(fd, 'category', 20) || null, target_tools: str(fd, 'tools', 200) || null, credit: str(fd, 'credit', 200) || null,
  });
  if (error) { console.error(error); return { ok: false, error: 'Something went wrong. Try again.' }; }
  return { ok: true, title };
}

export async function votePrompt(_prev, fd) {
  if (isBot(fd)) return { ok: true };
  const slug = str(fd, 'slug', 120);
  const worked = str(fd, 'worked', 5) === 'yes';
  const sb = await supabaseServer();
  const { error } = await sb.from('prompt_votes').insert({ prompt_slug: slug, worked, model_used: str(fd, 'model', 120) || null, note: str(fd, 'note', 1000) || null });
  if (error) { console.error(error); return { ok: false, error: 'Couldn’t send that. Try again.' }; }
  return { ok: true, worked };
}

export async function sendMagicLink(_prev, fd) {
  if (isBot(fd)) return { ok: true };
  const email = str(fd, 'email', 320).toLowerCase();
  if (!EMAIL.test(email)) return { ok: false, error: 'That email doesn’t look right.' };
  const sb = await supabaseServer();
  const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: `${await siteUrl()}/auth/callback?next=/account` } });
  if (error) { console.error(error); return { ok: false, error: error.status === 429 ? 'Too many tries. Wait a minute and try again.' : 'Couldn’t send the link. Try again.' }; }
  return { ok: true, email };
}

export async function signOut() {
  const sb = await supabaseServer();
  await sb.auth.signOut();
  redirect('/');
}

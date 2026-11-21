'use client';
import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { joinWaitlist, sendFeedback, submitPrompt, votePrompt, sendMagicLink } from '@/app/actions';
import { useStamp } from './Stamp';

const Honeypot = () => <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />;

export function WaitlistForm({ interest = 'friday-drop', button = 'Subscribe', done = 'Copy that. See you Friday.' }) {
  const [state, action, pending] = useActionState(joinWaitlist, null);
  if (state?.ok) return <div role="status" className="pill-status">{done}</div>;
  return (
    <div>
      <form action={action} className="pill-form">
        <label htmlFor={`wl-${interest}`} className="sr-only">Email address</label>
        <input id={`wl-${interest}`} name="email" type="email" required placeholder="you@studio.com" />
        <input type="hidden" name="interest" value={interest} />
        <Honeypot />
        <button type="submit" className="btn btn-accent" style={{ height: 48 }} disabled={pending}>{pending ? 'Sending…' : button}</button>
      </form>
      {state?.error && <p role="alert" className="form-error" style={{ marginTop: 10 }}>{state.error}</p>}
    </div>
  );
}

const KINDS = [
  { id: 'idea', label: 'An idea', ph: 'What would make CopyThat more useful for you?' },
  { id: 'bug', label: 'Something’s broken', ph: 'What happened, and what did you expect?' },
  { id: 'prompt', label: 'A prompt didn’t work', ph: 'Which prompt, which model, and what came out?' },
  { id: 'praise', label: 'Something I love', ph: 'Tell us what’s working. We’ll do more of it.' },
  { id: 'other', label: 'Something else', ph: 'Anything on your mind.' },
];
export function FeedbackForm({ from }) {
  const [state, action, pending] = useActionState(sendFeedback, null);
  const [kind, setKind] = useState('idea');
  const [stamp, fire] = useStamp();
  const cur = KINDS.find((k) => k.id === kind);
  useEffect(() => { if (state?.ok) fire(); }, [state, fire]);
  if (state?.ok) return (
    <div role="status" style={{ minHeight: 420, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
      {stamp}
      <p style={{ margin: 0, fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-.04em', lineHeight: 1 }}>Copy that.<br />Thank you.</p>
      <p className="body" style={{ margin: 0 }}>{state.email ? `We’ll reply to ${state.email} once we’ve looked into it.` : 'No email left, so no reply — but every message is read.'}</p>
      <div className="row" style={{ gap: 10, marginTop: 8 }}>
        <Link className="btn btn-light btn-sm" href="/library">Back to library</Link>
      </div>
    </div>
  );
  return (
    <form action={action} className="form">
      <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
        <legend style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 12 }}>What’s it about?</legend>
        <div className="row" style={{ gap: 8 }}>
          {KINDS.map((k) => <button key={k.id} type="button" role="radio" aria-checked={kind === k.id} className="chip" onClick={() => setKind(k.id)}>{k.label}</button>)}
        </div>
      </fieldset>
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="page" value={from || ''} />
      <label className="lbl">Your message<textarea name="message" className="field" rows={7} required minLength={3} placeholder={cur.ph} /></label>
      <label className="lbl">Email <span style={{ color: 'var(--faint)' }}>(optional, if you’d like a reply)</span><input name="email" type="email" className="field" placeholder="you@studio.com" /></label>
      <Honeypot />
      <div className="row between center" style={{ gap: 14 }}>
        <span style={{ fontSize: 13, color: 'var(--faint)' }}>We’ll attach the page you came from, nothing else.</span>
        <button type="submit" className="btn btn-accent btn-lg" style={{ borderRadius: 14 }} disabled={pending}>{pending ? 'Sending…' : 'Send feedback'}</button>
      </div>
      {state?.error && <p role="alert" className="form-error">{state.error}</p>}
    </form>
  );
}

export function SubmitForm({ categories }) {
  const [state, action, pending] = useActionState(submitPrompt, null);
  const [owner, setOwner] = useState('mine');
  if (state?.ok) return (
    <div role="status" style={{ minHeight: 420, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
      <p style={{ margin: 0, fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-.04em', lineHeight: 1 }}>Copy that.<br />We’ll test it.</p>
      <p className="body" style={{ margin: 0 }}>“{state.title || 'Your prompt'}” is in the test queue. If you left an email, you’ll hear back either way.</p>
      <div className="row" style={{ gap: 10, marginTop: 8 }}>
        <a className="btn btn-ghost btn-sm" href="/submit">Submit another</a>
        <Link className="btn btn-light btn-sm" href="/library">Back to library</Link>
      </div>
    </div>
  );
  return (
    <form action={action} className="form">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <label className="lbl">Title<input name="title" className="field" required minLength={3} placeholder="e.g. Kinetic type for a launch line" /></label>
        <label className="lbl">Category
          <select name="category" className="field" style={{ cursor: 'pointer' }}>{categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select>
        </label>
      </div>
      <label className="lbl">Written for (model or tool)<input name="tools" className="field" placeholder="e.g. Veo, Claude, Midjourney" /></label>
      <label className="lbl">The prompt<textarea name="body" className="field" rows={7} required minLength={10} placeholder="Paste the full prompt. Mark the parts people should change in [brackets]." style={{ fontFamily: 'var(--mono)', fontSize: 14 }} /></label>
      <fieldset style={{ border: 0, margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <legend style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 10 }}>Who wrote it?</legend>
        {[['mine', 'I wrote it'], ['source', 'I found it somewhere — here is the source']].map(([id, label]) => (
          <button key={id} type="button" role="radio" aria-checked={owner === id} onClick={() => setOwner(id)} style={{ minHeight: 52, borderRadius: 12, border: `1px solid ${owner === id ? '#EDEDEA' : 'var(--line-3)'}`, background: owner === id ? '#151514' : 'transparent', color: 'var(--text)', fontSize: 15, textAlign: 'left', padding: '0 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid var(--faint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: owner === id ? 'var(--accent)' : 'transparent' }} /></span>{label}
          </button>
        ))}
      </fieldset>
      <input type="hidden" name="ownership" value={owner} />
      {owner === 'source' && <label className="lbl">Link to the original<input name="source_url" type="url" className="field" required placeholder="https://" /></label>}
      <label className="lbl">Credit me as<input name="credit" className="field" placeholder="Name or handle, and a link" /></label>
      <label className="lbl">Email <span style={{ color: 'var(--faint)' }}>(so we can tell you the result)</span><input name="email" type="email" className="field" placeholder="you@studio.com" /></label>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--faint)', lineHeight: 1.5 }}>Got a result image or video? Reply to our email with it once you hear from us — uploads are coming soon.</p>
      <Honeypot />
      <button type="submit" className="btn btn-accent btn-lg btn-block" disabled={pending}>{pending ? 'Sending…' : 'Submit for testing'}</button>
      {state?.error && <p role="alert" className="form-error">{state.error}</p>}
    </form>
  );
}

export function VoteWidget({ slug }) {
  const [state, action, pending] = useActionState(votePrompt, null);
  const [step, setStep] = useState('ask');
  if (state?.ok) return <div className="box"><p role="status" style={{ margin: 0, fontSize: 15 }}>{state.worked ? 'Copy that. Thanks — that keeps this prompt marked as passing.' : 'Copy that. It’s in the re-test queue. We’ll fix it or retire it.'}</p></div>;
  if (step === 'ask') return (
    <div className="box">
      <div className="row between center" style={{ gap: 12 }}>
        <span style={{ fontSize: 15 }}>Did this work for you?</span>
        <form action={action} style={{ display: 'flex', gap: 8 }}>
          <input type="hidden" name="slug" value={slug} /><input type="hidden" name="worked" value="yes" /><Honeypot />
          <button type="submit" className="btn btn-ghost btn-sm" disabled={pending}>Yes, it worked</button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStep('no')}>No</button>
        </form>
      </div>
    </div>
  );
  return (
    <form action={action} className="box">
      <span style={{ fontSize: 15 }}>Sorry about that. Help us fix it?</span>
      <input type="hidden" name="slug" value={slug} /><input type="hidden" name="worked" value="no" /><Honeypot />
      <label className="lbl" style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--text-2)' }}>Which model did you use?<input name="model" className="field" placeholder="e.g. Veo, Kling, Runway" /></label>
      <label className="lbl" style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--text-2)' }}>What went wrong? <span style={{ color: 'var(--faint)' }}>(optional)</span><textarea name="note" className="field" rows={3} /></label>
      <button type="submit" className="btn btn-light btn-sm" style={{ alignSelf: 'flex-start' }} disabled={pending}>Send to the test queue</button>
      {state?.error && <p role="alert" className="form-error">{state.error}</p>}
    </form>
  );
}

export function SignInForm({ linkError }) {
  const [state, action, pending] = useActionState(sendMagicLink, null);
  const [mode, setMode] = useState('in');
  const [again, setAgain] = useState(0);
  const sent = state?.ok && again === 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div role="tablist" aria-label="Account" className="seg" style={{ alignSelf: 'flex-start' }}>
        {[['in', 'Sign in'], ['up', 'Create account']].map(([id, label]) => <button key={id} type="button" role="tab" aria-selected={mode === id} onClick={() => setMode(id)}>{label}</button>)}
      </div>
      <h1 style={{ margin: 0, fontSize: 'clamp(44px, 5vw, 72px)', lineHeight: .95, fontWeight: 500, letterSpacing: '-.045em' }}>{mode === 'in' ? 'Welcome back.' : 'Start free.'}</h1>
      <p className="body" style={{ margin: 0 }}>{mode === 'in' ? 'Pick up your saved prompts and collections.' : 'Free forever. Save prompts, use the customiser and get the Friday drop.'}</p>
      {linkError && !sent && <p role="alert" className="form-error">That sign-in link didn’t work or has expired. Send a new one.</p>}
      {sent ? (
        <div role="status" className="panel" style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 12, borderRadius: 18 }}>
          <p style={{ margin: 0, fontSize: 28, fontWeight: 500, letterSpacing: '-.03em' }}>Copy that. Check your inbox.</p>
          <p className="body" style={{ margin: 0, fontSize: 15 }}>We sent a sign-in link to {state.email}. Open it on this device.</p>
          <button type="button" className="link" style={{ alignSelf: 'flex-start' }} onClick={() => setAgain(1)}>Use a different email</button>
        </div>
      ) : (
        <form action={async (fd) => { setAgain(0); await action(fd); }} className="form" style={{ gap: 14 }}>
          <label htmlFor="si-email" style={{ fontSize: 14, color: 'var(--text-2)' }}>Email</label>
          <input id="si-email" name="email" type="email" required className="field" placeholder="you@studio.com" autoComplete="email" />
          <Honeypot />
          <button type="submit" className="btn btn-accent btn-block" style={{ height: 54 }} disabled={pending}>{pending ? 'Sending…' : 'Email me a sign-in link'}</button>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--faint)', lineHeight: 1.5 }}>No password to remember. By continuing you agree to the <Link href="/how#terms" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>terms</Link>.</p>
          {state?.error && <p role="alert" className="form-error">{state.error}</p>}
        </form>
      )}
    </div>
  );
}


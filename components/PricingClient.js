'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Check } from './Icons';
import { WaitlistForm } from './Forms';

const P = {
  usd: { sym: '$', month: 12, year: 96, pack: 29, founding: 59, fee: 300, step: 10 },
  ngn: { sym: '₦', month: 7500, year: 60000, pack: 18000, founding: 36000, fee: 250000, step: 5000 },
};
const money = (c, n) => P[c].sym + Math.round(n).toLocaleString('en-US');
const Feat = ({ items, color = '#EDEDEA' }) => <ul>{items.map((i) => <li key={i}><Check color={color} /><span>{i}</span></li>)}</ul>;

export default function PricingClient() {
  const [period, setPeriod] = useState('year');
  const [cur, setCur] = useState('usd');
  const [fee, setFee] = useState(P.usd.fee);
  const [jobs, setJobs] = useState(4);
  const p = P[cur];
  const payback = fee <= 0 ? '—' : p.year / fee <= 1 ? 'your first job' : `${Math.ceil(p.year / fee)} jobs`;
  const switchCur = (c) => { setCur(c); setFee(P[c].fee); };
  return (
    <>
      <div className="row up" style={{ animationDelay: '.66s', marginTop: 40, gap: 12, justifyContent: 'center' }}>
        <div className="seg" role="group" aria-label="Billing period">
          <button type="button" aria-pressed={period === 'month'} onClick={() => setPeriod('month')}>Monthly</button>
          <button type="button" aria-pressed={period === 'year'} onClick={() => setPeriod('year')}>Yearly · save 33%</button>
        </div>
        <div className="seg" role="group" aria-label="Currency">
          <button type="button" aria-pressed={cur === 'usd'} onClick={() => switchCur('usd')}>USD</button>
          <button type="button" aria-pressed={cur === 'ngn'} onClick={() => switchCur('ngn')}>NGN</button>
        </div>
      </div>

      <div className="panel up" style={{ animationDelay: '.72s', margin: '56px auto 0', maxWidth: 1120, borderRadius: 18, padding: '18px 22px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, borderColor: 'var(--line-3)' }}>
        <div className="row center" style={{ gap: 14 }}>
          <span className="tag tag-pro">FOUNDING 100</span>
          <span style={{ fontSize: 15 }}>Pro for {money(cur, p.founding)}/year, locked for life. Only for the first 100 members.</span>
        </div>
        <a className="link" href="#reserve">Reserve a spot</a>
      </div>

      <div className="plans">
        <div className="plan up" style={{ animationDelay: '.8s' }}>
          <div><p className="label" style={{ margin: 0 }}>Free</p><p className="price">{p.sym}0</p><p style={{ margin: '8px 0 0', color: 'var(--faint)', fontSize: 14 }}>forever</p></div>
          <p className="small" style={{ fontSize: 15 }}>The whole free library, credited. Copy anything, no account needed.</p>
          <Feat items={['Every free prompt, with its result', 'Customiser on free prompts', 'The Friday drop', 'Save prompts with a free account']} />
          <Link className="btn btn-ghost btn-block cta" href="/library">Browse free prompts</Link>
        </div>
        <div className="plan hot up" style={{ animationDelay: '.86s' }}>
          <span className="tag tag-pro" style={{ position: 'absolute', top: 22, right: 22 }}>MOST VALUE</span>
          <div><p className="label" style={{ margin: 0 }}>Pro</p><p className="price">{period === 'year' ? money(cur, p.year / 12) : money(cur, p.month)}</p><p style={{ margin: '8px 0 0', color: 'var(--faint)', fontSize: 14 }}>{period === 'year' ? `per month, billed ${money(cur, p.year)} yearly` : 'per month, cancel any time'}</p></div>
          <p className="small" style={{ fontSize: 15 }}>Every Pro workflow, and a new one each month. Built for designers who bill clients.</p>
          <Feat color="#FF5A1F" items={['Everything in Free', 'All Pro workflows, incl. Motion Brand Showcase', 'A new workflow every month', 'Re-tested when models change', 'Commercial licence for results']} />
          <a className="btn btn-accent btn-block cta" href="#reserve">Get Pro</a>
        </div>
        <div className="plan up" style={{ animationDelay: '.92s' }}>
          <div><p className="label" style={{ margin: 0 }}>Single pack</p><p className="price">{money(cur, p.pack)}</p><p style={{ margin: '8px 0 0', color: 'var(--faint)', fontSize: 14 }}>one-time, yours to keep</p></div>
          <p className="small" style={{ fontSize: 15 }}>Not ready to subscribe? Buy one workflow and keep it.</p>
          <Feat items={['One Pro workflow of your choice', 'Its example files and result', 'Updates for that workflow', 'Commercial licence for results']} />
          <Link className="btn btn-ghost btn-block cta" href="/p/motion-brand-showcase">See Motion Brand Showcase</Link>
        </div>
      </div>

      <section id="reserve" aria-labelledby="res-h" className="panel" style={{ margin: '24px auto 0', maxWidth: 1120, borderRadius: 22, padding: 'clamp(24px, 4vw, 40px)', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'space-between', scrollMarginTop: 120 }}>
        <div style={{ flex: '1 1 420px' }}>
          <h2 id="res-h" style={{ margin: 0, fontSize: 28, fontWeight: 500, letterSpacing: '-.03em' }}>Payments open very soon.</h2>
          <p className="body" style={{ margin: '10px 0 0', fontSize: 15 }}>Reserve your spot and you’ll get the checkout link first — at the founding price of {money(cur, p.founding)}/year for the first 100 members. Card, bank transfer and USSD.</p>
        </div>
        <div style={{ flex: '1 1 380px', maxWidth: 480 }}><WaitlistForm interest="pro-founding" button="Reserve" done="Copy that. You’re on the founding list." /></div>
      </section>

      <section aria-labelledby="calc-h" className="panel" style={{ margin: '120px auto 0', maxWidth: 1120, borderRadius: 26, overflow: 'hidden', display: 'flex', flexWrap: 'wrap', padding: 0 }}>
        <div style={{ flex: '1 1 440px', padding: 'clamp(28px, 4vw, 52px)', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <p className="eyebrow">Do the maths</p>
          <h2 id="calc-h" style={{ margin: 0, fontSize: 'clamp(32px, 3.6vw, 52px)', fontWeight: 500, letterSpacing: '-.04em', lineHeight: 1 }}>What’s one brand film worth to you?</h2>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'var(--text-2)' }}>What you charge a client for one brand film ({p.sym})
            <input className="field" type="number" min="0" step={p.step} value={fee} onChange={(e) => setFee(Math.max(0, +e.target.value || 0))} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'var(--text-2)' }}>Brand films you’d deliver in a year · {jobs}
            <input type="range" min="1" max="24" step="1" value={jobs} onChange={(e) => setJobs(+e.target.value)} />
          </label>
        </div>
        <div style={{ flex: '1 1 380px', padding: 'clamp(28px, 4vw, 52px)', background: '#0B0B0A', borderLeft: '1px solid var(--line)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18 }}>
          <div><p className="label" style={{ margin: 0 }}>You could bill</p><p style={{ margin: '10px 0 0', fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 500, letterSpacing: '-.045em', lineHeight: 1 }} aria-live="polite">{money(cur, fee * jobs)}</p></div>
          <div style={{ height: 1, background: 'var(--line-2)' }} />
          <div className="row between" style={{ fontSize: 15, color: 'var(--text-2)' }}><span>Pro, for a year</span><span>{money(cur, p.year)}</span></div>
          <div className="row between" style={{ fontSize: 15, color: 'var(--text-2)' }}><span>Pro pays for itself after</span><span style={{ color: 'var(--accent)' }}>{payback}</span></div>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--faint)', lineHeight: 1.5 }}>An example, not a promise. Your fee and workload decide the numbers.</p>
        </div>
      </section>
    </>
  );
}

'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import PromptCard from './PromptCard';
import { SearchIcon, Arrow } from './Icons';

const CATS = [['all', 'All prompts'], ['motion', 'Motion'], ['ui', 'UI'], ['branding', 'Branding'], ['product', 'Product'], ['website', 'Website'], ['code', 'Code']];

export default function LibraryClient({ prompts, initialCat = 'all' }) {
  const [cat, setCat] = useState(CATS.some(([c]) => c === initialCat) ? initialCat : 'all');
  const [tier, setTier] = useState('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('featured');
  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = prompts.filter((p) =>
      (cat === 'all' || p.category_slug === cat) &&
      (tier === 'all' || p.tier === tier) &&
      (!needle || `${p.title} ${p.summary} ${(p.target_tools || []).join(' ')}`.toLowerCase().includes(needle)));
    if (sort === 'newest') list = [...list].sort((a, b) => String(b.published_at).localeCompare(String(a.published_at)));
    if (sort === 'az') list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [prompts, cat, tier, q, sort]);
  const reset = () => { setCat('all'); setTier('all'); setQ(''); };

  return (
    <>
      <div className="lib-toolbar up" style={{ animationDelay: '.74s' }}>
        <div className="search">
          <SearchIcon />
          <label htmlFor="lib-q" className="sr-only">Search the library</label>
          <input id="lib-q" type="search" placeholder="Search by idea, style or tool" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="seg" role="group" aria-label="Tier" style={{ borderRadius: 14, height: 54, alignItems: 'center' }}>
          {[['all', 'All'], ['free', 'Free'], ['pro', 'Pro']].map(([id, label]) => <button key={id} type="button" aria-pressed={tier === id} onClick={() => setTier(id)} style={{ borderRadius: 10, height: 44 }}>{label}</button>)}
        </div>
        <label className="select-wrap"><span>Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option><option value="newest">Newest</option><option value="az">A–Z</option>
          </select>
        </label>
      </div>
      <div className="lib-body">
        <aside aria-label="Categories" className="lib-aside up" style={{ animationDelay: '.82s' }}>
          <p className="label" style={{ margin: '0 0 12px' }}>Category</p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {CATS.map(([id, label]) => <li key={id}><button type="button" className="cat-btn" aria-pressed={cat === id} onClick={() => setCat(id)}><span>{label}</span><span className="d" /></button></li>)}
          </ul>
          <div className="panel" style={{ marginTop: 32, borderRadius: 16, padding: 18 }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 500 }}>Wrote a prompt that works?</p>
            <p className="small" style={{ margin: '8px 0 6px', fontSize: 13 }}>Submit it with your result. You keep the credit.</p>
            <Link className="link" href="/submit" style={{ fontSize: 13 }}>Submit a prompt <Arrow size={12} /></Link>
          </div>
        </aside>
        <section aria-label="Results" className="lib-results">
          <p role="status" className="mono" style={{ margin: '0 0 16px', fontSize: 12, color: 'var(--faint)' }}>{visible.length === 1 ? '1 prompt' : `${visible.length} prompts`}</p>
          {visible.length === 0 ? (
            <div className="empty">
              <p style={{ margin: 0, fontSize: 22, fontWeight: 500, letterSpacing: '-.02em' }}>Nothing matches that yet.</p>
              <p className="body" style={{ margin: '10px 0 22px', fontSize: 15 }}>Try a broader word, or clear the filters.</p>
              <button type="button" className="btn btn-light btn-sm" onClick={reset}>Clear filters</button>
            </div>
          ) : (
            <div className="grid-cards">
              {visible.map((p, i) => <PromptCard key={p.id} p={p} headingLevel={2} delay={`${(0.85 + i * 0.06).toFixed(2)}s`} />)}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

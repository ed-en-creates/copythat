import Link from 'next/link';
import Thumb from './Thumb';
import { CATEGORY_LABELS } from '@/lib/constants';

export default function PromptCard({ p, delay, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  return (
    <Link href={`/p/${p.slug}`} className={'card pcard' + (delay != null ? ' up' : '')} style={delay != null ? { animationDelay: delay } : undefined}>
      <div className="pcard-thumb">
        <Thumb prompt={p} />
        <span className="pcard-cat">{CATEGORY_LABELS[p.category_slug]}</span>
        {p.tier === 'pro' && <span className="tag tag-pro pcard-pro">PRO</span>}
        <span className="pcard-hint">Open ↗</span>
      </div>
      <div className="pcard-body">
        <H>{p.title}</H>
        <p className="small">{p.summary}</p>
        <div className="pcard-meta"><span>{(p.target_tools || []).join(' · ')}</span><span>{p.creator_name === 'CopyThat Studio' ? 'Original' : p.creator_name}</span></div>
      </div>
    </Link>
  );
}

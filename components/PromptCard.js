import Link from 'next/link';
import Thumb from './Thumb';
import { CATEGORY_LABELS } from '@/lib/constants';
import { modelInfo } from '@/lib/model';

export default function PromptCard({ p, delay, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  const mi = modelInfo(p);
  return (
    <Link href={`/p/${p.slug}`} className={'card pcard' + (delay != null ? ' up' : '')} style={delay != null ? { animationDelay: delay } : undefined}>
      <div className="pcard-thumb">
        <Thumb prompt={p} />
        <span className="pcard-cat">{CATEGORY_LABELS[p.category_slug]}</span>
        {p.tier === 'pro' && <span className="tag tag-pro pcard-pro">PRO</span>}
        <span className="pcard-model">{mi.tested && <span className="ok" aria-hidden="true" />}<span className="k">{mi.label}</span>{mi.model}</span>
        <span className="pcard-hint">Open ↗</span>
      </div>
      <div className="pcard-body">
        <H>{p.title}</H>
        <p className="small">{p.summary}</p>
        <div className="pcard-meta"><span>{mi.also.length ? 'Also: ' + mi.also.join(' · ') : (mi.tested ? 'Tested result' : 'Not yet tested')}</span><span>{p.creator_name === 'CopyThat Studio' ? 'Original' : p.creator_name}</span></div>
      </div>
    </Link>
  );
}

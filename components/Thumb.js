const A = 'var(--accent)';
export default function Thumb({ prompt }) {
  if (prompt.preview_url) return <img src={prompt.preview_url} alt="" loading="lazy" />;
  switch (prompt.category_slug) {
    case 'motion': return <div className="play a-slide" style={{ width: 46, height: 46, borderRadius: 12, background: A }} />;
    case 'ui': return (
      <div style={{ width: '70%', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 6 }}>
        <div style={{ gridColumn: 'span 2', height: 56, border: '1px solid #3A3A38', borderRadius: 8 }} />
        <div className="play a-pulse" style={{ height: 56, borderRadius: 8, background: A }} />
        <div style={{ height: 56, border: '1px solid #2E2E2C', borderRadius: 8 }} />
        <div style={{ gridColumn: 'span 2', height: 56, border: '1px solid #2E2E2C', borderRadius: 8 }} />
      </div>
    );
    case 'branding': return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 74, fontWeight: 500, letterSpacing: '-.05em', lineHeight: .8 }}>Aa</span>
        <div className="play a-spin" style={{ width: 58, height: 58, borderRadius: '50%', border: '1px dashed #5A5A57', position: 'relative' }}><div style={{ position: 'absolute', top: -6, left: 23, width: 12, height: 12, borderRadius: '50%', background: A }} /></div>
      </div>
    );
    case 'product': return (
      <div style={{ position: 'relative', width: 150, height: 150, display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', bottom: 0, width: 150, height: 28, border: '1px solid #3A3A38', borderRadius: '50%' }} />
        <div className="play a-bob" style={{ position: 'absolute', bottom: 18, width: 62, height: 108, border: '1.5px solid #C9C9C4', borderRadius: '16px 16px 10px 10px' }}><div style={{ marginTop: 44, height: 20, background: A }} /></div>
      </div>
    );
    case 'website': return (
      <div style={{ width: '72%', border: '1px solid #3A3A38', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ height: 18, borderBottom: '1px solid #2E2E2C' }} />
        <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div className="play a-type" style={{ height: 10, background: '#C9C9C4', borderRadius: 2, maxWidth: '80%' }} />
          <div style={{ height: 4, width: '60%', background: '#3A3A38', borderRadius: 2, marginTop: 4 }} />
          <div style={{ height: 14, width: '30%', background: A, borderRadius: 999, marginTop: 6 }} />
        </div>
      </div>
    );
    default: return (
      <div className="mono" style={{ fontSize: 12, lineHeight: 1.8, color: 'var(--faint)', width: '72%' }}>
        <div><span style={{ color: A }}>const</span> tokens = extract(</div>
        <div className="play a-type" style={{ paddingLeft: 16, color: 'var(--text-2)' }}>screenshot, {'{'} css: true {'}'}</div>
        <div>)</div>
      </div>
    );
  }
}

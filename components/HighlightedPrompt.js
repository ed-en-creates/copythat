export default function HighlightedPrompt({ text }) {
  const parts = String(text || '').split(/(\[[^\]]+\])/g);
  return <>{parts.map((p, i) => p.startsWith('[') && p.endsWith(']') ? <span key={i} className="hl">{p.slice(1, -1)}</span> : <span key={i}>{p}</span>)}</>;
}

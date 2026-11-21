'use client';
import { useStamp, copyText } from './Stamp';
import { CopyIcon } from './Icons';
export default function CopyButton({ text, label = 'Copy prompt', className = 'btn btn-accent btn-lg', style }) {
  const [stamp, fire] = useStamp();
  return (
    <>
      {stamp}
      <button type="button" className={className} style={{ flex: 1, borderRadius: 14, height: 56, ...style }} onClick={async () => { await copyText(text); fire(); }}>
        <CopyIcon />{label}
      </button>
    </>
  );
}

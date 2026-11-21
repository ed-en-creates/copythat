'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Lock } from './Icons';

// steps: [{ title, body, locked }] — locked bodies are teasers only; full text is never sent unless the server confirmed Pro.
export default function ProSteps({ steps }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="steps-acc">
      {steps.map((s, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button type="button" className="step-btn" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span className="num" style={{ fontSize: 12, width: 28 }}>{String(i).padStart(2, '0')}</span>
              <span style={{ flex: 1, fontSize: 17, fontWeight: 500, letterSpacing: '-.01em' }}>{s.title}</span>
              {s.locked && <span role="img" aria-label="Locked"><Lock color="#8A8A85" /></span>}
              <span aria-hidden="true" className="mono" style={{ fontSize: 16, color: 'var(--faint)', width: 16, textAlign: 'center' }}>{isOpen ? '–' : '+'}</span>
            </button>
            {isOpen && (
              <div className="step-body">
                <div className={s.locked ? 'blurred' : undefined} aria-hidden={s.locked || undefined}>{s.body}</div>
                {s.locked && <div className="locked-overlay"><Link className="btn btn-light btn-sm" href="/pricing">Unlock this step with Pro</Link></div>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

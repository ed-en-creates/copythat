import Link from 'next/link';
export default function FeedbackPill() {
  return (
    <Link href="/feedback" className="feedback-pill">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 3.5A1.5 1.5 0 014 2h8a1.5 1.5 0 011.5 1.5v6A1.5 1.5 0 0112 11H7l-3 3v-3H4a1.5 1.5 0 01-1.5-1.5v-6z" stroke="#0A0A0A" strokeWidth="1.4" strokeLinejoin="round" /></svg>
      Feedback
    </Link>
  );
}

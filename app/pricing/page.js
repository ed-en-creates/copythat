import PricingClient from '@/components/PricingClient';
import Footer from '@/components/Footer';
import { Check } from '@/components/Icons';

export const metadata = { title: 'Pricing', description: 'Free to start. Pro unlocks every workflow, a new one each month, and pays for itself on one client job.' };

const ROWS = [['Free library — copy without an account', 1, 1], ['Customiser on every free prompt', 1, 1], ['Friday drop email', 1, 1], ['Save prompts', 1, 1], ['Pro workflows (incl. Motion Brand Showcase)', 0, 1], ['A new Pro workflow every month', 0, 1], ['Re-test updates when models change', 0, 1], ['Commercial licence for results', 0, 1]];
const FAQ = [
  ['Is the free library actually free?', 'Yes. Every free prompt can be copied without an account, forever. An account only adds saving.'],
  ['What do I get with Pro that I can’t get free?', 'The Pro workflows: multi-step systems that produce finished deliverables, like the Motion Brand Showcase. Plus a new workflow every month and updates whenever a model change breaks one.'],
  ['Can I use the results in client work?', 'Yes. Pro includes a commercial licence for what you make with the workflows. You can’t resell or republish the prompts themselves.'],
  ['Why is there naira pricing?', 'So designers in Nigeria pay a price that makes sense locally. You’ll be able to pay by card, bank transfer or USSD.'],
  ['When can I pay?', 'Payments open very soon. Reserve a founding spot and you’ll get the checkout link first.'],
];
const mark = (v) => v ? <Check color="#EDEDEA" /> : <span style={{ color: '#5A5A57' }}>—</span>;

export default function Pricing() {
  return (
    <>
      <main className="wrap page-main">
        <div style={{ textAlign: 'center', maxWidth: 860, margin: '0 auto' }}>
          <p className="eyebrow up" style={{ animationDelay: '.5s', justifyContent: 'center' }}>Pricing</p>
          <h1 className="h-display up" style={{ animationDelay: '.58s' }}>Free to start.<br />Pays for itself<br />on one job.</h1>
        </div>
        <PricingClient />
        <section aria-labelledby="cmp-h" style={{ margin: '120px auto 0', maxWidth: 1120 }}>
          <h2 id="cmp-h" style={{ margin: 0, fontSize: 'clamp(32px, 3.6vw, 52px)', fontWeight: 500, letterSpacing: '-.04em' }}>Compare</h2>
          <div style={{ marginTop: 28, overflowX: 'auto' }}>
            <table className="cmp">
              <thead><tr><th scope="col" className="label" style={{ textAlign: 'left', fontWeight: 400, paddingTop: 0 }}>Feature</th><th scope="col" className="label" style={{ width: 140, fontWeight: 400, paddingTop: 0 }}>Free</th><th scope="col" className="label" style={{ width: 140, fontWeight: 400, paddingTop: 0 }}>Pro</th></tr></thead>
              <tbody>{ROWS.map(([f, a, b]) => <tr key={f}><th scope="row">{f}</th><td>{mark(a)}</td><td>{mark(b)}</td></tr>)}</tbody>
            </table>
          </div>
        </section>
        <section aria-labelledby="faq-h" className="row" style={{ margin: '120px auto 0', maxWidth: 1120, gap: 48 }}>
          <h2 id="faq-h" style={{ flex: '1 1 280px', margin: 0, fontSize: 'clamp(32px, 3.6vw, 52px)', fontWeight: 500, letterSpacing: '-.04em', lineHeight: 1 }}>Questions</h2>
          <div style={{ flex: '999 1 560px', borderBottom: '1px solid var(--line-2)' }}>
            {FAQ.map(([q, a]) => <details key={q} className="faq"><summary>{q}<span className="pm" aria-hidden="true">+</span></summary><p>{a}</p></details>)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

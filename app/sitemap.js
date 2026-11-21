import { SITE_URL } from '@/lib/site';
import { listPrompts } from '@/lib/data';
export default async function sitemap() {
  const base = SITE_URL;
  const prompts = await listPrompts();
  return ['', '/library', '/open-source', '/how', '/changelog', '/submit', '/feedback'].map((p) => ({ url: base + p, changeFrequency: 'weekly' }))
    .concat(prompts.map((p) => ({ url: `${base}/p/${p.slug}`, changeFrequency: 'monthly' })));
}

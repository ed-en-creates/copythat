import { SITE_URL } from '@/lib/site';
export default function robots() {
  const base = SITE_URL;
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/account', '/auth/'] }], sitemap: `${base}/sitemap.xml` };
}

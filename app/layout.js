import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import Nav from '@/components/Nav';
import PageWipe from '@/components/PageWipe';
import { getUser } from '@/lib/supabase/server';

import { SITE_URL as SITE } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'CopyThat — Prompts that already worked', template: '%s · CopyThat' },
  description: 'A living library of AI prompts and workflows for motion, UI, branding and code. Every prompt shows the result it made, the model it ran on, and who wrote it.',
  openGraph: { title: 'CopyThat — Prompts that already worked', description: 'Tested AI prompts and workflows for designers. Every prompt shows its result.', images: ['/media/fluxa-poster.webp'], type: 'website' },
  twitter: { card: 'summary_large_image' },
};
export const viewport = { themeColor: '#0A0A0A' };

export default async function RootLayout({ children }) {
  const user = await getUser();
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <PageWipe />
        <Nav signedIn={!!user} />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'NEXT BEAUTY JOURNAL | 美容業界の今がわかる情報メディア',
    template: '%s | NEXT BEAUTY JOURNAL',
  },
  description:
    '美容学生・美容師・サロン経営者が毎日ひとつ学べる情報メディア。美容業界の最新情報、トレンド、経営ノウハウを発信します。',
  keywords: ['美容', '美容師', '美容学生', 'サロン', 'ヘア', 'トレンド', 'NEXT BEAUTY JOURNAL'],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'NEXT BEAUTY JOURNAL',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

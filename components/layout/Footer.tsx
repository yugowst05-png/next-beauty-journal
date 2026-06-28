import Link from 'next/link';
import { CATEGORIES } from '@/types/article';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="text-xs tracking-widest text-gray-500 uppercase mb-1">Next Beauty</p>
            <p className="text-white font-bold text-lg mb-3">NEXT BEAUTY JOURNAL</p>
            <p className="text-sm leading-relaxed">
              美容業界の最新情報や現場で使える知識を届ける情報メディア。
              美容学生・美容師・サロン経営者が毎日ひとつ学べる場所。
            </p>
          </div>

          {/* Categories */}
          <div>
            <p className="text-white text-sm font-semibold mb-4">カテゴリー</p>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-white transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <p className="text-white text-sm font-semibold mb-4">サイト情報</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
              <li><Link href="/articles" className="hover:text-white transition-colors">記事一覧</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-xs text-center text-gray-600">
          © 2026 NEXT BEAUTY JOURNAL. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

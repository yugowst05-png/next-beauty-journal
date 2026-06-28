import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'NEXT BEAUTY JOURNALについて。美容業界の情報メディアとしての目的とビジョンをお伝えします。',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">About</p>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
        NEXT BEAUTY JOURNALとは
      </h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p className="text-lg leading-[1.9]">
          NEXT BEAUTY JOURNALは、美容業界の最新情報や現場で使える知識を届ける情報メディアです。
          美容学生、若手美容師、サロン経営者、メーカー関係者が、毎日ひとつ学びを得られる場所を目指しています。
        </p>

        <div className="border-l-4 border-pink-400 pl-6 py-2">
          <p className="text-xl font-bold text-gray-900 mb-2">美容業界の"今"がわかる場所。</p>
          <p className="text-sm text-gray-500">
            毎日1記事を目標に、業界の最前線で起きていることを発信し続けます。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">このメディアが届けたいこと</h2>
          <ul className="space-y-3">
            {[
              '美容学生が就職・キャリアについて正しく考えられる情報',
              '若手美容師が技術と知識を身につけるためのヒント',
              'サロン経営者が経営・採用・集客に活かせるノウハウ',
              'メーカー・ディーラーが市場を読み解くためのデータと考察',
              '美容業界全体のトレンドと未来への視点',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-pink-500 font-bold text-sm mt-0.5">—</span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">NEXT2000 Projectとの連携</h2>
          <p>
            NEXT BEAUTY JOURNALはNEXT2000 Projectと連携しています。NEXT2000は、美容業界の次世代を担う
            2000人のリーダーを育成するプロジェクト。インタビューやイベント、コミュニティを通じて、
            美容師・美容学生・経営者が学び、つながれる場を提供しています。
          </p>
        </div>

        <div className="bg-gray-50 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">取材・掲載依頼について</h2>
          <p className="text-sm text-gray-600 mb-4">
            サロン紹介・メーカー情報・インタビューなど、掲載に関するご相談はお気軽にお問い合わせください。
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gray-900 text-white px-6 py-3 text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            お問い合わせはこちら
          </Link>
        </div>
      </div>
    </div>
  );
}

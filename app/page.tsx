import Link from 'next/link';
import { getAllArticles, getArticlesByCategory } from '@/data/articles';
import { CATEGORIES } from '@/types/article';
import ArticleCard from '@/components/article/ArticleCard';

export default function HomePage() {
  const allArticles = getAllArticles();
  const latestArticles = allArticles.slice(0, 6);
  const featuredArticle = allArticles[0];
  const next2000Articles = getArticlesByCategory('next2000');

  return (
    <>
      {/* Hero / First View */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4 font-light">
            Beauty Industry Media
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            美容業界の<br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              "今"
            </span>
            がわかる場所。
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-xl leading-relaxed">
            美容学生・美容師・サロン経営者が、毎日ひとつ学べる情報メディア
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/articles"
              className="bg-gray-900 text-white px-6 py-3 text-sm font-semibold hover:bg-gray-700 transition-colors"
            >
              記事一覧を見る
            </Link>
            <Link
              href="/about"
              className="border border-gray-300 text-gray-700 px-6 py-3 text-sm font-semibold hover:border-gray-900 transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-widest text-gray-400 uppercase font-medium">Featured</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>
          <ArticleCard article={featuredArticle} variant="featured" />
        </section>
      )}

      {/* Latest Articles */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-widest text-gray-400 uppercase font-medium">Latest</span>
            <div className="w-12 h-px bg-gray-200"></div>
          </div>
          <Link href="/articles" className="text-xs text-gray-500 hover:text-black transition-colors font-medium">
            すべて見る →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Category Sections */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-xs tracking-widest text-gray-400 uppercase font-medium">Categories</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => {
              const count = allArticles.filter((a) => a.category === cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group border border-gray-200 bg-white p-5 hover:shadow-md transition-all"
                >
                  <span
                    className={`inline-block text-xs font-semibold px-2 py-0.5 mb-3 rounded-sm ${cat.bgColor} ${cat.textColor}`}
                  >
                    {cat.label}
                  </span>
                  <p className="text-xs text-gray-400">{count} 記事</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEXT2000 Interview Section */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Project</p>
            <h2 className="text-2xl font-bold text-gray-900">NEXT2000 Interview</h2>
          </div>
          <Link
            href="/category/next2000"
            className="text-xs text-gray-500 hover:text-black transition-colors font-medium"
          >
            もっと見る →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {next2000Articles.length > 0 ? (
            next2000Articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <div className="col-span-2 bg-gray-900 text-white p-10 flex flex-col items-center justify-center text-center rounded">
              <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">Coming Soon</p>
              <h3 className="text-2xl font-bold mb-3">NEXT2000 Interview</h3>
              <p className="text-gray-400 text-sm max-w-md">
                美容業界の次世代を担う2000人のプロフェッショナルへのインタビューシリーズ。近日公開予定です。
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / Contact CTA */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">Stay Updated</p>
          <h2 className="text-3xl font-bold mb-4">最新情報をお届けします</h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            美容業界の最新ニュース、トレンド情報、現場で使えるノウハウを毎日お届けします。
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-gray-900 px-8 py-3 font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            お問い合わせ・登録はこちら
          </Link>
        </div>
      </section>
    </>
  );
}

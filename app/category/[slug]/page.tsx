import { notFound } from 'next/navigation';
import { getArticlesByCategory, getAllArticles } from '@/data/articles';
import { CATEGORIES, getCategoryMeta, Category } from '@/types/article';
import ArticleCard from '@/components/article/ArticleCard';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.label}の記事一覧`,
    description: `${cat.label}に関する最新記事をまとめて読めます。`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  if (!CATEGORIES.find((c) => c.slug === slug)) notFound();

  const cat = getCategoryMeta(slug as Category);
  const articles = getArticlesByCategory(slug);
  const allCount = getAllArticles().length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">Category</p>
        <div className="flex items-center gap-4">
          <span className={`text-sm font-bold px-3 py-1.5 rounded-sm ${cat.bgColor} ${cat.textColor}`}>
            {cat.label}
          </span>
          <h1 className="text-3xl font-bold text-gray-900">{cat.label}</h1>
        </div>
        <p className="text-sm text-gray-400 mt-3">{articles.length} 記事</p>
      </div>

      {/* All Category Links */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((c) => (
          <a
            key={c.slug}
            href={`/category/${c.slug}`}
            className={`text-xs px-3 py-1.5 font-medium border transition-colors ${
              c.slug === slug
                ? `${c.bgColor} ${c.textColor} border-transparent`
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
            }`}
          >
            {c.label}
          </a>
        ))}
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-2">このカテゴリーの記事はまだありません</p>
          <p className="text-sm">近日公開予定です。お楽しみに。</p>
        </div>
      )}
    </div>
  );
}

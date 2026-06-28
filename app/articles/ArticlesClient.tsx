'use client';

import { useState, useMemo } from 'react';
import { CATEGORIES, Category, Article } from '@/types/article';
import ArticleCard from '@/components/article/ArticleCard';

export default function ArticlesClient({ allArticles }: { allArticles: Article[] }) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return allArticles.filter((a) => {
      const matchCat = selectedCategory === 'all' || a.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-2">Articles</p>
        <h1 className="text-3xl font-bold text-gray-900">記事一覧</h1>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="記事を検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-80 border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 bg-gray-50"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`text-xs px-3 py-1.5 font-medium border transition-colors ${
            selectedCategory === 'all'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          }`}
        >
          すべて
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`text-xs px-3 py-1.5 font-medium border transition-colors ${
              selectedCategory === cat.slug
                ? `${cat.bgColor} ${cat.textColor} border-transparent`
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="text-xs text-gray-400 mb-6">{filtered.length} 件の記事</p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-2">記事が見つかりませんでした</p>
          <p className="text-sm">キーワードやカテゴリーを変えてお試しください</p>
        </div>
      )}
    </div>
  );
}

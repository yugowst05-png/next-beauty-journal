import Link from 'next/link';
import Image from 'next/image';
import { Article, getCategoryMeta } from '@/types/article';

interface Props {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
}

function Thumbnail({ src, alt, className }: { src: string; alt: string; className: string }) {
  if (!src || src === '') {
    return (
      <div className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
        <span className="text-gray-300 text-2xl font-bold tracking-widest">NBJ</span>
      </div>
    );
  }
  return (
    <div className={`${className} relative`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  );
}

export default function ArticleCard({ article, variant = 'default' }: Props) {
  const cat = getCategoryMeta(article.category);

  if (variant === 'compact') {
    return (
      <Link href={`/articles/${article.slug}`} className="flex gap-3 group">
        <div className="w-20 h-16 flex-shrink-0 overflow-hidden rounded">
          <Thumbnail src={article.thumbnail} alt={article.title} className="w-full h-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium mb-1">
            <span className={`${cat.bgColor} ${cat.textColor} px-2 py-0.5 rounded-sm`}>{cat.label}</span>
          </p>
          <p className="text-sm font-semibold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </p>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={`/articles/${article.slug}`} className="block group">
        <div className="aspect-[16/9] overflow-hidden rounded-lg mb-4 relative">
          <Thumbnail src={article.thumbnail} alt={article.title} className="absolute inset-0 w-full h-full" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className={`text-xs px-2 py-0.5 rounded-sm font-medium mb-2 inline-block ${cat.bgColor} ${cat.textColor}`}>
              {cat.label}
            </span>
            <h3 className="text-white text-lg font-bold leading-tight group-hover:text-pink-200 transition-colors">
              {article.title}
            </h3>
          </div>
        </div>
        <p className="text-gray-500 text-sm line-clamp-2">{article.excerpt}</p>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`} className="block group">
      <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3 relative">
        <Thumbnail src={article.thumbnail} alt={article.title} className="absolute inset-0 w-full h-full" />
      </div>
      <p className="mb-2">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-sm ${cat.bgColor} ${cat.textColor}`}>
          {cat.label}
        </span>
      </p>
      <h3 className="text-sm font-bold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-2 mb-2 leading-snug">
        {article.title}
      </h3>
      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{article.excerpt}</p>
      <p className="text-xs text-gray-400 mt-2">{article.publishedAt}</p>
    </Link>
  );
}

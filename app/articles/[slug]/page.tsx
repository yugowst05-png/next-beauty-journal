import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getAllArticles, getRelatedArticles } from '@/data/articles';
import { getCategoryMeta } from '@/types/article';
import ArticleCard from '@/components/article/ArticleCard';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

function renderMarkdown(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i}>{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i}>{line.slice(4)}</h3>);
    } else if (line.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`}>
          {listItems.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      );
      continue;
    } else if (line.trim() !== '') {
      elements.push(<p key={i}>{line}</p>);
    }
    i++;
  }
  return elements;
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const cat = getCategoryMeta(article.category);
  const related = getRelatedArticles(article);

  const shareUrl = `https://next-beauty-journal.com/articles/${article.slug}`;
  const shareText = encodeURIComponent(article.title);

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors">HOME</Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-black transition-colors">記事一覧</Link>
        <span>/</span>
        <span className="text-gray-600 truncate max-w-[200px]">{article.title}</span>
      </nav>

      {/* Category & Date */}
      <div className="flex items-center gap-3 mb-4">
        <Link
          href={`/category/${article.category}`}
          className={`text-xs font-semibold px-3 py-1 rounded-sm ${cat.bgColor} ${cat.textColor}`}
        >
          {cat.label}
        </Link>
        <time className="text-xs text-gray-400">{article.publishedAt}</time>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">
        {article.title}
      </h1>

      {/* Author */}
      <div className="flex items-center gap-2 mb-8 pb-8 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-xs text-gray-500 font-bold">N</span>
        </div>
        <span className="text-sm text-gray-600">{article.author}</span>
      </div>

      {/* Thumbnail */}
      <div className="aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-10 flex items-center justify-center">
        <span className="text-white/20 text-5xl font-bold tracking-widest">NBJ</span>
      </div>

      {/* Content */}
      <div className="prose-beauty mb-12">
        {renderMarkdown(article.content)}
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {article.tags.map((tag) => (
            <span key={tag} className="text-xs border border-gray-200 px-3 py-1 text-gray-500">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* SNS Share */}
      <div className="border-t border-b border-gray-100 py-6 mb-12">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Share</p>
        <div className="flex gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-black text-white px-4 py-2 font-medium hover:bg-gray-800 transition-colors"
          >
            X (Twitter)
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition-colors"
          >
            Facebook
          </a>
          <a
            href={`https://line.me/R/msg/text/?${encodeURIComponent(article.title + ' ' + shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-green-500 text-white px-4 py-2 font-medium hover:bg-green-600 transition-colors"
          >
            LINE
          </a>
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-widest text-gray-400 uppercase font-medium">Related</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>
          <div className="flex flex-col gap-4">
            {related.map((r) => (
              <ArticleCard key={r.id} article={r} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

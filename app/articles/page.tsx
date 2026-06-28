import { getAllArticles } from '@/data/articles';
import ArticlesClient from './ArticlesClient';

export default function ArticlesPage() {
  const allArticles = getAllArticles();
  return <ArticlesClient allArticles={allArticles} />;
}

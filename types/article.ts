export type Category =
  | 'beauty-students'
  | 'salon-info'
  | 'products-makers'
  | 'trends'
  | 'management'
  | 'sns-marketing'
  | 'interview'
  | 'next2000';

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: Category;
  excerpt: string;
  content: string;
  thumbnail: string;
  publishedAt: string;
  author: string;
  tags: string[];
}

export interface CategoryMeta {
  slug: Category;
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { slug: 'beauty-students', label: '美容学生向け', color: 'pink', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
  { slug: 'salon-info', label: 'サロン情報', color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
  { slug: 'products-makers', label: '商材・メーカー情報', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-700' },
  { slug: 'trends', label: 'トレンド', color: 'purple', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
  { slug: 'management', label: '経営・採用', color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
  { slug: 'sns-marketing', label: 'SNS・集客', color: 'teal', bgColor: 'bg-teal-100', textColor: 'text-teal-700' },
  { slug: 'interview', label: 'インタビュー', color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-700' },
  { slug: 'next2000', label: 'NEXT2000', color: 'black', bgColor: 'bg-gray-900', textColor: 'text-white' },
];

export function getCategoryMeta(slug: Category): CategoryMeta {
  return CATEGORIES.find((c) => c.slug === slug) ?? CATEGORIES[0];
}

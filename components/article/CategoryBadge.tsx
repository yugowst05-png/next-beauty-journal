import Link from 'next/link';
import { Category, getCategoryMeta } from '@/types/article';

interface Props {
  category: Category;
  linked?: boolean;
}

export default function CategoryBadge({ category, linked = false }: Props) {
  const meta = getCategoryMeta(category);
  const className = `text-xs font-semibold px-3 py-1 rounded-sm ${meta.bgColor} ${meta.textColor}`;

  if (linked) {
    return (
      <Link href={`/category/${category}`} className={className}>
        {meta.label}
      </Link>
    );
  }
  return <span className={className}>{meta.label}</span>;
}

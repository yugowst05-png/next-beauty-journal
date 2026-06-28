# NEXT BEAUTY JOURNAL

美容業界の「今」がわかる情報メディア。美容学生・美容師・サロン経営者が毎日ひとつ学べる場所。

## 起動方法

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動 (http://localhost:3000)
npm run dev

# 本番ビルド
npm run build

# 本番サーバーの起動
npm start
```

## ディレクトリ構成

```
next-beauty-journal/
├── app/                    # Next.js App Router
│   ├── page.tsx            # トップページ
│   ├── layout.tsx          # 共通レイアウト
│   ├── globals.css         # グローバルスタイル
│   ├── articles/
│   │   ├── page.tsx        # 記事一覧ページ
│   │   └── [slug]/
│   │       └── page.tsx    # 記事詳細ページ
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx    # カテゴリーページ
│   ├── about/
│   │   └── page.tsx        # Aboutページ
│   └── contact/
│       └── page.tsx        # お問い合わせページ
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # ヘッダーコンポーネント
│   │   └── Footer.tsx      # フッターコンポーネント
│   └── article/
│       ├── ArticleCard.tsx  # 記事カードコンポーネント（3バリアント）
│       └── CategoryBadge.tsx # カテゴリーバッジ
├── data/
│   └── articles.ts         # 記事データ（ローカル管理）
└── types/
    └── article.ts          # 型定義・カテゴリーメタ情報
```

## 記事データの管理

現在は `data/articles.ts` でローカル管理しています。

### CMS連携時の拡張案

`data/articles.ts` の関数を以下のように差し替えることで、CMSへの移行が可能です：

```typescript
// Contentful の例
export async function getAllArticles(): Promise<Article[]> {
  const client = createClient({ space: process.env.CONTENTFUL_SPACE_ID!, accessToken: process.env.CONTENTFUL_ACCESS_TOKEN! });
  const entries = await client.getEntries({ content_type: 'article' });
  return entries.items.map(mapContentfulToArticle);
}

// microCMS の例
export async function getAllArticles(): Promise<Article[]> {
  const data = await fetch('https://YOUR_DOMAIN.microcms.io/api/v1/articles', {
    headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY! },
  }).then(r => r.json());
  return data.contents;
}
```

### Article型

```typescript
interface Article {
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
```

## カテゴリー

| slug | ラベル | カラー |
|------|--------|--------|
| beauty-students | 美容学生向け | ピンク |
| salon-info | サロン情報 | ブルー |
| products-makers | 商材・メーカー情報 | グリーン |
| trends | トレンド | パープル |
| management | 経営・採用 | オレンジ |
| sns-marketing | SNS・集客 | ティール |
| interview | インタビュー | グレー |
| next2000 | NEXT2000 | ブラック |

## 技術スタック

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **React 19**

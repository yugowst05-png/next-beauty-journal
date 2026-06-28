import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

// .env.local を読み込む
try {
  const env = readFileSync(join(__dirname, '..', '.env.local'), 'utf-8');
  for (const line of env.split('\n')) {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) process.env[key.trim()] = vals.join('=').trim();
  }
} catch { /* .env.local がない場合はスキップ */ }

const CATEGORIES = [
  { slug: 'beauty-students', label: '美容学生向け' },
  { slug: 'salon-info',      label: 'サロン情報' },
  { slug: 'products-makers', label: '商材・メーカー情報' },
  { slug: 'trends',          label: 'トレンド' },
  { slug: 'management',      label: '経営・採用' },
  { slug: 'sns-marketing',   label: 'SNS・集客' },
  { slug: 'interview',       label: 'インタビュー' },
  { slug: 'next2000',        label: 'NEXT2000' },
];

function getUnsplashImageUrl(keyword: string): string {
  return `https://source.unsplash.com/800x600/?${encodeURIComponent('beauty salon ' + keyword)}`;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

async function generateArticle() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY が設定されていません');

  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  const date = today();

  console.log(`カテゴリー: ${category.label} (${category.slug})`);
  console.log('記事を生成中...');

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://next-beauty-journal.vercel.app',
      'X-Title': 'NEXT BEAUTY JOURNAL',
    },
    body: JSON.stringify({
      model: 'google/gemma-4-31b-it:free',
      messages: [
        {
          role: 'system',
          content: 'あなたは美容業界専門のライターです。「NEXT BEAUTY JOURNAL」というWebメディアの記事を書きます。読者は美容学生・美容師・サロン経営者です。出力はJSON形式のみとし、説明文やコードブロックは不要です。',
        },
        {
          role: 'user',
          content: `カテゴリー「${category.label}」の記事を1本作成してください。

以下のJSON形式のみで出力してください：

{
  "title": "記事タイトル（30文字以内）",
  "slug": "url-friendly-slug-in-english-with-hyphens",
  "excerpt": "記事の概要（80文字以内）",
  "content": "マークダウン形式の本文（800〜1200文字、## 見出しを3〜5個使用）",
  "tags": ["タグ1", "タグ2", "タグ3"],
  "imageKeyword": "画像検索用の英語キーワード1〜2語（例: hair salon, nail art）"
}

注意：slugは英小文字とハイフンのみ、contentは##見出しを含むMarkdown、JSONのみ出力`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API エラー ${response.status}: ${err}`);
  }

  const data = await response.json() as { choices: { message: { content: string } }[] };
  const raw = data.choices[0].message.content.trim();
  const jsonStr = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    console.error('JSON解析エラー。生の出力:');
    console.error(raw);
    throw new Error('AIの出力がJSON形式ではありません');
  }

  const imageKeyword = (parsed.imageKeyword as string) || 'beauty salon';
  const article = {
    id: `generated-${date}-${Date.now()}`,
    title: parsed.title,
    slug: parsed.slug,
    category: category.slug,
    excerpt: parsed.excerpt,
    content: parsed.content,
    thumbnail: getUnsplashImageUrl(imageKeyword),
    publishedAt: date,
    author: 'NEXT BEAUTY編集部',
    tags: parsed.tags ?? [],
  };

  const dir = join(__dirname, '..', 'data', 'generated');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const filename = `${date}-${article.slug}.json`;
  writeFileSync(join(dir, filename), JSON.stringify(article, null, 2), 'utf-8');

  console.log(`\n✅ 記事を保存しました: data/generated/${filename}`);
  console.log(`タイトル: ${article.title}`);
  console.log(`カテゴリー: ${category.label}`);
  console.log(`タグ: ${(article.tags as string[]).join(', ')}`);
}

generateArticle().catch((err) => {
  console.error('エラー:', err.message);
  process.exit(1);
});

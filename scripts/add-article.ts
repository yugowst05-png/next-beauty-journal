/**
 * Geminiで生成した記事JSONをサイトに追加するスクリプト
 * 使い方: npm run add-article
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import * as readline from 'readline';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q: string) => new Promise<string>((res) => rl.question(q, res));

  console.log('\n========================================');
  console.log('  NEXT BEAUTY JOURNAL 記事追加ツール');
  console.log('========================================\n');
  console.log('GeminiからコピーしたJSONを貼り付けてください。');
  console.log('貼り付け後、Enterを2回押してください。\n');

  // 複数行の入力を受け取る
  let json = '';
  let emptyCount = 0;

  await new Promise<void>((resolve) => {
    rl.on('line', (line) => {
      if (line === '') {
        emptyCount++;
        if (emptyCount >= 2) {
          resolve();
        }
      } else {
        emptyCount = 0;
        json += line + '\n';
      }
    });
  });

  // JSONブロック（```json ... ```）を除去
  json = json.trim().replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(json);
  } catch {
    console.error('\nエラー: JSON形式ではありません。もう一度試してください。');
    rl.close();
    process.exit(1);
  }

  const date = today();
  const slug = (parsed.slug as string) || `article-${Date.now()}`;

  // 画像ファイルの確認
  console.log('\n----------------------------------------');
  console.log('画像ファイルについて');
  console.log('----------------------------------------');
  console.log('Geminiで生成した画像を以下に保存してください：');
  console.log(`  public/images/${date}-${slug}.jpg`);
  console.log('\n画像を保存しましたか？ (y/n): ', '');

  const hasImage = await ask('');
  const thumbnail = hasImage.toLowerCase() === 'y'
    ? `/images/${date}-${slug}.jpg`
    : `https://source.unsplash.com/800x600/?${encodeURIComponent('beauty salon')}`;

  const article = {
    id: `generated-${date}-${Date.now()}`,
    title: parsed.title,
    slug,
    category: parsed.category,
    excerpt: parsed.excerpt,
    content: parsed.content,
    thumbnail,
    publishedAt: parsed.publishedAt || date,
    author: parsed.author || 'NEXT BEAUTY編集部',
    tags: parsed.tags || [],
  };

  const dir = join(__dirname, '..', 'data', 'generated');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const filename = `${date}-${slug}.json`;
  writeFileSync(join(dir, filename), JSON.stringify(article, null, 2), 'utf-8');

  console.log(`\n✅ 記事を保存しました！`);
  console.log(`   ファイル: data/generated/${filename}`);
  console.log(`   タイトル: ${article.title}`);
  console.log(`   カテゴリー: ${article.category}`);
  console.log('\n次のコマンドでサイトをビルドしてください:');
  console.log('  npm run build && npm start\n');

  rl.close();
}

main().catch((err) => {
  console.error('エラー:', err.message);
  process.exit(1);
});

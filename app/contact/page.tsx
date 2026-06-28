'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // CMS/バックエンド連携時はここでAPIを呼び出す
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">Contact</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">お問い合わせ</h1>
      <p className="text-sm text-gray-500 mb-10 leading-relaxed">
        取材・掲載依頼・メールマガジン登録など、お気軽にご連絡ください。
        3営業日以内にご返信いたします。
      </p>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 p-8 text-center">
          <p className="text-lg font-bold text-green-800 mb-2">送信完了しました</p>
          <p className="text-sm text-green-600">
            お問い合わせありがとうございます。3営業日以内にご返信いたします。
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              お名前 <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="山田 太郎"
              className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gray-400 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス <span className="text-pink-500">*</span>
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="example@email.com"
              className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gray-400 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              お問い合わせ内容 <span className="text-pink-500">*</span>
            </label>
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="お問い合わせ内容をご記入ください"
              className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gray-400 bg-gray-50 focus:bg-white transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-4 text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            送信する
          </button>
        </form>
      )}
    </div>
  );
}

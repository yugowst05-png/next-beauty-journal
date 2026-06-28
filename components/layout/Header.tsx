'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIES } from '@/types/article';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-xs tracking-widest text-gray-400 uppercase font-light">Next Beauty</span>
            <span className="text-xl font-bold tracking-tight text-gray-900">NEXT BEAUTY JOURNAL</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/articles" className="hover:text-black transition-colors">記事一覧</Link>
            <Link href="/about" className="hover:text-black transition-colors">About</Link>
            <Link href="/contact" className="hover:text-black transition-colors">お問い合わせ</Link>
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <div className="w-5 h-0.5 bg-gray-800 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-800 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-800"></div>
          </button>
        </div>

        {/* Category Nav - Desktop */}
        <nav className="hidden md:flex gap-4 pb-3 text-xs font-medium overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="whitespace-nowrap text-gray-500 hover:text-black transition-colors border-b-2 border-transparent hover:border-black pb-1"
            >
              {cat.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col px-4 py-4 gap-3 text-sm font-medium text-gray-700">
            <Link href="/articles" onClick={() => setMenuOpen(false)}>記事一覧</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>お問い合わせ</Link>
            <hr className="border-gray-100 my-1" />
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className="text-gray-500"
              >
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

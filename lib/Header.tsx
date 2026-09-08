'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Sparkles, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(query.trim() ? `/products?q=${encodeURIComponent(query.trim())}` : '/products');
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Worldset
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-ink/70 md:flex">
          <Link href="/products" className="hover:text-ink">Categories</Link>
          <Link href="/products?deals=1" className="hover:text-ink">Deals</Link>
          <Link href="/products?trending=1" className="hover:text-ink">Trending</Link>
          <Link href="/ai" className="flex items-center gap-1 hover:text-ink">
            <Sparkles size={15} /> AI Assistant
          </Link>
        </nav>

        <form onSubmit={handleSearch} className="ml-auto hidden flex-1 max-w-md items-center sm:flex">
          <div className="flex w-full items-center gap-2 rounded-full border border-line bg-white px-4 py-2">
            <Search size={16} className="text-ink/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 sm:ml-0">
          <Link href="/account" className="rounded-full p-2 hover:bg-white" aria-label="Account">
            <User size={20} />
          </Link>
          <Link href="/account/wishlist" className="rounded-full p-2 hover:bg-white" aria-label="Wishlist">
            <Heart size={20} />
          </Link>
          <Link href="/cart" className="relative rounded-full p-2 hover:bg-white" aria-label="Cart">
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            className="rounded-full p-2 hover:bg-white md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-line bg-paper px-4 pb-4 pt-3 md:hidden">
          <form onSubmit={handleSearch} className="mb-3 flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2">
            <Search size={16} className="text-ink/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </form>
          <nav className="flex flex-col gap-3 text-sm font-medium">
            <Link href="/products" onClick={() => setMenuOpen(false)}>Categories</Link>
            <Link href="/products?deals=1" onClick={() => setMenuOpen(false)}>Deals</Link>
            <Link href="/products?trending=1" onClick={() => setMenuOpen(false)}>Trending</Link>
            <Link href="/ai" onClick={() => setMenuOpen(false)}>AI Assistant</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

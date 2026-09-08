'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/products';
import { Category } from '@/lib/types';

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export default function ProductsClient() {
  const params = useSearchParams();
  const [category, setCategory] = useState<Category | 'all'>(
    (params.get('category') as Category) || 'all'
  );
  const [query, setQuery] = useState(params.get('q') || '');
  const [maxPrice, setMaxPrice] = useState(700);
  const [sort, setSort] = useState<Sort>('featured');
  const onlyDeals = params.get('deals') === '1';
  const onlyTrending = params.get('trending') === '1';

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (category !== 'all') list = list.filter((p) => p.category === category);
    if (onlyDeals) list = list.filter((p) => p.compareAtPrice);
    if (onlyTrending) list = list.filter((p) => p.trending);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }
    switch (sort) {
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [category, query, maxPrice, sort, onlyDeals, onlyTrending]);

  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-semibold">
        {onlyDeals ? 'Deals' : onlyTrending ? 'Trending' : 'All products'}
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
        {/* Filters */}
        <aside className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-semibold">Search</p>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="wireless headphones under $100"
              className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">Category</p>
            <div className="flex flex-col gap-2 text-sm">
              <button
                onClick={() => setCategory('all')}
                className={category === 'all' ? 'font-semibold text-ink' : 'text-ink/60'}
              >
                All categories
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={category === c ? 'text-left font-semibold text-ink' : 'text-left text-ink/60'}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">Max price: ${maxPrice}</p>
            <input
              type="range"
              min={10}
              max={700}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-ink/60">{filtered.length} products</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-lg border border-line px-3 py-2 text-sm outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="card p-10 text-center text-ink/60">
              No products match those filters yet. Try widening your search.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

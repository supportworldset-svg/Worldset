import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/products';

export default function HomePage() {
  const trending = products.filter((p) => p.trending).slice(0, 8);
  const bestValue = products.filter((p) => p.bestValue).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-gradient-to-b from-accent-light/60 to-paper">
        <div className="container-page grid gap-8 py-16 sm:py-24 md:grid-cols-2 md:items-center">
          <div>
            <span className="badge mb-4"><Sparkles size={12} className="mr-1" /> AI-powered shopping</span>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Shop Smarter.<br />Discover Better.
            </h1>
            <p className="mt-4 max-w-md text-ink/60">
              AI-powered shopping that helps you find the right products faster — search, compare,
              and check out in one clean marketplace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link href="/ai" className="btn-secondary">
                <Sparkles size={16} /> Ask AI
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="card aspect-square overflow-hidden">
                <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-line bg-white">
        <div className="container-page grid grid-cols-1 gap-6 py-6 text-sm text-ink/70 sm:grid-cols-3">
          <div className="flex items-center gap-3"><ShieldCheck size={18} /> Secure checkout</div>
          <div className="flex items-center gap-3"><Truck size={18} /> Tracked shipping on every order</div>
          <div className="flex items-center gap-3"><RotateCcw size={18} /> Easy 30-day returns</div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-14">
        <h2 className="text-xl font-semibold">Shop by category</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className="card flex items-center justify-center px-4 py-6 text-center text-sm font-medium hover:border-ink"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="container-page py-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Trending now</h2>
          <Link href="/products?trending=1" className="text-sm font-medium text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* AI banner */}
      <section className="container-page py-8">
        <div className="card flex flex-col items-start gap-4 bg-ink p-8 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-white/70">
              <Sparkles size={16} /> Worldset AI
            </p>
            <h3 className="mt-1 text-2xl font-semibold">Not sure what to buy?</h3>
            <p className="mt-1 text-white/70">
              Tell the assistant your budget and what you need — it'll shortlist real products from the catalog.
            </p>
          </div>
          <Link href="/ai" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-ink">
            Ask Worldset AI
          </Link>
        </div>
      </section>

      {/* Best value */}
      <section className="container-page py-8 pb-16">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Best value picks</h2>
          <Link href="/products" className="text-sm font-medium text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {bestValue.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

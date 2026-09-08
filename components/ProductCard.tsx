'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cart-context';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <div className="card group relative flex flex-col overflow-hidden">
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-line/40">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-xs font-medium text-white">
            -{Math.round(100 - (product.price / product.compareAtPrice!) * 100)}%
          </span>
        )}
        <button
          onClick={(e) => e.preventDefault()}
          aria-label="Save to wishlist"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-card transition hover:bg-white"
        >
          <Heart size={16} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs uppercase tracking-wide text-ink/40">{product.brand}</p>
        <Link href={`/products/${product.slug}`} className="line-clamp-2 text-sm font-medium text-ink hover:underline">
          {product.name}
        </Link>

        <div className="flex items-center gap-1 text-xs text-ink/60">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          {product.rating} <span className="text-ink/40">({product.reviewCount.toLocaleString()})</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold">${product.price}</span>
            {hasDiscount && (
              <span className="text-xs text-ink/40 line-through">${product.compareAtPrice}</span>
            )}
          </div>
          <button
            onClick={() => addItem(product.id, 1)}
            className="rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white transition hover:bg-accent-dark"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { Product } from '@/lib/types';

export default function AddToCartControls({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border border-line">
        <button
          className="px-3 py-2 text-lg"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-8 text-center text-sm">{qty}</span>
        <button
          className="px-3 py-2 text-lg"
          onClick={() => setQty((q) => q + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button onClick={() => addItem(product.id, qty)} className="btn-secondary">
        Add to Cart
      </button>
      <button
        onClick={() => {
          addItem(product.id, qty);
          router.push('/checkout');
        }}
        className="btn-primary"
      >
        Buy Now
      </button>
    </div>
  );
}

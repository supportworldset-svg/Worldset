'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { products } from '@/lib/products';

export default function CartPage() {
  const { lines, removeItem, updateQuantity, subtotal } = useCart();
  const shipping = subtotal > 0 ? (subtotal > 75 ? 0 : 6.99) : 0;
  const tax = subtotal * 0.0;
  const total = subtotal + shipping + tax;

  if (lines.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-ink/60">Find something you'll love.</p>
        <Link href="/products" className="btn-primary mt-6 inline-flex">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-semibold">Your cart</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {lines.map((line) => {
            const product = products.find((p) => p.id === line.productId);
            if (!product) return null;
            return (
              <div key={line.productId} className="card flex gap-4 p-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-line/40">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/products/${product.slug}`} className="text-sm font-medium hover:underline">
                        {product.name}
                      </Link>
                      <p className="text-xs text-ink/50">{product.brand}</p>
                    </div>
                    <button onClick={() => removeItem(product.id)} className="text-xs text-ink/40 hover:text-ink">
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-line">
                      <button
                        className="px-3 py-1 text-sm"
                        onClick={() => updateQuantity(product.id, line.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{line.quantity}</span>
                      <button
                        className="px-3 py-1 text-sm"
                        onClick={() => updateQuantity(product.id, line.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-semibold">${(product.price * line.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="card h-fit p-5">
          <h2 className="text-sm font-semibold">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-ink/60">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-ink/60">Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span className="text-ink/60">Estimated tax</span><span>Calculated at checkout</span></div>
            <div className="mt-2 flex justify-between border-t border-line pt-2 text-base font-semibold">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Link href="/checkout" className="btn-primary mt-5 w-full">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

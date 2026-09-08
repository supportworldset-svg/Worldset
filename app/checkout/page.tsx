'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { products } from '@/lib/products';
import { ShieldCheck } from 'lucide-react';

const steps = ['Information', 'Shipping', 'Payment', 'Review'] as const;
type Step = (typeof steps)[number];

export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const step: Step = steps[stepIndex];
  const [placing, setPlacing] = useState(false);

  const shipping = subtotal > 75 ? 0 : 6.99;
  const total = subtotal + shipping;

  function next() {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }
  function back() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function placeOrder() {
    // NOTE: This is a UI-only order placement. No real payment is processed.
    // Wire this button to your Stripe PaymentIntent / order-creation API route
    // once STRIPE_SECRET_KEY is configured — see README "Payments" section.
    setPlacing(true);
    setTimeout(() => {
      clearCart();
      router.push('/checkout/confirmation');
    }, 900);
  }

  if (lines.length === 0 && !placing) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-semibold">Nothing to check out</h1>
        <p className="mt-2 text-ink/60">Add a product to your cart first.</p>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-semibold">Checkout</h1>

      {/* Step indicator */}
      <div className="mt-6 flex items-center gap-2 text-sm">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                i <= stepIndex ? 'bg-ink text-white' : 'bg-line text-ink/50'
              }`}
            >
              {i + 1}
            </span>
            <span className={i <= stepIndex ? 'font-medium' : 'text-ink/40'}>{s}</span>
            {i < steps.length - 1 && <span className="mx-2 h-px w-8 bg-line" />}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_320px]">
        <div className="card p-6">
          {step === 'Information' && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold">Customer information</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input placeholder="Full name" className="rounded-lg border border-line px-3 py-2 text-sm" />
                <input placeholder="Email" type="email" className="rounded-lg border border-line px-3 py-2 text-sm" />
                <input placeholder="Phone" className="rounded-lg border border-line px-3 py-2 text-sm sm:col-span-2" />
              </div>
            </div>
          )}

          {step === 'Shipping' && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold">Shipping address</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input placeholder="Address line 1" className="rounded-lg border border-line px-3 py-2 text-sm sm:col-span-2" />
                <input placeholder="City" className="rounded-lg border border-line px-3 py-2 text-sm" />
                <input placeholder="Region / State" className="rounded-lg border border-line px-3 py-2 text-sm" />
                <input placeholder="Postal code" className="rounded-lg border border-line px-3 py-2 text-sm" />
                <input placeholder="Country" className="rounded-lg border border-line px-3 py-2 text-sm" />
              </div>
              <h3 className="pt-2 text-sm font-semibold">Delivery method</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center justify-between rounded-lg border border-line p-3">
                  <span>Standard (5–10 business days)</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  <input type="radio" name="delivery" defaultChecked />
                </label>
                <label className="flex items-center justify-between rounded-lg border border-line p-3">
                  <span>Express (2–4 business days)</span>
                  <span>$14.99</span>
                  <input type="radio" name="delivery" />
                </label>
              </div>
            </div>
          )}

          {step === 'Payment' && (
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <ShieldCheck size={16} /> Payment
              </h2>
              <p className="rounded-lg bg-accent-light p-3 text-xs text-accent-dark">
                Payment processing is not connected in this build. This form does not collect or
                store real card data. Connect Stripe (or another provider) server-side and replace
                this panel with Stripe Elements / Payment Element before accepting real orders.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input placeholder="Card number" disabled className="rounded-lg border border-line bg-line/20 px-3 py-2 text-sm" />
                <input placeholder="Name on card" disabled className="rounded-lg border border-line bg-line/20 px-3 py-2 text-sm" />
                <input placeholder="MM / YY" disabled className="rounded-lg border border-line bg-line/20 px-3 py-2 text-sm" />
                <input placeholder="CVC" disabled className="rounded-lg border border-line bg-line/20 px-3 py-2 text-sm" />
              </div>
            </div>
          )}

          {step === 'Review' && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold">Review your order</h2>
              <div className="divide-y divide-line text-sm">
                {lines.map((l) => {
                  const p = products.find((prod) => prod.id === l.productId);
                  if (!p) return null;
                  return (
                    <div key={l.productId} className="flex justify-between py-2">
                      <span>{p.name} × {l.quantity}</span>
                      <span>${(p.price * l.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button onClick={back} disabled={stepIndex === 0} className="btn-secondary disabled:opacity-40">
              Back
            </button>
            {step !== 'Review' ? (
              <button onClick={next} className="btn-primary">Continue</button>
            ) : (
              <button onClick={placeOrder} disabled={placing} className="btn-primary">
                {placing ? 'Placing order…' : 'Place order'}
              </button>
            )}
          </div>
        </div>

        <div className="card h-fit p-5">
          <h2 className="text-sm font-semibold">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-ink/60">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-ink/60">Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="mt-2 flex justify-between border-t border-line pt-2 text-base font-semibold">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

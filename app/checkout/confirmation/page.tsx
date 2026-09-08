import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function ConfirmationPage() {
  return (
    <div className="container-page py-24 text-center">
      <CheckCircle2 className="mx-auto text-accent" size={48} />
      <h1 className="mt-4 text-2xl font-semibold">Order placed</h1>
      <p className="mt-2 text-ink/60">
        This is a demo confirmation — no real payment was charged. Once Stripe and the order API
        are connected, this page will show a real order number and tracking link.
      </p>
      <Link href="/products" className="btn-primary mt-6 inline-flex">
        Continue shopping
      </Link>
    </div>
  );
}

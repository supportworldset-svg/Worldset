import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

export const metadata = { title: 'All Products' };

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container-page py-16 text-ink/50">Loading products…</div>}>
      <ProductsClient />
    </Suspense>
  );
}

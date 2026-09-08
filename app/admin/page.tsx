import { products, categories } from '@/lib/products';

export const metadata = { title: 'Admin Dashboard' };

const stats = [
  { label: 'Revenue (demo)', value: '$0.00' },
  { label: 'Orders (demo)', value: '0' },
  { label: 'Products', value: products.length.toString() },
  { label: 'Categories', value: categories.length.toString() }
];

export default function AdminPage() {
  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-semibold">Admin dashboard</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink/60">
        This is an unauthenticated UI shell for demonstration. Before using in production, put
        this route behind an admin-role check (e.g. middleware + session role claim) and back it
        with real database queries instead of the static demo catalog.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-4">
            <p className="text-xs text-ink/50">{s.label}</p>
            <p className="mt-1 text-xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line text-ink/50">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Supplier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 text-ink/60">{p.category}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 text-ink/60">{p.supplier.supplierId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <p className="font-medium">Coming next</p>
          <ul className="mt-2 list-inside list-disc text-sm text-ink/60">
            <li>Product create/edit/delete forms with image upload</li>
            <li>Order management with status updates</li>
            <li>Coupon and promotion builder</li>
            <li>AI + payment + shipping settings panels</li>
          </ul>
        </div>
        <div className="card p-5">
          <p className="font-medium">Requires configuration</p>
          <ul className="mt-2 list-inside list-disc text-sm text-ink/60">
            <li>Postgres database connection</li>
            <li>Admin auth/role gate</li>
            <li>Image storage (Vercel Blob or S3)</li>
            <li>Supplier API credentials (CJ Dropshipping / Zendrop)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

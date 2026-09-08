import Link from 'next/link';

export const metadata = { title: 'Account' };

export default function AccountPage() {
  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-semibold">Your account</h1>
      <p className="mt-2 max-w-lg text-sm text-ink/60">
        Authentication isn't wired to a database yet in this build — connect NextAuth (or a
        similar provider) and a Postgres users table to make sign-up, login, and this dashboard
        fully functional. See the README "Auth" section.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link href="/account/orders" className="card p-5 hover:border-ink">
          <p className="font-medium">Orders</p>
          <p className="text-sm text-ink/60">Track and review past orders</p>
        </Link>
        <Link href="/account/wishlist" className="card p-5 hover:border-ink">
          <p className="font-medium">Wishlist</p>
          <p className="text-sm text-ink/60">Products you've saved</p>
        </Link>
        <Link href="/login" className="card p-5 hover:border-ink">
          <p className="font-medium">Sign in</p>
          <p className="text-sm text-ink/60">Access an existing account</p>
        </Link>
        <Link href="/signup" className="card p-5 hover:border-ink">
          <p className="font-medium">Create account</p>
          <p className="text-sm text-ink/60">Save addresses & order history</p>
        </Link>
      </div>
    </div>
  );
}

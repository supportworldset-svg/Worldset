import Link from 'next/link';

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About Worldset', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/about#careers' }
    ]
  },
  {
    title: 'Customer',
    links: [
      { label: 'Help Center / FAQ', href: '/faq' },
      { label: 'Shipping', href: '/faq#shipping' },
      { label: 'Returns', href: '/faq#returns' },
      { label: 'Order Tracking', href: '/account/orders' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <p className="text-lg font-semibold">Worldset</p>
          <p className="mt-2 text-sm text-ink/60">
            AI-powered shopping that helps you find the right products faster.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-ink">{col.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-ink/60">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="text-sm font-semibold text-ink">Newsletter</p>
          <p className="mt-3 text-sm text-ink/60">Get deals and new arrivals in your inbox.</p>
          <form className="mt-3 flex gap-2">
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full rounded-full border border-line px-3 py-2 text-sm outline-none"
            />
            <button type="submit" className="rounded-full bg-ink px-4 py-2 text-sm text-white">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-line py-6 text-center text-xs text-ink/50">
        © {new Date().getFullYear()} Worldset. All rights reserved.
      </div>
    </footer>
  );
}

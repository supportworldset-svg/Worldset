import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-ink/60">The page you're looking for doesn't exist.</p>
      <Link href="/" className="btn-primary mt-6 inline-flex">Back to home</Link>
    </div>
  );
}

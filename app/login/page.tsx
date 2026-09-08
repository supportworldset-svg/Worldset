import Link from 'next/link';

export const metadata = { title: 'Sign In' };

export default function LoginPage() {
  return (
    <div className="container-page flex justify-center py-16">
      <div className="card w-full max-w-sm p-6">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <form className="mt-5 space-y-3">
          <input placeholder="Email" type="email" className="w-full rounded-lg border border-line px-3 py-2 text-sm" />
          <input placeholder="Password" type="password" className="w-full rounded-lg border border-line px-3 py-2 text-sm" />
          <button type="submit" className="btn-primary w-full">Sign in</button>
        </form>
        <p className="mt-4 text-center text-xs text-ink/50">
          Auth backend not connected in this build — see README.
        </p>
        <p className="mt-2 text-center text-sm">
          No account? <Link href="/signup" className="text-accent hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

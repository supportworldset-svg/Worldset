export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <div className="container-page max-w-lg py-12">
      <h1 className="text-2xl font-semibold">Contact us</h1>
      <p className="mt-2 text-ink/60">We usually reply within one business day.</p>
      <form className="mt-6 space-y-3">
        <input placeholder="Your name" className="w-full rounded-lg border border-line px-3 py-2 text-sm" />
        <input placeholder="Email" type="email" className="w-full rounded-lg border border-line px-3 py-2 text-sm" />
        <textarea placeholder="Message" rows={5} className="w-full rounded-lg border border-line px-3 py-2 text-sm" />
        <button type="submit" className="btn-primary">Send message</button>
      </form>
      <p className="mt-4 text-xs text-ink/40">
        This form isn't wired to an email service yet — connect Resend (or similar) and route
        submissions to your support inbox.
      </p>
    </div>
  );
}

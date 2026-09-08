export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-2xl py-12 text-sm text-ink/70">
      <h1 className="text-2xl font-semibold text-ink">Privacy Policy</h1>
      <p className="mt-4">
        This is placeholder policy text for the Worldset demo build. Replace it with a policy
        reviewed for your actual data practices — what you collect (account info, order details,
        payment metadata via your processor, analytics), how it's used, how long it's retained,
        and how customers can request deletion — before launch.
      </p>
      <p className="mt-4">
        Worldset does not sell customer data to third parties. Payment card data is handled
        directly by the payment processor and is never stored on Worldset's own servers.
      </p>
    </div>
  );
}

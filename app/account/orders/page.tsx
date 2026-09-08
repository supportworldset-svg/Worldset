export const metadata = { title: 'Wishlist' };

export default function WishlistPage() {
  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-semibold">Your wishlist</h1>
      <div className="card mt-6 p-10 text-center text-ink/60">
        <p>Nothing saved yet.</p>
        <p className="mt-1 text-sm">
          Tap the heart icon on any product to save it here. Wishlist persistence needs the auth +
          database layer connected to survive across devices.
        </p>
      </div>
    </div>
  );
}

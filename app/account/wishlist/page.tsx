export const metadata = { title: 'Your Orders' };

export default function OrdersPage() {
  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-semibold">Your orders</h1>
      <div className="card mt-6 p-10 text-center text-ink/60">
        <p>No orders yet.</p>
        <p className="mt-1 text-sm">
          Once the order + payment backend is connected, real orders will list here with status
          and tracking.
        </p>
      </div>
    </div>
  );
}

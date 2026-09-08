import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Worldset — Shop Smarter. Discover Better.',
    template: '%s | Worldset'
  },
  description:
    'Worldset is an AI-powered marketplace that helps you discover, compare, and buy products faster.',
  openGraph: {
    title: 'Worldset',
    description: 'AI-powered shopping that helps you find the right products faster.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

import { MetadataRoute } from 'next';
import { products } from '@/lib/products';

const BASE_URL = 'https://worldset.co';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/products', '/ai', '/about', '/contact', '/faq'].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date()
  }));

  const productRoutes = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date()
  }));

  return [...staticRoutes, ...productRoutes];
}

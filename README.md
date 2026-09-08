# Worldset

An AI-powered marketplace scaffold — modern e-commerce UI, product catalog, cart, checkout flow,
AI shopping assistant, and admin dashboard — built as a real Next.js app ready to extend and
deploy, not a static mockup.

---

## 1. Project structure

```
worldset/
├── app/
│   ├── page.tsx                  Homepage
│   ├── layout.tsx                Root layout, header/footer, cart provider
│   ├── globals.css
│   ├── products/
│   │   ├── page.tsx               Catalog listing (filters, sort, search)
│   │   ├── ProductsClient.tsx
│   │   └── [slug]/page.tsx        Product detail page
│   ├── cart/page.tsx
│   ├── checkout/
│   │   ├── page.tsx                Multi-step checkout (info → shipping → payment → review)
│   │   └── confirmation/page.tsx
│   ├── ai/page.tsx                 AI shopping assistant chat
│   ├── account/                    Account dashboard, orders, wishlist
│   ├── admin/page.tsx              Admin dashboard shell
│   ├── login/, signup/
│   ├── about/, contact/, faq/, privacy/, terms/
│   ├── robots.ts, sitemap.ts
├── components/                    Header, Footer, ProductCard, cart/AI UI bits
├── lib/
│   ├── types.ts                    Shared TypeScript types (Product, Order status, etc.)
│   ├── products.ts                 Demo product catalog (24 products, 12 categories)
│   ├── cart-context.tsx            Client-side cart (React context + localStorage)
│   └── ai-assistant.ts             AI provider abstraction (mock now, LLM-ready)
├── .env.example
└── README.md
```

## 2. Technology choices

- **Next.js 14 (App Router) + TypeScript + Tailwind CSS** — matches your existing Firzon/Rinezon
  stack, deploys cleanly to Vercel, and gives you server + client components in one project.
- **No database or auth yet** — the catalog, cart, and AI assistant work entirely client-side
  against `lib/products.ts` so the whole thing runs with zero external services. This is the
  fastest path to something you can click through and deploy today; the sections below say
  exactly what to add for real orders and accounts.
- **lucide-react** for icons — lightweight, no extra build config needed.

## 3. Database schema (to add when you connect Postgres)

Not implemented yet — this is the schema the app is designed around:

- `users` (id, email, password_hash, name, created_at)
- `products` (id, slug, name, brand, category_id, price, compare_at_price, description, rating, review_count, stock)
- `product_images`, `product_variants`, `product_specs`
- `categories` (id, name, parent_id)
- `orders` (id, user_id, status, subtotal, shipping, tax, total, created_at)
- `order_items` (id, order_id, product_id, quantity, unit_price)
- `addresses` (id, user_id, full_name, line1, line2, city, region, postal_code, country, phone)
- `payments` (id, order_id, provider, provider_ref, status, amount)
- `reviews` (id, product_id, user_id, rating, body, verified_purchase)
- `wishlists` (user_id, product_id)
- `coupons` (id, code, type, value, min_order, expires_at)
- `suppliers` (id, name, api_ref) and `supplier_products` (product_id, supplier_id, sku, cost, shipping_cost, processing_days)
- `ai_conversations` (id, user_id, messages jsonb)

## 4. Environment variables

See `.env.example`. Nothing is required to run the app as-is; each variable maps to one
integration below.

## 5. Setup instructions

```bash
git clone <your-repo-url> worldset
cd worldset
npm install
npm run dev
```

Visit `http://localhost:3000`.

## 6. Deployment instructions (GitHub → Vercel, matching your usual flow)

1. Create a new GitHub repo (e.g. `worldset`) and push this project to it.
2. In Vercel, "Add New Project" → import that repo → framework preset auto-detects Next.js →
   Deploy. No environment variables are required for the first deploy.
3. Once you connect a database/payments/AI provider, add the matching variables from
   `.env.example` in Vercel → Project → Settings → Environment Variables, then redeploy.

## 7. External APIs to connect for a real launch

| Integration | Why | Where it plugs in |
|---|---|---|
| Postgres (Neon/Supabase/Vercel Postgres) | Real products, orders, accounts | New `lib/db.ts` + replace `lib/products.ts` reads |
| Auth (NextAuth/Clerk) | Real login/signup/sessions | `app/login`, `app/signup`, `app/account` |
| Stripe | Real payments | `app/checkout` payment step + a `/api/checkout` route |
| OpenAI or Anthropic | Real AI assistant answers | `lib/ai-assistant.ts` → swap `mockProvider` for a server route call |
| Resend (or similar) | Order/shipping emails, contact form | `app/contact`, order-confirmation flow |
| Vercel Blob / S3 | Real product image uploads | `app/admin` product forms |
| CJ Dropshipping / Zendrop | Supplier fulfillment | `supplier` fields already on each `Product` — build the order-forwarding service against these |

## 8. What is fully functional right now

- Full storefront navigation: homepage, category browsing, search, filters, sort
- Product detail pages with gallery, specs, related products
- Cart with quantity controls, persisted in the browser (localStorage)
- Multi-step checkout UI (info → shipping → payment → review) — UI only, see below
- AI shopping assistant that reads the real demo catalog and returns real matching products
  based on budget/category/keywords typed in
- Admin dashboard shell showing live catalog data (read-only)
- SEO basics: metadata, Open Graph tags, sitemap.xml, robots.txt

## 9. What requires external credentials before it's real

- Creating an account / logging in (needs auth + database)
- Placing an order that actually charges a card (needs Stripe keys + server route)
- Orders showing up in "Your Orders" (needs database)
- AI answers going beyond the demo catalog (needs an LLM API key)
- Product images beyond the placeholder set (needs image storage)
- Supplier fulfillment after an order is placed (needs CJ Dropshipping/Zendrop credentials)

## 10. Recommended next steps for launching Worldset

1. Stand up Postgres (Neon or Vercel Postgres are the fastest with Vercel) and migrate the schema
   in section 3.
2. Add NextAuth with email/password or Google login; gate `/account` and `/admin`.
3. Wire Stripe: a `/api/create-payment-intent` route + Stripe Elements in the Payment step.
4. Replace the mock AI provider with a server route that calls OpenAI/Anthropic with the real
   product catalog as context (never call the LLM API from the client, and never put the key in
   client code).
5. Pick one supplier integration first (CJ Dropshipping or Zendrop are the more beginner-friendly
   dropshipping APIs) and wire order-forwarding for a single test category before scaling to the
   full catalog.
6. Swap demo images for real product photography once suppliers are selected.

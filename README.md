# danori-store

A responsive food ordering storefront built with Next.js App Router, Supabase, and Paystack. The project combines a polished landing page, grouped product browsing, cart and checkout flows, address management, and authenticated order history.

<p align="center">
  <img src="./public/assets/platterBurger.png" alt="Danori Store hero artwork" width="340" />
</p>

## Overview

`danori-store` is a modern restaurant and fast-food ordering web app for browsing menu categories, viewing product details, placing direct orders, managing cart checkout, and tracking previous purchases. The current build uses Supabase for product and user-backed data flows, and Paystack for payment initialization and verification.

## Features

- App Router storefront with responsive landing, about, and contact pages
- Category-grouped product browsing on the home page
- Product detail pages with dedicated buy-now flow
- Cart checkout and address selection flow
- Authenticated order history and user session handling
- Supabase-backed product, address, and order actions
- Paystack payment initialization and verification routes
- Mobile-responsive navigation and animated product section reveals

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase SSR and browser clients
- Zustand
- Zod
- Paystack API

<!-- ## Project Structure

```text
app/
  (main)/
    page.tsx
    about/page.tsx
    contact/page.tsx
    login/page.tsx
    cart/page.tsx
    orders/page.tsx
    address/page.tsx
    product/[id]/page.tsx
    buy-now/[productId]/page.tsx
    verify-payment/page.tsx
    verify-payment-cart/page.tsx
  api/
    payment/route.ts
    verifyPayment/[reference]/route.ts
components/
context/
public/assets/
store/
utils/
  actions/
  supabase/
```

## Environment Variables

Create a `.env.local` file in the project root with the required variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

Notes:

- `PAYSTACK_SECRET_KEY` must stay server-side only.
- `NEXT_PUBLIC_SITE_URL` should match the real deployed origin in production so Paystack callbacks resolve correctly.
- If any real secrets were ever committed to git history, rotate them.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser:

```text
http://localhost:3000
```

## Data and Payments

- Product data is fetched from Supabase and grouped by category on the storefront.
- Product detail pages fetch a single item by id using a server action.
- Checkout uses Paystack transaction initialization from `app/api/payment/route.ts`.
- Payment verification is handled in `app/api/verifyPayment/[reference]/route.ts`.

## Notes

- The project currently uses App Router route groups under `app/(main)`.
- Order history is protected by user session checks before rendering.
- This README intentionally documents the app as a working storefront prototype, not just a static landing page. -->

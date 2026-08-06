# PRD-001: Photo catalog & detail page

- **Status:** Draft
- **Author:** arpitshah
- **Issue:** TBD

## Problem

The site is currently a bare Next.js skeleton — there's no way for a visitor
to browse or view any photo. Every other planned feature (cart, checkout)
depends on photos being displayable first, so this is the foundational
slice of the product.

## Goals

- Show a browsable grid of available photos on the homepage.
- Give each photo a detail page at `/photo/[slug]` with a larger image,
  title, description, and price.
- Establish the `Photo` data shape that cart/checkout will build on.

## Non-Goals

- Add-to-cart or checkout (separate PRDs; the detail page just holds a
  placeholder buy CTA).
- Search, filtering, or categories/tags.
- User accounts, favorites, or reviews.
- An admin/upload UI — photos are seeded manually for v1.

## User Stories

- As a visitor, I want to see a grid of available photos on the homepage,
  so I can browse what's for sale.
- As a visitor, I want to click a photo to open a detail page with a larger
  image, description, and price, so I can decide whether to buy it.
- As a visitor on a detail page, I want a clear buy call-to-action, so I
  know how I'd proceed once checkout exists.

## Solution

- `Photo` type: `{ slug, title, description, priceCents, imageUrl, width, height }`.
- Photo data lives in a local TypeScript module for v1 (no CMS/DB yet —
  see Open Questions).
- `/` renders a responsive grid (`next/image`) of all photos, each linking
  to `/photo/[slug]`.
- `/photo/[slug]` is a dynamic route rendering the full image, title,
  description, price, and a disabled/stub "Buy" button.
- 404 (via `notFound()`) for unknown slugs.

## Success Metrics

- Homepage renders all seeded photos with no layout shift (`next/image`
  with explicit dimensions).
- Every photo in the grid links to a working, distinct detail page.
- `npm run typecheck` / `npm run build` pass in CI on the PR.

## Open Questions

- Where does photo data live long-term — local file for v1, headless CMS,
  or a database? Recommend starting with a local TS module for v1 and
  revisiting once cart/checkout land and we know the write patterns.
- Where are actual image files hosted — `public/` for v1, or external
  storage/CDN? Recommend `public/` for v1 given low photo count.
- Is pricing per-photo flat, or will size/license tiers exist later? This
  affects the `Photo` shape now, so worth deciding before v1 ships.

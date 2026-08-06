# PRD-002: Shopping cart

- **Status:** Draft
- **Author:** Claude (drafted overnight per request; needs human review)
- **Issue:** TBD

## Problem

A visitor can browse the catalog (PRD-001) and view a single photo's detail
page, but has no way to select more than one photo before buying, or to
review their selections before paying. The `src/app/cart` route already
exists as an empty stub. Without a cart, checkout (PRD-003) would have to
be single-photo-at-a-time, which doesn't match how the site's own route
structure (and most photo-store customers' expectations) is shaped.

## Goals

- Add a photo to the cart from its detail page.
- A cart page (`/cart`) listing everything added, with per-item removal and
  a running subtotal.
- A persistent, always-visible way to see the cart has items in it (count
  indicator), from anywhere on the site.
- Cart contents survive a page refresh.

## Non-Goals

- Checkout / payment (PRD-003).
- Quantities or license tiers for a single photo — see Open Questions.
  For v1, a photo is either in the cart once or not at all.
- Cross-device or cross-session persistence beyond the browser's local
  storage — there's no auth/accounts yet, so nothing to sync against.
- Saved-for-later / wishlist, separate from the cart.

## User Stories

- As a visitor, I want to add a photo to my cart from its detail page, so
  I can buy multiple photos in one checkout instead of one at a time.
- As a visitor, I want to see a cart indicator from anywhere on the site,
  so I know how many photos I've selected without visiting `/cart`.
- As a visitor, I want to see everything in my cart with a running
  subtotal, so I know what I'm about to pay before checkout.
- As a visitor, I want to remove an item from my cart, so I can change my
  mind before checkout.

## Solution

- Cart state: an array of photo slugs (not full `Photo` objects) persisted
  to `localStorage` under a namespaced key. Storing slugs and re-deriving
  everything else (via `getPhotoBySlug`) keeps the cart from ever holding
  stale title/price data if the seed catalog changes.
- A React Context provider (e.g. `CartProvider`) wraps the app in
  `layout.tsx`, exposing add/remove/contains + the current item list to
  any component. Reads/writes `localStorage` on mount/change.
- The site currently has no shared header/nav — `layout.tsx` just wraps
  `children` directly. This PRD adds a minimal one (site name/logo linking
  home, cart link with an item-count badge) since a cart with no visible
  entry point isn't usable. Scope this narrowly to what the cart needs;
  broader nav/IA is not part of this PRD.
- Detail page: the current disabled "Buy" button becomes a working
  "Add to Cart" toggle (add / already-in-cart state), pending the answer
  to the Buy-vs-cart open question below.
- `/cart` page: each item shows thumbnail, title, price, and a remove
  action; a subtotal; and a "Proceed to Checkout" button that's a stub
  (disabled or links to a not-yet-real route) until PRD-003 lands. An
  empty cart shows a distinct empty state, not a blank list.

## Success Metrics

- Adding a photo from its detail page updates the header's cart count
  without a full page reload.
- Cart contents persist across a browser refresh.
- Removing the last item in the cart shows the empty state correctly.

## Open Questions

- **Quantity/tiers**: PRD-001's `Photo` type has one flat `priceCents` per
  photo, no size/license variants. This PRD assumes a photo can only be in
  the cart once (no quantity). If license tiers or print sizes are ever
  planned, the cart's data model (and `Photo` itself) needs to change
  before this ships — flagging now since it's expensive to retrofit later.
- **Buy vs. Add to Cart**: should the detail page's existing "Buy" button
  become "Add to Cart" (this PRD's assumption), or should both an instant
  "Buy Now" and a separate "Add to Cart" exist? The latter is more
  standard for stores with multi-item purchases but is more UI to build
  for a v1.
- **LocalStorage-only persistence**: acceptable that clearing browser data
  or switching devices loses the cart, given there's no auth yet? If
  accounts are coming soon, it may be worth designing the storage key/shape
  now so a future migration to server-side carts is less disruptive.

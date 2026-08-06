# PRD-003: Checkout & payment

- **Status:** Draft
- **Author:** Claude (drafted overnight per request; needs human review)
- **Issue:** TBD

## Problem

A visitor can build a cart (PRD-002) but has no way to actually pay and
complete a purchase. The route stubs `src/app/api/checkout`,
`src/app/success`, and `src/app/cancel` already exist in the repo skeleton
— their names map directly onto a hosted-checkout-redirect flow (e.g.
Stripe Checkout's `success_url`/`cancel_url` convention), suggesting this
was the intended shape from the start, though that's an assumption this
PRD flags rather than treats as settled (see Open Questions).

## Goals

- "Proceed to Checkout" from the cart creates a payment session and
  redirects the buyer to a hosted payment page.
- Successful payment lands the buyer on `/success`.
- Cancelled/abandoned payment lands the buyer on `/cancel` with their cart
  still intact.
- Prices charged are derived server-side from the catalog, never trusted
  from the client.

## Non-Goals

- Digital delivery / license file access after purchase (PRD-004).
- Accounts, saved payment methods, or order history.
- Refunds, subscriptions, or recurring billing.
- Tax handling beyond whatever the payment provider computes automatically.

## User Stories

- As a visitor with items in my cart, I want to click "Proceed to
  Checkout" and be taken to a secure payment page, so I can pay without
  this site ever handling my card details directly.
- As a buyer, after paying successfully, I want to land on a confirmation
  page, so I know the purchase went through.
- As a visitor who cancels or abandons payment, I want to return to the
  site with my cart intact, so I don't lose my selections and have to
  rebuild the cart from scratch.

## Solution

- **Payment provider: Stripe Checkout** (hosted page) — strongly implied
  by the existing route names, but not confirmed anywhere in writing.
  Treat as a working assumption, not a locked decision (see Open
  Questions) — the rest of this section assumes Stripe.
- `POST /api/checkout` (Route Handler): receives the cart's photo slugs
  from the client, re-derives each price server-side via
  `getPhotoBySlug`/`src/lib/photos.ts` (a manipulated client request can't
  check out at a lower price than the real catalog price), creates a
  Stripe Checkout Session with one line item per photo, and returns the
  session URL for the client to redirect to.
- `/success`: reads the Stripe session ID from the URL query. Whether it
  verifies the session status server-side before rendering a real
  confirmation (vs. a generic "thanks, check your email" page) is scoped
  together with PRD-004, since that's also where delivery happens.
- `/cancel`: static "checkout was cancelled" messaging with a link back to
  `/cart`. Cart contents are untouched — they're only cleared after a
  verified successful payment, not optimistically on redirect.
- **Requires a Stripe account** (test + live mode API keys) and a
  `STRIPE_SECRET_KEY` env var. The repo currently has no `.env.example` —
  add one when this ships, documenting required variables without
  committing real values.

## Success Metrics

- A test-mode Stripe payment (using Stripe's documented test card
  numbers) completes end-to-end and lands on `/success`.
- Cancelling mid-checkout returns to `/cancel` with the cart still
  populated.
- Submitting a tampered cart request (e.g. altered price) still charges
  the real catalog price, proving server-side re-derivation works.

## Open Questions

- **Confirm Stripe.** The route names imply it strongly, but this should
  be an explicit decision, not an inference from folder names — worth
  double-checking before building against a specific provider's SDK.
- **A Stripe account has to exist before this is buildable at all.**
  Creating one (and generating API keys) is a human step only you can
  do — this PRD can't be implemented, even in draft code, without it.
- Does checkout need to collect the buyer's email upfront (Stripe
  Checkout can do this natively), and does PRD-004's delivery flow depend
  on that email?
- Confirmed assumption: cart clears only after `/success` verifies the
  session actually completed, not optimistically at redirect time. Flag
  if immediate/optimistic clearing is preferred instead.

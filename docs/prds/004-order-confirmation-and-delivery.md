# PRD-004: Order confirmation & digital delivery

- **Status:** Draft
- **Author:** Claude (drafted overnight per request; needs human review)
- **Issue:** TBD

## Problem

PRD-003 gets a buyer through payment and onto `/success`, but nothing
after that actually delivers what they paid for. A photo store that takes
payment but doesn't hand over the photo isn't a complete product — this is
the piece that closes the loop.

## Goals

- After a verified successful payment, the buyer can download the
  full-resolution file(s) for exactly what they purchased.
- The purchased file is not accessible to anyone who didn't pay for it —
  paying has to actually gate access, not just be decorative.
- A confirmation email with a way back to the download(s), so access isn't
  lost if the success page/tab is closed.

## Non-Goals

- User accounts or an order-history dashboard — no auth exists yet, and
  this PRD assumes token/link-based access instead (see Solution).
- Watermarking or DRM beyond the access-gating link itself.
- Physical prints or any non-digital fulfillment.
- A "resend/recover my download link" support flow — out of scope for v1
  regardless of whether links expire (see Open Questions).

## User Stories

- As a buyer who just paid, I want to download my purchased photo(s)
  immediately from the success page, so I get what I paid for right away.
- As a buyer, I want an email confirming my purchase with a link back to
  my download(s), so I don't lose access if I close the tab.
- As the site owner, I want the full-resolution files gated behind proof
  of purchase, so the product isn't effectively free to anyone with the
  right URL guess.

## Solution

- **Two asset tiers.** `public/photos/*.jpg` (from PRD-001) are preview
  images — already public, fine to stay that way. Delivery needs a
  separate, non-public full-resolution asset per photo. Pointing "download"
  at the existing public path would give the paid product away for free
  to anyone, purchase or not — this has to be a genuinely separate, gated
  asset.
- On verified payment (ties into PRD-003's `/success` verification step),
  generate one opaque download token per purchased photo, and serve it via
  something like `/api/downloads/[token]` that resolves to the real asset
  only for a valid, purchase-linked token.
- `/success` displays the purchased photo(s) with working download
  buttons using those tokens.
- **Email confirmation**: send the same download link(s) to the buyer's
  email (collected at Stripe Checkout per PRD-003) via a transactional
  email provider — not yet chosen, see Open Questions.
- **No database exists anywhere in this project yet.** Rather than stand
  one up purely for order records, the default recommendation is to treat
  Stripe's own session/payment-intent data as the source of truth for
  "what was purchased" — revisit if a DB becomes necessary for other
  reasons first.

## Success Metrics

- A completed test purchase produces a working download of the exact
  full-resolution photo(s) bought — not the preview image, not a
  different photo.
- The full-resolution asset returns nothing (404/403) without a valid
  purchase-derived token.
- A confirmation email arrives with a working download link.

## Open Questions

- **Full-resolution source images don't exist yet.** This repo only has
  small, web-optimized preview JPGs generated for PRD-001 — no higher-res
  originals anywhere. Real deliverable assets need to be sourced before
  this is buildable at all, the same kind of hard blocker PRD-003 has with
  needing a real Stripe account first.
- **Email provider not chosen** (Resend, Postmark, SES, etc.) — a new
  external dependency and account, same category of blocker as Stripe.
- Should download links/tokens expire? If so, after how long, or after
  how many downloads? Directly affects whether a support/recovery flow
  becomes necessary even without user accounts.
- Is skipping a database in favor of Stripe-as-source-of-truth acceptable
  long-term, or worth reconsidering now rather than retrofitting a DB
  later once orders/downloads depend on the current approach?

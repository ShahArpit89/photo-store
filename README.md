# 📷 Photo Store

A photography-selling website — browse a gallery, view photo detail pages,
add to cart, and check out.
<!-- test/slack-pr-blockkit-check: verifying Block Kit PR message, will close without merging -->

[![CI](https://github.com/ShahArpit89/photo-store/actions/workflows/ci.yml/badge.svg)](https://github.com/ShahArpit89/photo-store/actions/workflows/ci.yml)

Built with [Next.js](https://nextjs.org) (App Router), TypeScript, and
Tailwind CSS. Currently early-stage: the gallery and photo detail page are
implemented; cart, checkout, and order confirmation are in progress (see
[Roadmap](#roadmap)).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Scripts

| Command                | What it does                     |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start the dev server             |
| `npm run build`        | Production build                 |
| `npm start`            | Serve the production build       |
| `npm run lint`         | ESLint                           |
| `npm run typecheck`    | `next typegen` + `tsc --noEmit`  |
| `npm test`             | Run tests (watch mode, Vitest)   |
| `npm run test:ci`      | Run tests once, CI mode          |
| `npm run format`       | Format with Prettier             |
| `npm run format:check` | Check formatting without writing |

## Stack

- **[Next.js](https://nextjs.org)** — App Router
- **TypeScript**
- **Tailwind CSS**
- **Vitest** + Testing Library — tests
- **ESLint** + **Prettier** — lint & format
- **Husky** + **lint-staged** — pre-commit checks

## Project Structure

```
src/
  app/
    page.tsx              # Gallery (home page)
    photo/[slug]/          # Photo detail page
    api/checkout/          # Checkout endpoint (planned, not yet implemented)
  lib/
    photos.ts              # Photo catalog data/helpers
docs/
  HISTORY.md               # Running log of project decisions — read before starting work
  prds/                    # Feature specs, one per feature
```

## Roadmap

Tracked as PRDs in [`docs/prds/`](docs/prds/):

- [x] [001 — Photo catalog & detail page](docs/prds/001-photo-catalog-and-detail-page.md)
- [ ] [002 — Shopping cart](docs/prds/002-shopping-cart.md)
- [ ] [003 — Checkout & payment](docs/prds/003-checkout-and-payment.md)
- [ ] [004 — Order confirmation & delivery](docs/prds/004-order-confirmation-and-delivery.md)

## Editor

Recommended VS Code extensions are listed in `.vscode/extensions.json` and
will be suggested automatically when you open this folder.

## Contributing

Features start as a PRD in `docs/prds/` before implementation — see
[`docs/prds/README.md`](docs/prds/README.md) for the workflow and branch
naming convention. Every code change goes through a branch + PR + CI; see
[`docs/HISTORY.md`](docs/HISTORY.md) for the "why" behind past decisions —
read it before starting work, and add an entry for any notable decision
you make.

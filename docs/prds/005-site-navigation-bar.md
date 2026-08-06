# PRD-005: Site navigation bar

- **Status:** Draft
- **Author:** arpitshah
- **Issue:** TBD

## Problem

The site has no persistent navigation — `layout.tsx` renders only
`{children}` with no header. The homepage is a single self-contained grid
page; there's no way to reach any other section, and no other sections
exist to reach. As the catalog grows past one grid page (categories, an
about/contact page, eventually cart/checkout), visitors need a consistent
way to orient and move between them.

## Goals

- Add a persistent top navigation bar, rendered once in `layout.tsx` so it
  appears on every page.
- Nav includes: site name/logo (links home), Gallery, Categories, About
  Us.
- Responsive: full horizontal bar on desktop, collapsible menu on mobile.
- Visually consistent with the existing Tailwind light/dark aesthetic
  already used on the homepage and detail page.
- Active-route highlighting, so visitors can tell which section they're on.

## Non-Goals

- The category _data model_ and any filtering/browsing logic — PRD-001
  explicitly scoped search/filtering/categories out. This PRD only adds
  the nav entry point; see Open Questions.
- Cart/account icons in the nav — those belong to PRD-002/003 once that
  work lands, not this PRD.
- A footer. Separate concern, not requested here.
- A design system or component library — this is one shared nav component,
  not a broader UI refactor.

## User Stories

- As a visitor, I want a nav bar on every page, so I can get back to the
  gallery or explore other sections without using the browser back button.
- As a visitor, I want to browse photos by category, so I can find what
  I'm looking for faster than scrolling the full grid.
- As a visitor, I want an About Us page, so I can learn who's behind the
  store before buying.
- As a mobile visitor, I want the nav collapsed into a menu, so it doesn't
  crowd a small screen.

## Solution

- New `src/components/NavBar.tsx` (client component — needed for the
  mobile menu's open/close state and active-link styling), rendered from
  `src/app/layout.tsx` above `{children}` so it's shared across all
  routes.
- Links: `/` (Gallery — reuses the existing homepage grid, just adds it to
  the nav rather than treating it as an unlabeled root), `/categories`,
  `/about`.
- `/about` is a new static page (`src/app/about/page.tsx`) — copy TBD, can
  ship with placeholder text same as PRD-001 shipped with placeholder
  photos.
- `/categories` is a new page (`src/app/categories/page.tsx`). Until a
  real category data model exists, this can either (a) list static
  category labels with no filtering yet, or (b) be deferred to a follow-up
  PRD once the data model is designed. Recommend (b) — see Open
  Questions — with this PRD instead linking Categories to a clearly
  labeled "coming soon" page so the nav isn't shipping a dead link.
- Mobile breakpoint reuses the existing `sm`/`lg` Tailwind breakpoints
  already used on the homepage grid, for consistency.

## Success Metrics

- Nav bar renders on every route (`/`, `/photo/[slug]`, `/about`,
  `/categories`) with no layout shift.
- All four links resolve to a real page — none 404.
- Mobile viewport (< `sm`) shows a working collapsible menu, verified
  manually in a browser per this repo's UI-change convention.
- `npm run lint` / `npm run typecheck` / `npm run build` pass in CI on the
  PR.

## Open Questions

- **Categories data model isn't designed yet** (PRD-001 explicitly left
  categories/tags out of scope). Does this PRD block on that design, or
  ship the nav link pointing at a "coming soon" placeholder page and let
  a follow-up PRD own the real category browsing UI? Recommend the
  latter so the nav isn't blocked on an unrelated data-model decision.
- **About Us copy/content** — who writes it, and what goes on the page
  (bio, mission statement, contact info)? Recommend shipping with
  placeholder copy for v1, same pattern PRD-001 used for placeholder
  photos, and treating real copy as a content task rather than blocking
  this PRD.
- Should "Gallery" in the nav be a second label for the existing `/`
  homepage, or does this imply moving the grid to its own `/gallery`
  route and making `/` a landing page instead? Recommend keeping the grid
  at `/` for v1 (matches PRD-001, avoids a redirect) and revisiting only
  if a distinct landing page is wanted later.
- Any specific visual direction for "modern" (sticky vs. static header,
  logo/wordmark treatment, icon set for the mobile menu toggle)? Recommend
  a plain text wordmark and a sticky header for v1 — cheap to build,
  common pattern — and treating anything more custom as a design task
  independent of this PRD.

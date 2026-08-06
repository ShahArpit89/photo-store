# PRD-005: Site navigation bar

- **Status:** Draft
- **Author:** arpitshah
- **Issue:** TBD

## Problem

The site currently has no persistent navigation — `layout.tsx` renders
only `{children}`, with no header of any kind. Every page stands alone;
there's no way for a visitor to move between sections or even tell what
sections exist. To feel like a real store rather than a single static
page, the site needs a consistent nav bar that's present everywhere and
gives visitors a clear sense of where they are and where they can go.

## Goals

- Add a persistent top navigation bar, rendered once in `layout.tsx` so it
  appears on every page.
- Nav includes: site name/logo (links home), Gallery, Categories, About
  Us.
- Responsive: full horizontal bar on desktop, collapsible menu on mobile.
- Modern, clean visual style consistent with the site's existing
  light/dark Tailwind theme.
- Active-route highlighting, so visitors can tell which section they're on.

## Non-Goals

- Category filtering or browsing logic — this PRD adds the Categories nav
  entry point, not the underlying data model or filter UI (see Open
  Questions).
- Cart/account icons or auth-related nav items — no cart or account
  system exists yet to link to.
- A footer.
- A broader design-system overhaul — this is one shared nav component,
  not a restyle of the rest of the site.

## User Stories

- As a visitor, I want a nav bar on every page, so I can get back to the
  gallery or explore other sections without using the browser back button.
- As a visitor, I want to browse photos by category, so I can find what
  I'm looking for faster than scrolling one long grid.
- As a visitor, I want an About Us page, so I can learn who's behind the
  store before buying.
- As a mobile visitor, I want the nav collapsed into a menu, so it doesn't
  crowd a small screen.

## Solution

- New `src/components/NavBar.tsx` (client component — needed for the
  mobile menu's open/close state and active-link styling), rendered from
  `src/app/layout.tsx` above `{children}` so it's shared across all
  routes.
- Links: `/` (Gallery), `/categories`, `/about`.
- `/about` is a new static page (`src/app/about/page.tsx`) with
  placeholder copy for v1 — real content is a separate writing task, not
  a blocker for shipping the nav.
- `/categories` is a new page (`src/app/categories/page.tsx`). Since no
  category data model exists yet, this page ships as a clearly labeled
  "coming soon" placeholder rather than faking a browsing experience — see
  Open Questions for the alternative of building the real thing now.
- Sticky header, plain text wordmark, hamburger toggle below the `sm`
  breakpoint for the mobile menu.

## Success Metrics

- Nav bar renders on every route (`/`, `/photo/[slug]`, `/about`,
  `/categories`) with no layout shift.
- All four links resolve to a real page — none 404.
- Mobile viewport (< `sm`) shows a working collapsible menu, verified
  manually in a browser.
- `npm run lint` / `npm run typecheck` / `npm run build` pass in CI on the
  PR.

## Open Questions

- **Categories data model isn't designed yet.** Does this PRD block on
  designing it, or ship the nav link pointing at a "coming soon"
  placeholder and let a follow-up PRD own real category browsing?
  Recommend the placeholder, so the nav isn't blocked on an unrelated
  data-model decision.
- **About Us copy/content** — who writes it, and what goes on the page
  (bio, mission statement, contact info)? Recommend placeholder copy for
  v1, with real copy treated as a separate content task.
- Should "Gallery" in the nav just relabel the existing `/` homepage, or
  does it imply moving the grid to its own `/gallery` route and making
  `/` a distinct landing page? Recommend keeping the grid at `/` for v1 to
  avoid an unnecessary redirect, revisiting only if a landing page is
  wanted later.
- Any specific visual direction beyond "modern" (logo/wordmark treatment,
  icon set for the mobile menu toggle, color accents)? Recommend a plain
  text wordmark and sticky header as a cheap v1 default, with anything
  more custom treated as a separate design task.

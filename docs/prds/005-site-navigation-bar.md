# PRD-005: Site navigation bar

- **Status:** Approved
- **Author:** arpitshah
- **Issue:** #35, #36, #37

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
- Gallery stays at `/` for v1 — no `/gallery` route split. Revisit only if
  a dedicated landing page (hero, marketing content) gets prioritized
  later; adding the split now would be a speculative redirect with no
  current payoff.
- `/about` is a new static page (`src/app/about/page.tsx`) with
  placeholder copy for v1 — real content is a separate writing task, not
  a blocker for shipping the nav. The template itself defines three
  content blocks so whoever writes real copy later knows the shape:
  bio, mission statement, and contact/social links. Placeholder text
  fills all three.
- `/categories` is a new page (`src/app/categories/page.tsx`), shipped as
  a clearly labeled "coming soon" placeholder — no category data model
  exists yet, and designing one is out of scope for a nav PRD (follow-up
  PRD to own real category browsing). `/categories` is treated as the
  permanent URL for this feature, not a placeholder path to be renamed
  later — the follow-up PRD builds the real page at this same route
  rather than introducing a redirect.
- Sticky header, plain text wordmark, hamburger toggle below the `sm`
  breakpoint for the mobile menu.
- Mobile menu toggle icon: Heroicons (`Bars3Icon` / `XMarkIcon`) — same
  authors as Tailwind, ships plain SVG components, no extra runtime
  dependency beyond the package itself.
- Accent color: Tailwind `indigo-600` (`indigo-400` in dark mode) for
  active-link state and any link/button accents. The site has no brand
  color defined yet (`globals.css` is pure grayscale); this is a
  placeholder default, not a branding decision.

## Success Metrics

- Nav bar renders on every route (`/`, `/photo/[slug]`, `/about`,
  `/categories`) with no layout shift.
- All four links resolve to a real page — none 404.
- Mobile viewport (< `sm`) shows a working collapsible menu, verified
  manually in a browser.
- `npm run lint` / `npm run typecheck` / `npm run build` pass in CI on the
  PR.

## Open Questions

None — all four questions raised during review are resolved; decisions
recorded in Solution above.

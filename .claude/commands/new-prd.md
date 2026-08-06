---
description: Scaffold a new PRD, branch, and PR from the template
---

Create a new PRD for: $ARGUMENTS

Follow the workflow in docs/prds/README.md:

## 1. Determine the number and slug

- List `docs/prds/*.md` (excluding `TEMPLATE.md` and `README.md`) and find
  the highest `NNN` prefix in use. The new PRD is `NNN + 1`, zero-padded to
  3 digits.
- Derive a short kebab-case slug from the title given in $ARGUMENTS (2-5
  words, e.g. "Shopping cart" -> `shopping-cart`).

## 2. Branch

- `git checkout main && git pull origin main`
- Create branch `prd/NNN-slug` (matching the PRD file's number).

## 3. Draft the PRD

- Copy `docs/prds/TEMPLATE.md` to `docs/prds/NNN-slug.md`.
- Fill it in based on $ARGUMENTS and whatever context is available in this
  conversation about what the feature should do. Set `Status: Draft` and
  leave `Issue: TBD`.
- Be honest about open questions rather than silently inventing answers to
  product decisions — a well-flagged unknown is more useful to the reader
  than a confident guess. Look at existing route stubs, other PRDs, and
  docs/HISTORY.md for context on what's already been decided.

## 4. Verify

- Re-read the PRD once written: does every acceptance-criteria-shaped
  statement actually belong in Goals or Solution, not left implicit? Is
  anything a "Non-Goal" actually already required to make this feature
  minimally usable (check against the site's existing routes/pages)?

## 5. Commit, push, open PR

- Commit message describing what the PRD covers.
- Push and open a PR (base `main`), docs-only, following the same
  Summary/Test-plan-free format PRD-001's PR used (a PRD PR has no code
  test plan — describe what's in scope, out of scope, and call out the
  open questions explicitly in the PR body so they're easy to spot in
  review).

## 6. Report

Tell the user the PR URL and a one-line summary. Do not merge it yourself —
PRDs go through the same review-before-merge convention as code.

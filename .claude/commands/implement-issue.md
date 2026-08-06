---
description: Implement a GitHub issue end-to-end — branch, code, checks, PR, and project board update
---

Implement GitHub issue #$ARGUMENTS in this repo, following the conventions in
docs/prds/README.md. Work through these steps in order and don't skip any:

## 1. Gather context

- `gh issue view $ARGUMENTS --json title,body,number,state` — read the acceptance
  criteria and any `PRD:` path in the body, and read that PRD file too.
- If the body says "Depends on #N", check that issue N is closed/merged before
  starting. If it isn't, stop and tell the user instead of proceeding.
- `git status` — if the working tree isn't clean, stop and ask the user what
  to do with the existing changes rather than overwriting them.

## 2. Branch

- `git checkout main && git pull origin main`
- Create a branch named `$ARGUMENTS-<short-slug>`, where `<short-slug>` is
  2-4 words derived from the issue title (e.g. issue titled "Homepage photo
  grid" → `3-homepage-photo-grid`).

## 3. Move the board item to "In Progress"

- Project is number 2, owner `ShahArpit89`. Get the project id:
  `gh project view 2 --owner ShahArpit89 --format json` (the `id` field).
- Get the Status field id and its "In Progress" option id:
  `gh project field-list 2 --owner ShahArpit89 --format json`.
- Find this issue's item id by matching its URL:
  `gh project item-list 2 --owner ShahArpit89 --format json` and match
  `content.url` against `https://github.com/ShahArpit89/photo-store/issues/$ARGUMENTS`.
- `gh project item-edit --project-id <id> --id <item-id> --field-id <status-field-id> --single-select-option-id <in-progress-option-id>`

## 4. Implement

- Implement exactly what the issue's acceptance criteria describe. Don't
  scope-creep into other open issues or add unrequested polish.
- Keep changes idiomatic to the existing codebase (App Router, Tailwind,
  TypeScript strict mode).

## 5. Verify

Run all of these and fix any failures before continuing:
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## 6. Commit, push, open PR

- Commit with a message describing what changed and why (not "implements
  issue #$ARGUMENTS").
- Push the branch and open a PR: `gh pr create --title "<issue title>" --body`
  including `Closes #$ARGUMENTS` and a short summary, base `main`.
- Add the PR to the project board (same project id) and set its Status to
  "In Review" (same field/option lookup pattern as step 3, but for the PR's
  URL and the "In Review" option).

## 7. Report

Tell the user the PR URL and a one-line summary of what was implemented. Do
not merge the PR yourself — per project convention, code changes go through
review before merging (docs/prds/README.md).

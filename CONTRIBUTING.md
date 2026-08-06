# Contributing

## Setup

```bash
npm install
npm run dev
```

## Before opening a PR

Run the full check suite locally (CI runs the same steps):

```bash
npm run lint
npm run format:check
npm run typecheck
npm run test:ci
npm run build
```

A pre-commit hook (Husky + lint-staged) runs ESLint and Prettier on staged
files automatically, so most formatting/lint issues are caught before you
even commit.

## Workflow

- **Features start as a PRD.** See [`docs/prds/README.md`](docs/prds/README.md)
  for the full process — draft as markdown, PR review, then broken into
  tracking issues once approved.
- **Branch naming**: `<issue-number>-short-slug` for implementation work
  (e.g. `4-photo-detail-page`), `prd/NNN-short-title` for PRD drafts.
- **Project board**: issues move Backlog → Ready → In Progress → In Review →
  Done. Run `/sync-board` (a Claude Code command in `.claude/commands/`) to
  reconcile the board against actual issue/PR state — merges don't move
  board items to Done on their own.
- **Code changes always go through a branch + PR + passing CI** before
  merging to `main`. Low-risk docs/config-only edits may be pushed directly.

## Project history

[`docs/HISTORY.md`](docs/HISTORY.md) is a running log of notable decisions
— read it for context on *why* things are the way they are, not just *what*
changed (that's what `git log` is for).

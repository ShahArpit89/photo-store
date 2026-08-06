# History

A running log of notable decisions and changes to the project — the "why"
behind things, not a duplicate of `git log`. Newest entries at the top.
Read this before starting work in a new session to pick up context; add an
entry whenever you make a decision future-you (or future-Claude) would
otherwise have to re-derive.

---

## 2026-08-06

- **Reverted the Claude Code Action (`claude-review.yml`, `claude.yml`).**
  Set up automated PR review via `anthropics/claude-code-action`, tried
  `CLAUDE_CODE_OAUTH_TOKEN` (blocked by an org-settings permission wall),
  switched to `ANTHROPIC_API_KEY`, confirmed the wiring worked end-to-end
  (GitHub App installed, secret set, error was specifically "Credit
  balance is too low"). Reverted anyway — budget constraint, not a
  technical one. **Workaround:** review PRs on-demand via Claude Code CLI
  (`/review <pr-number>`) instead — no extra cost since it's already
  covered by the existing session/plan. GitHub's native Copilot "Agents"
  tab was evaluated as an alternative and rejected for the same reason —
  it requires Copilot Pro+/Enterprise, separate paid billing.
- **`/implement-issue` slash command** added
  (`.claude/commands/implement-issue.md`): given an issue number, reads
  the issue + linked PRD, branches as `<issue>-slug`, moves the board
  item through In Progress/In Review, implements, verifies with
  lint/typecheck/build, and opens the PR. Used it to implement issue #2.
- **Issue #2 (photo data model) implemented**: `Photo` type,
  `src/lib/photos.ts` seed data, `getPhotoBySlug()`, 5 placeholder JPGs
  generated locally in `public/photos/` (no real photography yet). PR #5,
  merged.
- **PRD-001 broken into issues #2, #3, #4** and added to the project
  board as Ready. Issue-branch naming convention (`<issue-number>-slug`)
  documented in `docs/prds/README.md`.
- **PRD workflow established**: PRDs as markdown in `docs/prds/`
  (`TEMPLATE.md`), reviewed via PR rather than as GitHub Issues, for
  clean git-based revision history. `docs/prds/001-photo-catalog-and-detail-page.md`
  is the first — homepage grid + `/photo/[slug]` detail page, chosen
  because the site currently has no way to browse/view any photo.
- **GitHub Project board** "Photo Store" (project #2, github.com/users/ShahArpit89/projects/2)
  created and linked to the repo. Custom `Status` field: Backlog → Ready →
  In Progress → In Review → Done (replaced the default Todo/In
  Progress/Done).
- **Repo hygiene pass**: CI (`.github/workflows/ci.yml` — lint, typecheck,
  build on push/PR to `main`), MIT `LICENSE`, branch protection on `main`
  requiring the `build` check. `typecheck` script needed `next typegen`
  before `tsc --noEmit` — `next-env.d.ts` imports `.next/types/*.d.ts`,
  which doesn't exist until typegen/build has run once.
- **Convention agreed**: code changes always go through branch + PR + CI;
  low-risk docs/config edits can be pushed directly to `main`.


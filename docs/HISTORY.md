# History

A running log of notable decisions and changes to the project — the "why"
behind things, not a duplicate of `git log`. Newest entries at the top.
Read this before starting work in a new session to pick up context; add an
entry whenever you make a decision future-you (or future-Claude) would
otherwise have to re-derive.

---

## 2026-08-06

- **Fixed Slack payload JSON injection bug (silent failure, no error
  visible in Actions).** `slack-notify`'s payload embedded
  `github.event.head_commit.message` directly into a YAML/JSON string via
  `${{ }}`. Merge commit messages are multi-line, so the substituted text
  produced raw unescaped newlines inside a JSON string — invalid JSON.
  Slack rejected it, but `slack-github-action`'s default `errors: false`
  doesn't fail the step, so Actions showed green with nothing posted.
  Manual curl tests worked because the test text was single-line. Fixed
  both `ci.yml` and `slack-pr-notify.yml` by building the string with the
  `format()` expression function and wrapping the whole thing in
  `toJson()`, which properly escapes newlines/quotes — instead of
  interpolating raw values straight into a JSON literal.

- **Added explicit `permissions: contents: read` to `ci.yml` and
  `slack-pr-notify.yml`** (CodeQL finding on PR #26, post-merge: "Workflow
  does not contain permissions"). Neither workflow writes to the repo or
  calls the GitHub API beyond checkout — `contents: read` is the minimal
  grant; without it `GITHUB_TOKEN` defaults to broad read/write.

- **Slack notifications: two channels, two webhooks.** Added a
  `slack-notify` job to `ci.yml` (posts every run's result — success and
  failure — to `SLACK_WEBHOOK_ACTIONS`) and a new `slack-pr-notify.yml`
  workflow (posts on `pull_request: opened` to `SLACK_WEBHOOK_PR`).
  Deliberately two separate Incoming Webhooks/channels rather than one,
  per request — Actions noise and PR-raised signal serve different
  audiences. Used Slack Incoming Webhooks + `slackapi/slack-github-action`
  instead of the official Slack GitHub app so both are configurable from
  repo secrets without needing Slack workspace admin to wire up
  `/github subscribe`. Both steps have `continue-on-error: true` so a
  missing/misconfigured secret can't block required CI or PR checks —
  secrets (`SLACK_WEBHOOK_ACTIONS`, `SLACK_WEBHOOK_PR`) must be added by a
  repo admin via `gh secret set`; not set as of this commit.

- **CI workflow: concurrency cancellation + job timeout** (PR #24). Run
  history showed CI runs stacking ~1-2 min apart during Dependabot bursts
  and rapid pushes, with superseded runs completing anyway instead of
  being cancelled — wasted runner minutes. Added a `concurrency` group
  keyed on workflow+ref with `cancel-in-progress: true`, and
  `timeout-minutes: 10` on the `build` job (was relying on the 6h
  default). Individual steps were already fast (~40-45s full run); no
  need to split into parallel jobs at this size — the extra
  checkout/setup-node overhead per job would outweigh the gain.
- **Closed Dependabot PR #23 (eslint 9.39.5 → 10.8.0), added an ignore
  rule for it.** Same pattern as PR #20 below: `npm run lint` in CI threw
  `TypeError: Error while loading rule 'react/display-name':
contextOrFilename.getFilename is not a function`. ESLint 10 removed the
  deprecated `context.getFilename()` rule API; `eslint-plugin-react`
  (vendored inside `eslint-config-next`) still calls it. Real
  incompatibility, nothing to fix on our side. Added an ignore rule for
  `eslint` major-version bumps — revisit once `eslint-config-next`/
  `eslint-plugin-react` support ESLint 10.
- **Closed Dependabot PR #20 (typescript 5.9.3 → 7.0.2), added an ignore
  rule for it.** CI's `build` check failed on `npm ci` with `EUSAGE:
Missing: typescript@5.9.3 from lock file`. Root cause: TypeScript 7 is
  incompatible with `@typescript-eslint/utils` (vendored inside
  `eslint-config-next`), which peer-depends on `typescript@">=4.8.4
<6.1.0"` — confirmed by reproducing locally with npm 10 (what CI's
  Node 22 setup actually bundles; npm 11 only warns instead of failing,
  which is why `npm ci` looked fine on a newer local npm). Not a
  lockfile-sync mistake, a real incompatibility. Added a
  `dependabot.yml` ignore rule for `typescript` major-version bumps so
  this doesn't recur every week — remove it once `eslint-config-next`/
  `typescript-eslint` support TS 7.
- **Overnight "make it professional" pass**, done autonomously per request
  while the user slept, entirely as PRs — nothing merged without review.
  Six PRs:
  - #10 EditorConfig, Prettier, `eslint-config-prettier`, Husky +
    lint-staged pre-commit hook (verified end-to-end with a real test
    commit, not just assumed to work), `format:check` in CI.
  - #11 Vitest + React Testing Library, scoped per the official Next.js
    Vitest guide for this exact version (`node_modules/next/dist/docs/`),
    which says async Server Components aren't supported and recommends
    E2E instead — so `/photo/[slug]` is deliberately not covered here.
    Two real bugs found by actually running the tests: missing
    `test.globals: true` meant RTL's auto-cleanup never registered (DOM
    leaked across tests in one file), and querying links by accessible
    name failed because it's the image-alt + heading text concatenated,
    not just the title.
  - #12 `CONTRIBUTING.md`, `SECURITY.md` (private vulnerability reporting
    enabled on the repo directly — was off; deliberately no personal
    email committed to a public file), `.github/dependabot.yml`,
    `.github/PULL_REQUEST_TEMPLATE.md`.
  - #13 `/new-prd` command — scaffolds a PRD from the template with
    auto-incremented numbering, same workflow used for PRD-001.
  - #14, #15, #16: PRD-002 (shopping cart), PRD-003 (checkout &
    payment, assumes Stripe from the existing route names but flags it
    as unconfirmed, and flags that a real Stripe account is a hard
    blocker), PRD-004 (order confirmation & delivery, flags that no
    full-resolution source images exist anywhere yet and no email
    provider is chosen — both hard blockers same as PRD-003's).
  - Also enabled GitHub's Dependabot vulnerability alerts directly
    (repo setting, was off).
  - Deliberately did NOT restructure `src/` — the codebase is still small
    enough (one lib file, three pages) that reorganizing folders would be
    premature abstraction, not "professional." Scope was tooling, repo
    hygiene, and process instead.
- **`/sync-board` command added** (`.claude/commands/sync-board.md`):
  discovered issue #2's board item was stuck at "In Review" even though
  PR #5 had merged — `/implement-issue` moves items to In Review when it
  opens a PR, but nothing moves them to Done afterward, since the merge
  usually happens later, outside that command's run. `/sync-board`
  reconciles the board against actual issue/PR state (closed issue or
  merged PR → Done) and is now called out in `CLAUDE.md` as something to
  run early in any session, plus noted in `docs/prds/README.md`'s
  workflow and at the bottom of `/implement-issue`.
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

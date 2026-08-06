---
description: Reconcile the GitHub Project board against actual issue/PR state
---

Merging a PR doesn't move its project board item to "Done" automatically —
GitHub closes the linked issue, but the board item is a separate thing that
has to be updated explicitly. This command exists because that step is easy
to forget once a PR is merged outside of `/implement-issue`'s own flow (e.g.
the user merges it later, in a different conversation).

Project is number 2, owner `ShahArpit89`.

1. List all board items: `gh project item-list 2 --owner ShahArpit89 --format json`.
2. For each item currently NOT already "Done":
   - If it's an Issue: check `gh issue view <number> --json state`. If
     `CLOSED`, it was closed by a merged PR (GitHub does this automatically
     for "Closes #N" PRs) — move it to Done.
   - If it's a PullRequest: check `gh pr view <number> --json state`. If
     `MERGED`, move it to Done.
3. Look up the Status field id and "Done" option id fresh each run via
   `gh project field-list 2 --owner ShahArpit89 --format json` rather than
   hardcoding them.
4. Report what changed. If everything was already in sync, say so briefly
   — don't report "no changes" as if it needed investigating.

Run this whenever picking a project back up (start of a session, or after
being told a PR was merged) rather than only when explicitly asked.

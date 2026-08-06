# PRDs

Product requirement docs for photo-store, one file per feature.

## Workflow

1. Copy `TEMPLATE.md` to `NNN-short-title.md`, where `NNN` is the next
   number in sequence.
2. Open a PR with the draft. Discussion and revisions happen as PR comments
   and follow-up commits, so history stays in `git log` / `git blame`.
3. Once approved and merged, create a tracking issue that links back to the
   PRD file, and add it to the [project board](../../../projects).
4. Update the PRD's `Status` field as it moves through its lifecycle.

## Numbering

Numbers are sequential and never reused, even if a PRD is abandoned.

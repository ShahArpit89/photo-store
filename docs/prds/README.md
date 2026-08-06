# PRDs

Product requirement docs for photo-store, one file per feature.

## Workflow

1. Copy `TEMPLATE.md` to `NNN-short-title.md`, where `NNN` is the next
   number in sequence.
2. Open a PR with the draft. Discussion and revisions happen as PR comments
   and follow-up commits, so history stays in `git log` / `git blame`.
3. Once approved and merged, break it into tracking issues (the "Feature"
   issue template) that link back to the PRD file, and add each to the
   [project board](../../../projects) as Ready.
4. Update the PRD's `Status` field as it moves through its lifecycle.

## Numbering

Numbers are sequential and never reused, even if a PRD is abandoned.

## Branch naming

- PRD drafts: `prd/NNN-short-title`, matching the PRD file's number, e.g.
  `prd/001-photo-catalog-and-detail-page`.
- Implementation work: `<issue-number>-short-slug`, e.g.
  `4-photo-detail-page`. Using the tracking issue's number keeps the
  branch, its PR, and the project board item traceable to each other at a
  glance.

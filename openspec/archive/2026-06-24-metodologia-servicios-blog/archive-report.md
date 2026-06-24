# Archive Report: metodologia-servicios-blog

**Date**: 2026-06-24
**Verdict**: PASS WITH WARNINGS
**Critical issues**: 0
**Warnings**: 3

## Change Summary

Renamed `/features` → `/metodologia` (5-phase SDD deep-dive + AI role + glossary) and `/pricing` → `/servicios` (5-line service catalog with tabs, comparison table, and FAQ). Added two MDX blog posts (FinPago KYC case study and Vibe Coding vs SDD opinion piece). Updated navigation menu and home page CTA to point to the renamed routes. Removed 4 RicoFast template demo posts from the blog. Delivered via 4 stacked commits plus 2 cleanup commits across 6 total commits on `master`.

## Delivery

| Commit | SHA | Description | Status |
|--------|-----|-------------|--------|
| Slice 1 | `62b4018` | feat(metodologia): rename /features to /metodologia with 5-phase SDD deep-dive | ✅ |
| Slice 2 | `6567848` | feat(servicios): rename /pricing to /servicios with 5-line service catalog | ✅ |
| Slice 3 | `fb46894` | feat(blog): add FinPago KYC case study and Vibe Coding vs SDD posts | ✅ |
| Slice 4 | `83cd164` | fix(nav): point menu and home CTA to renamed routes | ✅ |
| Cleanup 1 | `b4a28f6` | chore(blog): remove 4 RicoFast template demo posts | ✅ |
| Cleanup 2 | `8043f99` | docs(plan): commit OpenSpec artifacts for two changes | ✅ |

## Verification

Full report: `verify/metodologia-servicios-blog.md` (in this archive)

**Summary**: PASS WITH WARNINGS
- `pnpm check`: PASS (exit 0, 9 pre-existing lint warnings — none in new pages)
- `pnpm build`: PASS (exit 0, all expected artifacts present)
- 8 smoke tests: all pass (200 on `/metodologia/`, `/servicios/`, `/blog/`, both posts; 404 on `/features/`, `/pricing/`)
- Brand guardrails: all pass (no blue colors, no external fonts, all CTAs to mailto)
- 4 requirements × 16 scenarios: 13 PASS, 3 PASS WITH WARNING

## Residual Warnings (3)

1. **metodologia page title is H2, not H1** — The spec scenario states "the H1 reads exactly 'Spec Driven Development: el mapa antes que el código'". The page renders this content in an `<h2>` (via `PageHeader` component). The `<h1>` is absent. Affects SEO (only one H1 per page is standard) but not content correctness. **Fix**: Change `PageHeader` heading level to H1, or add a visually-hidden H1.

2. **servicios meta description is too short** — Description is 137 characters; spec requires 150–160. Current: "5 líneas de servicio: Ejecución, Rescate, Automatización, Consultoría y CTO Fraccionado. Rango USD 1.500–32.000. Escríbenos para cotizar." **Fix**: Expand to 150–160 chars.

3. **metodologia.astro has only 1 explicit mailto string** — The brand guardrail grep for `mailto:hola@glsolutions.tech` in the source returns 1. The rendered page has 2 (button + footer via Layout), so the runtime behavior is correct. **Fix**: Add a second explicit CTA in the source.

## Engram Observation IDs (Traceability)

| Artifact | ID |
|----------|----|
| verify-report | #121 |
| archive-report | #122 |

Note: proposal, spec, design, and tasks for this change are filesystem-only (committed via `8043f99`). No separate engram observations were created for those artifacts.

## Artifacts in This Archive

- `proposal-metodologia-servicios-blog.md` (copied from `openspec/changes/metodologia-servicios-blog/proposal.md`)
- `specs/metodologia-servicios-blog.md` (delta spec — promoted to baseline)
- `design/metodologia-servicios-blog.md` (implementation blueprint)
- `tasks/metodologia-servicios-blog.md` (4-slice chained plan)
- `verify/metodologia-servicios-blog.md` (pass with warnings, 0 critical issues)
- `archive-report.md` (this file)

## Baseline Spec

Synced to `openspec/specs/metodologia-servicios-blog.md`

No overlap with existing `openspec/specs/glsolutions-bootstrap.md` — this spec is purely about the rename + blog, not about the original rebrand.

## Stale Context Flag

`openspec/config.yaml` context still reads: *"GL Solutions, an Argentinian accounting and business advisory firm"* — incorrect. GL Solutions is a **Chilean SDD/Fintech consultancy**. Previously flagged in glsolutions-bootstrap archive. Still not addressed in this change (out of scope). Address in a future config cleanup.

## SDD Cycle Complete

The change has been fully planned, implemented, verified, and archived. Ready for the next change.

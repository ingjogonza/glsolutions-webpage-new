# Tasks: metodologia-servicios-blog

Each task is one commit on `master`. Chained delivery; review budget = 400 lines per commit. Total estimated changed lines: ~560. Plan: 4 commits (1 per slice), each < 200 lines.

## 1. Slice 1 — `metodologia.astro`

**File ops**
- Delete `src/pages/features.astro`
- Create `src/pages/metodologia.astro` (~210 lines)

**Content**
- 6 inline `featureModules` blocks (5 phases + IA role), alternating left/right, Lucide icons in orange.
- Glossary section with 4 terms (`<dl>` with `<dt>`/`<dd>`).
- Final CTA section pointing to `mailto:hola@glsolutions.tech`.
- Meta title + description per spec.

**Verify**
- `pnpm check` (format + lint)
- `pnpm build` (Astro will fail if frontmatter or route is broken)
- `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5300/metodologia` → 200
- `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5300/features` → 404

**Commit**
```
feat(metodologia): rename /features to /metodologia with 5-phase SDD deep-dive
```

**Estimated changed lines**: 210

---

## 2. Slice 2 — `servicios.astro`

**File ops**
- Delete `src/pages/pricing.astro`
- Create `src/pages/servicios.astro` (~230 lines)

**Content**
- Custom inline tabs (no library) for the 2 service groups.
- 5 service cards (3 + 2), each ending in `mailto:hola@glsolutions.tech`.
- Note under cards.
- Comparison table (5 rows × 5 columns).
- FAQ with 4 `AccordionItem`s.
- Final CTA section.
- Meta title + description per spec.

**Verify**
- `pnpm check`
- `pnpm build`
- `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5300/servicios` → 200
- `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5300/pricing` → 404
- Manual: click both tabs, confirm content swap.

**Commit**
```
feat(servicios): rename /pricing to /servicios with 5-line service catalog
```

**Estimated changed lines**: 230

---

## 3. Slice 3 — Two MDX blog posts

**File ops**
- Create `src/content/post/finpago-kyc-spec-driven-development/index.mdx` (~75 lines)
- Create `src/content/post/vibe-coding-vs-spec-driven-development/index.mdx` (~65 lines)

**Content**
- Exact frontmatter per spec.
- Body in Markdown; BDD code block as fenced `text` (not `js`).
- Tables in GitHub-flavored Markdown.
- No external images.

**Verify**
- `pnpm build` (Astro validates frontmatter against the `post` schema; any required field missing throws a build error)
- `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5300/blog/finpago-kyc-spec-driven-development` → 200
- `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5300/blog/vibe-coding-vs-spec-driven-development` → 200
- `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5300/blog` → 200, both posts in HTML

**Commit**
```
feat(blog): add FinPago KYC case study and Vibe Coding vs SDD posts
```

**Estimated changed lines**: 140

---

## 4. Slice 4 — Navigation + home link

**File ops**
- Edit `src/collections/menu.json` (2 URL changes)
- Edit `src/pages/index.astro` (1 link change)

**Verify**
- `rg -n "/features|/pricing" src/` → no matches (only this file may contain the strings)
- `pnpm build`
- `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5300/` → 200
- Manual: click "Servicios" in the header, confirm it lands on `/servicios` not `/pricing`.

**Commit**
```
fix(nav): point menu and home CTA to renamed routes
```

**Estimated changed lines**: 10

---

## Review Workload Forecast

- Slice 1: 210 lines (52% of 400 budget) ✓
- Slice 2: 230 lines (57% of 400 budget) ✓
- Slice 3: 140 lines (35% of 400 budget) ✓
- Slice 4: 10 lines (3% of 400 budget) ✓
- **Total**: ~590 lines across 4 commits, all under the 400-line single-PR budget.
- **Chained PRs recommended**: Yes (4 stacked commits, stacked-to-main per previous preflight).
- **400-line budget risk**: Low (each commit is under 60% of the budget).
- **Decision needed before apply**: No.
- The user already pre-approved chained delivery in the previous change.

## Sequencing Notes

- Slice 4 (navigation) must run AFTER Slices 1, 2, 3 — otherwise the menu and home link would point to nonexistent routes (404) for the duration of the deployment window.
- However, all 4 slices can be developed in any order; the only constraint is the merge order: 1 → 2 → 3 → 4.

## Out-of-band

- Do NOT commit `openspec/` (the glsolutions-bootstrap change artifacts are still untracked from the previous change; the user will decide separately whether to commit them).
- Do NOT push to `origin/master` until all 4 slices are green; pushes are atomic and partial pushes with broken links would expose 404s to live traffic.

# Tasks: glsolutions-bootstrap

> Bootstrap adaptation of ricoui-saas-template into GL Solutions corporate site. 4 chained slices stacked-to-main. Every slice ends with `pnpm build` and `pnpm check` passing.

## Review Workload Forecast

| Slice | Additions | Removals | Net diff | Risk | Why |
|-------|-----------|----------|----------|------|-----|
| Slice 1 — Foundation | ~150 | ~130 | ~280 | Low | Tokens + env + hardcoded fixes. Smallest slice. |
| Slice 2 — Atomic deletions | ~75 | ~1,500 | ~-1,425 | Medium | Mostly deletions; bulk is auth pages. Reviewer verifies "nothing we need got deleted." |
| Slice 3 — Home rewrite | ~320 | ~440 | ~760 | High | Largest content surface. 9 sections, all new copy. |
| Slice 4 — Secondary pages | ~230 | ~430 | ~660 | Medium | About + contact + 404. Shorter than home, new patterns. |
| **Total** | **~775** | **~2,500** | **~-1,725** | **High** | |

```text
Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High
chained_prs_recommended: yes
line_budget_risk: high
decision_needed_before_apply: yes
proposed_chain_strategy: stacked-to-main
proposed_slices: 4
rationale: 4 independent slices each produce a green build. Slices 2 and 3 are order-independent (both depend only on Slice 1). Slices 1 and 2 are pure foundation/deletion, Slice 3 is the home rewrite, Slice 4 completes secondary pages.
```

---

## Slice 1: Foundation — tokens + fonts + env + CTA fixes

**Goal**: Site is "rebranded" with orange palette, system fonts, GL identity, and no hardcoded blue in header/button/shimmer. Content sections still show template copy — that's intentional.

**Commit prefix**: `feat(tokens):`

**Dependency**: None (this is the base slice).

**Build after slice**: `pnpm build` + `pnpm check` MUST pass.

**Reviewer focus**: Token correctness (38 exact hex values match design), no blue in header/shimmer/button, env and config wired correctly.

### Files touched

| # | File | Action | Δ | Deps | Spec refs |
|---|------|--------|---|------|-----------|
| 1.1 | `src/styles/global.css` | REWRITE | +120/-100 | None | REQ-B1–B6, B9 |
| 1.2 | `src/config/site.js` | REWRITE | +15/-35 | None | REQ-A2–A5, I1–I2 |
| 1.3 | `.env` | CREATE from `.env.example` | +5 | None | REQ-A6, I3–I4 |
| 1.4 | `src/components/sections/Header.astro` | EDIT (6 hardcoded values) | +6/-6 | None | REQ-B7 |
| 1.5 | `src/components/ui/Button.astro` | EDIT (3 rgba values) | +3/-3 | None | REQ-B2 (implicit) |
| 1.6 | `src/pages/index.astro` | EDIT (1 shimmer line) | +1/-1 | None | REQ-B8 |

### Task detail

**1.1 — Rewrite `src/styles/global.css` @theme + html.dark**
- DELETE lines 2–3 (Google Fonts `@import`)
- Rewrite all 38 theme tokens per design Section 1 (brand, bg, text, neutral, fonts)
- Rewrite `html.dark` block per design Section 2 (5 overrides, orange-derived)
- Keep `.gradient-title`/`.gradient-title-light` (out of scope — purple kept)
- Keep `.container`, `.site-container`, `.inner-container`, `.prose`, `.font-brand`, scrollbar styles
- **Acceptance**: `rg -n '#1A6FBF|#2d6dc3|#0066ff' src/ --glob '!elements.astro' --glob '!features.astro' --glob '!content/post/**'` → 0 matches; `rg -n '@import url\("https://fonts.googleapis' src/` → 0 matches; `--color-primary` = `#E8530A`

**1.2 — Rewrite `src/config/site.js`**
- `title`: "GL Solutions", `author`: "Jorge González & Carlos Lameda"
- `url`: `import.meta.env.PUBLIC_SITE_URL`, `mail`: "hola@glsolutions.tech"
- `meta.title`: contains "Spec Driven Development" + "Chile" or "LatAm"
- `meta.description`: 150–160 chars referencing SDD + Chile/LatAm
- `meta.keywords`: per REQ-A4
- `social.twitter`: "", `social.github`: ""
- **Acceptance**: `rg -n 'Spec Driven Development' src/config/site.js` → match; `rg -n 'Chile|LatAm' src/config/site.js` → match; description length between 150–160

**1.3 — Create `.env` from `.env.example`**
- `PUBLIC_SITE_URL=https://www.glsolutions.tech`
- `PUBLIC_GA4_ID=`, `PUBLIC_UMAMI_ID=` left empty/commented
- **Acceptance**: `.env` exists with correct URL

**1.4 — Edit `Header.astro` hardcoded colors (6 spots)**
- Line 39: mobile toggle gradient + border (blue → orange)
- Line 40: mobile toggle box-shadow (blue → orange)
- Line 152: separator line bg-tint (blue → peach)
- Line 160: desktop toggle gradient + border (blue → orange)
- Line 161: desktop toggle box-shadow (blue → orange)
- Line 311: mobile dropdown `border-left` dashed (blue → orange)
- **Acceptance**: `rg -n '#85a6ff|#7fa1ff|#2d6dc3' src/components/sections/Header.astro` → 0 matches

**1.5 — Edit `Button.astro` hardcoded rgba (3 spots)**
- Line 51: solid hover shadow rgba → orange
- Line 53: fill hover shadow rgba → orange; fill dark shadow rgba → orange-lift
- **Acceptance**: `rg -n 'rgba\(61,99,171|rgba\(59,123,217' src/components/ui/Button.astro` → 0 matches

**1.6 — Edit `index.astro` shimmer rgba (1 line)**
- Line 397: `rgba(45, 109, 195, 0.18) 50%` → `rgba(232, 83, 10, 0.20) 50%`
- **Acceptance**: `rg -n 'rgba\(45, 109, 195' src/pages/index.astro` → 0 matches

---

## Slice 2: Atomic deletions — auth, changelog, hero component

> **Status**: ✅ COMPLETE — applied 2026-06-23 (sdd-apply). 10 files deleted (1365 lines), 6 files edited. `pnpm build` ✅ (13 pages, "Complete!"), `pnpm check` ✅ (9 warnings, 0 errors). Slice 1 risk #2 (dead-GitHub Header CTA) absorbed. See Engram `sdd/glsolutions-bootstrap/apply-progress` for full evidence. NOTE: Task 2.9 (HeroSection delete) required a build-safety surgical removal of the `HeroSection` import + `<HeroSection/>` usage from `src/pages/index.astro` (the home is now hero-less until Slice 3 inlines a new GL hero — by design).

**Goal**: All template cruft removed atomically — 9 file deletions + 4 file edits. Build stays green after every change.

**Commit prefix**: `chore(cleanup):`

**Dependency**: Slice 1 (ensures brand tokens exist before deletion — not strictly required but preferred order).

**Build after slice**: `pnpm build` + `pnpm check` MUST pass.

**Reviewer focus**: "Is anything we still need being deleted?" — verify against kept-routes list. The 4 auth pages and changelog are pure template artefacts. Menu/footer/about references to them must be removed before or in the same commit.

### Execution order (build-stays-green)

1. **First**: EDIT `src/content.config.js` (remove changelog collection) + DELETE `src/content/changelog/*.mdx` (4 files)
2. **Then**: DELETE `src/pages/changelog.astro` + DELETE 4 auth pages (`sign-in.astro`, `sign-up.astro`, `signin.astro`, `signup.astro`) + DELETE `src/components/home/HeroSection.astro`
3. **Then**: REWRITE `src/collections/menu.json` + REWRITE `src/components/sections/Footer.astro` + EDIT `src/pages/about.astro` (line 133–134 remove "View Changelog" button)
4. **Final**: `pnpm build` + `pnpm check`

### Files touched

| # | File | Action | Δ | Deps | Spec refs |
|---|------|--------|---|------|-----------|
| 2.1 | `src/content.config.js` | EDIT (remove collection) | -12 | None | REQ-G4 |
| 2.2 | `src/content/changelog/v0.1.0-initial-preview.mdx` | DELETE | -30 | 2.1 first | REQ-G5 |
| 2.3 | `src/content/changelog/v0.2.0-design-polish.mdx` | DELETE | -30 | 2.1 first | REQ-G5 |
| 2.4 | `src/content/changelog/v0.3.0-content-system.mdx` | DELETE | -30 | 2.1 first | REQ-G5 |
| 2.5 | `src/content/changelog/v1.0.0-stable-release.mdx` | DELETE | -30 | 2.1 first | REQ-G5 |
| 2.6 | `src/pages/changelog.astro` | DELETE | -80 | 2.2–2.5 | REQ-G3 |
| 2.7 | `src/pages/sign-in.astro` | DELETE | -171 | None | REQ-G1–G2 |
| 2.8 | `src/pages/sign-up.astro` | DELETE | -189 | None | REQ-G1–G2 |
| 2.9 | `src/pages/signin.astro` | DELETE | -215 | None | REQ-G1–G2 |
| 2.10 | `src/pages/signup.astro` | DELETE | -271 | None | REQ-G1–G2 |
| 2.11 | `src/components/home/HeroSection.astro` | DELETE | -276 | None (replaced inline in Slice 3) | REQ-C9 |
| 2.12 | `src/collections/menu.json` | REWRITE | +12/-27 | 2.6–2.10 | REQ-H1–H3 |
| 2.13 | `src/components/sections/Footer.astro` | REWRITE | +60/-172 | 2.6–2.10 | REQ-G7 |
| 2.14 | `src/pages/about.astro` | EDIT (line 133–134) | +2/-2 | 2.6 | REQ-G8 |

### Verification commands

```bash
# G6 — menu clean
Select-String -Path "src/collections/menu.json" -Pattern "Changelog|Sign in|Sign up"
# Expected: 0 matches

# G7 — footer clean
Select-String -Path "src/components/sections/Footer.astro" -Pattern "Changelog|Sign in|Sign up|/changelog|/sign-in|/sign-up"
# Expected: 0 matches

# G8 — about clean
Select-String -Path "src/pages/about.astro" -Pattern "View Changelog|/changelog"
# Expected: 0 matches (this will be re-added in Slice 4 rewrite, which is fine)

# G9 — build passes
pnpm build
```

---

## Slice 3: Home rewrite

**Goal**: `src/pages/index.astro` fully rewritten with 9 GL sections (hero, problema, solución, evidencia, proceso 5 fases, para quién, servicios teaser, CTA final). 3 leftover template sections removed.

**Commit prefix**: `feat(home):`

**Dependency**: Slice 1 (tokens exist). Order-independent of Slice 2.

**Build after slice**: `pnpm build` + `pnpm check` MUST pass.

**Reviewer focus**: Copy correctness per spec group C (all REQ-C1–C9). Section order, CTA wiring, "Proceso 5 fases" inline section.

### Files touched

| # | File | Action | Δ | Deps | Spec refs |
|---|------|--------|---|------|-----------|
| 3.1 | `src/pages/index.astro` | REWRITE | +320/-440 | Slice 1 | REQ-C1–C9, A1–A3 |

### Task detail

**3.1 — Rewrite `src/pages/index.astro`**
- Remove imports: `HeroSection`, `BrowserFrame`, `Pricing`, `FAQ`, `TechStackCard` (replaced by inline sections)
- Keep imports: `Layout`, `Button`, `Badge`, `SectionHeader`, `siteConfig`, Lucide icons
- 9 sections in order:
  1. **Hero** (badge + H1 with SDD + Chile + subtitle + 2 CTAs: mailto + #evidencia anchor + 3 stats)
  2. **Problema** (H2 per REQ-C2 + 5 bullets + closing paragraph)
  3. **Solución** (H2 per REQ-C3 + "Sin mapa previo" vs "Con SDD" comparison + 3 cards)
  4. **Evidencia** (H2 + BDD code block + link to `/blog/finpago-kyc-spec-driven-development`)
  5. **Proceso 5 fases** (inline — NEW section: 5 numbered steps with duration + quality gate badge)
  6. **Para quién** (3 personas: Founder técnico, Founder de negocio, Operaciones)
  7. **Servicios teaser** (5 lines: Ejecución, Rescate, Consultoría, CTO Fraccionado, Automatización + CTA to `/pricing`)
  8. **CTA final** (dark bg `#0F1F2E`, H2, mailto CTA)
- REMOVE: Logo/Social Proof section, Features Grid section, Product Preview (per REQ-C9)
- Shimmer rgba already fixed in Slice 1.6
- **Acceptance**: `rg -n 'Spec Driven Development' src/pages/index.astro` → H1 match; `rg -n 'Chile|LatAm' src/pages/index.astro` → match; `pnpm build` passes

---

## Slice 4: Secondary pages — about, contact, 404, menu, footer

**Goal**: Complete site matches spec. About + contact + 404 rewritten with GL copy. Menu and footer already clean from Slice 2; verify final polish.

**Commit prefix**: `feat(pages):`

**Dependency**: Slice 1 (tokens). Slice 2 (menu/footer clean of dead links). Independent of Slice 3.

**Build after slice**: `pnpm build` + `pnpm check` MUST pass. Manual browser review needed.

**Reviewer focus**: Copy accuracy for about (founders, mission, no invented claims), contact (no form, 4 steps, mailto), 404 (Spanish, GL brand, no US competitor mention).

### Files touched

| # | File | Action | Δ | Deps | Spec refs |
|---|------|--------|---|------|-----------|
| 4.1 | `src/pages/about.astro` | REWRITE | +110/-135 | Slice 1 | REQ-D1–D7 |
| 4.2 | `src/pages/contact.astro` | REWRITE | +80/-260 | Slice 1 | REQ-E1–E6 |
| 4.3 | `src/pages/404.astro` | REWRITE | +40/-45 | Slice 1 | REQ-F1–F3 |

### Task detail

**4.1 — Rewrite `src/pages/about.astro`**
- Founders block: Jorge González (Senior DBA, Data Architect, banca y automotriz) + Carlos Lameda
- 15+ years combined experience
- Founded in 2026
- HQ: Santiago, Chile + LatAm operations
- Mission per REQ-D6
- No fabricated clients/awards/numbers
- Remove "View Changelog" button (already removed in Slice 2.14; verify stays removed)
- **Acceptance**: `rg -n 'View Changelog|/changelog' src/pages/about.astro` → 0 matches; `rg -n 'Jorge González' src/pages/about.astro` → match; `rg -n '2026' src/pages/about.astro` → match

**4.2 — Rewrite `src/pages/contact.astro`**
- Remove all form elements (no `<form>`, no `<input type="submit">`)
- H1: "Hablemos de tu proyecto"
- 4 numbered steps per user prompt (REQ-E4)
- Single mailto CTA: `mailto:hola@glsolutions.tech`
- Static notice explaining form replaced by direct email
- **Acceptance**: `rg -n '<form|<input type="submit"|calendly|newsletter' src/pages/contact.astro` → 0 matches; `rg -n 'Hablemos de tu proyecto' src/pages/contact.astro` → match

**4.3 — Rewrite `src/pages/404.astro`**
- Chilean Spanish, GL brand tone
- Link to `/` per REQ-F2
- No "glsolutions.com" or "GL Solutions Inc" mentions
- **Acceptance**: `rg -n 'glsolutions\.com|GL Solutions Inc' src/pages/404.astro` → 0 matches

---

## Cross-slice constraints

1. **Every slice MUST end with `pnpm build` and `pnpm check` passing.** No exceptions.
2. **No slice depends on a later slice.** Dependency graph:
   - Slice 1 (Foundation) → Slice 2 (Deletions), Slice 3 (Home), Slice 4 (Secondary)
   - Slices 2 and 3 are order-independent (both depend only on Slice 1)
   - Slice 4 depends only on Slice 1
3. **Slice 1 must merge before any later slice starts.** The token/font/env changes are the base for everything else.
4. **Slices 2, 3, 4 can be reviewed/merged in any order after Slice 1.**
5. **No source files modified outside the listed files per slice.** No scope creep.
6. **`features.astro`, `pricing.astro`, `blog/*.astro`, `elements.astro`** — not touched in any slice (deferred to Prompt 2).
7. **Strict TDD is OFF** — verification is `pnpm build` + `pnpm check` + targeted grep checks listed per slice.

---

## Risks and mitigations

| # | Risk | Impact | Mitigation |
|---|------|--------|------------|
| R1 | **Slice 2 size (~1,600 total churn)** | Reviewer overwhelmed by deletion volume | Most lines are auth page deletions (−846). One `git diff --stat` confirms intent. Commit message explicitly lists 9 deletions + 4 edits. |
| R2 | **Header.astro inline gradient edits — 6 spots** | Easy to miss one hardcoded blue | Run the B7 grep after Slice 1 (rg for `#85a6ff|#7fa1ff|#2d6dc3` in Header.astro). Fix before opening PR. |
| R3 | **Astro version mismatch (5.15 vs 6.4.2)** | `getCollection` API may differ | Run `pnpm build` as first step of Slice 1. If content.config.js `changelog` removal fails due to API change, adjust syntax. |
| R4 | **`.env` not git-tracked** | Slice 1 env changes invisible in PR | Add `.env` to `.gitignore` if not already; verify in Slice 1. |
| R5 | **about.astro line 133 changelog button handled twice** | Duplicate work: Slice 2 edits it, Slice 4 rewrites it | Slice 2 removes the button line (small edit). Slice 4 rewrites the whole file — the button is naturally gone. No conflict. |
| R6 | **Slice 3 home rewrite overlaps with HeroSection.astro deletion** | index.astro imports HeroSection which is deleted in Slice 2 | If Slice 3 runs before Slice 2, the old import will break. Solution: Slice 3 rewrites index.astro completely, so no import of HeroSection remains. Safe regardless of order. But Slice 2 should merge first for cleanliness. |
| R7 | **Purple `.gradient-title` in global.css** | Visual inconsistency (purple on orange site) | Accepted per design: dormant — not used in any new page copy. Deferred to Prompt 2. |

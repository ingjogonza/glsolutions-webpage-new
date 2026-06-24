# Design: glsolutions-bootstrap

> Implementation blueprint for the GL Solutions website adaptation. Resolves every token, every deletion, every hardcoded value the proposal and spec left open. Designed to be executed by `sdd-apply` without re-derivation.

## Executive Summary

Five load-bearing decisions, in priority order:

1. **Color palette is orange family** (primary `#E8530A` family, peach accents, grey text `#3A3A3A`). All blue values are killed — including the dark-mode overrides.
2. **System font stack only.** No Google Fonts. Both `--font-brand` and `--font-sans` resolve to the same stack.
3. **Headings are grey, not orange.** `--color-text-primary` → `#3A3A3A`. Orange is reserved for CTAs, links, badges, accent strokes.
4. **Changelog and auth pages are deleted as one atomic block**, before any page rewrite, to keep the build green throughout.
5. **"Proceso 5 fases" is inlined in `index.astro`.** It does NOT extract a reusable `Proceso.astro` — the data shape is too different from the about-page timeline. Ponytail wins.

---

## 1. Token Mapping (complete, by group)

> All values are exact hex. Light/dark pairs are committed. No approximation.
> The numbering matches `src/styles/global.css` lines 13–72.

### Brand (Primary + Accent)

| # | Token | Current | New | Rationale |
|---|---|---|---|---|
| 1 | `--color-primary` | `#2d6dc3` | `#E8530A` | Brand orange, GL identity |
| 2 | `--color-primary-rgb` | `45, 109, 195` | `232, 83, 10` | RGB tuple for `rgba()` use |
| 3 | `--color-primary-strong` | `#0066ff` | `#C74400` | Hover/pressed state — darker than primary |
| 4 | `--color-primary-dark` | `#2d6dc3` | `#C74400` | Same as strong; dark-mode default for primary surfaces |
| 5 | `--color-primary-light` | `#8fb9ff` | `#FF8C42` | Lighter orange — light tints, soft hovers |
| 6 | `--color-primary-light-dark` | `#bcd8ff` | `#FFB892` | Dark-mode counterpart to light; peach for badges on dark canvas |
| 7 | `--color-primary-lighter` | `#6da7ff` | `#FFA37A` | Lightest tinted orange (badges, soft borders) |
| 8 | `--color-primary-bg` | `var(--color-bg-primary-light)` | `var(--color-bg-primary-light)` | Unchanged — derived reference |
| 9 | `--color-primary-bg-light` | `var(--color-bg-secondary)` | `var(--color-bg-secondary)` | Unchanged — derived reference |
| 10 | `--color-accent` | `#fad13b` (gold) | `#F8B996` | Peach derived from primary (HSL 20, 90%, 78%) — replaces gold entirely |
| 11 | `--color-accent-light` | `#faeb75` | `#FCE4D5` | Light peach for backgrounds, soft callouts |
| 12 | `--color-btn-primary` | `#2d6dc3` | `#E8530A` | Maps to primary (Button.astro fill bg) |
| 13 | `--color-btn-primary-hover` | `#0066ff` | `#C74400` | Maps to primary-strong (hover state) |
| 14 | `--color-btn-primary-dark` | `#2871e9` | `#FF8C42` | Dark-mode button fill (lifted for legibility on `#0F1F2E`) |
| 15 | `--color-btn-primary-dark-hover` | `#2d6dc3` | `#FFA37A` | Dark-mode button hover (lighter for contrast on dark canvas) |

### Backgrounds

| # | Token | Current | New | Rationale |
|---|---|---|---|---|
| 16 | `--color-bg-primary` | `#fdfaf5` (warm white) | `#FAFAFA` | Spec rule: light bg = `#FAFAFA` |
| 17 | `--color-bg-secondary` | `#fff` | `#FFFFFF` | Pure white panels (unchanged) |
| 18 | `--color-bg-primary-light` | `#faf9f5` | `#F5F5F5` | Subtle section divider, slightly darker than primary |
| 19 | `--color-bg-primary-deep` | `#fefcf4` | `#FFFFFF` | Reserved for deepest white panels; same as secondary |
| 20 | `--color-bg-primary-dark` | `#0b1220` | `#0F1F2E` | Spec rule: dark bg = `#0F1F2E` |
| 21 | `--color-bg-secondary-dark` | `#0f1b2d` | `#0A1521` | Slightly darker than primary-dark for layered dark panels |

### Text

| # | Token | Current | New | Rationale |
|---|---|---|---|---|
| 22 | `--color-text-primary` | `#2d6dc3` (blue!) | `#3A3A3A` | **Decision**: headings + h1–h3 use grey, not orange. Orange reserved for CTAs |
| 23 | `--color-text-secondary` | `#3f4a5a` | `#3A3A3A` | Body text — spec rule, grey |
| 24 | `--color-text-tertiary` | `#7a6550` (warm brown) | `#6B6B6B` | Subdued captions/metadata — neutral grey, no warm brown |
| 25 | `--color-text-primary-dark` | `#3884eb` | `#FF8C42` | Dark-mode heading color — orange-family, lifted for dark contrast |
| 26 | `--color-text-secondary-dark` | `#c5cedb` | `#E5E5E5` | Dark-mode body text — light grey, not blue-tinted |
| 27 | `--color-text-tertiary-dark` | `#9bb3d7` | `#A8A8A8` | Dark-mode subdued text — neutral grey |

### Neutral scale (11 steps)

Re-anchored to a warm-neutral grey that pairs with `#3A3A3A` body. Hue stays neutral; the scale covers 50 (lightest) to 950 (darkest) for utility classes (`bg-neutral-100`, `text-neutral-700`, `border-neutral-200`, etc.).

| # | Token | Current | New |
|---|---|---|---|
| 28 | `--color-neutral-50` | `#f7f9fc` | `#FAFAFA` |
| 29 | `--color-neutral-100` | `#edf1f8` | `#F0F0F0` |
| 30 | `--color-neutral-200` | `#dfe4ed` | `#E0E0E0` |
| 31 | `--color-neutral-300` | `#c5cedb` | `#C5C5C5` |
| 32 | `--color-neutral-400` | `#92a1b7` | `#9A9A9A` |
| 33 | `--color-neutral-500` | `#677487` | `#6B6B6B` |
| 34 | `--color-neutral-600` | `#4f5a6d` | `#4F4F4F` |
| 35 | `--color-neutral-700` | `#3f4a5a` | `#3A3A3A` (same as body) |
| 36 | `--color-neutral-800` | `#2c3542` | `#2E2E2E` |
| 37 | `--color-neutral-900` | `#19222f` | `#1A1A1A` |
| 38 | `--color-neutral-950` | `#10161f` | `#0A0A0A` |

### Fonts

| # | Token | Current | New | Rationale |
|---|---|---|---|---|
| 39 | `--font-brand` | `"Instrument Serif", ...` | `-apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif` | System stack — drops Instrument Serif |
| 40 | `--font-sans` | `"Inter", ...` | `-apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif` | System stack — drops Inter |
| 41 | `--font-body` | `"Inter", ...` | `-apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif` | Same stack as sans (body and brand now share) |
| 42 | `--max-screen` | `1200px` | `1200px` | Unchanged |
| 43 | `--inner-screen` | `800px` | `800px` | Unchanged |

> **Note**: Tailwind v4 `@theme` token values that include commas must be wrapped in the full quoted string. The quoted form above is the safe variant; verify Tailwind v4 strips quotes correctly at build.

### Google Fonts @import (lines 2–3)

DELETE both lines. They will not be re-added. Verified no other font-loading exists (Layout.astro, Meta.astro, base.astro — only TrackGa has no font, no `<link>` tag anywhere).

---

## 2. Dark Mode Color Derivation

`html.dark` block in `global.css` lines 75–81. The five overrides:

| Token | Current (blue) | New | Derivation (one line) |
|---|---|---|---|
| `--color-primary-rgb` | `56, 132, 235` | `232, 83, 10` | Same as light primary — `--color-primary-rgb` does not need to change in dark mode; the rgba() usages are overlay tints that look right on either canvas |
| `--color-primary-light-dark` | `#3884eb` | `#FFB892` | Same hue (orange) as primary, lifted to ~75% lightness to read on `#0F1F2E` |
| `--color-primary-lighter` | `#8fb9ff` | `#FFA37A` | Lightest orange tint for dark mode — light enough to read but not glaring |
| `--color-primary-bg` | `rgba(56, 132, 235, 0.15)` | `rgba(232, 83, 10, 0.18)` | Translucent orange tint for dark-mode primary backgrounds (raised opacity because dark canvas eats saturation) |
| `--color-primary-bg-light` | `rgba(56, 132, 235, 0.05)` | `rgba(232, 83, 10, 0.08)` | Faint orange wash for dark-mode "primary" low-emphasis surfaces |

**All other dark-mode colors are handled in tokens 25–27 above** (the `--color-text-*-dark` family) and the `--color-bg-*-dark` family (tokens 20–21). No additional dark-mode overrides needed.

---

## 3. Deletion Order (atomic, build-stays-green)

The goal: every step ends with `pnpm build` exit 0. There are two distinct hazards:

- **Hazard A**: removing the `changelog` collection while `changelog.astro` still calls `getCollection("changelog")` → build error.
- **Hazard B**: removing pages while `menu.json` / `Footer.astro` / `about.astro` still link to them → 404s (build OK, but bad UX and failed spec REQs G6, G7, G8).

**Step ordering** (minimum steps required; cannot be safely condensed):

1. **Edit `src/content.config.js` AND `src/collections/menu.json` AND `src/components/sections/Footer.astro` AND `src/pages/about.astro` in one commit.** Removes the `changelog` collection (line 25-33 of content.config.js), drops the export reference, flattens the menu to remove Changelog/Sign in/Sign up, rewrites the footer link groups, and replaces the `<Button url="/changelog">View Changelog</Button>` in about.astro with a GL CTA. **Then delete the page file `src/pages/changelog.astro` AND the 4 mdx files in `src/content/changelog/` AND the 4 auth page files.** Because all 4 reference sources (menu, footer, about, content.config) were updated in the same commit, no path goes 404. The blog `.mdx` files in `src/content/post/` are untouched; they are not in the deletion path.

   > 6 file changes + 9 file deletions = **one commit, build green, atomic per REQ-G1–G9**.

2. **(Optional condense): the 4 auth page files can be deleted first, in a separate commit, with no edit needed to anything else.** They are dead ends — `sign-in.astro` and `sign-up.astro` cross-link to each other; `signin.astro` and `signup.astro` cross-link to each other. None of the in-scope files import them. But splitting them out gives a smaller reviewable commit (≈860 lines of pure deletion). **Ponytail recommendation: include the 4 auth files in Step 1's commit. The user has already seen the 6 references in menu/footer/about/content.config; adding 4 more deletions of unused files in the same commit is cleaner than two PRs.**

3. **No third step needed.** The rest of the change is rewrites (not deletions), and they are independent of the deletion block.

**Single atomic commit** for the deletion phase covers: 6 file edits + 9 file deletes. The post-deletion tree has no `/changelog`, no `/sign-in`, no `/sign-up`, no `/signin`, no `/signup`, no `changelog` collection, no broken links.

---

## 4. Component Reuse for "Proceso 5 fases" (REQ-C5)

**Decision: INLINE in `src/pages/index.astro`. Do NOT extract a `Proceso.astro` component.**

The about-page timeline pattern (about.astro lines 99–117) has a 4-item list with `{ version, date, title, desc }`. The new Proceso section has a 5-item list with `{ number, duration, title, desc, qualityGate }` — different shape, different visual markers, different copy context.

A reusable component would need 6+ optional props to handle both shapes, which is exactly the "interface with one implementation" anti-pattern Ponytail guards against. About's timeline and home's Proceso do not co-evolve — they live in different files and serve different narratives.

**Implementation approach for the inline section:**

- Pattern after the about-page timeline visual (vertical line + numbered dot), not the data shape.
- Use a `<ol>` with relative-positioned dots (`absolute left-X top-Y w-3 h-3 rounded-full bg-primary`).
- Add a `01`–`05` monospace number above each step title (use `--font-brand` for the numeral).
- Each step is a `<li>` with: number, title (h3), duration (small caps text), description (p), and a "Puerta de calidad" badge.
- 5 hand-written items; no loop over an array (each step is bespoke copy per user prompt).

**Risk acknowledged**: if Prompt 2 wants a 6th "Proceso" elsewhere, the copy can be re-extracted then. Speculative reuse is not a reason to abstract now.

---

## 5. Hardcoded Values to Fix

Three files have hardcoded values that won't auto-pick-up the new tokens. Spec B2/B7/B8 call out the critical ones; this section is exhaustive.

### `src/components/sections/Header.astro` (4 hardcoded spots, B7)

| Line | Old | New | Why |
|---|---|---|---|
| 39 | `bg-[#7fa1ff] bg-gradient-to-b from-[#85a6ff] to-[#2d6dc3] border-[0.5px] border-[#7fa1ff]` | `bg-[#FFA37A] bg-gradient-to-b from-[#FFB892] to-[#E8530A] border-[0.5px] border-[#FFA37A]` | Mobile dark-toggle inner circle: orange gradient replaces blue gradient |
| 40 | `box-shadow: 0px 2px 3px 0 rgba(55,52,209,0.21);` | `box-shadow: 0px 2px 3px 0 rgba(232,83,10,0.25);` | Mobile toggle shadow: orange-shadow on primary lift |
| 160 | `bg-gradient-to-b from-[#85a6ff] to-[#2d6dc3] border-[0.5px] border-[#7fa1ff]` | `bg-gradient-to-b from-[#FFB892] to-[#E8530A] border-[0.5px] border-[#FFA37A]` | Desktop dark-toggle inner circle: same orange gradient |
| 161 | `box-shadow: 0px 2px 3px 0 rgba(55,52,209,0.21);` | `box-shadow: 0px 2px 3px 0 rgba(232,83,10,0.25);` | Desktop toggle shadow: matches mobile |
| 152 | `bg-[rgba(183,202,255,0.5)]` | `bg-[rgba(255,184,146,0.4)]` | Separator line before dark toggle: was blue tint, becomes peach tint |
| 311 | `border-left: 1px dashed rgba(45, 109, 195, 0.3);` | `border-left: 1px dashed rgba(232, 83, 10, 0.3);` | Mobile dropdown panel left border: was blue, becomes primary orange |

> Spec B7 grep target is `#2d6dc3`, `#85a6ff`, `#7fa1ff`. All 4 occurrences in Header.astro are eliminated.

### `src/pages/index.astro` (1 hardcoded rgba, B8)

| Line | Old | New | Why |
|---|---|---|---|
| 397 | `rgba(45, 109, 195, 0.18) 50%` | `rgba(232, 83, 10, 0.20) 50%` | Shimmer gradient sweep on app-stat-card: blue mid-stop becomes orange. Slightly higher opacity (0.20 vs 0.18) to compensate for orange's lower perceptual brightness against the dark/grey card surface |

### `src/styles/global.css` (2 hardcoded gradient classes, OUT OF B2 SCOPE)

| Line | Old | New | Why |
|---|---|---|---|
| 116 | `background: linear-gradient(to right, #746aff, #0b046d);` | **KEEP** | `gradient-title` is a purple text gradient; spec flagged this is OUT of B2 scope. KEEP, document as known visual inconsistency, do NOT add to this session's scope |
| 122 | `background: linear-gradient(to right, #bcb7ff, #746aff);` | **KEEP** | Same as above for `gradient-title-light` |

> Note: `gradient-title` is not used in the new home/about/contact/404 copy, so the visual inconsistency is dormant. If Prompt 2 surfaces it, fix then.

### `src/components/ui/Button.astro` (3 hardcoded rgba — NOT in B2 spec grep, flag for transparency)

| Line | Old | New | Why |
|---|---|---|---|
| 51 | `hover:shadow-[0px_6px_9px_0_rgba(61,99,171,0.15)]` (solid hover) | `hover:shadow-[0px_6px_9px_0_rgba(232,83,10,0.18)]` | Solid button hover shadow: was blue, becomes orange. Same color family as the button |
| 53 | `hover:shadow-[0px_6px_9px_0_rgba(61,99,171,0.15)]` (fill hover) | `hover:shadow-[0px_6px_9px_0_rgba(232,83,10,0.18)]` | Fill button hover shadow: same change |
| 53 | `dark:shadow-[0px_6x_9px_0_rgba(59,123,217,0.25)]` (fill dark) | `dark:shadow-[0px_6px_9px_0_rgba(255,140,66,0.30)]` | Dark-mode fill button shadow: lift color to `--color-primary-light` `#FF8C42` and bump opacity to read on dark canvas |

> The spec B2 grep is narrow (`#1A6FBF`, `#2d6dc3`, `#0066ff`). `rgba(61,99,171,0.15)` is `#3D63AB`, which slips past. Updating it here is correct-on-principle (no other blue should remain in the surface) but is not strictly required by REQ. **Decision: fix in same commit as Header.astro (low cost, high cohesion).**

### Other hardcoded blues (FLAG, defer, do not fix in this session)

These are explicitly out of B2 scope per the proposal and the spec:

- `src/pages/elements.astro` lines 19, 20, 48 — color palette display, internal reference page, will show stale blue names until Prompt 2.
- `src/pages/features.astro` lines 198, 199, 206 — color swatch demo block, deferred to Prompt 2.
- `src/content/post/*.mdx` — 3 blog posts have `--color-primary: #2d6dc3;` in code blocks; content rendering, deferred.
- `src/components/widgets/ToTop.astro` lines 16, 32 — CSS fallbacks inside `var(--color-primary, #2d6dc3)`. These are fallbacks; they never render because the token is always defined. Not a violation. Leave as-is.

---

## 6. File-by-file Implementation Plan

Actions: `REWRITE` = full content replace, `EDIT` = targeted change, `DELETE` = remove file, `CREATE` = new file.

| File | Action | Approach | Δ lines |
|---|---|---|---|
| `src/styles/global.css` | REWRITE | All `@theme` tokens per Section 1; `html.dark` per Section 2; remove lines 2–3 Google Fonts; keep `.gradient-title`/`.gradient-title-light` per Section 5; keep `.container`, `.site-container`, `.inner-container`, `.prose`, `.font-brand`; keep scrollbar styles; `h1,h2,h3` color rule changes to `var(--color-text-primary)` (now grey) | ~120 |
| `src/content.config.js` | EDIT | Remove `changelog` collection (lines 25–33); remove `changelog` from `collections` export | −10 |
| `src/collections/menu.json` | REWRITE | Flat 6-item menu (Inicio, Metodología, Servicios, Blog, Sobre nosotros, Contacto). Per REQ-H1, no `children` | +6 |
| `src/config/site.js` | REWRITE | New identity, meta.title with SDD + Chile, 150–160 char description, keywords, empty social.twitter / social.github, author "Jorge González & Carlos Lameda", url `https://www.glsolutions.tech`, mail `hola@glsolutions.tech` | +12 |
| `.env` | CREATE | Copy `.env.example`; set `PUBLIC_SITE_URL=https://www.glsolutions.tech`; leave `PUBLIC_GA4_ID` and `PUBLIC_UMAMI_ID` commented | +5 |
| `src/pages/index.astro` | REWRITE | Drop in `HeroSection.astro` usage, replace with inline hero (badge + h1 + subtitle + 2 CTAs + 3 stats). 8 sections + 1 new "Proceso 5 fases" inline section. Remove `BrowserFrame`/dashboard mock (REQ-C9). Final CTA uses `bg-bg-primary-dark` and mailto. Shimmer rgba fixed per Section 5. | ~300 |
| `src/pages/about.astro` | REWRITE | Founders' block (Jorge + Carlos, 15+ años, banca y automotriz), 2026 founding, Santiago/LatAm, mission per REQ-D6. Drop "View Changelog" button (line 133); replace with GL CTA. Drop "Why we built it" SaaS template copy. | ~120 |
| `src/pages/contact.astro` | REWRITE | Remove form entirely (lines 115–179, 224–244); replace with 4 numbered steps per user prompt + single mailto CTA `mailto:hola@glsolutions.tech`; static notice that form is intentionally replaced by direct email | ~80 |
| `src/pages/404.astro` | REWRITE | Spanish, GL brand tone, link to `/` per REQ-F2 | ~40 |
| `src/components/sections/Header.astro` | EDIT | 4 hardcoded gradient/shadow fixes per Section 5 (lines 39, 40, 152, 160, 161, 311). Remove GitHub SVG CTA from both desktop (line 149) and mobile (line 140) — replace with mailto button or leave simple "Light/Dark" only. Drop menu rendering dependency on changelog/auth (handled by menu.json rewrite). | +25 |
| `src/components/sections/Footer.astro` | REWRITE | Drop 4-column structure. New footer: logo, brief, 3 column links (Servicios, Compañía, Contacto — none referencing removed pages), copyright + mailto, no GitHub/RSS/Twitter socials (per REQ-I2). Drop `templateVersion` badge. | −30 |
| `src/components/ui/Button.astro` | EDIT | 3 hardcoded rgba fixes per Section 5 (lines 51, 53) | +0 |
| `src/components/home/HeroSection.astro` | DELETE | Will not be used (home is inlining its own hero) | −276 |
| `src/pages/changelog.astro` | DELETE | Atomic with menu/footer/about/content.config + the 4 mdx | −80 |
| `src/content/changelog/v0.1.0-initial-preview.mdx` | DELETE | | −30 |
| `src/content/changelog/v0.2.0-design-polish.mdx` | DELETE | | −30 |
| `src/content/changelog/v0.3.0-content-system.mdx` | DELETE | | −30 |
| `src/content/changelog/v1.0.0-stable-release.mdx` | DELETE | | −30 |
| `src/pages/sign-in.astro` | DELETE | | −171 |
| `src/pages/sign-up.astro` | DELETE | | −189 |
| `src/pages/signin.astro` | DELETE | | −215 |
| `src/pages/signup.astro` | DELETE | | −271 |
| **Net total** | | | **≈ −700 net** (≈ 700 deletions, ≈ 700 additions) |

> **Review budget summary**: per-file Δ ranges from −271 (signup.astro) to +300 (index.astro). A single PR exceeds the 400-line review budget easily. **See Section 7 for slicing.**

---

## 7. Slicing Strategy (chained PRs vs single PR)

**Forecast**: estimated ~1400 lines of churn (700 deletions + 700 additions, summed across all files). 400-line budget risk: **HIGH**. Single PR is out.

**Decision: 4 chained PRs, stacked-to-main.**

Each slice is self-contained. `pnpm build` passes at every step. No slice leaves the build red.

### Slice 1 — `feat/design-foundation` (~300 lines, foundation)

- `src/styles/global.css` REWRITE (the entire token system)
- `src/components/ui/Button.astro` EDIT (3 hardcoded rgba)
- `src/components/sections/Header.astro` EDIT (6 hardcoded values)
- `src/pages/index.astro` EDIT only line 397 shimmer rgba (1 line)
- `.env` CREATE
- `src/config/site.js` REWRITE

> **Why first**: nothing else can be reviewed against the new brand. After this PR, the site renders orange even though copy is still template copy. Foundation-only reviewers see only the token/font/CTA/header changes.

### Slice 2 — `chore/delete-deprecated-routes` (~900 lines, mostly deletions)

- `src/content.config.js` EDIT
- `src/collections/menu.json` REWRITE (flat 6)
- `src/components/sections/Footer.astro` REWRITE
- `src/pages/about.astro` EDIT only line 133 (remove changelog button)
- DELETE: 4 changelog mdx + `changelog.astro` + 4 auth pages
- DELETE: `src/components/home/HeroSection.astro` (replaced in Slice 3)
- `src/pages/elements.astro` no change (kept as internal reference, stale tokens documented)

> **Why second**: removes all template cruft atomically. After this PR, only the new menu, no dead links, no orphan collection. Footer and menu are template-final here; content rewrites in slices 3–4 keep the same nav structure.

> Note: this PR is large (≈900 lines), but the bulk is `-NNNN` deletions. The reviewer focus is "is anything we still need being deleted?" — fast to verify by checking the `dist/` output for missing routes. A single reviewer's mental load is low because the *intent* is one sentence: remove template scaffold.

### Slice 3 — `feat/home-rewrite` (~320 lines)

- `src/pages/index.astro` REWRITE (8 sections + new "Proceso 5 fases" inline)
- imports updated: drop `HeroSection`, `BrowserFrame`, `FAQ`, `Pricing` (or keep minimal `<Pricing>` if reused for "Servicios teaser" — see Section 5 note about services card)

> **Why third**: the home page is the biggest single content surface. Isolated review of home copy + section order + CTA wiring is cleanest as its own PR.

### Slice 4 — `feat/secondary-pages-rewrite` (~250 lines)

- `src/pages/about.astro` REWRITE (full content, founders, mission)
- `src/pages/contact.astro` REWRITE (drop form, 4 steps, mailto)
- `src/pages/404.astro` REWRITE (Spanish, GL brand)

> **Why fourth**: secondary pages are smaller and share the brand pattern from Slices 1–3. Reviewer can verify the brand is consistent across home and secondary surfaces.

### Chain strategy

**`stacked-to-main`** (each PR merges directly to main after passing review). Rationale:

- The slices do not have inter-dependencies that require a "feature branch chain" tracker.
- Slice 1 (foundation) does not break any feature work.
- Slices 2, 3, 4 each have green builds and add no risk to what came before.
- Rebase cost: low; each PR is small and conflicts only in `index.astro`/about.astro if reviewers comment.

If a reviewer blocks a later slice, the earlier merged slices still ship. `feature-branch-chain` adds rebase cost for marginal benefit at this slice count.

### Forecast lines

```text
Decision needed before apply: No (resolved in design)
Chained PRs recommended: Yes
400-line budget risk: High
Chain strategy: stacked-to-main
Slice count: 4
```

---

## 8. Verification Strategy

Strict TDD is OFF (per preflight). Verification relies on:

### After every slice (mandatory)

```bash
pnpm build       # astro check && astro build — type-check, content schema, route generation
pnpm check       # biome lint + format
```

### After every slice (targeted greps)

```bash
# B2 — no forbidden blue in public surface
rg -n '#1A6FBF|#2d6dc3|#0066ff' src/ \
  --glob '!src/pages/elements.astro' \
  --glob '!src/pages/features.astro' \
  --glob '!src/content/post/**'
# Expected: 0 matches after Slice 1

# B4 — no external font loaded
rg -n '@import url\("https://fonts.googleapis' src/
# Expected: 0 matches after Slice 1

# B8 — no hardcoded blue shimmer
rg -n 'rgba\(45, 109, 195' src/
# Expected: 0 matches after Slice 1

# B7 — no hardcoded blue in header
rg -n '#85a6ff|#7fa1ff' src/components/sections/Header.astro
# Expected: 0 matches after Slice 1

# G6 — menu no longer references deleted pages
rg -n 'Changelog|"Sign in"|"Sign up"' src/collections/menu.json
# Expected: 0 matches after Slice 2

# G7 — footer no longer references deleted pages
rg -n 'Changelog|"Sign in"|"Sign up"|/changelog|/sign-in|/sign-up' \
  src/components/sections/Footer.astro
# Expected: 0 matches after Slice 2

# G8 — about no longer references changelog button
rg -n 'View Changelog|/changelog' src/pages/about.astro
# Expected: 0 matches after Slice 2

# A1+A2 — home H1 and title contain SDD + Chile
rg -n 'Spec Driven Development' src/pages/index.astro src/config/site.js
rg -n 'Chile|LatAm' src/pages/index.astro src/config/site.js
# Expected: matches in both after Slice 3
```

### Manual browser review checklist

- [ ] Dark mode toggle: click the sun/moon in both desktop and mobile views; verify no blue anywhere on the toggle.
- [ ] System font rendering: open on a Mac (San Francisco), Windows (Segoe UI), Linux (Roboto or fallback). Verify NO external font request in the network tab (filter by `fonts.googleapis.com` — should be empty).
- [ ] `mailto:hola@glsolutions.tech` clicks: opens default mail client on all 4 pages.
- [ ] All 6 menu links resolve (`/`, `/features`, `/pricing`, `/blog`, `/about`, `/contact`).
- [ ] `/sign-in`, `/sign-up`, `/signin`, `/signup`, `/changelog` all return 404 (in `dist/` they should not exist).
- [ ] Dark mode for the whole home page: toggle through, verify no blue/orange clash.

### sdd-verify

`sdd-verify` runs after `sdd-apply` finishes the final slice. It will execute the same grep checks and the same `pnpm build` + `pnpm check` commands, plus its own scanning of the spec REQs.

---

## 9. Open Questions / Assumptions

| # | Assumption | Verification |
|---|---|---|
| 1 | **Astro version**: orchestrator says 6.4.2, `openspec/config.yaml` says 5.15, `CLAUDE.md` says 5.15. Behavior assumed identical for `getCollection`, `defineConfig`, content layer. If 6.4.2 is correct, no API used here changes. | Run `pnpm astro --version` in Slice 1 |
| 2 | **`gradient-title` purple stays**: spec and proposal both flagged it as out of B2 scope. Kept as dormant inconsistency. | None — design decision |
| 3 | **Tailwind v4 `@theme` quoted-comma fonts**: `var(--font-sans)` resolves to a quoted string with commas. Tailwind v4 syntax for `--font-sans: 'a, b, c'` is the canonical form; unquoted may parse wrong. The new font value uses the quoted form per Section 1. | Verify with `pnpm build` in Slice 1 — if generated CSS does not include the full stack, switch to a CSS variable indirection |
| 4 | **`meta.title` flows through `Meta.astro`**: confirmed by reading `src/components/widgets/Meta.astro` line 30: `<title>{metaTitle}</title>`. Site config meta.title is the source of truth. | Verified at read time |
| 5 | **`.env` does not exist** — only `.env.example`. Slice 1 will create `.env` from `.env.example` and add the new URL. Not a violation of the no-secrets rule (`.env.example` already declares the variable shape). | First build will succeed; verify `import.meta.env.PUBLIC_SITE_URL` resolves to `https://www.glsolutions.tech` |
| 6 | **`<Pricing>` component reuse for "Servicios teaser"**: the user spec lists 5 services as a flat list, not a 3-tier card. Recommend **NOT** reusing `<Pricing>`; inline a simple list/grid in `index.astro`. Reuse would force a contrived data shape. | Slice 3 |
| 7 | **The about-page "View Changelog" button at line 133** is the only button-link that targets a deleted page. The "Why we built it" section copy mentions changelog (line 20) and "Open source" section copies it implicitly — both are template copy that disappears in Slice 4's rewrite. | Slice 4 rewrites the whole file |
| 8 | **OpenSpec `config.yaml` context is wrong** (says "Argentinian accounting and business advisory firm"; GL Solutions is a Chilean SDD/Fintech consultancy). Out of design scope but should be fixed in a follow-up. | Flag in sdd-archive or sdd-init follow-up |
| 9 | **Chained PR slices 1–4 require user confirmation at `sdd-tasks`** (per preflight C1 = `ask-always`). Design recommends the slicing but the user has the final say. | sdd-tasks will pause |
| 10 | **System font stack for Latin Spanish diacritics**: the chosen stack (`-apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`) covers all Latin-1 + extended characters across macOS/Windows/Linux. No fallback needed for `ñ`, `á`, `é`, `¿`, `¡`. | Manual browser check on Linux |

---

## Risks

- **Slice 2 size (~900 lines)**: large but mostly deletions. Reviewer effort is the question "what was kept?" — verify against the kept-routes list. Mitigation: clear commit message naming the 9 deletions + 4 edits.
- **Header.astro inline gradient edits**: 6 hardcoded values in 2 separate gradient stacks. Easy to miss one. Mitigation: run the B7 grep after Slice 1, before opening PR.
- **OpenSpec config.yaml context mismatch**: pre-existing error. Out of scope. Flagged in Open Questions #8.
- **`.env` create vs modify**: spec says "create from `.env.example`" but pnpm/git may not track it. Mitigation: add to `.gitignore` if not already there (verify in Slice 1).
- **Astro version mismatch (5.15 vs 6.4.2)**: untested in this design. Mitigation: first `pnpm build` in Slice 1 reveals any incompatibility. If `getCollection` API changed, the changelog collection edit needs adjustment.

---

## Skill Resolution

- `paths-injected` — orchestrator provided `sdd-design` and the SDD shared reference via the system prompt
- Loaded files: `_shared/sdd-phase-common.md` (read in full)
- No other skills loaded for this phase (chained-pr/work-unit-commits not needed at design stage; sdd-tasks will load them)

---

## Artifacts Written

- `openspec/changes/glsolutions-bootstrap/design/glsolutions-bootstrap.md` (this file)
- Engram `sdd/glsolutions-bootstrap/design` (mirrored, type: architecture, capture_prompt: false)

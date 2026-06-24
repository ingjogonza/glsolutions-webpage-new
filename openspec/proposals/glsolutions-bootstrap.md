# Proposal: glsolutions-bootstrap

## Why

GL Solutions SpA is launching its public website in 2026. The current `ricoui-saas-template` is a generic SaaS template with blue/Inter/Serif branding, auth/changelog cruft, and US-centric copy. We need to adapt it into a Chilean, Spec-Driven-Development-focused consulting site that differentiates from `glsolutions.com` (US regtech, est. 1997) on the **SDD methodology + LatAm/Chile** angle. The brand palette, fonts, copy, and menu must be GL-owned end-to-end before any service-line content lands.

## What Changes

Rewrite 4 pages (home, about, contact, 404) with GL copy. Delete 4 auth pages + 1 changelog page + 4 changelog `.mdx` + the `changelog` collection. Update the design token system, menu (flat 6 items), site config, env, and the Header/Footer to remove dead links and rewrite hardcoded blue values. Place `/features` and `/pricing` as placeholders for Prompt 2.

## Impact

| Action | File(s) | Verdict |
|---|---|---|
| Rewrite | `src/pages/index.astro` | Full content per user prompt (12 sections → 8 GL blocks + 1 new "Proceso 5 fases") |
| Rewrite | `src/pages/about.astro` | Founders' story per user prompt |
| Rewrite | `src/pages/contact.astro` | Remove form, replace with mailto + 4-step process |
| Rewrite | `src/pages/404.astro` | Spanish, same brand tone |
| Keep intact | `src/pages/elements.astro` | Internal reference only, removed from menu (will show stale tokens — accepted) |
| Defer | `src/pages/features.astro`, `src/pages/pricing.astro`, `src/pages/blog/*.astro` | Prompt 2 |
| Delete | `src/pages/sign-in.astro`, `src/pages/sign-up.astro`, `src/pages/signin.astro`, `src/pages/signup.astro` | All 4 |
| Delete | `src/pages/changelog.astro`, `src/pages/changelog/[...page].astro` if exists, `src/content/changelog/*.mdx`, `changelog` collection in `src/content.config.js` | Atomic |
| Update | `src/collections/menu.json` | Flat menu: Inicio, Metodología → /features placeholder, Servicios → /pricing placeholder, Blog, Sobre nosotros, Contacto |
| Update | `src/config/site.js` | GL Solutions identity, meta title with "Spec Driven Development" + "Chile" or "LatAm", 150-160 char description, keywords list, no twitter/github |
| Update | `src/styles/global.css` `@theme` | All 5 token groups (brand, bg, text, neutral, fonts) consistent with GL palette; remove both Google Fonts `@import` |
| Update | `src/components/sections/Header.astro` | Remove Sign in / Sign up / Changelog links; rewrite dark-mode toggle gradient hardcoded blue → orange |
| Update | `src/components/sections/Footer.astro` | Remove auth/changelog/404/github/blog columns or rewrite entirely to GL footer |
| Update | `src/components/home/HeroSection.astro` (if used) | Content per user hero block |
| Update | `.env` from `.env.example` | `PUBLIC_SITE_URL=https://www.glsolutions.tech`; `PUBLIC_GA4_ID=` and `PUBLIC_UMAMI_ID=` empty/commented |
| Verify | `astro.config.mjs` | `site:` value present and correct (template's SEO needs it) |
| Touch | `src/pages/index.astro` shimmer effect | Hardcoded `rgba(45, 109, 195, 0.18)` → orange equivalent |

## Out of Scope

- `/features`, `/pricing`, `/blog` content (Prompt 2)
- Real forms, Calendly, analytics, auth, newsletter
- External fonts
- Blue `#1A6FBF` or any blue not derived from a deliberate palette choice
- Logo/og.jpg/favicon replacement (placeholders stay)
- Inventing data (year, clients, awards) — use placeholders only

## Decisions

1. `--color-text-primary` (h1-h6) = `#3A3A3A` grey, not orange. Naranja reserved for CTAs, links, badges.
2. `--color-accent` `#fad13b` gold → peach derived from primary (`#FCE4D5` approx).
3. `elements.astro` left intact per user prompt; will show stale values until Prompt 2.
4. Logo/og.jpg/favicon placeholders stay.

## Risks

- `Header.astro` has hardcoded blue gradient on dark-mode toggle → must rewrite inline style
- `index.astro` shimmer uses `rgba(45, 109, 195, 0.18)` hardcoded → must rewrite
- Changelog deletion is **atomic** across 4 page files + 4 mdx + 1 schema + 3 references in menu/footer/about — any miss breaks build
- `Footer.astro` 4 hardcoded columns reference removed pages
- Dark mode has 6 files wired; blast radius is broad but mostly automatic via CSS custom properties
- `menu.json` currently has dropdown hierarchy; user wants flat 6-item menu

## Success Criteria ("LISTO CUANDO")

- `pnpm build` runs without errors
- Home, About, Contact reflect user-provided copy
- Sign-in, sign-up, signin, signup, changelog no longer exist and are not in the menu
- Home H1 includes "Spec Driven Development" + "Chile" or "LatAm"
- `.env` has `PUBLIC_SITE_URL=https://www.glsolutions.tech`
- Home `<title>` includes "Spec Driven Development" + "Chile" or "LatAm"
- No external font requests in built HTML
- Dark mode visually consistent (manual verification note in verify report)

## Review Workload Forecast

Rough line count per file:

| File | Approx Δ lines |
|---|---|
| `index.astro` rewrite | 250-400 |
| `about.astro` rewrite | 80-150 |
| `contact.astro` rewrite | 50-80 |
| `404.astro` rewrite | 30-50 |
| `menu.json` update | 10-15 |
| `site.js` update | 10-20 |
| `global.css` token rewrite | 80-150 |
| `Header.astro` edit | 20-40 |
| `Footer.astro` rewrite | 60-100 |
| `.env` update | 5 |
| 4 page deletes + 4 mdx deletes + schema edit | ~-10 (net) |
| **Total** | **~600-1000 lines** |

**400-line budget risk: HIGH — exceeds the 400-line review budget.**

Per preflight C1 (ask-always PR strategy), the orchestrator will pause at `sdd-tasks` output to ask the user whether to split into chained PRs. Recommended slicing:

1. PR-1: token + font + `global.css` + `.env` (foundation)
2. PR-2: page deletions (sign-in, sign-up, signin, signup, changelog) atomic
3. PR-3: home rewrite
4. PR-4: about + contact + 404 rewrites
5. PR-5: menu + footer + header rewires

Decision needed before apply: **Yes** (PR slicing confirmed at sdd-tasks).

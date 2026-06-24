# Proposal: metodologia-servicios-blog

## Why

GL Solutions needs three public surfaces to convert traffic into qualified leads:

1. **/metodologia** — a deep-dive on Spec Driven Development that explains our process in 5 phases plus the role of AI. This is the credibility page for technical founders evaluating us; it also serves long-tail SEO (DMD, ADR, BDD, Feature Spec glossary terms).
2. **/servicios** — five concrete service lines grouped into "Proyectos de alcance fijo" (Ejecución, Rescate, Automatización) and "Servicios recurrentes" (Consultoría, CTO Fraccionado). This is the offer page; it has a comparison table and FAQ to address the four most common objections before the contact email.
3. **Two case-study / opinion blog posts** — FinPago KYC (concrete credibility) and Vibe Coding vs SDD (topical SEO for the "vibe coding" search trend).

Currently the site has template leftovers (`/features` and `/pricing` from RicoFast). The home page links to `/pricing` which doesn't yet match our offer model. The blog is empty (the previous change removed the changelog collection and never added posts). This change renames the two template pages to our actual offer, fills the blog with the first two posts, and updates the home + menu accordingly.

## What Changes

- **Rename** `src/pages/features.astro` → `src/pages/metodologia.astro` and rewrite with the 5-phase SDD deep-dive + glossary.
- **Rename** `src/pages/pricing.astro` → `src/pages/servicios.astro` and rewrite with 5 service lines, tabs, comparison table, and FAQ.
- **Add** `src/content/post/finpago-kyc-spec-driven-development/index.mdx` — case study post.
- **Add** `src/content/post/vibe-coding-vs-spec-driven-development/index.mdx` — opinion post.
- **Update** `src/collections/menu.json` — point `Metodología` and `Servicios` menu items to the new routes.
- **Update** `src/pages/index.astro` — change the "Ver todos los servicios y precios →" CTA from `/pricing` to `/servicios`.

## Success Criteria

- `pnpm build` passes with zero errors.
- `pnpm check` passes with no new warnings introduced.
- `/metodologia` renders the 5 phases + IA role + glossary; meta title includes "Spec Driven Development" + "metodología".
- `/servicios` renders 5 service cards (2 groups via tabs), comparison table, FAQ; meta title includes "servicios" + "Spec Driven Development" or "consultoría de software".
- `/blog` lists both new posts; each post renders without MDX parse errors.
- The home page CTA links to `/servicios` (not `/pricing`).
- `menu.json` has no broken links (`/features` and `/pricing` are removed everywhere).
- No real forms, no external fonts, no Calendly — only `mailto:hola@glsolutions.tech`.

## Impact

- 2 files renamed (`.astro` only — Astro resolves routes by filename).
- 2 new files (`metodologia.astro`, `servicios.astro`) replacing 2 old ones.
- 2 new MDX files (case study + opinion).
- 2 small edits (`menu.json`, `index.astro`).
- 0 new dependencies. 0 changes to existing components.
- No touch on `/`, `/about`, `/contact`, `/404`, or `content.config.js`.

## Out of Scope (explicit)

- Adding more blog posts (only the 2 listed in this prompt).
- Deploying (the user explicitly deferred this — on-premise server later).
- Reverting any work from the glsolutions-bootstrap change.
- Modifying the dev server port (still 5200 per `astro.config.mjs`).

## Risks

- **MDX parse error on the BDD code block** in the FinPago post — the `Dado que` block uses indented text. Mitigation: render as a fenced `text` block (not `js`); verify with `pnpm build`.
- **Tab component is custom** — must not introduce a library. Mitigation: simple two-button toggle with `hidden` class on a `<div>`; ~15 lines of inline script.
- **SEO regressions** on the old `/features` and `/pricing` URLs. Mitigation: no 301 redirect configured (the pages are gone, not moved — Google will deindex over time). Not a blocker; we own the domain and have no external backlinks to those URLs.
- **Review budget**: estimated ~550 changed lines (metodologia ~210, servicios ~230, 2 MDX ~140, menu + index ~10). **Exceeds the 400-line single-PR budget.** The user pre-approved chained delivery in the previous change; we will split into 4 slices + 1 commit.

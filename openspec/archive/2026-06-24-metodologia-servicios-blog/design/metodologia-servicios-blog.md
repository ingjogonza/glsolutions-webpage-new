# Design: metodologia-servicios-blog

## File-Level Plan

### Created

| Path | Purpose |
|---|---|
| `src/pages/metodologia.astro` | Replaces `features.astro`. 6 inline feature-detail blocks (5 phases + IA role) + glossary section. |
| `src/pages/servicios.astro` | Replaces `pricing.astro`. Tab control + 5 service cards in 2 groups + comparison table + FAQ + CTA. |
| `src/content/post/finpago-kyc-spec-driven-development/index.mdx` | First blog post (case study). |
| `src/content/post/vibe-coding-vs-spec-driven-development/index.mdx` | Second blog post (opinion). |

### Deleted

| Path | Reason |
|---|---|
| `src/pages/features.astro` | Replaced by `metodologia.astro` — same route would conflict. |
| `src/pages/pricing.astro` | Replaced by `servicios.astro`. |

### Modified

| Path | Change |
|---|---|
| `src/collections/menu.json` | `/features` → `/metodologia`; `/pricing` → `/servicios`. |
| `src/pages/index.astro` | "Ver todos los servicios y precios →" link `/pricing` → `/servicios`. |

### Untouched

`/`, `/about`, `/contact`, `/404`, `content.config.js`, all components, all styles, all tokens, `astro.config.mjs`, `biome.json`.

## Component Decisions

### Feature-detail pattern: INLINE (not a new component)

The user said "usa el componente FeatureDetail por cada bloque". After reading `src/pages/features.astro`, **no such component exists** — the pattern is implemented inline via a `featureModules` array mapped to a flexbox split. We replicate that exact pattern in `metodologia.astro` with new GL content. Creating a new `<FeatureDetail>` component would be premature abstraction (Ponytail: no interface with one implementation).

Each block: `{ icon, title, desc, points, direction }`. The `visual` field (used for CSS-only illustrations in the template) is dropped — those visuals were template-specific (wireframe, blocks, MDX, motion, lighthouse, palette) and would be misleading for SDD phase content.

Icons picked from `@lucide/astro`:
- Fase 1 (Entendemos tu negocio) → `FileText` (DMD)
- Fase 2 (Diseñamos la estructura) → `Layers` (ADRs / arquitectura)
- Fase 3 (Definimos qué hace cada parte) → `GitBranch` (Feature Spec / branches)
- Fase 4 (Construimos siguiendo el mapa) → `Hammer` (construcción)
- Fase 5 (Entregamos y te dejamos listo) → `BookOpen` (documentación)
- Bloque IA → `Bot` (rol de la IA)

Alternating `direction: 'left' | 'right'` starting with left.

### Tab control: custom inline (NOT PricingToggle)

The user offered two options: repropose `PricingToggle` or use simple tabs. Decision: **simple tabs**.

Reasoning:
- `PricingToggle` has a hardcoded `saveText="Save 20%"` badge that doesn't fit "proyectos vs recurrentes" semantics.
- `PricingToggle` is a UI shell; the actual monthly/yearly price-rolling behavior lives in `src/components/sections/Pricing.astro` (which we're not reusing — its data shape is hardcoded for SaaS plans with `monthlyPrice`/`yearlyPrice` fields).
- The "proyectos vs recurrentes" distinction is conceptual, not a price toggle. Tabs are honest: only one group is visible at a time, with a clear active state.

Implementation: two `<button>` elements with `aria-pressed` and an `aria-controls` reference, plus a small `<script>` that toggles a `hidden` attribute on the corresponding group `<div>`. ~20 lines including ARIA. No new dependency.

Default active tab: "Proyectos de alcance fijo" (it's the more common entry point — most leads start with a defined project).

### Comparison table: custom inline

5 columns (one per service), 5 rows (Precio, Duración, Para quién es, Incluye documentación completa, Requiere equipo técnico propio del cliente). Reuse the `<table>` markup from the old `pricing.astro` with new data. `Check` and `X` icons from `@lucide/astro` for the boolean rows.

### FAQ: reuse `AccordionItem`

Same component as in `glsolutions-bootstrap` for `/contact`. No new code.

## Brand / Style Adherence

- **Colors**: only `text-primary`, `bg-bg-primary`, `bg-bg-secondary`, `border-neutral-...` Tailwind utilities. NO blue (`text-blue-...`). NO inline `style="background:..."` except the FinalCTA bg fix pattern (none in these pages — they're not FinalCTAs).
- **Fonts**: rely on `font-brand` (display) and default sans (body) — both already point to the system stack after the glsolutions-bootstrap change.
- **CTAs**: every action button uses `<Button url="mailto:hola@glsolutions.tech" type="fill">Escríbenos para cotizar →</Button>`.
- **Meta tags**: include "Spec Driven Development" in the title; description 150-160 chars; canonical handled by `Layout.astro` (already wired in glsolutions-bootstrap).
- **Tone**: direct Chilean Spanish; no "Transform your business" SaaS clichés.

## SEO

- `metodologia.astro`: `<Layout title="Spec Driven Development: metodología en 5 fases | GL Solutions Chile" description="Cómo aplicamos SDD en cada proyecto: DMD, ADR, Feature Spec en BDD, construcción con IA y handoff documentado. 5 fases, 3-5 días cada una.">`
- `servicios.astro`: `<Layout title="Servicios de consultoría de software y Spec Driven Development | GL Solutions" description="5 líneas de servicio: Ejecución, Rescate, Automatización, Consultoría y CTO Fraccionado. Rango USD 1.500–32.000. Escríbenos para cotizar.">`
- Two MDX posts: each frontmatter `description` is 150-160 chars and includes primary keyword (case study: "SDD / KYC / 0 bugs"; opinion: "vibe coding / spec driven development / deuda técnica").

## Build & Verify

```bash
cd ricoui-saas-template
export PNPM_HOME=/home/gorgu/.local/share/pnpm
export PATH="$PNPM_HOME:$PATH"

# Format + lint
pnpm check

# Build (runs astro check + astro build)
pnpm build

# Smoke (already running: http://localhost:5300/)
# curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5300/metodologia
# curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5300/servicios
# curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5300/blog/finpago-kyc-spec-driven-development
# curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5300/blog/vibe-coding-vs-spec-driven-development
# curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5300/blog
```

## Risk Mitigations

1. **MDX BDD block parser**: render as fenced `text` (not `js`); the `Dado que` / `CUANDO` / `ENTONCES` keywords are not valid JS but ARE valid text.
2. **Tab script flicker on first paint**: render the default group as `aria-hidden="false"` and the other as `hidden` in SSR; the script only swaps on user click.
3. **No 301 redirects from /features and /pricing**: confirmed acceptable; we own the domain; no external backlinks to the old URLs.

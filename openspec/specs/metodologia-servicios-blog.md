# Baseline Spec: metodologia-servicios-blog

> Spec Driven Development deep-dive page, 5-line service catalog, 2 MDX blog posts, and navigation updates.
> All requirements are NEW (no prior GL behavior to override). Created from delta spec on archive.

---

## `metodologia-page`

The site MUST provide a public page at `/metodologia` that explains the Spec Driven Development methodology as applied by GL Solutions, in Chilean Spanish, structured as 5 phases plus a block on the role of AI, followed by a glossary of 4 terms.

### Scenario: page renders with 5 phases and AI role

- **GIVEN** a visitor navigates to `/metodologia`
- **WHEN** the page loads
- **THEN** the H1 reads exactly "Spec Driven Development: el mapa antes que el código"
- **AND** an intro paragraph is visible: "SDD no es una metodología más. Es la diferencia entre un sistema que tu equipo puede explicar y uno que solo el dev original entiende. Esto es exactamente cómo se aplica en cada proyecto."
- **AND** exactly 5 phase blocks are rendered, in this order:
  1. "Entendemos tu negocio" (Fase 1, 3-5 días)
  2. "Diseñamos la estructura" (Fase 2, 4-6 días)
  3. "Definimos qué hace cada parte" (Fase 3, 3-5 días)
  4. "Construimos siguiendo el mapa" (Fase 4, iterativo)
  5. "Entregamos y te dejamos listo" (Fase 5, 3-4 días)
- **AND** a 6th block titled "El rol de la IA" is rendered, with body: "Usamos IA para construir más rápido — no para tomar decisiones..."
- **AND** each block shows a Lucide icon, a title, a description paragraph, and 3 bullet points

### Scenario: glossary section at the bottom

- **WHEN** the visitor scrolls to the end of `/metodologia`
- **THEN** a glossary section is visible with exactly these 4 terms and definitions:
  - DMD (Domain Model Document)
  - ADR (Architecture Decision Record)
  - Feature Spec
  - BDD (Behavior Driven Development)

### Scenario: meta tags for SEO

- **THEN** `<title>` contains "Spec Driven Development" AND "metodología"
- **AND** `<meta name="description">` is between 150 and 160 characters

### Scenario: no broken links inside the page

- **THEN** the page contains no link to `/features`
- **AND** the final CTA links to `mailto:hola@glsolutions.tech`

---

## `servicios-page`

The site MUST provide a public page at `/servicios` that lists 5 service lines grouped into "Proyectos de alcance fijo" and "Servicios recurrentes", with a comparison table and FAQ.

### Scenario: tabs control the visible group

- **GIVEN** a visitor is at `/servicios`
- **WHEN** the page loads
- **THEN** the "Proyectos de alcance fijo" tab is active by default
- **AND** 3 service cards are visible: Ejecución, Rescate, Automatización
- **AND** the "Servicios recurrentes" tab is inactive
- **WHEN** the visitor clicks the "Servicios recurrentes" tab
- **THEN** 2 service cards become visible: Consultoría, CTO Fraccionado
- **AND** the "Proyectos de alcance fijo" cards are hidden

### Scenario: every service card ends in a cotizar CTA

- **THEN** each of the 5 service cards ends with a button labeled "Escríbenos para cotizar →" that links to `mailto:hola@glsolutions.tech`
- **AND** a note is visible below the cards: "Los rangos son orientativos. El precio final depende del alcance definido en la primera conversación. No cotizamos sin haber hecho el diagnóstico."

### Scenario: comparison table with 5 rows and 5 columns

- **THEN** a `<table>` is rendered with these exact rows: Precio, Duración, Para quién es, Incluye documentación completa, Requiere equipo técnico propio del cliente
- **AND** the table has one column per service (5 columns total)
- **AND** the "Incluye documentación completa" row shows a check icon for all 5 services
- **AND** the "Requiere equipo técnico propio del cliente" row shows a check icon ONLY for Consultoría and CTO Fraccionado; an X icon for the other 3

### Scenario: FAQ with 4 questions

- **THEN** a FAQ section is rendered with exactly these 4 questions:
  1. ¿Por qué no dan precio fijo en todos los servicios?
  2. ¿Cotizan sin reunión previa?
  3. ¿Trabajan con proyectos de menos de 4 semanas?
  4. ¿Son la opción más económica del mercado?
- **AND** each question uses the existing `AccordionItem` component

### Scenario: meta tags for SEO

- **THEN** `<title>` contains "servicios" AND ("Spec Driven Development" OR "consultoría de software")
- **AND** `<meta name="description">` is between 150 and 160 characters

### Scenario: no pricing template leftovers

- **THEN** the page does not mention "Free", "Pro", or "Enterprise" plans
- **AND** the page does not import `PricingSection` from `src/components/sections/Pricing.astro`
- **AND** the page does not import `PricingToggle`

---

## `blog-content`

The site MUST publish two MDX posts under `src/content/post/`, each conforming to the existing `post` collection schema in `src/content.config.js`.

### Scenario: first post — FinPago KYC case study

- **GIVEN** the file `src/content/post/finpago-kyc-spec-driven-development/index.mdx` exists
- **WHEN** `astro build` runs
- **THEN** the post's frontmatter is valid against the `post` schema (title, description, publishDate required)
- **AND** `publishDate` is `2026-06-23`
- **AND** `tags` is `["case-study", "fintech", "kyc", "spec-driven-development"]`
- **AND** the body contains a section "El problema inicial: 6 meses sin avance"
- **AND** the body contains a section "Diagnóstico: qué estaba mal" with a 5-row Markdown table
- **AND** the body contains a section "El escenario principal, documentado antes de escribir código" with a BDD code block (Dado que / Cuando / Entonces)
- **AND** the body contains a section "Casos borde que documentamos" with at least 3 items
- **AND** the body contains a section "Resultados: antes vs después" with a 5-row Markdown table
- **AND** the body contains a blockquote attributed to "CEO de FinPago"
- **AND** the post is reachable at `/blog/finpago-kyc-spec-driven-development`

### Scenario: second post — Vibe Coding vs SDD

- **GIVEN** the file `src/content/post/vibe-coding-vs-spec-driven-development/index.mdx` exists
- **WHEN** `astro build` runs
- **THEN** the frontmatter is valid
- **AND** `publishDate` is `2026-06-23`
- **AND** `tags` is `["spec-driven-development", "vibe-coding", "metodologia"]`
- **AND** the body contains a section "¿Qué es vibe coding?"
- **AND** the body contains a section "El problema no es la IA — es la ausencia de mapa"
- **AND** the body contains a section "Qué es Spec Driven Development"
- **AND** the body contains a section "Comparación directa" with a 6-row Markdown table
- **AND** the body contains a section "Cuándo vibe coding sí tiene sentido"
- **AND** the body contains a section "Cuándo necesitas SDD"
- **AND** the body contains a section "La pregunta que realmente importa"
- **AND** the post is reachable at `/blog/vibe-coding-vs-spec-driven-development`

### Scenario: blog index lists both posts

- **GIVEN** both posts are created
- **WHEN** a visitor navigates to `/blog`
- **THEN** both posts appear in the list, newest first (same publishDate — order is stable)

---

## `navigation-update`

The site navigation and home page MUST reflect the renamed routes.

### Scenario: menu has no broken links

- **GIVEN** `src/collections/menu.json` is read at build time
- **WHEN** `astro build` runs
- **THEN** no menu item points to `/features`
- **AND** no menu item points to `/pricing`
- **AND** the "Metodología" item points to `/metodologia`
- **AND** the "Servicios" item points to `/servicios`

### Scenario: home services CTA

- **WHEN** a visitor views the home page
- **THEN** the "Ver todos los servicios y precios →" link points to `/servicios` (not `/pricing`)

### Scenario: no references to deleted routes anywhere in the repo

- **WHEN** `rg "/features|/pricing" src/` is run
- **THEN** the only matches are inside this spec file (or zero matches in source code)

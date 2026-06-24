# Delta Spec: glsolutions-bootstrap

> Bootstrap adaptation of ricoui-saas-template into GL Solutions corporate site.
> All requirements are NEW (no existing GL behavior to modify). Format: full spec.

---

## Group A — SEO and Metadata

## REQ-A1: Home H1 contains SDD + Chile/LatAm

### Scenario: H1 visible content
GIVEN a user visits `/`
WHEN the page renders
THEN the `<h1>` element MUST contain "Spec Driven Development"
AND the `<h1>` element MUST contain "Chile" or "LatAm"

## REQ-A2: Home `<title>` contains SDD + Chile/LatAm

### Scenario: Title tag
GIVEN a crawler fetches `/`
WHEN it reads the `<title>` tag
THEN the title MUST contain "Spec Driven Development"
AND the title MUST contain "Chile" or "LatAm"

## REQ-A3: Home meta description 150-160 chars with SDD + Chile/LatAm

### Scenario: Meta description length and content
GIVEN a crawler fetches `/`
WHEN it reads `<meta name="description">`
THEN the content attribute MUST be between 150 and 160 characters
AND MUST reference "Spec Driven Development"
AND MUST reference "Chile" or "LatAm"

## REQ-A4: meta.keywords field in site.js

### Scenario: Keywords list present
GIVEN the file `src/config/site.js`
WHEN inspected for `meta.keywords`
THEN it MUST contain: "Spec Driven Development, SDD, consultoría de software, startups Fintech, desarrollo de software Chile, B2B SaaS LatAm"

## REQ-A5: No "GL Solutions" alone in metadata

### Scenario: Brand keyword differentiation
GIVEN any `<title>`, `<meta name="description">`, or `<meta name="keywords">` in the built HTML
WHEN searched for the exact phrase "GL Solutions" as a standalone keyword
THEN it MUST NOT appear without accompanying differentiators (SDD, Chile, LatAm)

## REQ-A6: PUBLIC_SITE_URL in .env

### Scenario: Env variable value
GIVEN the file `.env`
WHEN read for `PUBLIC_SITE_URL`
THEN the value MUST be `https://www.glsolutions.tech`

---

## Group B — Brand and Visual Tokens

## REQ-B1: Token palette consistency in global.css @theme

### Scenario: All 5 token groups match GL palette
GIVEN `src/styles/global.css` `@theme` block
WHEN inspected
THEN `--color-primary` MUST be `#E8530A` (orange)
AND text tokens MUST reference `#3A3A3A`
AND light bg MUST reference `#FAFAFA`
AND dark bg MUST reference `#0F1F2E`
AND accent MUST be a peach derivation of primary

## REQ-B2: No blue #1A6FBF in public surface

### Scenario: Grep for forbidden blue
GIVEN all files under `src/` (excluding `elements.astro` and `features.astro` which are deferred)
WHEN searched for `#1A6FBF` or `#2d6dc3` or `#0066ff`
THEN zero matches MUST be found in pages, components, or styles

## REQ-B3: --color-text-primary is grey, not orange

### Scenario: Heading color token
GIVEN `src/styles/global.css`
WHEN `--color-text-primary` is inspected
THEN it MUST be `#3A3A3A` or a close derivation (not orange)

## REQ-B4: No external font loaded

### Scenario: Google Fonts imports removed
GIVEN `src/styles/global.css`
WHEN searched for `@import url("https://fonts.googleapis.com`
THEN zero matches MUST be found

## REQ-B5: System font stack for --font-sans and --font-brand

### Scenario: Font tokens point to system stack
GIVEN `src/styles/global.css` `@theme`
WHEN `--font-sans` and `--font-brand` are inspected
THEN both MUST include `-apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`
AND neither MUST reference "Instrument Serif" or "Inter"

## REQ-B6: Dark mode coherence

### Scenario: Dark mode overrides use new palette
GIVEN `src/styles/global.css` `html.dark` block
WHEN inspected
THEN all color overrides MUST reference orange-derived or grey-derived values
AND MUST NOT reference blue values
> Verification: manual browser review required — toggle dark mode and confirm visual coherence.

## REQ-B7: Header dark-mode toggle gradient rewritten

### Scenario: No hardcoded blue in Header toggle
GIVEN `src/components/sections/Header.astro`
WHEN searched for `#2d6dc3`, `#85a6ff`, `#7fa1ff`
THEN zero matches MUST be found
AND an orange-equ gradient MUST replace them

## REQ-B8: index.astro shimmer rewritten

### Scenario: No hardcoded blue rgba in shimmer
GIVEN `src/pages/index.astro`
WHEN searched for `rgba(45, 109, 195`
THEN zero matches MUST be found
AND an orange-equivalent rgba MUST replace it

## REQ-B9: No font-brand loading a second family

### Scenario: font-brand class does not load external font
GIVEN `src/styles/global.css` `.font-brand` rule and `--font-brand` token
WHEN inspected
THEN the font-family MUST resolve to the system stack only

---

## Group C — Home Content (8 blocks + 1 new section)

## REQ-C1: Hero block

### Scenario: Hero badge text
GIVEN `/` renders
WHEN the hero section is inspected
THEN a badge element MUST contain "B2B SaaS · Fintech · Seed / Pre-seed"

### Scenario: Hero H1
GIVEN `/` renders
WHEN the hero H1 is inspected
THEN it MUST contain "Spec Driven Development" and "Chile" or "LatAm"

### Scenario: Hero subtitle
GIVEN `/` renders
WHEN the hero subtitle is inspected
THEN it MUST contain "Construimos sistemas para startups en cualquier parte del mundo"
AND MUST contain "La IA acelera el trabajo — los ingenieros mantienen el control"

### Scenario: Hero primary CTA
GIVEN `/` renders
WHEN the primary CTA is inspected
THEN it MUST be a `mailto:hola@glsolutions.tech` link
AND link text MUST contain "hola@glsolutions.tech"

### Scenario: Hero secondary CTA
GIVEN `/` renders
WHEN the secondary CTA is inspected
THEN it MUST contain "Ver un ejemplo real"
AND MUST anchor to the evidence section (`#evidencia` or equivalent)

### Scenario: Hero stats
GIVEN `/` renders
WHEN the stats row is inspected
THEN it MUST display "15+ Años de experiencia aplicada"
AND "5 Fases con puerta de calidad"
AND "0 Decisiones técnicas sin documentar"

## REQ-C2: Problema block

### Scenario: Problema H2
GIVEN `/` renders
WHEN the problem section H2 is inspected
THEN it MUST contain "¿Tu código crece, pero tu equipo lo entiende cada vez menos?"

### Scenario: Problema bullets
GIVEN `/` renders
WHEN the problem section is inspected
THEN it MUST contain 5 bullet points describing code growth pain points per user prompt

### Scenario: Problema cierre
GIVEN `/` renders
WHEN the problem section closing paragraph is inspected
THEN it MUST be present per user prompt text

## REQ-C3: Solución block

### Scenario: Solución H2
GIVEN `/` renders
WHEN the solution section H2 is inspected
THEN it MUST contain "Spec Driven Development — la spec define el sistema antes del código"

### Scenario: Solución comparison
GIVEN `/` renders
WHEN the "Sin mapa previo" vs "Con SDD" comparison is inspected
THEN both columns MUST be present with 4 lines each per user prompt

### Scenario: Solución cards
GIVEN `/` renders
WHEN the solution cards are inspected
THEN 3 cards MUST exist: "El mapa antes que el código", "La IA construye, el ingeniero decide", "Cualquiera puede entenderlo"

## REQ-C4: Evidencia block

### Scenario: Evidencia H2
GIVEN `/` renders
WHEN the evidence section H2 is inspected
THEN it MUST contain "Así se ve un sistema construido con SDD"

### Scenario: Evidencia BDD code block
GIVEN `/` renders
WHEN the evidence section is inspected
THEN a code block MUST display a 3-line DADO QUE / CUANDO / ENTONCES example

### Scenario: Evidencia link
GIVEN `/` renders
WHEN the "Ver el caso completo" link is inspected
THEN it MUST point to `/blog/finpago-kyc-spec-driven-development`
> Note: target page does not exist yet — placeholder accepted.

## REQ-C5: Proceso 5 fases (NEW section)

### Scenario: Proceso H2
GIVEN `/` renders
WHEN the process section H2 is inspected
THEN it MUST contain "Cómo trabajamos. Cinco pasos, cada uno requiere tu aprobación"

### Scenario: Proceso 5 numbered steps
GIVEN `/` renders
WHEN the process section is inspected
THEN 5 numbered steps (01-05) MUST be present
AND each step MUST have a title, duration, and description per user prompt
AND each step MUST be marked as a quality gate

### Scenario: Proceso reuses timeline pattern
GIVEN the process section implementation
WHEN inspected
THEN it SHOULD reuse the timeline/stepper visual pattern from `about.astro`

## REQ-C6: Para quién block

### Scenario: Para quién H2
GIVEN `/` renders
WHEN the target audience section H2 is inspected
THEN it MUST contain "¿Eres el cliente correcto para GL Solutions?"

### Scenario: Para quién 3 personas
GIVEN `/` renders
WHEN the target audience section is inspected
THEN 3 persona blocks MUST exist: "Founder técnico", "Founder de negocio", "Operaciones sin automatizar"
AND each MUST contain 4 bullets per user prompt

## REQ-C7: Servicios teaser block

### Scenario: Servicios H2
GIVEN `/` renders
WHEN the services teaser H2 is inspected
THEN it MUST contain "Cinco formas de trabajar con GL Solutions"

### Scenario: Servicios 5 lines
GIVEN `/` renders
WHEN the services list is inspected
THEN it MUST list: Ejecución, Rescate, Consultoría, CTO Fraccionado, Automatización

### Scenario: Servicios CTA
GIVEN `/` renders
WHEN the services CTA is inspected
THEN it MUST contain "Ver todos los servicios y precios"
AND MUST link to `/pricing`

## REQ-C8: CTA final block

### Scenario: CTA final dark background
GIVEN `/` renders
WHEN the final CTA section is inspected
THEN it MUST use dark background `#0F1F2E`

### Scenario: CTA final H2
GIVEN `/` renders
WHEN the final CTA H2 is inspected
THEN it MUST contain "Software que cualquier ingeniero puede entender desde el día uno"

### Scenario: CTA final mailto
GIVEN `/` renders
WHEN the final CTA link is inspected
THEN it MUST be `mailto:hola@glsolutions.tech`

## REQ-C9: Template leftover sections

### Scenario: Leftover sections removed or repurposed
GIVEN `/` renders
WHEN inspected for Logo/Social Proof, Features Grid, and Product Preview sections
THEN they MUST be either removed or repurposed with GL content
> **Decision**: REMOVE all 3 leftover template sections. They contain template-specific demo content with no GL equivalent. Re-addition is deferred to Prompt 2 if needed.

---

## Group D — About Content

## REQ-D1: About page exists at /about

### Scenario: Route resolves
GIVEN the built site
WHEN navigating to `/about`
THEN a page MUST render with Chilean Spanish direct tone

## REQ-D2: Founders' block

### Scenario: Both founders mentioned
GIVEN `/about` renders
WHEN the founders block is inspected
THEN it MUST mention Jorge González (Senior DBA and Data Architect, banca y automotriz)
AND MUST mention Carlos Lameda

## REQ-D3: 15+ years combined experience

### Scenario: Experience claim present
GIVEN `/about` renders
WHEN inspected
THEN it MUST mention 15+ years combined experience

## REQ-D4: Founded in 2026

### Scenario: Founding year
GIVEN `/about` renders
WHEN inspected
THEN it MUST mention founded in 2026

## REQ-D5: Santiago, Chile HQ + LatAm operations

### Scenario: Location mentions
GIVEN `/about` renders
WHEN inspected
THEN it MUST mention Santiago, Chile as HQ
AND MUST mention operations in Chile and LatAm

## REQ-D6: Mission statement

### Scenario: Mission present
GIVEN `/about` renders
WHEN inspected
THEN it MUST contain the mission: "que cualquier startup pueda tener software que su equipo entiende, audita y puede transferir sin depender de quien lo construyó" (or faithful paraphrase — flag if paraphrased)

## REQ-D7: No invented claims

### Scenario: No fabricated clients/awards/numbers
GIVEN `/about` renders
WHEN inspected for client names, awards, or quantitative claims
THEN none MUST be present except year placeholders (2026)

---

## Group E — Contact Content

## REQ-E1: Contact page exists at /contact

### Scenario: Route resolves
GIVEN the built site
WHEN navigating to `/contact`
THEN a page MUST render

## REQ-E2: No form elements

### Scenario: No form/submit/Calendly/newsletter
GIVEN `/contact` built HTML
WHEN searched for `<form`, `<input type="submit"`, `calendly`, `newsletter`
THEN zero matches MUST be found

## REQ-E3: H1 "Hablemos de tu proyecto"

### Scenario: Contact H1
GIVEN `/contact` renders
WHEN the H1 is inspected
THEN it MUST contain "Hablemos de tu proyecto"

## REQ-E4: 4 numbered steps

### Scenario: Process steps present
GIVEN `/contact` renders
WHEN inspected
THEN 4 numbered steps (01-04) MUST be present per user prompt

## REQ-E5: Single mailto CTA

### Scenario: CTA link
GIVEN `/contact` renders
WHEN the CTA is inspected
THEN it MUST be `mailto:hola@glsolutions.tech` with visible text "hola@glsolutions.tech"

## REQ-E6: Static notice about direct email

### Scenario: Form replacement notice
GIVEN `/contact` renders
WHEN inspected
THEN static text MUST explain that the form is intentionally replaced by direct email

---

## Group F — 404 Content

## REQ-F1: 404 page in Chilean Spanish

### Scenario: 404 renders in Spanish
GIVEN the built site
WHEN navigating to `/404`
THEN the page MUST render in Chilean Spanish with GL brand tone

## REQ-F2: Way back to home

### Scenario: Home link present
GIVEN `/404` renders
WHEN inspected
THEN a link to `/` MUST be present

## REQ-F3: No US competitor mention

### Scenario: No competitor brand
GIVEN `/404` built HTML
WHEN searched for "glsolutions.com" or "GL Solutions Inc"
THEN zero matches MUST be found

---

## Group G — Page Deletions (Atomic)

## REQ-G1: Deleted routes return 404

### Scenario: Routes gone in build output
GIVEN `pnpm build` completes
WHEN checking `dist/` for sign-in, sign-up, signin, signup, changelog directories
THEN none MUST exist

## REQ-G2: Auth page files deleted

### Scenario: Auth files removed
GIVEN the source tree
WHEN checked for `src/pages/sign-in.astro`, `src/pages/sign-up.astro`, `src/pages/signin.astro`, `src/pages/signup.astro`
THEN none MUST exist

## REQ-G3: Changelog page files deleted

### Scenario: Changelog files removed
GIVEN the source tree
WHEN checked for `src/pages/changelog.astro` and `src/pages/changelog/[...page].astro`
THEN none MUST exist

## REQ-G4: Changelog collection removed from schema

### Scenario: content.config.js clean
GIVEN `src/content.config.js`
WHEN inspected
THEN the `changelog` collection MUST NOT be defined
AND `collections` export MUST NOT reference `changelog`

## REQ-G5: Changelog MDX files deleted

### Scenario: Content files removed
GIVEN the source tree
WHEN checked for `src/content/changelog/`
THEN the directory MUST NOT exist or MUST be empty

## REQ-G6: Menu no longer references deleted pages

### Scenario: menu.json clean
GIVEN `src/collections/menu.json`
WHEN searched for "Changelog", "Sign in", "Sign up"
THEN zero matches MUST be found

## REQ-G7: Footer no longer references deleted pages

### Scenario: Footer.astro clean
GIVEN `src/components/sections/Footer.astro`
WHEN searched for "Changelog", "Sign in", "Sign up", "/changelog", "/sign-in", "/sign-up"
THEN zero matches MUST be found

## REQ-G8: About no longer references changelog button

### Scenario: about.astro clean
GIVEN `src/pages/about.astro`
WHEN searched for "View Changelog" or "/changelog"
THEN zero matches MUST be found

## REQ-G9: Build succeeds after deletions

### Scenario: pnpm build passes
GIVEN all deletions in G1-G8 are applied
WHEN `pnpm build` runs
THEN it MUST exit with code 0 and no missing-import or missing-collection errors

---

## Group H — Menu and Navigation

## REQ-H1: Flat 6-item menu

### Scenario: menu.json structure
GIVEN `src/collections/menu.json`
WHEN inspected
THEN it MUST be a flat array (no `children` nesting)
AND MUST contain exactly 6 items: Inicio → `/`, Metodología → `/features`, Servicios → `/pricing`, Blog → `/blog`, Sobre nosotros → `/about`, Contacto → `/contact`

## REQ-H2: Elements not in public menu

### Scenario: Elements excluded
GIVEN `src/collections/menu.json`
WHEN searched for "Elements" or "/elements"
THEN zero matches MUST be found

## REQ-H3: All menu links resolve

### Scenario: No broken links in build
GIVEN `pnpm build` completes
WHEN each menu URL is checked against `dist/` output
THEN all 6 routes MUST have corresponding HTML files

---

## Group I — Config and Environment

## REQ-I1: site.js identity and metadata

### Scenario: site.js fields
GIVEN `src/config/site.js`
WHEN inspected
THEN `title` MUST be "GL Solutions"
AND `author` MUST be "Jorge González & Carlos Lameda"
AND `url` MUST resolve to "https://www.glsolutions.tech"
AND `mail` MUST be "hola@glsolutions.tech"
AND `meta.title` MUST contain "Spec Driven Development" and "Chile" or "LatAm"
AND `meta.description` MUST be 150-160 characters
AND `meta.keywords` MUST match REQ-A4

## REQ-I2: No invented social URLs

### Scenario: Social fields empty or commented
GIVEN `src/config/site.js`
WHEN `social.twitter` and `social.github` are inspected
THEN they MUST be empty strings or removed entirely

## REQ-I3: .env exists with correct PUBLIC_SITE_URL

### Scenario: Env file present and correct
GIVEN the project root
WHEN `.env` is read
THEN it MUST exist
AND `PUBLIC_SITE_URL` MUST be `https://www.glsolutions.tech`

## REQ-I4: Analytics IDs empty

### Scenario: No analytics configured
GIVEN `.env`
WHEN `PUBLIC_GA4_ID` and `PUBLIC_UMAMI_ID` are inspected
THEN they MUST be empty or commented out

## REQ-I5: astro.config.mjs site value

### Scenario: Astro site config correct
GIVEN `astro.config.mjs`
WHEN the `site` value is inspected (directly or via env sourcing)
THEN it MUST resolve to `https://www.glsolutions.tech`

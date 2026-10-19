# Aktaion — site vitrine v2

New 12-page, French-language Aktaion website. Static HTML, CSS and vanilla JS — no framework, no build dependencies, no runtime packages.

The visual language is adapted from the design tokens extracted from publicissapient.com: white-dominant editorial layout, large lightweight sans headlines, `#e90130` red accents, black panels, thin rules, pill buttons, sharp-cornered cards, a mega navigation and a full-bleed footer wordmark.

## Preview

Open `index.html` directly, or serve the folder (recommended, so fonts and relative links behave the same as when hosted):

```bash
python -m http.server 4370
```

Then visit <http://127.0.0.1:4370/>. Any static server works (`npx serve`, Live Server, etc.).

## Rebuild and verify

The files in the project root (`index.html`, `expertises.html`, …) are **generated**. Edit the sources under `_source/`, then run:

```bash
node _source/build.mjs   # writes the 12 root HTML files
node _source/check.mjs   # validates titles, descriptions, links, anchors, ids, tags
```

Node 18 or later is required. `check.mjs` checks that every page has exactly one `<h1>`, a `<title>` and meta description, no duplicate ids, balanced common tags, and that every internal link and `#anchor` resolves.

## Structure

```text
.
├── index.html … credits.html      Generated pages (do not edit by hand)
├── assets/
│   ├── css/site.css               Full design system, dossier cards and responsive rules
│   ├── js/site.js                 Header, menus, search, theme switch, accordions, filters, forms
│   ├── js/motion.js               Motion layer: kinetic text, counters, tilt, parallax, cursor
│   └── img/
│       ├── photos/                Local WebP illustrations, 640px and 1280px
│       ├── logos/                 Local Simple Icons SVGs used as CSS masks
│       ├── favicon.svg            Aktaion mark (red, default)
│       └── favicon-violet.svg     Aktaion mark (violet variant)
├── _source/
│   ├── layout.mjs                 Shared shell, header/mega nav, footer, search, UI helpers
│   ├── media.mjs                  Photo metadata, alt text, srcset and credit table
│   ├── pages.mjs                  All page content and metadata
│   ├── build.mjs                  Static generator
│   └── check.mjs                  Post-build validation
└── README.md
```

### Pages

| File | Page |
| --- | --- |
| `index.html` | Accueil |
| `expertises.html` | Expertises (hub) |
| `digitalisation.html` | Digitalisation des processus |
| `web-mobile.html` | Web, mobile & e-commerce |
| `marketing.html` | Marketing, création & audiovisuel |
| `secteurs.html` | Secteurs |
| `realisations.html` | Réalisations |
| `methode.html` | Méthode |
| `agence.html` | L’agence |
| `ressources.html` | Ressources |
| `contact.html` | Contact |
| `credits.html` | Crédits, licences & mentions (`noindex,follow`) |

Data & IA is covered as an anchored section of `expertises.html` (`expertises.html#data-ia`) rather than a separate page.

## Design system

Defined as CSS custom properties at the top of `assets/css/site.css`:

- **Colours** — `--red:#e90130`, `--red-deep:#cf0022`, `--red-soft:#fff0f2`, `--black:#000`, `--ink:#090d16`, `--white:#fff`, plus a grey ramp and `--line:#e3e3e3`.
- **Type** — Lexend Deca for display, Roboto for body, Roboto Mono for labels and eyebrows (loaded from Google Fonts with system fallbacks). Headlines use fluid `clamp()` sizes; small labels use wide letter-spacing and uppercase.
- **Layout** — 1536px container, fluid gutter `clamp(20px, 4.4vw, 64px)`, section rhythm `clamp(72px, 9vw, 128px)`.
- **Breakpoints** — 1280, 1180, 1024, 768 and 560px.
- **Motion** — scroll reveals, kinetic headlines, counters, stagger, parallax, a reading-progress bar, a timeline rail, dossier-card tilt, magnetic buttons and a custom cursor. Every effect is gated behind `prefers-reduced-motion`, Save-Data and pointer capability; the native cursor stays visible and there is no scroll-jacking.
- **Cards** — the “dossier” system (`.file-card`) adds an offset backing sheet, a red tab, a giant index number, crop marks, mono labels and a hover lift with image/detail reveal, while remaining inside the existing red/black/white art direction.

### Photography and logos

Photographs are local WebP files served at 640px and 1280px through `srcset`. They are generic illustrations from Pexels and Unsplash, never presented as Aktaion staff, clients, partners or premises. Each photo slot carries a visible “Illustration” stamp where relevant and an explicit caption when the subject could be misread; alt text describes the image, not a business claim. Sources and licences are listed on `credits.html` and generated from `PHOTO_CREDITS` in `_source/media.mjs`.

Tool and platform logos are local Simple Icons SVGs (WordPress, WooCommerce, Shopify, React, Flutter, Figma, Notion, Airtable, Odoo, Metabase, GitHub, Google Workspace, Miro…), displayed as CSS masks with a visible name and a “used nominatively, no affiliation implied” disclaimer. Social icons in the footer are real brand glyphs whose links are deliberate placeholders (`#`, “lien à compléter”) — no client or partner logos are invented or displayed.

Vector/CSS visuals remain in product and technical contexts (web/mobile and data/IA work cards, dashboards, web expertise visual) so photos do not pretend to be actual project deliverables.

## Red / violet theme switch

The header has one extra button, between search and the “Démarrer un projet” CTA: a round swatch split between the base red and the palette violet. It switches the whole site between:

- **Base (default)** — the original red design, untouched.
- **Violet** — exactly the same design, with only the red colour family replaced by the palette violet.

The mechanism is deliberately minimal. The `[data-theme="violet"]` block at the top of `assets/css/site.css` overrides **four custom properties only**:

| Token | Red (base) | Violet |
| --- | --- | --- |
| `--red` | `#e90130` | `#6E4293` |
| `--red-deep` | `#cf0022` | `#3B2057` |
| `--red-soft` | `#fff0f2` | `#F1EAF9` |
| `--red-rgb` | `233, 1, 48` | `110, 66, 147` |

Fonts, white/black/grey/blue surfaces, borders, shadows, spacing, typography and layout are not overridden anywhere. The choice is stored in `localStorage` under `aktaion-theme` (`violet` or absent), applied before first paint by a small inline script in `_source/layout.mjs`, and kept across pages and reloads. The favicon swaps to `favicon-violet.svg` while the violet theme is active; the button updates `aria-pressed`, its accessible label and its title. Without JavaScript, the site simply stays on the red base.

To adjust the violet itself, change only the four values in that block; do not add font or surface overrides there.

## Interactions

Implemented in `assets/js/site.js`:

- Sticky header with a compact state after scrolling.
- Red ↔ violet theme switch in the header, persisted in `localStorage` and applied before first paint.
- Desktop mega navigation on hover and keyboard focus.
- Mobile menu with expandable sub-menus, Escape to close, and automatic close on resize.
- Full-screen search with a client-side index of all pages and articles, live filtering, and Escape/overlay-click to close.
- Accessible FAQ accordions (`aria-expanded`, `aria-hidden`, animated max-height).
- Réalisations filters by expertise and sector, with a live count.
- Demo contact form with inline success confirmation.
- Demo newsletter form with inline confirmation.
- IntersectionObserver reveals, skipped when reduced motion is requested.
- Theme change animated with the View Transitions API when available, with a plain fallback.

Implemented in `assets/js/motion.js` (loads only when motion is allowed):

- Kinetic splitting of hero and page-hero headlines.
- Animated counters (2022, pôles, secteurs, phases) that settle on their final value.
- Staggered card entrances via `data-stagger`.
- Scroll progress bar, hide-on-scroll header and section parallax.
- Timeline rail on Méthode and vertical progression on the agency timeline.
- 3D tilt on dossier cards with pointer-tracked glare.
- Magnetic primary buttons and a “Ouvrir / Lire” custom cursor on cards.

The layer exits immediately when `prefers-reduced-motion: reduce` is set, when the browser reports Save-Data, or on coarse pointers for the cursor/tilt effects. It adds motion classes only after those checks, so content remains fully visible and usable without it.

## Content placeholders

Unknown business details are intentionally marked with square brackets rather than invented. Search for `[` before launch.

| Placeholder | Where |
| --- | --- |
| `[contact@aktaion.com]` | Header/footer contact links, contact page (the `mailto:` itself points to `contact@aktaion.com`) |
| `[Téléphone avec indicatif]`, `[Adresse, ville, pays]`, `[Horaires d’ouverture]` | Footer and contact page |
| `[Prénom Nom]`, `[Fonction]` | Agency team cards |
| `[Étape clé]`, `[Année]` | Agency timeline |

Shared contact details live in the `CONTACT` constant in `_source/layout.mjs`. Team and timeline content lives in `_source/pages.mjs`.

Other known gaps:

- The contact form and newsletter are **front-end demos** — they show a confirmation but send nothing. Wire them to a backend or form service before launch.
- Réalisation cards link to `contact.html` because no case-study detail pages exist yet.
- Articles on `ressources.html` are marked “Bientôt disponible” and are not linked to detail pages.
- Footer social links are placeholders (`href="#"`, “lien à compléter”). Replace them with the real Aktaion profiles; do not invent URLs.
- `credits.html` is linked from the footer and is `noindex,follow`. Update `PHOTO_CREDITS` in `_source/media.mjs` whenever a photo is added or replaced.

## Credits and licences

`credits.html` documents the provenance of every visual asset:

- **Photographs** — Pexels and Unsplash, under their respective licences; original source and licence links are in the table.
- **Logos and marks** — Simple Icons (CC0) rendered as masks; the named tools and platforms belong to their owners and are cited nominatively, with no implied partnership.
- **Aktaion mark** — the official symbol geometry, recoloured with `currentColor` for the red, violet and dark variants; no invented coral/navy lockup is used.
- **Type** — Lexend Deca and Roboto under the SIL Open Font License, served by Google Fonts.
- **Theme choice** — stored locally in `localStorage` (`aktaion-theme`); no analytics or tracking scripts are included.

## Accessibility notes

Skip link, landmark elements, one `<h1>` per page, visible focus styles, labelled form fields, `aria-current` navigation states, `aria-expanded` accordions, Escape handling for overlays, and reduced-motion support. Main content and navigation are usable without JavaScript; interactive filtering, the search index and closing overlays are enhancements.

The motion layer never removes the native cursor, never traps or hijacks scrolling, and never hides content behind an animation: reveals are skipped entirely under `prefers-reduced-motion`, `motion.js` exits before adding any motion class, and CSS zeroes transforms, counters remain at their final values, and the custom cursor/progress bar are not created. Decorative SVGs are `aria-hidden`; photos keep descriptive alt text and visible illustration stamps.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses CSS Grid, `clamp()`, `aspect-ratio`, logical properties and `backdrop-filter`; no transpilation step.

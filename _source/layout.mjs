/* ==========================================================================
   AKTAION V2 — gabarit partagé
   Header, méga-menu, recherche, menu mobile, footer, composants de section
   ========================================================================== */

import { AKTAION_SYMBOL_PATH, SOCIAL } from './brand.mjs';

/* --------------------------------------------------------------------------
   Icônes
   -------------------------------------------------------------------------- */

const ICONS = {
  arrow: '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  close: '<path d="m6 6 12 12"/><path d="M18 6 6 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M5.5 19.5c1.2-3.4 3.6-5 6.5-5s5.3 1.6 6.5 5"/>',
  download: '<path d="M12 4v11"/><path d="m7.5 11 4.5 4.5 4.5-4.5"/><path d="M5 20h14"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
  phone: '<path d="M7 3.5 9.5 4l1 4.5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4.5 1L20.5 17c0 2-1.5 3.5-3.5 3.5C9.5 20.5 3.5 14.5 3.5 7c0-2 1.5-3.5 3.5-3.5Z"/>',
  pin: '<path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
};

export function icon(name, cls = '') {
  const body = ICONS[name] || ICONS.arrow;
  return `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

/* --------------------------------------------------------------------------
   Marque
   -------------------------------------------------------------------------- */

export function mark(cls = '') {
  return `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" focusable="false">${AKTAION_SYMBOL_PATH}</svg>`;
}

export function socialIcon(name, cls = '') {
  const body = SOCIAL[name];
  if (!body) return '';
  return `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`;
}

export function socialLinks(cls = '') {
  const items = [
    ['linkedin', 'LinkedIn'],
    ['instagram', 'Instagram'],
    ['youtube', 'YouTube'],
  ];
  return `<div class="social-links${cls ? ` ${cls}` : ''}" role="group" aria-label="Réseaux sociaux">
    ${items.map(([key, label]) => `<a class="social-link" href="#" aria-label="${label}" title="${label} — lien à compléter" rel="noopener">${socialIcon(key)}</a>`).join('')}
  </div>`;
}

/* Mur de logos : marques utilisées à titre nominatif, jamais clients/partenaires. */
export function logoWall(items, { variant = 'light', title = 'Outils & technologies', note = true } = {}) {
  const rows = items.map(([slug, name]) => `<li class="logo-tile" data-tool="${slug}" style="--logo:url('../../assets/img/logos/${slug}.svg')">
      <span class="logo-tile__mark" aria-hidden="true"></span>
      <span class="logo-tile__name">${name}</span>
    </li>`).join('');
  return `<div class="logo-wall logo-wall--${variant} reveal" role="group" aria-label="${title}">
    <div class="logo-wall__head">
      <span class="mono">${title}</span>
      <span class="logo-wall__count">${String(items.length).padStart(2, '0')}</span>
    </div>
    <ul class="logo-wall__list">${rows}</ul>
    ${note ? `<p class="logo-note">Outils utilisés — aucune affiliation implicite. Les marques et logos appartiennent à leurs propriétaires respectifs.</p>` : ''}
  </div>`;
}

/* Titre kinétique : le texte reste lisible avant l’exécution de motion.js. */
export function kinetic(text, cls = '') {
  return `<span class="kinetic${cls ? ` ${cls}` : ''}" data-kinetic>${text}</span>`;
}

export function counter(value, { pad = 2, suffix = '', prefix = '', cls = '' } = {}) {
  const display = `${prefix}${String(value).padStart(pad, '0')}${suffix}`;
  return `<span class="counter${cls ? ` ${cls}` : ''}" data-count-to="${value}" data-count-pad="${pad}" data-count-prefix="${prefix}" data-count-suffix="${suffix}">${display}</span>`;
}

export function brand(href = 'index.html') {
  return `<a class="brand" href="${href}" aria-label="Aktaion — accueil">${mark('brand__mark')}<span class="brand__word">aktaion<i>.</i></span></a>`;
}

/* --------------------------------------------------------------------------
   Données de navigation
   -------------------------------------------------------------------------- */

export const POLES = [
  {
    num: '01',
    key: 'digitalisation',
    short: 'Digitalisation',
    title: 'Digitalisation des processus',
    href: 'digitalisation.html',
    text: 'Numériser les procédures pour gagner en fiabilité, en traçabilité et en rapidité.',
    tags: ['Projets', 'Suivi-évaluation', 'GED', 'Finance'],
    viz: 'process',
  },
  {
    num: '02',
    key: 'web-mobile',
    short: 'Web & mobile',
    title: 'Web, mobile & e-commerce',
    href: 'web-mobile.html',
    text: 'Sites vitrines, boutiques en ligne et applications mobiles pensés pour convertir.',
    tags: ['Sites', 'E-commerce', 'Applications', 'UX/UI'],
    viz: 'web',
  },
  {
    num: '03',
    key: 'data-ia',
    short: 'Data & IA',
    title: 'Data & intelligence artificielle',
    href: 'expertises.html#data-ia',
    text: 'Données structurées, tableaux de bord et IA appliquée aux métiers.',
    tags: ['BI', 'Automatisation', 'IA', 'Décision'],
    viz: 'data',
  },
  {
    num: '04',
    key: 'marketing',
    short: 'Marketing',
    title: 'Marketing, création & audiovisuel',
    href: 'marketing.html',
    text: 'Stratégie, contenus, vidéo et identité visuelle pour rendre votre organisation visible.',
    tags: ['SEO', 'Social', 'Vidéo', 'Identité'],
    viz: 'marketing',
  },
];

const NAV = [
  { key: 'expertises', label: 'Expertises', href: 'expertises.html', mega: true },
  { key: 'secteurs', label: 'Secteurs', href: 'secteurs.html' },
  { key: 'realisations', label: 'Réalisations', href: 'realisations.html' },
  { key: 'methode', label: 'Méthode', href: 'methode.html' },
  { key: 'agence', label: 'L’agence', href: 'agence.html' },
  { key: 'ressources', label: 'Ressources', href: 'ressources.html' },
];

/* --------------------------------------------------------------------------
   Header + méga-menu
   -------------------------------------------------------------------------- */

function megaMenu() {
  return `<div class="mega">
    <div class="mega__head">
      <span class="mono">Quatre pôles d’expertise</span>
      <a href="expertises.html">Voir tous les pôles ${icon('arrowUpRight')}</a>
    </div>
    <div class="mega__grid">
      ${POLES.map((pole) => `<a class="mega__link" href="${pole.href}">
        <span>${pole.num}</span>
        <strong>${pole.title}</strong>
        <span>${pole.text}</span>
      </a>`).join('')}
    </div>
    <div class="mega__foot">
      <p>Une seule équipe, de l’idée à la mise en ligne.</p>
      <a class="btn btn--black btn--sm" href="contact.html">Parler de votre projet ${icon('arrow')}</a>
    </div>
  </div>`;
}

export function header(active = '') {
  const nav = NAV.map((item) => {
    const current = item.key === active ? ' aria-current="page"' : '';
    if (item.mega) {
      return `<div class="nav__item nav__item--mega">
        <a class="nav__link" href="${item.href}"${current}>${item.label} ${icon('chevron')}</a>
        ${megaMenu()}
      </div>`;
    }
    return `<div class="nav__item"><a class="nav__link" href="${item.href}"${current}>${item.label}</a></div>`;
  }).join('');

  return `<header class="site-header" data-header>
    <div class="container">
      ${brand()}
      <nav class="nav" aria-label="Navigation principale">${nav}</nav>
      <div class="header__actions">
        <button class="icon-btn" type="button" data-search-open aria-label="Ouvrir la recherche">${icon('search')}</button>
        <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-pressed="false" aria-label="Passer à la version violette" title="Passer à la version violette"><span class="theme-toggle__swatch" aria-hidden="true"></span></button>
        <a class="btn btn--red header__cta" href="contact.html">Démarrer un projet ${icon('arrow')}</a>
        <button class="nav-toggle" type="button" data-menu-toggle aria-controls="mobile-menu" aria-expanded="false" aria-label="Ouvrir le menu">
          <span></span><span></span>
        </button>
      </div>
    </div>
  </header>`;
}

/* --------------------------------------------------------------------------
   Bandeau d'annonce
   -------------------------------------------------------------------------- */

export function announce() {
  return `<div class="announce">
    <div class="container">
      <span>Agence digitale en Afrique &amp; à l’international — depuis 2022</span>
      <a href="contact.html">Parlons de votre projet ${icon('arrow')}</a>
    </div>
  </div>`;
}

/* --------------------------------------------------------------------------
   Recherche
   -------------------------------------------------------------------------- */

const SEARCH_ITEMS = [
  ['Accueil', 'index.html', 'Page'],
  ['Expertises', 'expertises.html', 'Page'],
  ['Digitalisation des processus', 'digitalisation.html', 'Pôle 01'],
  ['Web, mobile & e-commerce', 'web-mobile.html', 'Pôle 02'],
  ['Data & intelligence artificielle', 'expertises.html#data-ia', 'Pôle 03'],
  ['Marketing, création & audiovisuel', 'marketing.html', 'Pôle 04'],
  ['Secteurs public & privé', 'secteurs.html', 'Page'],
  ['Réalisations', 'realisations.html', 'Page'],
  ['Méthode en cinq phases', 'methode.html', 'Page'],
  ['L’agence', 'agence.html', 'Page'],
  ['Ressources & articles', 'ressources.html', 'Page'],
  ['FAQ', 'index.html#faq', 'Accueil'],
  ['Contact & devis', 'contact.html', 'Page'],
];

function searchOverlay() {
  return `<div class="search-overlay" id="search-overlay" hidden>
    <div class="search-overlay__panel" role="dialog" aria-modal="true" aria-label="Rechercher sur le site">
      <div class="search-overlay__head">
        <span class="mono">Recherche</span>
        <button class="icon-btn" type="button" data-search-close aria-label="Fermer la recherche">${icon('close')}</button>
      </div>
      <label class="visually-hidden" for="site-search">Rechercher sur le site</label>
      <input type="search" id="site-search" placeholder="Rechercher une expertise, une page…" autocomplete="off">
      <ul class="search-results" data-search-results>
        ${SEARCH_ITEMS.map(([label, href, type]) => `<li><a href="${href}">${label}<span>${type}</span></a></li>`).join('')}
      </ul>
    </div>
  </div>`;
}

/* --------------------------------------------------------------------------
   Menu mobile
   -------------------------------------------------------------------------- */

function mobileMenu(active) {
  const current = (key) => (key === active ? ' aria-current="page"' : '');
  return `<div class="mobile-menu" id="mobile-menu" hidden>
    <div class="container">
      <div class="mobile-menu__inner">
        <div class="mobile-menu__top">
          ${brand()}
          <button class="mobile-menu__close" type="button" data-menu-close aria-label="Fermer le menu">${icon('close')}</button>
        </div>
        <details>
          <summary>Expertises ${icon('chevron')}</summary>
          <div class="mobile-sub">
            ${POLES.map((pole) => `<a href="${pole.href}">${pole.num} — ${pole.title}</a>`).join('')}
            <a href="expertises.html">Tous les pôles</a>
          </div>
        </details>
        ${NAV.filter((item) => !item.mega).map((item) => `<a class="mobile-link" href="${item.href}"${current(item.key)}>${item.label} ${icon('arrowUpRight')}</a>`).join('')}
        <a class="btn btn--red" href="contact.html">Démarrer un projet ${icon('arrow')}</a>
      </div>
    </div>
  </div>`;
}

/* --------------------------------------------------------------------------
   Footer
   -------------------------------------------------------------------------- */

function footerNewsletter() {
  return `<form class="footer__news" data-newsletter>
    <label for="footer-email">Newsletter — un message utile, sans spam</label>
    <div class="footer__news-row">
      <input id="footer-email" name="email" type="email" placeholder="vous@organisation.com" required>
      <button type="submit">S’abonner</button>
    </div>
    <p class="footer__note" data-newsletter-note hidden></p>
  </form>`;
}

export function footer() {
  return `<footer class="site-footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          ${brand()}
          <p>Agence digitale en Afrique et à l’international : digitalisation des processus, web, mobile, data, IA, marketing digital et audiovisuel. Depuis 2022.</p>
          ${footerNewsletter()}
          ${socialLinks('footer__social')}
        </div>
        <div class="footer__col">
          <h3>Expertises</h3>
          <a href="digitalisation.html">Digitalisation</a>
          <a href="web-mobile.html">Web &amp; mobile</a>
          <a href="expertises.html#data-ia">Data &amp; IA</a>
          <a href="marketing.html">Marketing &amp; création</a>
        </div>
        <div class="footer__col">
          <h3>L’agence</h3>
          <a href="agence.html">Qui sommes-nous</a>
          <a href="methode.html">Notre méthode</a>
          <a href="realisations.html">Réalisations</a>
          <a href="secteurs.html">Secteurs</a>
        </div>
        <div class="footer__col">
          <h3>Ressources</h3>
          <a href="ressources.html">Articles</a>
          <a href="ressources.html#guides">Guides</a>
          <a href="index.html#faq">Questions fréquentes</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer__col">
          <h3>Contact</h3>
          <a href="mailto:contact@aktaion.com">[contact@aktaion.com]</a>
          <a href="contact.html">[Téléphone avec indicatif]</a>
          <a href="contact.html">[Adresse, ville, pays]</a>
        </div>
      </div>
      <span class="footer__word">aktaion<i>.</i></span>
      <div class="footer__bottom">
        <span>© 2026 AKTAION SARL — Tous droits réservés</span>
        <div class="footer__legal">
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
          <a href="credits.html">Crédits &amp; licences</a>
        </div>
      </div>
    </div>
  </footer>`;
}

/* --------------------------------------------------------------------------
   Gabarit de page
   -------------------------------------------------------------------------- */

export function layout({ title, description, active = '', body, fullTitle = '', preload = '', robots = '' }) {
  const pageTitle = fullTitle || `${title} — Aktaion`;
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${pageTitle}</title>
  <meta name="description" content="${description}">
  ${robots ? `<meta name="robots" content="${robots}">` : ''}
  <meta name="theme-color" content="#ffffff" data-theme-color>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Aktaion">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${description}">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:image" content="assets/img/og-aktaion.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Aktaion — agence digitale">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${pageTitle}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="assets/img/og-aktaion.png">
  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml" data-theme-favicon>
  <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">
  ${preload}
  <script>(function(){try{if(localStorage.getItem('aktaion-theme')==='violet'){document.documentElement.setAttribute('data-theme','violet');var f=document.querySelector('[data-theme-favicon]');if(f)f.setAttribute('href','assets/img/favicon-violet.svg');}}catch(e){}})();</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;500;600&amp;family=Roboto+Mono:wght@400;500&amp;family=Roboto:wght@400;500;700&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/site.css">
</head>
<body>
  <div class="scroll-progress" data-scroll-progress aria-hidden="true"></div>
  <a class="skip-link" href="#main">Aller au contenu</a>
  ${announce()}
  ${header(active)}
  ${searchOverlay()}
  ${mobileMenu(active)}
  <main id="main">
${body}
  </main>
  ${footer()}
  <script src="assets/js/site.js" defer></script>
  <script src="assets/js/motion.js" defer></script>
</body>
</html>
`;
}

/* --------------------------------------------------------------------------
   Composants réutilisables
   -------------------------------------------------------------------------- */

export function btn(label, href, variant = 'red', { size = '', arrow = true, attrs = '', magnetic = true } = {}) {
  return `<a class="btn btn--${variant}${size ? ` btn--${size}` : ''}" href="${href}"${magnetic ? ' data-magnetic' : ''}${attrs ? ` ${attrs}` : ''}>${label}${arrow ? icon('arrow') : ''}</a>`;
}

export function arrowLink(label, href, cls = '') {
  return `<a class="link-arrow${cls ? ` ${cls}` : ''}" href="${href}">${label} ${icon('arrow')}</a>`;
}

export function pageHero({ eyebrow, title, lead, crumbs = [], actions = '', aside = '' }) {
  const trail = [{ label: 'Accueil', href: 'index.html' }, ...crumbs];
  return `<section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Fil d’Ariane">
        ${trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return isLast
            ? `<span aria-current="page">${crumb.label}</span>`
            : `<a href="${crumb.href}">${crumb.label}</a><span aria-hidden="true">/</span>`;
        }).join('')}
      </nav>
      <div class="page-hero__grid">
        <div>
          <span class="eyebrow">${eyebrow}</span>
          <h1 class="h1 page-hero__title">${kinetic(title)}</h1>
          <p class="lead page-hero__lead">${lead}</p>
          ${actions ? `<div class="hero__actions">${actions}</div>` : ''}
        </div>
        ${aside}
      </div>
    </div>
  </section>`;
}

export function sectionHead({ eyebrow, title, lead = '', link = '', simple = false }) {
  return `<div class="section-head${simple ? ' section-head--simple' : ''} reveal">
    <div>
      ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
      <h2 class="h2${eyebrow ? ' mt-24' : ''}">${title}</h2>
    </div>
    ${lead || link ? `<div class="section-head__lead">
      ${lead ? `<p class="lead">${lead}</p>` : ''}
      ${link ? `<div class="mt-24">${link}</div>` : ''}
    </div>` : ''}
  </div>`;
}

export function pointsCard(title, items) {
  return `<div class="points-card file-card file-card--points reveal" data-tilt>
    <span class="file-card__tab" aria-hidden="true">Repères</span>
    <h2>${title}</h2>
    <ul>${items.map((item) => `<li>${icon('check')}<span>${item}</span></li>`).join('')}</ul>
    <span class="file-card__crop file-card__crop--br" aria-hidden="true"></span>
  </div>`;
}

export function viz(type, label = '') {
  const charts = [38, 58, 44, 72, 64, 88, 54, 78];
  const bodies = {
    process: `<span class="viz__grid"></span>
      <div class="mock-window">
        <div class="mock-window__bar"><i></i><i></i><i></i><em>aktaion.app</em></div>
        <div class="mock-window__body">
          <span class="mock-line mock-line--mid"></span>
          <span class="mock-line mock-line--short"></span>
          <div class="mock-progress"><b></b></div>
          <span class="mock-line"></span>
          <span class="mock-line mock-line--mid"></span>
        </div>
      </div>`,
    data: `<span class="viz__grid"></span>
      <div class="mock-chart">${charts.map((height) => `<i style="--h:${height}%"></i>`).join('')}</div>
      <div class="mock-kpi"><b>360°</b><em>Vue consolidée</em></div>`,
    web: `<span class="viz__grid"></span>
      <div class="mock-browser">
        <div class="mock-browser__bar"><i></i><i></i><i></i><em>aktaion.com</em></div>
        <div class="mock-browser__body">
          <div class="mock-browser__hero"><i></i><i></i><b></b></div>
          <div class="mock-browser__cols"><i></i><i></i><i></i></div>
        </div>
      </div>`,
    mobile: `<span class="viz__grid"></span>
      <div class="mock-phone"><div class="mock-phone__screen"><i></i><i></i><b></b><b></b></div></div>`,
    marketing: `<span class="viz__grid"></span><div class="viz__orbit"></div><div class="viz__big">Aa</div>`,
    video: `<span class="viz__grid"></span><div class="mock-play"></div><div class="mock-timeline"><b></b></div>`,
    sprint: `<span class="viz__grid"></span><div class="mock-sprint"><span>01</span><span>02</span><span>03</span><span>04</span></div>`,
    projet: `<span class="viz__grid"></span>
      <div class="mock-kanban">
        <div class="mock-kanban__col"><em>À faire</em><i></i><i></i><i></i></div>
        <div class="mock-kanban__col"><em>En cours</em><i></i><i></i></div>
        <div class="mock-kanban__col"><em>Validé</em><i></i><i></i><i></i></div>
      </div>`,
    public: `<span class="viz__grid"></span><div class="mock-ring"></div>`,
    prive: `<span class="viz__grid"></span><div class="mock-grid-mark"><i></i><i></i><i></i><i></i></div>`,
  };
  return `<div class="viz viz--${type}" aria-hidden="true">${bodies[type] || bodies.process}${label ? `<span class="viz__label">${label}</span>` : ''}</div>`;
}

export function cover(color, index, tag) {
  return `<div class="cover cover--${color}" aria-hidden="true">
    <span class="cover__index">${index}</span>
    <span class="cover__tag">${tag}</span>
  </div>`;
}

export function faq(items, prefix = 'faq') {
  return `<div class="faq">
    ${items.map((item, index) => `<div class="faq__item">
      <button class="faq__btn" type="button" aria-expanded="false" aria-controls="${prefix}-${index + 1}">
        <span>${item.q}</span>
        <span class="faq__icon" aria-hidden="true"></span>
      </button>
      <div class="faq__panel" id="${prefix}-${index + 1}" aria-hidden="true"><p>${item.a}</p></div>
    </div>`).join('')}
  </div>`;
}

export function ctaBand({
  eyebrow = 'Parlons de votre projet',
  title = 'Une idée, un besoin ou une procédure à transformer ?',
  text = 'Racontez-nous votre contexte. Nous revenons vers vous avec une première lecture et une feuille de route claire.',
  primary = btn('Démarrer un projet', 'contact.html', 'red'),
  secondary = btn('Voir nos expertises', 'expertises.html', 'ghost-light'),
} = {}) {
  return `<section class="cta-band">
    <div class="container">
      <div>
        <span class="eyebrow eyebrow--light">${eyebrow}</span>
        <h2>${title}</h2>
        <p>${text}</p>
      </div>
      <div class="hero__actions mt-0">${primary}${secondary}</div>
    </div>
  </section>`;
}

/* Données de contact partagées (emplacements d'origine, à compléter). */
export const CONTACT = {
  email: '[contact@aktaion.com]',
  phone: '[Téléphone avec indicatif]',
  address: '[Adresse, ville, pays]',
  hours: '[Horaires d’ouverture]',
  emailHref: 'mailto:contact@aktaion.com',
};

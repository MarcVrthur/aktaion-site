/* ==========================================================================
   AKTAION V2 — contenu des pages
   ========================================================================== */

import {
  layout,
  btn,
  arrowLink,
  pageHero,
  sectionHead,
  pointsCard,
  viz,
  cover,
  faq,
  ctaBand,
  icon,
  mark,
  logoWall,
  kinetic,
  counter,
  POLES,
  CONTACT,
} from './layout.mjs';

import {
  photoFigure,
  photoImg,
  mediaBand,
  photoPreload,
  PHOTO_CREDITS,
} from './media.mjs';

/* --------------------------------------------------------------------------
   Outils cités à titre nominatif (aucune affiliation implicite)
   -------------------------------------------------------------------------- */

const TOOLS = {
  home: [
    ['wordpress', 'WordPress'], ['woocommerce', 'WooCommerce'], ['shopify', 'Shopify'],
    ['react', 'React'], ['flutter', 'Flutter'], ['figma', 'Figma'],
    ['notion', 'Notion'], ['airtable', 'Airtable'], ['odoo', 'Odoo'], ['metabase', 'Metabase'],
  ],
  expertises: [
    ['wordpress', 'WordPress'], ['react', 'React'], ['nextdotjs', 'Next.js'],
    ['flutter', 'Flutter'], ['figma', 'Figma'], ['python', 'Python'],
    ['postgresql', 'PostgreSQL'], ['metabase', 'Metabase'], ['tensorflow', 'TensorFlow'],
    ['googleanalytics', 'Google Analytics'],
  ],
  digitalisation: [
    ['odoo', 'Odoo'], ['airtable', 'Airtable'], ['notion', 'Notion'],
    ['googlesheets', 'Google Sheets'], ['googledrive', 'Google Drive'], ['wordpress', 'WordPress'],
    ['metabase', 'Metabase'], ['n8n', 'n8n'], ['zapier', 'Zapier'], ['make', 'Make'],
  ],
  web: [
    ['wordpress', 'WordPress'], ['woocommerce', 'WooCommerce'], ['shopify', 'Shopify'],
    ['webflow', 'Webflow'], ['react', 'React'], ['nextdotjs', 'Next.js'],
    ['flutter', 'Flutter'], ['figma', 'Figma'], ['tailwindcss', 'Tailwind CSS'],
    ['typescript', 'TypeScript'],
  ],
  marketing: [
    ['meta', 'Meta'], ['googleads', 'Google Ads'], ['googleanalytics', 'Google Analytics'],
    ['googletagmanager', 'Google Tag Manager'], ['tiktok', 'TikTok'], ['youtube', 'YouTube'],
    ['mailchimp', 'Mailchimp'], ['brevo', 'Brevo'], ['figma', 'Figma'],
    ['davinciresolve', 'DaVinci Resolve'],
  ],
  methode: [
    ['figma', 'Figma'], ['notion', 'Notion'], ['miro', 'Miro'], ['github', 'GitHub'],
    ['jira', 'Jira'], ['trello', 'Trello'], ['asana', 'Asana'], ['clickup', 'ClickUp'],
    ['googledrive', 'Google Drive'], ['googlesheets', 'Google Sheets'],
  ],
  agence: [
    ['figma', 'Figma'], ['notion', 'Notion'], ['miro', 'Miro'], ['github', 'GitHub'],
    ['google', 'Google Workspace'], ['gmail', 'Gmail'], ['airtable', 'Airtable'],
    ['googledrive', 'Google Drive'],
  ],
};

/* --------------------------------------------------------------------------
   Petits constructeurs locaux
   -------------------------------------------------------------------------- */

function chips(items) {
  return `<ul class="chip-list">${items.map((item) => `<li class="chip">${item}</li>`).join('')}</ul>`;
}

function panel({ num = '', title, text = '', bullets = [], extra = '', cls = '' }) {
  return `<article class="panel${cls ? ` ${cls}` : ''} reveal">
    ${num ? `<span class="panel__num">${num}</span>` : ''}
    <h3 class="h4">${title}</h3>
    ${text ? `<p>${text}</p>` : ''}
    ${bullets.length ? `<ul class="stake-list">${bullets.map((item) => `<li>${item}</li>`).join('')}</ul>` : ''}
    ${extra}
  </article>`;
}

function phase({ num, title, tag, text, bullets = [], result = '', accent = false, photo = '' }) {
  return `<li class="phase${accent ? ' phase--accent' : ''} reveal">
    <div class="phase__head">
      <span class="phase__num">${num}</span>
      <h3 class="h3">${title}</h3>
      ${tag ? `<span class="phase__tag">${tag}</span>` : ''}
    </div>
    <div class="phase__body">
      ${photo ? photoFigure(photo, {
        className: 'phase__media',
        ratio: '21 / 9',
        sizes: '(min-width: 1024px) 56vw, 100vw',
        caption: '',
        stamp: true,
      }) : ''}
      ${text ? `<p class="body">${text}</p>` : ''}
      ${bullets.length ? `<ul class="phase__bullets">${bullets.map((item) => `<li>${icon('check')}<span>${item}</span></li>`).join('')}</ul>` : ''}
      ${result ? `<span class="phase__result"><b>Résultat</b> ${result}</span>` : ''}
    </div>
  </li>`;
}

function workCard({
  index = '',
  title,
  meta,
  vizType = '',
  label = '',
  photo = '',
  tags = [],
  href = 'contact.html',
  category = '',
  id = '',
}) {
  const detail = label || title;
  const media = `<div class="file-card__media${photo ? '' : ' file-card__media--viz'}">
    ${photo
      ? photoImg(photo, { sizes: '(min-width: 1024px) 48vw, 100vw' })
      : viz(vizType, detail)}
    ${photo ? '<span class="media__stamp">Illustration</span>' : ''}
    <span class="file-card__detail"><span>${detail}</span><span>Ouvrir le dossier</span></span>
  </div>`;

  return `<a class="file-card file-card--work reveal" href="${href}" data-tilt data-cursor="Ouvrir"${category ? ` data-card data-category="${category}"` : ''}${id ? ` id="${id}"` : ''} aria-label="${title} — ${meta}">
    <span class="file-card__tab" aria-hidden="true">Dossier ${index || '—'}</span>
    <span class="file-card__glare" aria-hidden="true"></span>
    ${media}
    <span class="file-card__crop" aria-hidden="true"></span>
    <div class="file-card__body">
      <div class="file-card__top">
        <p class="file-card__meta">${meta}</p>
        ${index ? `<span class="file-card__index" aria-hidden="true">${index}</span>` : ''}
      </div>
      <h3 class="file-card__title">${title}</h3>
      <div class="file-card__foot">
        <div class="file-card__tags">${tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
        <span class="file-card__arrow" aria-hidden="true">${icon('arrowUpRight')}</span>
      </div>
    </div>
  </a>`;
}

function articleCard({ id = '', category, color = 'grey', index, title, text, linked = false, photo = '' }) {
  const media = `<div class="file-card__media${photo ? '' : ' file-card__media--cover'}">
    ${photo ? photoImg(photo, { sizes: '(min-width: 1024px) 32vw, 100vw' }) : cover(color, index, category)}
    ${photo ? '<span class="media__stamp">Illustration</span>' : ''}
    <span class="file-card__detail"><span>${category}</span><span>${linked ? 'Lire la ressource' : 'Bientôt disponible'}</span></span>
  </div>`;

  const body = `<div class="file-card__body">
    <div class="file-card__top">
      <p class="file-card__meta">${category} · Article</p>
      <span class="file-card__index" aria-hidden="true">${index}</span>
    </div>
    <h3 class="file-card__title">${title}</h3>
    <p class="file-card__text">${text}</p>
    <div class="file-card__foot">
      <span class="file-card__status">${linked ? 'Lire la ressource' : 'Bientôt disponible'}</span>
      ${linked ? `<span class="file-card__arrow" aria-hidden="true">${icon('arrowUpRight')}</span>` : ''}
    </div>
  </div>`;

  if (linked) {
    return `<a class="file-card file-card--article reveal" href="ressources.html#${id}" data-tilt data-cursor="Lire">${media}${body}</a>`;
  }
  return `<article class="file-card file-card--article reveal"${id ? ` id="${id}"` : ''} data-card data-category="${category}" data-tilt>${media}${body}</article>`;
}

function poleCard(pole) {
  return `<a class="file-card file-card--pole reveal" href="${pole.href}" data-tilt data-cursor="Explorer">
    <span class="file-card__tab" aria-hidden="true">Dossier ${pole.num}</span>
    <span class="file-card__glare" aria-hidden="true"></span>
    <span class="file-card__crop" aria-hidden="true"></span>
    <div class="file-card__body">
      <div class="file-card__top">
        <p class="file-card__meta">${pole.short} · Pôle d’expertise</p>
        <span class="file-card__index" aria-hidden="true">${pole.num}</span>
      </div>
      <h3 class="file-card__title">${pole.title}</h3>
      <p class="file-card__text">${pole.text}</p>
      <div class="file-card__foot">
        <div class="file-card__tags">${pole.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
        <span class="file-card__arrow" aria-hidden="true">${icon('arrowUpRight')}</span>
      </div>
    </div>
  </a>`;
}

function sectorCard({ variant, id, index, label, title, text, tags, photo }) {
  return `<a class="file-card file-card--sector file-card--${variant} reveal" href="secteurs.html#${id}" data-tilt data-cursor="Explorer">
    <span class="file-card__tab" aria-hidden="true">${label}</span>
    <span class="file-card__glare" aria-hidden="true"></span>
    <span class="file-card__crop" aria-hidden="true"></span>
    <div class="file-card__media">
      ${photoImg(photo, { sizes: '(min-width: 768px) 48vw, 100vw' })}
      <span class="media__stamp">Illustration</span>
      <span class="file-card__detail"><span>${label}</span><span>Explorer le secteur</span></span>
    </div>
    <div class="file-card__body">
      <div class="file-card__top">
        <p class="file-card__meta">${label}</p>
        <span class="file-card__index" aria-hidden="true">${index}</span>
      </div>
      <h3 class="file-card__title">${title}</h3>
      <p class="file-card__text">${text}</p>
      <div class="file-card__foot">
        <div class="file-card__tags">${tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
        <span class="file-card__arrow" aria-hidden="true">${icon('arrowUpRight')}</span>
      </div>
    </div>
  </a>`;
}

function teamCard(index) {
  return `<article class="file-card file-card--team reveal" data-tilt>
    <span class="file-card__tab" aria-hidden="true">Équipe</span>
    <span class="file-card__crop" aria-hidden="true"></span>
    <div class="file-card__media">
      ${mark('team-card__mark')}
      <span class="media__stamp">Profil à venir</span>
    </div>
    <div class="file-card__body">
      <div class="file-card__top">
        <p class="file-card__meta">Équipe · ${index}</p>
        <span class="file-card__index" aria-hidden="true">${index}</span>
      </div>
      <h3 class="file-card__title">[Prénom Nom]</h3>
      <p class="file-card__text">[Fonction]</p>
    </div>
  </article>`;
}

function solutionLink(label, href = 'contact.html') {
  return `<a class="solution-link" href="${href}"><span>${label}</span>${icon('arrowUpRight')}</a>`;
}

function filters(categories, count) {
  return `<div class="filters" data-filter-group role="group" aria-label="Filtrer les cartes">
    ${categories.map((category, index) => `<button class="filter${index === 0 ? ' is-active' : ''}" type="button" data-filter="${category}" aria-pressed="${index === 0 ? 'true' : 'false'}">${category}</button>`).join('')}
    <span class="mono" data-count>${count}</span>
  </div>`;
}

function faqLayout({ eyebrow, title, lead, items, prefix, link = arrowLink('Poser votre question', 'contact.html') }) {
  return `<div class="container">
    <div class="faq-layout">
      <div class="reveal">
        <span class="eyebrow">${eyebrow}</span>
        <h2 class="h2 mt-24">${title}</h2>
        <p class="lead mt-24">${lead}</p>
        <div class="mt-24">${link}</div>
      </div>
      ${faq(items, prefix)}
    </div>
  </div>`;
}

function contactCard() {
  return `<div class="info-card file-card file-card--info reveal">
    <span class="file-card__tab" aria-hidden="true">Fiche 01</span>
    <span class="file-card__crop file-card__crop--br" aria-hidden="true"></span>
    <h2>Coordonnées</h2>
    <ul>
      <li><a href="${CONTACT.emailHref}">${CONTACT.email}</a></li>
      <li>${CONTACT.phone}</li>
      <li>${CONTACT.address}</li>
      <li>${CONTACT.hours}</li>
    </ul>
  </div>`;
}

function nextStepsCard() {
  return `<div class="info-card file-card file-card--info reveal">
    <span class="file-card__tab" aria-hidden="true">Fiche 02</span>
    <span class="file-card__crop file-card__crop--br" aria-hidden="true"></span>
    <h2>Et ensuite ?</h2>
    <ol class="step-list">
      <li><b>1</b><span><strong>Atelier de découverte</strong><em>Premier échange pour comprendre le contexte, les objectifs et les contraintes.</em></span></li>
      <li><b>2</b><span><strong>Proposition</strong><em>Feuille de route priorisée et offre adaptée au budget.</em></span></li>
      <li><b>3</b><span><strong>Premier sprint</strong><em>Un premier résultat concret, présenté pour validation.</em></span></li>
    </ol>
  </div>`;
}

/* --------------------------------------------------------------------------
   ACCUEIL
   -------------------------------------------------------------------------- */

const home = layout({
  title: 'Accueil',
  fullTitle: 'Aktaion — L’agence digitale qui donne vie à vos idées',
  description:
    'Aktaion, agence digitale en Afrique et à l’international : digitalisation des processus, web, mobile, data, IA, marketing digital et audiovisuel. Depuis 2022.',
  active: 'accueil',
  preload: photoPreload('hero-atelier'),
  body: `
<section class="hero">
  <div class="container">
    <div class="hero__grid">
      <div>
        <div class="hero__eyebrow">
          <span class="eyebrow">Agence digitale · Afrique &amp; international</span>
          <span class="hero__loc">Abidjan · Côte d’Ivoire</span>
        </div>
        <h1 class="display hero__title">${kinetic('Nous donnons vie à vos idées <em>digitales.</em>')}</h1>
        <p class="lead hero__lead">L’agence digitale qui donne vie à vos idées en Afrique et au-delà. Nous concevons des outils, des sites et des contenus qui rendent vos activités plus claires, plus visibles et plus efficaces.</p>
        <div class="hero__actions">
          ${btn('Démarrer un projet', 'contact.html', 'red', { size: 'lg' })}
          ${btn('Explorer nos expertises', 'expertises.html', 'outline', { size: 'lg' })}
        </div>
        <div class="hero__meta">
          <span>Digitalisation</span>
          <span>Web &amp; mobile</span>
          <span>Data &amp; IA</span>
          <span>Marketing &amp; création</span>
        </div>
      </div>
      <div class="hero__visual" aria-hidden="true">
        <span class="hero__caption">Aktaion — depuis 2022</span>
        ${mark('hero__mark')}
        <span class="hero__ring"></span>
        <span class="hero__dot"></span>
        <figure class="hero__photo">
          ${photoImg('hero-atelier', {
            sizes: '(min-width: 1180px) 42vw, 92vw',
            loading: 'eager',
            fetchpriority: 'high',
          })}
          <span class="media__stamp">Photo d’illustration</span>
        </figure>
        <span class="hero-chip hero-chip--1">Conception <b>01</b></span>
        <span class="hero-chip hero-chip--2">Développement <b>02</b></span>
        <span class="hero-chip hero-chip--3">Déploiement <b>03</b></span>
        <span class="hero-chip hero-chip--4">Accompagnement <b>04</b></span>
      </div>
    </div>
  </div>
</section>

<div class="marquee">
  <div class="marquee__track">
    <div class="marquee__group">
      ${['Secteur public', 'Institutions', 'Collectivités', 'Entreprises', 'PME', 'Startups', 'Afrique &amp; international'].map((item) => `<span class="marquee__item">${item}</span>`).join('')}
    </div>
    <div class="marquee__group" aria-hidden="true">
      ${['Secteur public', 'Institutions', 'Collectivités', 'Entreprises', 'PME', 'Startups', 'Afrique &amp; international'].map((item) => `<span class="marquee__item">${item}</span>`).join('')}
    </div>
  </div>
</div>

<section class="section" id="expertises">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Nos expertises',
      title: 'Quatre pôles. <em>Une seule équipe.</em>',
      lead: 'De l’idée initiale à la mise en ligne ou à la livraison des supports, une même équipe vous accompagne sur plusieurs étapes.',
      link: arrowLink('Tous les pôles', 'expertises.html'),
    })}
    <div class="pole-grid" data-stagger>
      ${POLES.map(poleCard).join('')}
    </div>
    ${logoWall(TOOLS.home, { title: 'Outils &amp; technologies' })}
  </div>
</section>

<section class="section section--grey statement">
  <div class="container">
    <div class="statement__inner">
      <div class="reveal">
        <span class="eyebrow">Notre promesse</span>
        <h2 class="h2 mt-24 statement__title">Créative, technique et <em>proche de vos réalités.</em></h2>
      </div>
      <div class="statement__aside reveal">
        <p class="body">AKTAION SARL est une agence à l’intersection de la créativité, de la communication digitale et des technologies. Nous comprenons votre idée, la traduisons visuellement, la digitalisons et la rendons accessible à vos publics.</p>
        ${arrowLink('Découvrir l’agence', 'agence.html')}
      </div>
    </div>
    <div class="stats mt-48" data-stagger>
      <div class="stat reveal"><b>${counter(2022, { pad: 4 })}</b><span>Création de l’agence</span></div>
      <div class="stat reveal"><b>${counter(4)}</b><span>Pôles d’expertise</span></div>
      <div class="stat reveal"><b>${counter(2)}</b><span>Secteurs accompagnés</span></div>
      <div class="stat reveal"><b>${counter(5)}</b><span>Phases de méthode</span></div>
    </div>
  </div>
</section>

<section class="section" id="travaux">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Réalisations',
      title: 'Des solutions pensées pour <em>être utilisées.</em>',
      lead: 'Quelques exemples de ce que nous concevons. Les études de cas détaillées seront publiées prochainement.',
      link: arrowLink('Toutes les réalisations', 'realisations.html'),
    })}
    <div class="work-grid" data-stagger>
      ${workCard({ index: '01', title: 'Plateforme de gestion de projets', meta: 'Digitalisation · Secteur public', photo: 'terrain-collecte', tags: ['GED', 'Pilotage', 'Formation'] })}
      ${workCard({ index: '02', title: 'Portail institutionnel', meta: 'Web &amp; mobile · Institution', vizType: 'web', label: 'Site institutionnel', tags: ['Web', 'Accessibilité', 'CMS'] })}
      ${workCard({ index: '03', title: 'Tableau de bord de pilotage', meta: 'Data &amp; IA · Direction', photo: 'data-presentation', tags: ['Data', 'Indicateurs', 'Décision'] })}
      ${workCard({ index: '04', title: 'Boutique en ligne', meta: 'Web &amp; mobile · PME', vizType: 'mobile', label: 'E-commerce', tags: ['E-commerce', 'Mobile', 'Paiement'] })}
    </div>
  </div>
</section>

<section class="section section--grey">
  <div class="container">
    <div class="feature-grid">
      <div class="feature__copy reveal">
        <span class="eyebrow">Digitalisation des processus</span>
        <h2 class="h2 mt-24">Moins de papier. Plus de <em>traçabilité.</em></h2>
        <p class="lead">Transformer des procédures papier ou dispersées en outils numériques fiables, traçables et faciles à utiliser, pour le secteur public comme privé.</p>
        <ul class="feature__bullets">
          <li><span class="num">01</span><span>Processus clarifiés et standardisés</span></li>
          <li><span class="num">02</span><span>Données fiables, centralisées et traçables</span></li>
          <li><span class="num">03</span><span>Tableaux de bord pour décider plus vite</span></li>
          <li><span class="num">04</span><span>Équipes formées et autonomes</span></li>
        </ul>
        <div class="feature__actions">
          ${btn('Découvrir la digitalisation', 'digitalisation.html', 'red')}
          ${btn('Voir nos solutions', 'digitalisation.html#solutions', 'outline')}
        </div>
      </div>
      <div class="dashboard reveal" aria-hidden="true">
        <div class="dashboard__window">
          <div class="dashboard__bar"><i></i><i></i><i></i><em>Pilotage — vue consolidée</em></div>
          <div class="dashboard__body">
            <div class="dashboard__kpis">
              <div class="dashboard__kpi"><b>04</b><span>Pôles</span></div>
              <div class="dashboard__kpi"><b>05</b><span>Phases</span></div>
              <div class="dashboard__kpi"><b>360°</b><span>Vision</span></div>
            </div>
            <div class="dashboard__chart">
              ${[34, 52, 44, 68, 58, 76, 48, 64, 72, 56, 84, 62].map((height) => `<i style="--h:${height}%"></i>`).join('')}
            </div>
            <div class="dashboard__rows"><i></i><i></i><i></i><i></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" id="methode">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Notre méthode',
      title: 'Un résultat concret <em>à chaque sprint.</em>',
      lead: 'Cycles courts, validation continue et collaboration permanente : vous voyez avancer votre projet et pouvez ajuster à chaque étape.',
      link: arrowLink('Comprendre la méthode', 'methode.html'),
    })}
    <div class="steps">
      ${[
        ['01', 'Cadrage du besoin', 'Comprendre le contexte, les objectifs et le public cible.', 'Sprint 0'],
        ['02', 'Proposition créative et technique', 'Clarifier la solution, les livrables et les critères d’acceptation.', 'Roadmap'],
        ['03', 'Conception et développement', 'Produire les maquettes, contenus, pages ou solutions par itérations.', 'Sprints'],
        ['04', 'Validation et ajustements', 'Démontrer, recueillir les retours et finaliser les livrables.', 'Revue de sprint'],
        ['05', 'Livraison et accompagnement', 'Remettre, former et proposer les évolutions utiles.', 'Déploiement'],
      ].map(([num, title, text, tag]) => `<div class="step reveal">
        <span class="step__num">${num}</span>
        <h3>${title}</h3>
        <p>${text}</p>
        <span class="step__tag">${tag}</span>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="section section--tight" id="secteurs">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Secteurs',
      title: 'Deux mondes, <em>les mêmes exigences.</em>',
      lead: 'Nous adaptons les solutions aux réalités de chaque organisation, publique ou privée.',
      link: arrowLink('Explorer les secteurs', 'secteurs.html'),
    })}
    <div class="sector-grid" data-stagger>
      ${sectorCard({
        variant: 'dark',
        id: 'public',
        index: '01',
        label: 'Secteur public',
        title: 'Administrations, collectivités &amp; institutions',
        text: 'Traçabilité des décisions, redevabilité, continuité du service et accessibilité des services pour les usagers.',
        tags: ['GED', 'Suivi-évaluation', 'Gestion financière', 'Portails'],
        photo: 'secteur-public',
      })}
      ${sectorCard({
        variant: 'red',
        id: 'prive',
        index: '02',
        label: 'Secteur privé',
        title: 'Entreprises, PME &amp; startups',
        text: 'Gagner du temps, réduire les erreurs, piloter avec des données fiables et gagner en visibilité et en clients.',
        tags: ['Web', 'E-commerce', 'Data', 'Marketing'],
        photo: 'secteur-prive',
      })}
    </div>
  </div>
</section>

<section class="section" id="articles">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Ressources',
      title: 'Des repères pour <em>avancer.</em>',
      lead: 'Conseils pratiques sur la digitalisation, le web, la data et la communication digitale.',
      link: arrowLink('Toutes les ressources', 'ressources.html'),
    })}
    <div class="article-grid" data-stagger>
      ${articleCard({ id: 'article-1', category: 'Digitalisation', color: 'red', index: '01', title: 'Pourquoi digitaliser la gestion documentaire de votre organisation ?', text: 'Classement, recherche, droits d’accès et archivage : ce que change une GED bien conçue.', linked: true, photo: 'formation-agents' })}
      ${articleCard({ id: 'article-3', category: 'Web & mobile', color: 'black', index: '02', title: 'Site vitrine ou boutique en ligne : que choisir ?', text: 'Présenter son activité ou vendre en ligne : les critères pour décider.', linked: true, photo: 'web-cadrage' })}
      ${articleCard({ id: 'article-5', category: 'Data & IA', color: 'grey', index: '03', title: 'Tableaux de bord : quels indicateurs suivre pour piloter son activité ?', text: 'Choisir quelques indicateurs utiles plutôt que mesurer tout et rien.', linked: true })}
    </div>
  </div>
</section>

<section class="section section--grey" id="faq">
  ${faqLayout({
    eyebrow: 'Questions fréquentes',
    title: 'Vous vous posez <em>les bonnes questions.</em>',
    lead: 'Services, déroulement d’un projet, budget, accompagnement : les réponses aux questions les plus courantes.',
    prefix: 'home-faq',
    items: [
      { q: 'Quels services propose Aktaion ?', a: 'Sites web et e-commerce, applications mobiles, data et tableaux de bord, IA et automatisation, production audiovisuelle, création graphique, communication digitale, SEO et conseil digital.' },
      { q: 'Comment se déroule un projet ?', a: 'Travail en cycles courts : un atelier de cadrage, une feuille de route par itérations, puis des sprints qui livrent à chaque fois un résultat concret soumis à validation.' },
      { q: 'Combien coûte la création d’un site web ?', a: 'Le coût dépend du périmètre, des fonctionnalités et des délais. À l’issue de l’atelier de découverte, un backlog priorisé et une proposition adaptée aux contraintes budgétaires sont formalisés.' },
      { q: 'Proposez-vous un accompagnement après la livraison ?', a: 'Oui : assistance à la mise en ligne ou à la prise en main, transfert de compétences aux équipes et propositions d’évolutions.' },
    ],
  })}
</section>

${ctaBand()}
`,
});

/* --------------------------------------------------------------------------
   EXPERTISES
   -------------------------------------------------------------------------- */

const expertises = layout({
  title: 'Expertises',
  description:
    'Les quatre pôles d’expertise d’Aktaion : digitalisation des processus, web et mobile, data et IA, marketing et création audiovisuelle.',
  active: 'expertises',
  body: `
${pageHero({
  eyebrow: 'Expertises',
  title: 'Quatre pôles complémentaires, <em>une même exigence.</em>',
  lead: 'Nous réunissons communication visuelle, conception web et logique de digitalisation pour produire des supports utiles et exploitables. Une seule équipe, organisée en quatre pôles.',
  crumbs: [{ label: 'Expertises' }],
  actions: `${btn('Démarrer un projet', 'contact.html', 'red')}${btn('Voir la méthode', 'methode.html', 'outline')}`,
  aside: pointsCard('Ce que nous prenons en charge', [
    'Digitalisation des processus métiers',
    'Sites, boutiques et applications',
    'Data, tableaux de bord et IA',
    'Marketing, création et audiovisuel',
  ]),
})}

<section class="section">
  <div class="container">
    <div class="pole-row" id="digitalisation">
      <div class="reveal">
        <span class="pole-row__num">01 — Digitalisation des processus</span>
        <h2 class="h2">Transformer les procédures en <em>outils fiables.</em></h2>
        <p class="body mt-20">Numériser les procédures pour gagner en fiabilité, traçabilité et rapidité. Des outils métiers adaptés au secteur public comme au secteur privé.</p>
        ${chips(['Gestion de projets digitalisée', 'Suivi-évaluation', 'Gestion financière', 'GED', 'Circuits de validation', 'Tableaux de bord'])}
        <div class="mt-32">${btn('Découvrir la digitalisation', 'digitalisation.html', 'red')}</div>
      </div>
      <div class="pole-row__visual reveal">${photoFigure('digitalisation-atelier', {
        className: 'pole-row__media',
        ratio: '4 / 3',
        sizes: '(min-width: 1024px) 46vw, 100vw',
        caption: '',
      })}</div>
    </div>

    <div class="pole-row" id="web-mobile">
      <div class="reveal">
        <span class="pole-row__num">02 — Web, mobile &amp; e-commerce</span>
        <h2 class="h2">Présenter clairement, <em>faciliter l’action.</em></h2>
        <p class="body mt-20">Sites vitrines, boutiques en ligne et applications mobiles pour présenter clairement l’activité et faciliter la vente, avec une ergonomie soignée et une mise en ligne accompagnée.</p>
        ${chips(['Sites vitrines', 'Pages d’atterrissage', 'Boutiques en ligne', 'Applications mobiles', 'UX/UI design', 'Solutions sur mesure'])}
        <div class="mt-32">${btn('Découvrir web &amp; mobile', 'web-mobile.html', 'red')}</div>
      </div>
      <div class="pole-row__visual">${viz('web', 'Web & mobile')}</div>    </div>

    <div class="pole-row" id="data-ia">
      <div class="reveal">
        <span class="pole-row__num">03 — Data &amp; intelligence artificielle</span>
        <h2 class="h2">Faire parler vos données, <em>décider plus vite.</em></h2>
        <p class="body mt-20">Des données structurées et visualisées, et une IA appliquée aux métiers pour décider plus vite et automatiser ce qui peut l’être.</p>
        ${chips(['Collecte et structuration', 'Tableaux de bord et BI', 'Chatbots et assistants IA', 'Automatisation', 'Analyse et aide à la décision'])}
        <div class="mt-32">${btn('Parler de votre projet data', 'contact.html', 'red')}</div>
      </div>
      <div class="pole-row__visual reveal">${photoFigure('data-presentation', {
        className: 'pole-row__media',
        ratio: '4 / 3',
        sizes: '(min-width: 1024px) 46vw, 100vw',
        caption: '',
      })}</div>
    </div>

    <div class="pole-row" id="marketing">
      <div class="reveal">
        <span class="pole-row__num">04 — Marketing, création &amp; audiovisuel</span>
        <h2 class="h2">Rendre votre organisation <em>visible.</em></h2>
        <p class="body mt-20">Visibilité, contenus, vidéo et identité visuelle pour mieux présenter, communiquer et atteindre les publics, avec des indicateurs pour ajuster.</p>
        ${chips(['Communication digitale', 'Réseaux sociaux', 'SEO', 'Création graphique', 'Vidéo et motion design', 'Conseil digital'])}
        <div class="mt-32">${btn('Découvrir marketing &amp; création', 'marketing.html', 'red')}</div>
      </div>
      <div class="pole-row__visual reveal">${photoFigure('audiovisuel-screens', {
        className: 'pole-row__media',
        ratio: '4 / 3',
        sizes: '(min-width: 1024px) 46vw, 100vw',
        caption: '',
      })}</div>
    </div>

    ${logoWall(TOOLS.expertises, { title: 'Outils &amp; technologies' })}
  </div>
</section>

${ctaBand({
  eyebrow: 'Un besoin à préciser',
  title: 'Vous ne savez pas par quel pôle commencer ?',
  text: 'Décrivez votre contexte : nous identifions ensemble le point de départ le plus utile, sans jargon et sans engagement.',
  primary: btn('En parler avec nous', 'contact.html', 'red'),
  secondary: btn('Voir la méthode', 'methode.html', 'ghost-light'),
})}
`,
});

/* --------------------------------------------------------------------------
   DIGITALISATION
   -------------------------------------------------------------------------- */

const digitalisation = layout({
  title: 'Digitalisation des processus',
  description:
    'Digitalisation des processus métiers : gestion de projets, suivi-évaluation, gestion financière, GED et circuits de validation pour le secteur public et privé.',
  active: 'expertises',
  body: `
${pageHero({
  eyebrow: 'Pôle 01 — Digitalisation des processus',
  title: 'Moins de papier. Plus de <em>traçabilité.</em>',
  lead: 'Transformer des procédures papier ou dispersées en outils numériques fiables, traçables et faciles à utiliser, pour le secteur public comme privé.',
  crumbs: [{ label: 'Expertises', href: 'expertises.html' }, { label: 'Digitalisation' }],
  actions: `${btn('Cadrer votre projet', 'contact.html', 'red')}${btn('Voir la méthode', 'methode.html', 'outline')}`,
  aside: pointsCard('Ce que vous y gagnez', [
    'Des processus clarifiés et standardisés',
    'Des données fiables, centralisées et traçables',
    'Des tableaux de bord pour décider plus vite',
    'Des équipes formées et autonomes',
  ]),
})}

<section class="section" id="solutions">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Solutions',
      title: 'Cinq familles d’outils <em>métiers.</em>',
      lead: 'Nous concevons l’outil adapté à votre procédure, puis nous le paramétrons, le testons et formons vos équipes.',
    })}
    <div class="card-grid-3" data-stagger>
      ${panel({
        num: '01',
        title: 'Gestion de projets digitalisée',
        text: 'Piloter projets et programmes depuis un seul outil, de la planification au reporting.',
        bullets: ['Planification des activités, tâches et jalons', 'Suivi de l’avancement et des budgets', 'Tableaux de bord pour la direction', 'Rapports générés automatiquement'],
        cls: 'panel--black',
      })}
      ${panel({
        num: '02',
        title: 'Systèmes de suivi-évaluation',
        text: 'Mesurer les résultats des projets avec des indicateurs fiables et des données consolidées.',
        bullets: ['Cadre logique, indicateurs et cibles', 'Collecte terrain, y compris sur mobile', 'Consolidation et visualisation', 'Rapports de suivi et d’évaluation'],
      })}
      ${panel({
        num: '03',
        title: 'Gestion financière',
        text: 'Suivre budgets, engagements et dépenses avec des circuits de validation clairs.',
        bullets: ['Budgets, engagements et dépenses', 'Circuits de validation et de signature', 'Suivi de l’exécution budgétaire', 'États et rapports financiers'],
      })}
      ${panel({
        num: '04',
        title: 'Gestion électronique des documents',
        text: 'Numériser, classer et retrouver les documents en quelques secondes, en sécurité.',
        bullets: ['Numérisation, classement et indexation', 'Recherche par mots-clés', 'Droits d’accès et traçabilité', 'Workflows de validation et archivage'],
      })}
      ${panel({
        num: '05',
        title: 'Autres processus métiers',
        text: 'Concevoir l’outil adapté à chaque procédure, selon la faisabilité technique.',
        bullets: ['RH et congés', 'Achats et approvisionnements', 'Courrier et circuits d’approbation', 'Applications sur mesure'],
        cls: 'panel--grey',
      })}
    </div>
  </div>
</section>

${mediaBand('formation-agents', {
  ratio: '21 / 9',
  caption: 'Photo d’illustration — atelier de formation générique, sans lien avec un client identifié.',
  position: '55% 40%',
})}

<section class="section section--tight">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Public & privé',
      title: 'La même exigence, <em>deux réalités.</em>',
      lead: 'Les bénéfices sont concrets dans les deux secteurs, avec des priorités et des contraintes différentes.',
    })}
    <div class="sector-block">
      <div>
        <div class="sector-block__tag"><span class="tag tag--black">Secteur public</span></div>
        <h2 class="h2">Traçabilité, redevabilité, <em>continuité du service.</em></h2>
        <p class="body">Les administrations, collectivités et institutions doivent pouvoir justifier leurs décisions, archiver leurs documents et rendre leurs services accessibles.</p>
      </div>
      <div>
        <h3>Bénéfices</h3>
        <ul class="stake-list">
          <li>Traçabilité des décisions et des opérations</li>
          <li>Redevabilité vis-à-vis des parties prenantes</li>
          <li>Continuité du service par l’archivage numérique</li>
          <li>Reporting normalisé vers tutelles et partenaires</li>
        </ul>
        <h3>Solutions mobilisables</h3>
        <div class="solution-grid">
          ${solutionLink('GED', 'digitalisation.html#solutions')}
          ${solutionLink('Suivi-évaluation', 'digitalisation.html#solutions')}
          ${solutionLink('Gestion de projets', 'digitalisation.html#solutions')}
          ${solutionLink('Gestion financière', 'digitalisation.html#solutions')}
          ${solutionLink('Portails institutionnels', 'web-mobile.html')}
          ${solutionLink('Communication institutionnelle', 'marketing.html')}
        </div>
      </div>
    </div>
    <div class="sector-block sector-block--grey">
      <div>
        <div class="sector-block__tag"><span class="tag tag--red">Secteur privé</span></div>
        <h2 class="h2">Gagner du temps, <em>réduire les erreurs.</em></h2>
        <p class="body">Les entreprises, PME et startups ont besoin d’outils simples, adaptés à leur taille et à leur budget, pour piloter l’activité sans alourdir le quotidien.</p>
      </div>
      <div>
        <h3>Bénéfices</h3>
        <ul class="stake-list">
          <li>Gain de temps sur les tâches répétitives</li>
          <li>Moins d’erreurs et de documents perdus</li>
          <li>Pilotage de l’activité en temps réel</li>
          <li>Outils adaptés à la taille et au budget</li>
        </ul>
        <h3>Solutions mobilisables</h3>
        <div class="solution-grid">
          ${solutionLink('Gestion de projets', 'digitalisation.html#solutions')}
          ${solutionLink('GED', 'digitalisation.html#solutions')}
          ${solutionLink('Tableaux de bord', 'expertises.html#data-ia')}
          ${solutionLink('Applications métiers', 'contact.html')}
          ${solutionLink('Web & e-commerce', 'web-mobile.html')}
          ${solutionLink('Marketing digital', 'marketing.html')}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--grey" id="demarche">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Démarche',
      title: 'Quatre étapes, <em>sans surprise.</em>',
      lead: 'Une progression lisible, avec des points de validation et une formation intégrée à chaque livraison.',
    })}
    <ul class="phase-list" data-timeline data-stagger>
      ${phase({
        num: '01',
        title: 'Cartographie et cadrage',
        tag: 'Comprendre',
        text: 'Nous documentons les procédures, les rôles et les irritants avant de proposer quoi que ce soit.',
        bullets: ['Ateliers avec les équipes', 'Cartographie des processus prioritaires', 'Critères de réussite et backlog initial'],
        result: 'Périmètre clair et priorisé',
      })}
      ${phase({
        num: '02',
        title: 'Conception et paramétrage',
        tag: 'Construire',
        text: 'Nous concevons les écrans, les circuits et les droits d’accès, puis nous intégrons les données existantes.',
        bullets: ['Maquettes des écrans', 'Paramétrage des workflows et des droits', 'Intégration des données existantes'],
        result: 'Première version utilisable',
        accent: true,
      })}
      ${phase({
        num: '03',
        title: 'Recette et formation',
        tag: 'Valider',
        text: 'Nous testons avec les utilisateurs, corrigeons ce qui doit l’être et formons les équipes à l’outil.',
        bullets: ['Tests avec les utilisateurs', 'Corrections et ajustements', 'Formation des équipes'],
        result: 'Outil adopté par les utilisateurs',
      })}
      ${phase({
        num: '04',
        title: 'Déploiement et évolution',
        tag: 'Pérenniser',
        text: 'Nous mettons en production, accompagnons la prise en main et proposons une feuille de route d’évolution.',
        bullets: ['Mise en production', 'Assistance et transfert de compétences', 'Feuille de route d’évolution'],
        result: 'Solution opérationnelle et autonome',
        accent: true,
      })}
    </ul>
  </div>
</section>

<section class="section--line section">
  ${faqLayout({
    eyebrow: 'Questions fréquentes',
    title: 'Digitaliser sans <em>tout bouleverser.</em>',
    lead: 'Vos outils actuels, la formation des équipes et le périmètre : les points que nous clarifions dès le cadrage.',
    prefix: 'digitalisation-faq',
    items: [
      { q: 'Quels processus peut-on digitaliser ?', a: 'Gestion de projets, suivi-évaluation, gestion financière, gestion documentaire, circuits de validation, etc. L’atelier de cadrage identifie les processus à plus forte valeur.' },
      { q: 'Pouvons-nous conserver nos outils actuels ?', a: 'Selon la faisabilité technique, l’existant est analysé pour décider de ce qui est repris, connecté ou remplacé.' },
      { q: 'Nos équipes seront-elles formées ?', a: 'Oui : chaque livraison inclut une assistance à la prise en main et un transfert de compétences.' },
    ],
    link: arrowLink('Parler de votre processus', 'contact.html'),
  })}
</section>

<section class="section section--tight">
  <div class="container">
    ${logoWall(TOOLS.digitalisation, { title: 'Outils &amp; technologies' })}
  </div>
</section>

${ctaBand({
  eyebrow: 'Digitalisation',
  title: 'Quel processus voulez-vous digitaliser en premier ?',
  text: 'Nous partons de votre quotidien, pas d’une solution toute faite. Un atelier suffit pour identifier le point de départ.',
  primary: btn('Cadrer votre projet', 'contact.html', 'red'),
  secondary: btn('Voir la méthode', 'methode.html', 'ghost-light'),
})}
`,
});

/* --------------------------------------------------------------------------
   WEB, MOBILE & E-COMMERCE
   -------------------------------------------------------------------------- */

const webMobile = layout({
  title: 'Web, mobile & e-commerce',
  description:
    'Sites vitrines, pages d’atterrissage, boutiques en ligne, catalogues, ergonomie et SEO : des expériences web et mobiles claires, rapides et pensées pour convertir.',
  active: 'expertises',
  body: `
${pageHero({
  eyebrow: 'Pôle 02 — Web, mobile & e-commerce',
  title: 'Votre activité, <em>clairement présentée.</em>',
  lead: 'Présenter clairement l’activité, les produits et les services, avec une ergonomie soignée et une mise en ligne accompagnée.',
  crumbs: [{ label: 'Expertises', href: 'expertises.html' }, { label: 'Web & mobile' }],
  actions: `${btn('Lancer un site ou une app', 'contact.html', 'red')}${btn('Voir nos réalisations', 'realisations.html', 'outline')}`,
  aside: pointsCard('Ce que vous obtenez', [
    'Une présentation claire de l’activité, des produits et des services',
    'Une ergonomie pensée pour mobile comme pour ordinateur',
    'Des contenus structurés pour être trouvé sur les moteurs de recherche',
    'Une mise en ligne accompagnée et un transfert de compétences',
  ]),
})}

<section class="section" id="offres">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Prestations',
      title: 'Six façons de <em>prendre place en ligne.</em>',
      lead: 'Du site vitrine à la boutique en ligne, chaque support est conçu pour un objectif précis et un public identifié.',
    })}
    <div class="card-grid-3" data-stagger>
      ${panel({ num: '01', title: 'Sites vitrines', text: 'Valoriser l’entreprise, ses services et sa crédibilité en ligne, avec une structure claire et des contenus soignés.' })}
      ${panel({ num: '02', title: 'Pages d’atterrissage', text: 'Des pages ciblées pour une offre ou une campagne, conçues pour convertir sans perdre le visiteur.' })}
      ${panel({ num: '03', title: 'Boutiques en ligne', text: 'Un parcours de vente simple et rassurant, de la fiche produit à la commande.' })}
      ${panel({ num: '04', title: 'Catalogues produits', text: 'Structurer et présenter les produits avec soin, même lorsque le catalogue est large.' })}
      ${panel({ num: '05', title: 'Ergonomie et contenus', text: 'Intégrer les contenus et soigner les parcours de navigation pour mobile et ordinateur.', cls: 'panel--grey' })}
      ${panel({ num: '06', title: 'Référencement SEO', text: 'Optimiser les pages et structurer les contenus pour améliorer la visibilité sur les moteurs de recherche.' })}
    </div>
  </div>
</section>

${mediaBand('web-demo', {
  ratio: '21 / 9',
  caption: 'Photo d’illustration — démonstration générique, sans lien avec un client identifié.',
})}

<section class="section section--grey">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Processus',
      title: 'Trois temps, <em>des validations régulières.</em>',
      lead: 'Un cadrage clair, des itérations courtes et une mise en ligne accompagnée.',
    })}
    <div class="card-grid-3">
      ${panel({ num: '01', title: 'Cadrage', text: 'Atelier de découverte : supports attendus, contraintes techniques, contenus disponibles et backlog initial.' })}
      ${panel({ num: '02', title: 'Conception en sprints', text: 'Maquettes, contenus et pages validés à chaque itération. Vous voyez le projet prendre forme.' })}
      ${panel({ num: '03', title: 'Mise en ligne et suivi', text: 'Assistance à la mise en ligne, transfert de compétences et évolutions après le lancement.' })}
    </div>
    <div class="mt-40 reveal">
      <span class="eyebrow">Expertises liées</span>
      <ul class="chip-list">
        <li><a class="chip" href="digitalisation.html">Digitalisation des processus</a></li>
        <li><a class="chip" href="expertises.html#data-ia">Data &amp; tableaux de bord</a></li>
        <li><a class="chip" href="expertises.html#data-ia">IA &amp; automatisation</a></li>
        <li><a class="chip" href="marketing.html">Production audiovisuelle</a></li>
        <li><a class="chip" href="marketing.html">Identité &amp; création graphique</a></li>
        <li><a class="chip" href="marketing.html">Communication digitale</a></li>
        <li><a class="chip" href="marketing.html">Conseil digital</a></li>
      </ul>
    </div>
  </div>
</section>

<section class="section--line section">
  ${faqLayout({
    eyebrow: 'Questions fréquentes',
    title: 'Site, boutique ou <em>application ?</em>',
    lead: 'Les critères pour choisir le bon support, être visible et prendre en main votre site après la livraison.',
    prefix: 'web-faq',
    items: [
      { q: 'Quelle différence entre un site vitrine et une boutique en ligne ?', a: 'Le site vitrine présente l’activité et les services ; la boutique ajoute un catalogue, un panier et un parcours de commande.' },
      { q: 'Mon site sera-t-il visible sur les moteurs de recherche ?', a: 'Les contenus sont structurés et les pages optimisées pour améliorer la visibilité.' },
      { q: 'Serons-nous formés à l’utilisation du site ?', a: 'Oui : la livraison inclut une assistance à la mise en ligne et un transfert de compétences.' },
    ],
    link: arrowLink('Discuter de votre projet web', 'contact.html'),
  })}
</section>

<section class="section section--tight">
  <div class="container">
    ${logoWall(TOOLS.web, { title: 'Outils &amp; technologies' })}
  </div>
</section>

${ctaBand({
  eyebrow: 'Web & mobile',
  title: 'Un site, une boutique ou une application ?',
  text: 'Nous vous aidons à choisir le support le plus utile pour votre objectif, puis nous le concevons de bout en bout.',
  primary: btn('Lancer votre projet', 'contact.html', 'red'),
  secondary: btn('Voir nos réalisations', 'realisations.html', 'ghost-light'),
})}
`,
});

/* --------------------------------------------------------------------------
   MARKETING, CRÉATION & AUDIOVISUEL
   -------------------------------------------------------------------------- */

const marketing = layout({
  title: 'Marketing, création & audiovisuel',
  description:
    'Stratégie digitale, réseaux sociaux, SEO, création graphique, vidéo et motion design : rendre votre organisation visible et mesurer ce qui fonctionne.',
  active: 'expertises',
  body: `
${pageHero({
  eyebrow: 'Pôle 04 — Marketing, création & audiovisuel',
  title: 'Rendre votre organisation <em>visible.</em>',
  lead: 'Visibilité, contenus, vidéo et identité visuelle pour mieux présenter, communiquer et atteindre vos publics — avec des indicateurs pour ajuster.',
  crumbs: [{ label: 'Expertises', href: 'expertises.html' }, { label: 'Marketing & création' }],
  actions: `${btn('Construire votre visibilité', 'contact.html', 'red')}${btn('Voir la méthode', 'methode.html', 'outline')}`,
  aside: pointsCard('Ce que vous obtenez', [
    'Une stratégie alignée sur vos objectifs',
    'Des contenus et visuels cohérents avec votre marque',
    'Une visibilité durable sur le web',
    'Des indicateurs clairs pour ajuster',
  ]),
})}

<section class="section">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Approche',
      title: 'Trois temps pour <em>une présence cohérente.</em>',
      lead: 'Une stratégie lisible, des contenus produits avec soin et une mesure régulière des résultats.',
    })}
    <div class="card-grid-3" data-stagger>
      ${panel({ num: '01', title: 'Définir la stratégie', text: 'Audit de la présence actuelle, clarification des publics et des objectifs, choix des canaux et des supports.' })}
      ${panel({ num: '02', title: 'Activer les leviers', text: 'Planification des contenus, animation des pages, campagnes, production graphique et vidéo.', cls: 'panel--black' })}
      ${panel({ num: '03', title: 'Mesurer et ajuster', text: 'Suivi des indicateurs, reporting régulier et recommandations pour la suite.' })}
    </div>
  </div>
</section>

${mediaBand('planning-editorial', {
  ratio: '21 / 9',
  caption: 'Photo d’illustration — travail éditorial générique, sans lien avec un client identifié.',
})}

<section class="section section--grey" id="leviers">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Leviers',
      title: 'Huit leviers, <em>une seule direction.</em>',
      lead: 'Nous combinons les canaux utiles à votre objectif, sans multiplier les actions sans lien entre elles.',
    })}
    <div class="card-grid-4" data-stagger>
      ${panel({ num: '01', title: 'Communication digitale', text: 'Stratégie de visibilité, planification de contenus, campagnes et animation des pages.' })}
      ${panel({ num: '02', title: 'Réseaux sociaux', text: 'Contenus, visuels et animation de communauté au service de votre image.' })}
      ${panel({ num: '03', title: 'Création graphique', text: 'Logos, chartes, affiches, flyers et visuels de marque.' })}
      ${panel({ num: '04', title: 'Vidéo et motion design', text: 'Montage vidéo, contenus promotionnels et formats courts pour les réseaux.' })}
      ${panel({ num: '05', title: 'SEO et contenus web', text: 'Structuration et optimisation des pages pour être trouvé au bon moment.' })}
      ${panel({ num: '06', title: 'Publicité en ligne', text: 'Campagnes ciblées sur moteurs de recherche et réseaux sociaux, budget maîtrisé.' })}
      ${panel({ num: '07', title: 'E-mailing et relation client', text: 'Messages et parcours pour entretenir le lien avec clients, membres ou partenaires.' })}
      ${panel({ num: '08', title: 'Conseil digital', text: 'Clarification des besoins, choix des outils et cohérence de la présence en ligne.' })}
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="feature-grid">
      <div class="feature__copy reveal">
        <span class="eyebrow">Création &amp; audiovisuel</span>
        <h2 class="h2 mt-24">Des contenus qui <em>vous ressemblent.</em></h2>
        <p class="lead">Identité visuelle, supports de communication, vidéo et motion design : nous produisons les formats adaptés à vos publics et à vos canaux.</p>
        <ul class="feature__bullets">
          <li><span class="num">01</span><span>Logos, chartes et documents institutionnels</span></li>
          <li><span class="num">02</span><span>Visuels pour les réseaux sociaux et les campagnes</span></li>
          <li><span class="num">03</span><span>Montage vidéo, motion design et formats courts</span></li>
        </ul>
        <div class="feature__actions">${btn('Parler de votre marque', 'contact.html', 'red')}</div>
      </div>
      <div class="page-hero__visual reveal">${photoFigure('tournage', {
        className: 'feature__media',
        ratio: '4 / 3',
        sizes: '(min-width: 1024px) 46vw, 100vw',
        caption: '',
      })}</div>
    </div>
  </div>
</section>

<section class="section--line section">
  ${faqLayout({
    eyebrow: 'Questions fréquentes',
    title: 'Une stratégie, <em>des résultats mesurables.</em>',
    lead: 'Budget, délais, animation des réseaux : les réponses avant de vous lancer.',
    prefix: 'marketing-faq',
    items: [
      { q: 'Combien coûte une stratégie de marketing digital ?', a: 'Cela dépend des objectifs, des canaux et du volume de contenus. Un plan priorisé adapté au budget est proposé après l’atelier de découverte.' },
      { q: 'Quand voit-on les premiers résultats ?', a: 'Les campagnes publicitaires peuvent produire des effets rapides ; le référencement naturel et la construction d’audience se travaillent dans la durée.' },
      { q: 'Gérez-vous nos réseaux sociaux au quotidien ?', a: 'Oui : planification des contenus, création des visuels et animation des pages, ou formation des équipes pour le faire elles-mêmes.' },
    ],
    link: arrowLink('Construire votre stratégie', 'contact.html'),
  })}
</section>

<section class="section section--tight">
  <div class="container">
    ${logoWall(TOOLS.marketing, { title: 'Outils &amp; technologies' })}
  </div>
</section>

${ctaBand({
  eyebrow: 'Marketing & création',
  title: 'Votre visibilité mérite une stratégie.',
  text: 'Nous définissons ensemble les publics, les canaux et les contenus qui feront avancer votre organisation.',
  primary: btn('Construire votre visibilité', 'contact.html', 'red'),
  secondary: btn('Voir nos réalisations', 'realisations.html', 'ghost-light'),
})}
`,
});

/* --------------------------------------------------------------------------
   SECTEURS
   -------------------------------------------------------------------------- */

const secteurs = layout({
  title: 'Secteurs',
  description:
    'Aktaion accompagne le secteur public (administrations, collectivités, institutions) et le secteur privé (entreprises, PME, startups) avec des solutions adaptées à chaque réalité.',
  active: 'secteurs',
  body: `
${pageHero({
  eyebrow: 'Secteurs',
  title: 'Deux mondes, <em>les mêmes exigences.</em>',
  lead: 'Nous adaptons les solutions aux réalités de chaque organisation, publique ou privée, en partant de ses contraintes et de ses publics.',
  crumbs: [{ label: 'Secteurs' }],
  actions: `${btn('Parler de votre organisation', 'contact.html', 'red')}${btn('Voir nos réalisations', 'realisations.html', 'outline')}`,
  aside: pointsCard('Nous accompagnons', [
    'Administrations &amp; institutions',
    'Collectivités territoriales',
    'Entreprises &amp; PME',
    'Startups &amp; projets à clarifier',
  ]),
})}

<section class="section">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Public & privé',
      title: 'Des enjeux différents, <em>une écoute commune.</em>',
      lead: 'Les priorités ne sont pas les mêmes. La méthode, elle, reste la même : comprendre, prioriser, livrer et accompagner.',
    })}

    <div class="sector-media-grid reveal">
      ${photoFigure('secteur-public-wide', {
        ratio: '16 / 9',
        sizes: '(min-width: 768px) 46vw, 100vw',
        caption: 'Photo d’illustration — ne représente pas un client, un partenaire ou des locaux d’Aktaion.',
      })}
      ${photoFigure('secteur-prive-wide', {
        ratio: '16 / 9',
        sizes: '(min-width: 768px) 46vw, 100vw',
        caption: 'Photo d’illustration — ne représente pas un client, un partenaire ou des locaux d’Aktaion.',
      })}
    </div>

    <div class="sector-block" id="public">
      <div>
        <div class="sector-block__tag"><span class="tag tag--black">Secteur public</span></div>
        <h2 class="h2">Administrations, collectivités &amp; <em>institutions.</em></h2>
        <p class="body">Les décisions doivent être traçables, les documents archivés et les services accessibles. Nous concevons des outils qui soutiennent cette exigence au quotidien.</p>
        <div class="mt-24">${btn('Discuter de vos enjeux', 'contact.html', 'outline')}</div>
      </div>
      <div>
        <h3>Enjeux</h3>
        <ul class="stake-list">
          <li>Traçabilité des décisions et des opérations</li>
          <li>Redevabilité vis-à-vis des parties prenantes</li>
          <li>Continuité du service et archivage sécurisé</li>
          <li>Accessibilité des services pour les usagers</li>
        </ul>
        <h3>Solutions types</h3>
        <div class="solution-grid">
          ${solutionLink('Gestion électronique des documents', 'digitalisation.html#solutions')}
          ${solutionLink('Systèmes de suivi-évaluation', 'digitalisation.html#solutions')}
          ${solutionLink('Gestion de projets digitalisée', 'digitalisation.html#solutions')}
          ${solutionLink('Gestion financière', 'digitalisation.html#solutions')}
          ${solutionLink('Sites et portails institutionnels', 'web-mobile.html')}
          ${solutionLink('Communication institutionnelle', 'marketing.html')}
        </div>
      </div>
    </div>

    <div class="sector-block sector-block--grey" id="prive">
      <div>
        <div class="sector-block__tag"><span class="tag tag--red">Secteur privé</span></div>
        <h2 class="h2">Entreprises, PME &amp; <em>startups.</em></h2>
        <p class="body">Gagner du temps, réduire les erreurs, piloter avec des données fiables et gagner en visibilité : les priorités se rejoignent souvent.</p>
        <div class="mt-24">${btn('Parler de votre activité', 'contact.html', 'outline')}</div>
      </div>
      <div>
        <h3>Enjeux</h3>
        <ul class="stake-list">
          <li>Gagner du temps et réduire les erreurs</li>
          <li>Piloter l’activité avec des données fiables</li>
          <li>Gagner en visibilité et en clients</li>
          <li>Vendre et se faire connaître en ligne</li>
        </ul>
        <h3>Solutions types</h3>
        <div class="solution-grid">
          ${solutionLink('Digitalisation des processus', 'digitalisation.html')}
          ${solutionLink('Sites web et e-commerce', 'web-mobile.html')}
          ${solutionLink('Applications mobiles', 'web-mobile.html')}
          ${solutionLink('Data et intelligence artificielle', 'expertises.html#data-ia')}
          ${solutionLink('Marketing digital', 'marketing.html')}
          ${solutionLink('Vidéo et contenus', 'marketing.html')}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--grey">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Points de départ',
      title: 'Par où <em>commencer ?</em>',
      lead: 'Trois façons d’entrer en relation, selon votre situation. Dans tous les cas, nous commençons par un échange de cadrage.',
    })}
    <div class="card-grid-3" data-stagger>
      ${panel({
        num: '01',
        title: 'Administration ou institution',
        text: 'Cadrage des besoins en digitalisation, suivi-évaluation, gestion documentaire ou financière.',
        extra: `<div class="mt-12">${arrowLink('Demander un cadrage', 'contact.html')}</div>`,
      })}
      ${panel({
        num: '02',
        title: 'Entreprise ou PME',
        text: 'Site, boutique en ligne, application, outils de gestion ou stratégie de visibilité.',
        extra: `<div class="mt-12">${arrowLink('Présenter votre activité', 'contact.html')}</div>`,
      })}
      ${panel({
        num: '03',
        title: 'Projet à clarifier',
        text: 'Atelier de découverte pour transformer une idée en cahier des charges.',
        extra: `<div class="mt-12">${arrowLink('Clarifier votre idée', 'contact.html')}</div>`,
      })}
    </div>
  </div>
</section>

${ctaBand({
  eyebrow: 'Secteurs',
  title: 'Quel que soit votre secteur, commençons par comprendre.',
  text: 'Un échange de cadrage suffit pour identifier les priorités et la première étape utile.',
  primary: btn('Parler de votre organisation', 'contact.html', 'red'),
  secondary: btn('Découvrir la méthode', 'methode.html', 'ghost-light'),
})}
`,
});

/* --------------------------------------------------------------------------
   RÉALISATIONS
   -------------------------------------------------------------------------- */

const realisations = layout({
  title: 'Réalisations',
  description:
    'Aperçus de réalisations Aktaion : plateformes de gestion, suivi-évaluation, portails, applications mobiles, tableaux de bord, campagnes et films institutionnels.',
  active: 'realisations',
  body: `
${pageHero({
  eyebrow: 'Réalisations',
  title: 'Des outils pensés pour <em>être utilisés.</em>',
  lead: 'Quelques exemples de ce que nous concevons, par expertise et par format. Les études de cas détaillées seront publiées prochainement.',
  crumbs: [{ label: 'Réalisations' }],
  actions: `${btn('Discuter d’un projet similaire', 'contact.html', 'red')}${btn('Voir la méthode', 'methode.html', 'outline')}`,
  aside: pointsCard('Ce que vous trouverez ici', [
    'Des exemples par expertise',
    'Des formats variés : web, data, vidéo',
    'Une lecture par secteur',
    'Des études de cas à venir',
  ]),
})}

<section class="section">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Aperçus',
      title: 'Huit exemples, <em>huit manières d’aider.</em>',
      lead: 'Chaque fiche illustre un type de solution. Les noms, contextes et résultats détaillés seront précisés dans les études de cas.',
    })}
    ${filters(['Tous', 'Digitalisation', 'Web & mobile', 'Data & IA', 'Marketing', 'Audiovisuel'], 8)}
    <div class="work-grid" data-stagger>
      ${workCard({ id: 'projet-1', category: 'Digitalisation', index: '01', photo: 'terrain-collecte', title: 'Plateforme de gestion de projets', meta: 'Digitalisation · Secteur public', tags: ['GED', 'Pilotage', 'Formation'] })}
      ${workCard({ id: 'projet-2', category: 'Digitalisation', index: '02', photo: 'digitalisation-atelier', title: 'Système de suivi-évaluation', meta: 'Digitalisation · Programme', tags: ['Indicateurs', 'Collecte', 'Reporting'] })}
      ${workCard({ id: 'projet-3', category: 'Web & mobile', index: '03', vizType: 'web', label: 'Portail', title: 'Portail institutionnel', meta: 'Web & mobile · Institution', tags: ['Web', 'CMS', 'Accessibilité'] })}
      ${workCard({ id: 'projet-4', category: 'Web & mobile', index: '04', vizType: 'mobile', label: 'Application', title: 'Application mobile de terrain', meta: 'Web & mobile · Collecte', tags: ['Mobile', 'Hors ligne', 'Données'] })}
      ${workCard({ id: 'projet-5', category: 'Data & IA', index: '05', photo: 'data-presentation', title: 'Tableau de bord de pilotage', meta: 'Data & IA · Direction', tags: ['Data', 'KPI', 'Décision'] })}
      ${workCard({ id: 'projet-6', category: 'Data & IA', index: '06', vizType: 'prive', label: 'IA & automatisation', title: 'Assistant IA interne', meta: 'Data & IA · Équipes', tags: ['IA', 'Assistant', 'Automatisation'] })}
      ${workCard({ id: 'projet-7', category: 'Marketing', index: '07', photo: 'planning-editorial', title: 'Campagne de communication', meta: 'Marketing · Visibilité', tags: ['Contenus', 'Réseaux', 'Mesure'] })}
      ${workCard({ id: 'projet-8', category: 'Audiovisuel', index: '08', photo: 'realisation-video', title: 'Film institutionnel', meta: 'Audiovisuel · Image de marque', tags: ['Vidéo', 'Tournage', 'Montage'] })}
    </div>
    <p class="form-note mt-24">Les exemples ci-dessus illustrent nos savoir-faire. Les noms de clients, contextes et résultats seront ajoutés au fil des publications.</p>
  </div>
</section>

${ctaBand({
  eyebrow: 'Votre projet',
  title: 'Votre projet pourrait être le prochain.',
  text: 'Décrivez-nous votre contexte : nous vous dirons ce qui est réaliste, utile et prioritaire.',
  primary: btn('Démarrer un projet', 'contact.html', 'red'),
  secondary: btn('Voir nos expertises', 'expertises.html', 'ghost-light'),
})}
`,
});

/* --------------------------------------------------------------------------
   MÉTHODE
   -------------------------------------------------------------------------- */

const methode = layout({
  title: 'Méthode',
  description:
    'La méthode Aktaion en cinq phases : cadrage, proposition, conception, validation et livraison. Des cycles courts avec un résultat concret à chaque sprint.',
  active: 'methode',
  body: `
${pageHero({
  eyebrow: 'Méthode',
  title: 'Un résultat concret <em>à chaque sprint.</em>',
  lead: 'Cycles courts, validation continue et collaboration permanente : vous voyez avancer votre projet et pouvez ajuster à chaque étape.',
  crumbs: [{ label: 'Méthode' }],
  actions: `${btn('Démarrer un projet', 'contact.html', 'red')}${btn('Voir les réalisations', 'realisations.html', 'outline')}`,
  aside: pointsCard('Les principes', [
    'Cycles courts et itératifs',
    'Validation intégrée à chaque sprint',
    'Livraisons progressives',
    'Accompagnement après la livraison',
  ]),
})}

<section class="section" id="phases">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Les cinq phases',
      title: 'De l’idée à <em>l’autonomie.</em>',
      lead: 'Chaque phase a un objectif, des livrables et un résultat attendu. Rien n’avance sans validation.',
    })}
    <ul class="phase-list" data-timeline data-stagger>
      ${phase({
        num: '01',
        title: 'Cadrage du besoin',
        photo: 'atelier-cadrage',
        tag: 'Sprint 0 · immersion et vision',
        text: 'Nous prenons le temps de comprendre le contexte, les objectifs et le public cible avant de proposer une solution.',
        bullets: ['Atelier de découverte : contexte, objectifs, public cible', 'Identification des supports et contraintes techniques, budgétaires et de délais', 'Vision du projet et backlog initial'],
        result: 'Vision partagée et besoins priorisés',
      })}
      ${phase({
        num: '02',
        title: 'Proposition créative et technique',
        photo: 'planning-editorial',
        tag: 'Planification agile · roadmap',
        text: 'Nous clarifions la solution, les livrables et les critères d’acceptation, puis nous planifions les itérations.',
        bullets: ['Clarification de la solution et des livrables', 'Contenus nécessaires et critères d’acceptation', 'Planning par itérations avec jalons de validation'],
        result: 'Feuille de route et critères d’acceptation validés',
        accent: true,
      })}
      ${phase({
        num: '03',
        title: 'Conception et développement',
        photo: 'atelier-production',
        tag: 'Sprints itératifs',
        text: 'Nous produisons progressivement les maquettes, supports, contenus, pages ou solutions, en priorisant la valeur.',
        bullets: ['Production progressive des maquettes, supports, contenus, pages ou solutions', 'Priorisation des éléments à forte valeur', 'Points d’échange réguliers'],
        result: 'Incréments concrets livrés à chaque cycle',
      })}
      ${phase({
        num: '04',
        title: 'Validation et ajustements',
        photo: 'atelier-validation',
        tag: 'Revue de sprint · rétroaction continue',
        text: 'Nous démontrons les livrables, recueillons les observations et intégrons les retours dès l’itération suivante.',
        bullets: ['Démonstration des livrables et recueil des observations', 'Prise en compte des retours dès l’itération suivante', 'Finalisation et préparation à la livraison'],
        result: 'Livrables conformes aux attentes',
        accent: true,
      })}
      ${phase({
        num: '05',
        title: 'Livraison et accompagnement',
        photo: 'atelier-livraison',
        tag: 'Déploiement · amélioration continue',
        text: 'Nous remettons les livrables finalisés, accompagnons la prise en main et proposons les évolutions utiles.',
        bullets: ['Remise des livrables finalisés', 'Assistance à la mise en ligne ou à l’utilisation', 'Transfert de compétences et recommandations d’évolution'],
        result: 'Solution opérationnelle et autonomie',
      })}
    </ul>
  </div>
</section>

<section class="section section--grey" id="synthese">
  <div class="container">
    ${sectionHead({
      eyebrow: 'En un coup d’œil',
      title: 'La méthode <em>en synthèse.</em>',
      lead: 'Cinq phases, cinq résultats clés. Le détail s’adapte au projet, jamais la logique de validation.',
    })}
    <div class="table-wrap reveal">
      <table>
        <thead>
          <tr><th scope="col">Phase</th><th scope="col">Équivalent agile</th><th scope="col">Résultat clé</th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">01 — Cadrage du besoin</th><td>Sprint 0 · immersion et vision</td><td>Vision partagée et besoins priorisés</td></tr>
          <tr><th scope="row">02 — Proposition créative et technique</th><td>Planification agile · roadmap</td><td>Feuille de route et critères d’acceptation validés</td></tr>
          <tr><th scope="row">03 — Conception et développement</th><td>Sprints itératifs</td><td>Incréments concrets livrés à chaque cycle</td></tr>
          <tr><th scope="row">04 — Validation et ajustements</th><td>Revue de sprint · rétroaction continue</td><td>Livrables conformes aux attentes</td></tr>
          <tr><th scope="row">05 — Livraison et accompagnement</th><td>Déploiement · amélioration continue</td><td>Solution opérationnelle et autonomie</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section" id="benefices">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Bénéfices',
      title: 'Ce que la méthode <em>change concrètement.</em>',
      lead: 'Un projet n’est pas une boîte noire. Vous savez où il en est, ce qui arrive ensuite et ce qui a été validé.',
    })}
    <div class="card-grid-4" data-stagger>
      ${panel({ num: '01', title: 'Visibilité permanente', text: 'Suivi de l’avancement grâce aux livraisons progressives.' })}
      ${panel({ num: '02', title: 'Flexibilité', text: 'Les priorités peuvent évoluer sans remettre en cause tout le projet.' })}
      ${panel({ num: '03', title: 'Risques réduits', text: 'Les écarts sont détectés et corrigés tôt.' })}
      ${panel({ num: '04', title: 'Qualité renforcée', text: 'Validation continue et collaboration étroite.' })}
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    ${logoWall(TOOLS.methode, { title: 'Outils &amp; technologies' })}
  </div>
</section>

${ctaBand({
  eyebrow: 'Méthode',
  title: 'Prêts à démarrer un premier sprint ?',
  text: 'Le cadrage est le meilleur point de départ : une vision partagée et un backlog priorisé, avant toute production.',
  primary: btn('Démarrer un projet', 'contact.html', 'red'),
  secondary: btn('Voir les réalisations', 'realisations.html', 'ghost-light'),
})}
`,
});

/* --------------------------------------------------------------------------
   AGENCE
   -------------------------------------------------------------------------- */

const agence = layout({
  title: 'L’agence',
  description:
    'AKTAION SARL, agence digitale créée en 2022 en Côte d’Ivoire : mission, vision, valeurs, forces, parcours et équipe.',
  active: 'agence',
  body: `
${pageHero({
  eyebrow: 'L’agence',
  title: 'Créative, technique et <em>proche de vos réalités.</em>',
  lead: 'AKTAION SARL est une agence à l’intersection de la créativité, de la communication digitale et des technologies. Nous comprenons votre idée, la traduisons visuellement, la digitalisons et la rendons accessible à vos publics.',
  crumbs: [{ label: 'L’agence' }],
  actions: `${btn('Travailler avec nous', 'contact.html', 'red')}${btn('Voir la méthode', 'methode.html', 'outline')}`,
  aside: pointsCard('En bref', [
    'Créée en 2022, en Côte d’Ivoire',
    'Double compétence créative et technique',
    'Accompagnement de bout en bout',
    'Solutions adaptées à chaque marché',
  ]),
})}

${mediaBand('equipe-large', {
  ratio: '16 / 5',
  sizes: '100vw',
  caption: 'Photo d’illustration — ne représente pas l’équipe Aktaion.',
})}

<section class="section" id="mission">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Mission &amp; vision',
      title: 'À l’intersection de <em>trois mondes.</em>',
      lead: 'Créativité, communication digitale et technologies : une même équipe pour penser, produire et rendre accessible.',
    })}
    <div class="card-grid-2">
      <article class="panel reveal">
        <span class="panel__num">Mission</span>
        <h3 class="h3">Concevoir des solutions qui servent vraiment.</h3>
        <p>Concevoir des solutions digitales, graphiques et web qui permettent aux organisations de mieux se présenter, mieux communiquer et mieux atteindre leurs publics.</p>
      </article>
      <article class="panel panel--black reveal">
        <span class="panel__num">Vision</span>
        <h3 class="h3">Devenir un acteur de référence.</h3>
        <p>Devenir un acteur de référence dans la création de solutions numériques utiles, accessibles et visuellement fortes pour les entreprises et les institutions, en Afrique et au-delà.</p>
      </article>
    </div>
  </div>
</section>

<section class="section section--tight section--grey">
  <div class="container">
    <div class="section-head section-head--simple reveal">
      <div>
        <span class="eyebrow">Nos valeurs</span>
        <h2 class="h2 mt-24">Ce qui guide <em>nos décisions.</em></h2>
      </div>
    </div>
    <div class="value-grid">
      <div class="value-item"><span class="mono">01</span><h3>Créativité</h3></div>
      <div class="value-item"><span class="mono">02</span><h3>Professionnalisme</h3></div>
      <div class="value-item"><span class="mono">03</span><h3>Écoute du client</h3></div>
      <div class="value-item"><span class="mono">04</span><h3>Sens du détail</h3></div>
      <div class="value-item"><span class="mono">05</span><h3>Innovation pragmatique</h3></div>
      <div class="value-item"><span class="mono">06</span><h3>Respect des engagements</h3></div>
    </div>
  </div>
</section>

<section class="section" id="forces">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Ce qui nous distingue',
      title: 'Quatre forces, <em>une même promesse.</em>',
      lead: 'Digitaliser les processus, concevoir les outils, produire les contenus et rendre l’activité visible — avec une seule équipe.',
    })}
    <div class="card-grid-4" data-stagger>
      ${panel({ num: '01', title: 'Double compétence', text: 'Communication visuelle, conception web et logique de digitalisation réunies pour produire des supports utiles et exploitables.' })}
      ${panel({ num: '02', title: 'Ancrage local, regard global', text: 'Des solutions adaptées aux réalités de chaque marché : visibilité, crédibilité, présence en ligne.' })}
      ${panel({ num: '03', title: 'De bout en bout', text: 'De l’idée initiale à la mise en ligne ou à la livraison des supports, une seule équipe sur plusieurs étapes.' })}
      ${panel({ num: '04', title: 'Identité forte', text: 'Une image moderne qui associe création, technologies et professionnalisme.' })}
    </div>
  </div>
</section>

<section class="section section--grey" id="parcours">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Parcours',
      title: 'Depuis 2022, <em>une offre qui s’élargit.</em>',
      lead: 'De l’agence web et communication digitale à une offre structurée en quatre pôles.',
    })}
    <div class="timeline-grid" data-stagger>
      <div class="timeline-card timeline-card--black file-card file-card--dark file-card--timeline reveal" data-tilt>
        <span class="file-card__tab" aria-hidden="true">Parcours 01</span>
        <span class="file-card__crop file-card__crop--br" aria-hidden="true"></span>
        <div class="file-card__body">
          <div class="file-card__top"><p class="file-card__meta">Année de création</p><span class="file-card__index" aria-hidden="true">01</span></div>
          <h3 class="file-card__title">2022 — Création</h3>
          <p class="file-card__text">Agence web et de communication digitale fondée en Côte d’Ivoire.</p>
        </div>
      </div>
      <div class="timeline-card file-card file-card--timeline reveal" data-tilt>
        <span class="file-card__tab" aria-hidden="true">Parcours 02</span>
        <span class="file-card__crop file-card__crop--br" aria-hidden="true"></span>
        <div class="file-card__body">
          <div class="file-card__top"><p class="file-card__meta">Étape à compléter</p><span class="file-card__index" aria-hidden="true">02</span></div>
          <h3 class="file-card__title">[Année] — [Étape clé]</h3>
          <p class="file-card__text">Nouvelle expertise, projet marquant ou partenariat.</p>
        </div>
      </div>
      <div class="timeline-card file-card file-card--timeline reveal" data-tilt>
        <span class="file-card__tab" aria-hidden="true">Parcours 03</span>
        <span class="file-card__crop file-card__crop--br" aria-hidden="true"></span>
        <div class="file-card__body">
          <div class="file-card__top"><p class="file-card__meta">Étape à compléter</p><span class="file-card__index" aria-hidden="true">03</span></div>
          <h3 class="file-card__title">[Année] — [Étape clé]</h3>
          <p class="file-card__text">Nouvelle expertise, projet marquant ou partenariat.</p>
        </div>
      </div>
      <div class="timeline-card timeline-card--red file-card file-card--red file-card--timeline reveal" data-tilt>
        <span class="file-card__tab" aria-hidden="true">Parcours 04</span>
        <span class="file-card__crop file-card__crop--br" aria-hidden="true"></span>
        <div class="file-card__body">
          <div class="file-card__top"><p class="file-card__meta">Offre actuelle</p><span class="file-card__index" aria-hidden="true">04</span></div>
          <h3 class="file-card__title">Aujourd’hui — Offre élargie</h3>
          <p class="file-card__text">Digitalisation des processus, data, IA, marketing et audiovisuel.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" id="equipe">
  <div class="container">
    ${sectionHead({
      eyebrow: 'L’équipe',
      title: 'Des profils créatifs <em>et techniques.</em>',
      lead: 'Une équipe organisée en quatre pôles, qui travaille sur l’ensemble du projet plutôt que sur une seule étape.',
    })}
    <div class="team-grid" data-stagger>
      ${['01', '02', '03', '04'].map(teamCard).join('')}
    </div>
    <div class="mt-32">${logoWall(TOOLS.agence, { title: 'Outils &amp; technologies' })}</div>
  </div>
</section>

${ctaBand({
  eyebrow: 'Travailler avec nous',
  title: 'Envie de construire quelque chose d’utile ?',
  text: 'Nous aimons les projets qui clarifient, simplifient ou rendent une organisation plus accessible.',
  primary: btn('Nous contacter', 'contact.html', 'red'),
  secondary: btn('Voir nos réalisations', 'realisations.html', 'ghost-light'),
})}
`,
});

/* --------------------------------------------------------------------------
   RESSOURCES
   -------------------------------------------------------------------------- */

const ressources = layout({
  title: 'Ressources',
  description:
    'Articles, guides et newsletter Aktaion : digitalisation, web et mobile, data et IA, marketing digital.',
  active: 'ressources',
  body: `
${pageHero({
  eyebrow: 'Ressources',
  title: 'Des repères pour <em>avancer.</em>',
  lead: 'Conseils pratiques sur la digitalisation, le web, la data et la communication digitale. Des contenus courts, utiles et sans jargon.',
  crumbs: [{ label: 'Ressources' }],
  actions: `${btn('S’abonner à la newsletter', '#newsletter', 'red')}${btn('Poser une question', 'contact.html', 'outline')}`,
  aside: pointsCard('Au sommaire', [
    'Articles par expertise',
    'Guides pratiques',
    'Newsletter',
    'Questions fréquentes',
  ]),
})}

<section class="section">
  <div class="container">
    ${sectionHead({
      eyebrow: 'À la une',
      title: 'Un article pour <em>commencer.</em>',
      lead: 'La gestion documentaire est souvent le premier processus à digitaliser. Voici pourquoi, et ce que cela change.',
    })}
    <article class="file-card file-card--featured reveal" id="article-0" data-tilt data-cursor="Lire">
      <span class="file-card__tab" aria-hidden="true">À la une · 01</span>
      <span class="file-card__glare" aria-hidden="true"></span>
      <div class="file-card__media">
        ${photoImg('formation-agents', { sizes: '(min-width: 1024px) 52vw, 100vw' })}
        <span class="media__stamp">Illustration</span>
        <span class="file-card__detail"><span>Digitalisation</span><span>Bientôt disponible</span></span>
      </div>
      <span class="file-card__crop" aria-hidden="true"></span>
      <div class="file-card__body">
        <div class="file-card__top">
          <p class="file-card__meta">Digitalisation · Article à paraître</p>
          <span class="file-card__index" aria-hidden="true">01</span>
        </div>
        <h3 class="file-card__title">Pourquoi digitaliser la gestion documentaire de votre organisation ?</h3>
        <p class="file-card__text">Classement, recherche, droits d’accès, circuits de validation et archivage : une GED bien conçue fait gagner du temps et sécurise les décisions.</p>
        <div class="file-card__foot">
          <span class="file-card__status">Bientôt disponible</span>
          <span class="file-card__arrow" aria-hidden="true">${icon('arrowUpRight')}</span>
        </div>
      </div>
    </article>
  </div>
</section>

<section class="section section--grey" id="articles">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Articles',
      title: 'Des réponses <em>concrètes.</em>',
      lead: 'Six articles prévus pour couvrir les questions les plus fréquentes de nos clients.',
    })}
    ${filters(['Tous', 'Digitalisation', 'Web & mobile', 'Data & IA', 'Marketing'], 6)}
    <div class="article-grid" data-stagger>
      ${articleCard({ id: 'article-1', category: 'Digitalisation', color: 'red', index: '01', title: 'Pourquoi digitaliser la gestion documentaire de votre organisation ?', text: 'Classement, recherche, droits d’accès et archivage : ce que change une GED bien conçue.', photo: 'terrain-collecte' })}
      ${articleCard({ id: 'article-2', category: 'Digitalisation', color: 'grey', index: '02', title: 'Suivi-évaluation : choisir un système informatisé adapté à vos projets', text: 'Indicateurs, collecte terrain et consolidation : les critères pour choisir un outil utile.', photo: 'digitalisation-atelier' })}
      ${articleCard({ id: 'article-3', category: 'Web & mobile', color: 'black', index: '03', title: 'Site vitrine ou boutique en ligne : que choisir ?', text: 'Présenter son activité ou vendre en ligne : les critères pour décider.', photo: 'web-cadrage' })}
      ${articleCard({ id: 'article-4', category: 'Marketing', color: 'red', index: '04', title: 'Réseaux sociaux : comment planifier ses contenus ?', text: 'Un rythme réaliste, des formats adaptés et des messages cohérents.', photo: 'planning-editorial' })}
      ${articleCard({ id: 'article-5', category: 'Data & IA', color: 'blue', index: '05', title: 'Tableaux de bord : quels indicateurs suivre pour piloter son activité ?', text: 'Choisir quelques indicateurs utiles plutôt que mesurer tout et rien.' })}
      ${articleCard({ id: 'article-6', category: 'Marketing', color: 'grey', index: '06', title: 'SEO : comment être trouvé sur Google quand on est une PME ?', text: 'Les bases d’une structure de contenus claire et d’un référencement durable.' })}
    </div>
  </div>
</section>

<section class="section" id="guides">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Guides',
      title: 'Trois ressources à <em>garder sous la main.</em>',
      lead: 'Des documents courts pour préparer un projet, poser les bonnes questions et comprendre notre offre.',
    })}
    <div class="card-grid-3" data-stagger>
      ${panel({
        title: 'Digitaliser vos processus : la checklist',
        text: 'Les questions à se poser avant de lancer un projet de digitalisation.',
        extra: `<div class="icon-box">${icon('download')}</div><span class="tag">PDF · bientôt disponible</span>`,
      })}
      ${panel({
        title: 'Cadrer un projet de site web',
        text: 'Objectifs, contenus, arborescence et critères de réussite.',
        extra: `<div class="icon-box">${icon('download')}</div><span class="tag">PDF · bientôt disponible</span>`,
      })}
      ${panel({
        title: 'Brochure Aktaion 2026',
        text: 'L’offre, les quatre pôles et la méthode en un document.',
        extra: `<div class="icon-box">${icon('download')}</div><span class="tag">PDF · bientôt disponible</span>`,
      })}
    </div>
    <p class="form-note mt-24">Les fichiers PDF seront disponibles prochainement. En attendant, nous pouvons vous les transmettre sur demande.</p>
  </div>
</section>

<section class="section section--grey" id="newsletter">
  <div class="container">
    <div class="feature-grid">
      <div class="feature__copy reveal">
        <span class="eyebrow">Newsletter</span>
        <h2 class="h2 mt-24">Recevez nos conseils <em>par email.</em></h2>
        <p class="lead">Un message régulier, utile et sans spam.</p>
        <ul class="feature__bullets">
          <li><span class="num">01</span><span>Des repères pratiques sur la digitalisation</span></li>
          <li><span class="num">02</span><span>Des exemples de solutions et de méthodes</span></li>
          <li><span class="num">03</span><span>Aucune publicité, désinscription à tout moment</span></li>
        </ul>
      </div>
      <div class="form-card reveal">
        <form data-newsletter>
          <div class="field">
            <label for="newsletter-email">Votre email</label>
            <input id="newsletter-email" name="email" type="email" placeholder="vous@organisation.com" autocomplete="email" required>
          </div>
          <button class="btn btn--red" type="submit">S’abonner ${icon('arrow')}</button>
          <p class="form-note">Démonstration : l’inscription n’est pas encore connectée. <span data-newsletter-note hidden></span></p>
        </form>
      </div>
    </div>
  </div>
</section>

${ctaBand({
  eyebrow: 'Ressources',
  title: 'Une question qui mérite un échange ?',
  text: 'Les articles donnent des repères ; votre contexte mérite une réponse adaptée.',
  primary: btn('Poser votre question', 'contact.html', 'red'),
  secondary: btn('Voir nos expertises', 'expertises.html', 'ghost-light'),
})}
`,
});

/* --------------------------------------------------------------------------
   CONTACT
   -------------------------------------------------------------------------- */

const contact = layout({
  title: 'Contact',
  description:
    'Contactez Aktaion pour parler de votre projet : digitalisation, site web, application, data et IA, marketing digital ou production audiovisuelle.',
  active: 'contact',
  body: `
${pageHero({
  eyebrow: 'Contact',
  title: 'Parlons de <em>votre projet.</em>',
  lead: 'Un échange de cadrage suffit pour clarifier les priorités et la première étape utile. Décrivez votre contexte, nous revenons vers vous.',
  crumbs: [{ label: 'Contact' }],
  aside: pointsCard('Pour bien démarrer', [
    'Votre contexte et votre organisation',
    'Vos objectifs et vos publics',
    'Vos contraintes de délai et de budget',
    'Les personnes concernées',
  ]),
})}

${mediaBand('bureaux-01', {
  ratio: '21 / 9',
  caption: 'Photo d’illustration — ne représente pas les locaux d’Aktaion.',
})}

<section class="section">
  <div class="container">
    <div class="contact-grid">
      <div class="form-card reveal" id="formulaire">
        <form data-contact-form>
          <div class="form-grid">
            <div class="field">
              <label for="c-nom">Nom complet</label>
              <input id="c-nom" name="nom" type="text" autocomplete="name" required>
            </div>
            <div class="field">
              <label for="c-org">Organisation</label>
              <input id="c-org" name="organisation" type="text" autocomplete="organization" required>
            </div>
            <div class="field">
              <label for="c-email">Email professionnel</label>
              <input id="c-email" name="email" type="email" autocomplete="email" required>
            </div>
            <div class="field">
              <label for="c-tel">Téléphone</label>
              <input id="c-tel" name="telephone" type="tel" autocomplete="tel">
            </div>
            <div class="field">
              <label for="c-type">Type d’organisation</label>
              <select id="c-type" name="type-organisation" required>
                <option value="">Sélectionner…</option>
                <option>Secteur public</option>
                <option>Secteur privé</option>
                <option>Autre</option>
              </select>
            </div>
            <div class="field">
              <label for="c-expertise">Expertise concernée</label>
              <select id="c-expertise" name="expertise">
                <option value="">Sélectionner…</option>
                <option>Digitalisation des processus</option>
                <option>Web, mobile &amp; e-commerce</option>
                <option>Data &amp; IA</option>
                <option>Marketing digital</option>
                <option>Audiovisuel &amp; création</option>
                <option>Je ne sais pas encore</option>
              </select>
            </div>
            <div class="field field--full">
              <label for="c-projet">Votre projet</label>
              <textarea id="c-projet" name="projet" placeholder="Contexte, objectifs, délais souhaités…"></textarea>
            </div>
          </div>
          <button class="btn btn--red" type="submit">Envoyer la demande ${icon('arrow')}</button>
          <p class="form-note">Démonstration : ce formulaire affiche une confirmation mais n’envoie pas encore de message.</p>
        </form>
        <div class="form-success" data-contact-success hidden>
          <div class="form-success__icon">${icon('check')}</div>
          <h2 class="h3">Merci — votre demande est prête.</h2>
          <p class="body">Ce formulaire est une démonstration : aucun message n’a été envoyé. Pour prendre contact dès maintenant, écrivez-nous à <a href="${CONTACT.emailHref}">${CONTACT.email}</a>.</p>
          <button class="btn btn--outline" type="button" data-contact-reset>Revenir au formulaire ${icon('arrow')}</button>
        </div>
      </div>
      <aside class="contact-aside reveal" aria-label="Coordonnées et prochaines étapes">
        ${contactCard()}
        ${nextStepsCard()}
        <div class="info-card file-card file-card--info reveal">
          <span class="file-card__tab" aria-hidden="true">Fiche 03</span>
          <span class="file-card__crop file-card__crop--br" aria-hidden="true"></span>
          <h2>Explorer</h2>
          <ul>
            <li><a href="expertises.html">Nos quatre pôles d’expertise</a></li>
            <li><a href="methode.html">Notre méthode en cinq phases</a></li>
            <li><a href="realisations.html">Nos réalisations</a></li>
            <li><a href="index.html#faq">Questions fréquentes</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section section--grey section--tight">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Vous hésitez encore ?',
      title: 'Trois façons de <em>prendre de l’avance.</em>',
      lead: 'Pas besoin d’un cahier des charges complet pour nous écrire. Un contexte et un objectif suffisent.',
      simple: true,
    })}
    <div class="card-grid-3" data-stagger>
      ${panel({
        num: '01',
        title: 'Comprendre nos pôles',
        text: 'Digitalisation, web et mobile, data et IA, marketing et création : quatre portes d’entrée.',
        extra: `<div class="mt-12">${arrowLink('Voir les expertises', 'expertises.html')}</div>`,
      })}
      ${panel({
        num: '02',
        title: 'Voir la méthode',
        text: 'Cinq phases, des cycles courts et un résultat concret à chaque sprint.',
        extra: `<div class="mt-12">${arrowLink('Découvrir la méthode', 'methode.html')}</div>`,
      })}
      ${panel({
        num: '03',
        title: 'Regarder nos réalisations',
        text: 'Des exemples de solutions par expertise et par format.',
        extra: `<div class="mt-12">${arrowLink('Voir les réalisations', 'realisations.html')}</div>`,
      })}
    </div>
  </div>
</section>
`,
});

/* --------------------------------------------------------------------------
   CRÉDITS, LICENCES & MENTIONS
   -------------------------------------------------------------------------- */

const photoRows = PHOTO_CREDITS.map((photo, index) => `<tr>
  <th scope="row">${String(index + 1).padStart(2, '0')}</th>
  <td>${photo.source}</td>
  <td>${photo.provider}</td>
  <td><a href="${photo.url}" target="_blank" rel="noopener noreferrer">Voir la source</a></td>
  <td><a href="${photo.license}" target="_blank" rel="noopener noreferrer">Licence</a></td>
</tr>`).join('');

const credits = layout({
  title: 'Crédits, licences & mentions',
  description:
    'Crédits et licences du site Aktaion : photographies d’illustration, outils et marques citées à titre nominatif, typographies, icônes et stockage local.',
  active: '',
  robots: 'noindex,follow',
  body: `
${pageHero({
  eyebrow: 'Informations',
  title: 'Crédits, licences et <em>mentions.</em>',
  lead: 'Provenance des images, marques citées, typographies et icônes utilisées sur ce site. Les visuels sont des illustrations génériques, jamais des personnes, clients, partenaires ou locaux réels d’Aktaion.',
  crumbs: [{ label: 'Crédits' }],
  actions: '',
  aside: pointsCard('En un coup d’œil', [
    'Photographies d’illustration sous licence',
    'Marques citées à titre nominatif',
    'Typographies et icônes sous licence libre',
    'Choix de thème stocké localement',
  ]),
})}

<section class="section">
  <div class="container">
    <div class="credits-grid">
      <div class="credits-card reveal">
        <h2>Photographies</h2>
        <p>Les photographies proviennent de banques d’images (Pexels et Unsplash) et sont utilisées conformément à leurs licences respectives. Elles sont recadrées et optimisées en WebP. Chaque photo porte la mention « Illustration ».</p>
        <p><strong>Aucune photographie ne représente</strong> un membre de l’équipe Aktaion, un client, un partenaire, un local ou une réalisation d’Aktaion.</p>
      </div>
      <div class="credits-card reveal">
        <h2>Marques &amp; logos</h2>
        <p>Les logos d’outils et de plateformes sont utilisés à titre nominatif, pour indiquer des technologies avec lesquelles nous travaillons. Ils restent la propriété de leurs détenteurs.</p>
        <p><strong>Aucune affiliation, aucun partenariat et aucune recommandation</strong> ne sont implicites. Aucun logo de client ou de partenaire n’est présenté sur ce site.</p>
      </div>
      <div class="credits-card reveal">
        <h2>Typographies &amp; icônes</h2>
        <p>Lexend Deca et Roboto sont distribuées sous SIL Open Font License 1.1, via Google Fonts. Les pictogrammes d’outils sont issus de Simple Icons (CC0 1.0).</p>
        <p>Les icônes LinkedIn, Instagram et YouTube sont des tracés de marque utilisés à titre nominatif. Leurs liens sont des emplacements à compléter.</p>
      </div>
    </div>

    <div class="credits-table-wrap reveal">
      <table class="credits-table">
        <caption class="visually-hidden">Photographies d’illustration, sources et licences</caption>
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Fichier source</th>
            <th scope="col">Banque d’images</th>
            <th scope="col">Source</th>
            <th scope="col">Licence</th>
          </tr>
        </thead>
        <tbody>${photoRows}</tbody>
      </table>
    </div>

    <div class="credits-disclaimer reveal">
      <p><strong>Photographies d’illustration.</strong> Les images de personnes, de réunions, de bureaux ou de tournages sont des mises en scène génériques issues de banques d’images. Elles ne documentent pas l’activité réelle d’Aktaion et ne constituent ni une preuve de réalisation, ni une recommandation, ni une présentation de l’équipe ou des locaux.</p>
      <p><strong>Outils et technologies.</strong> La présence d’un logo signifie uniquement que l’outil est utilisé ou connu dans le cadre de nos prestations. Elle n’implique aucune affiliation, aucun partenariat, aucun parrainage ni aucune validation de la part du détenteur de la marque.</p>
      <p><strong>Contenus du site.</strong> Les textes présentent l’offre et la méthode d’Aktaion. Les études de cas, noms de clients et résultats détaillés seront publiés lorsqu’ils seront disponibles et autorisés.</p>
    </div>
  </div>
</section>

<section class="section section--grey section--tight">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Vie privée',
      title: 'Aucun traceur, <em>un seul stockage local.</em>',
      lead: 'Ce site ne charge ni régie publicitaire ni outil de mesure d’audience. Seul votre choix de thème est mémorisé par votre navigateur.',
      simple: true,
    })}
    <div class="credits-grid">
      <div class="credits-card reveal">
        <h2>Préférence de thème</h2>
        <p>La version rouge ou violette choisie est enregistrée dans le stockage local de votre navigateur (clé <code>aktaion-theme</code>). Elle ne quitte pas votre appareil et peut être effacée à tout moment en vidant les données du site.</p>
      </div>
      <div class="credits-card reveal">
        <h2>Formulaires de démonstration</h2>
        <p>Les formulaires de contact et de newsletter affichent une confirmation locale mais n’envoient aucune donnée vers un serveur. Aucun message n’est transmis.</p>
      </div>
      <div class="credits-card reveal">
        <h2>Signaler un crédit</h2>
        <p>Pour signaler une erreur de crédit, demander le retrait d’un visuel ou poser une question sur ces mentions, utilisez la <a href="contact.html">page de contact</a>.</p>
      </div>
    </div>
  </div>
</section>
`,
});

export const pages = [
  { file: 'index.html', html: home },
  { file: 'expertises.html', html: expertises },
  { file: 'digitalisation.html', html: digitalisation },
  { file: 'web-mobile.html', html: webMobile },
  { file: 'marketing.html', html: marketing },
  { file: 'secteurs.html', html: secteurs },
  { file: 'realisations.html', html: realisations },
  { file: 'methode.html', html: methode },
  { file: 'agence.html', html: agence },
  { file: 'ressources.html', html: ressources },
  { file: 'contact.html', html: contact },
  { file: 'credits.html', html: credits },
];

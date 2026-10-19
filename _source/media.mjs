/* ==========================================================================
   AKTAION V2 — photographies d’illustration
   Métadonnées, srcset 640/1280 et crédits. Aucune photo ne représente une
   personne, un client, un partenaire ou un local réel d’Aktaion.
   ========================================================================== */

const PHOTOS = {
  'hero-atelier': {
    w: 1280, h: 1156, position: '50% 42%',
    alt: 'Personne travaillant sur un ordinateur portable dans un espace de travail.',
    source: 'accueil/accueil-hero-equipe.webp', provider: 'Unsplash',
    url: 'https://unsplash.com/photos/1531482615713-2afd69097998', license: 'https://unsplash.com/license',
  },
  'secteur-public': {
    w: 1280, h: 480, position: '50% 50%',
    alt: 'Bus et véhicules de transport en commun sur une route.',
    source: 'accueil/accueil-secteur-public.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/8608890/', license: 'https://www.pexels.com/license/',
  },
  'secteur-prive': {
    w: 1280, h: 480, position: '50% 45%',
    alt: 'Équipe réunie autour d’une table de travail.',
    source: 'accueil/accueil-secteur-prive.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/7640793/', license: 'https://www.pexels.com/license/',
  },
  'terrain-collecte': {
    w: 1280, h: 720, position: '50% 42%',
    alt: 'Personne saisissant des données sur une tablette lors d’une collecte de terrain.',
    source: 'digitalisation/digit-collecte-terrain.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/17797257/', license: 'https://www.pexels.com/license/',
  },
  'formation-agents': {
    w: 1280, h: 720, position: '55% 40%',
    alt: 'Atelier de formation devant un tableau blanc.',
    source: 'digitalisation/digit-formation-agents.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/9489075/', license: 'https://www.pexels.com/license/',
  },
  'planning-editorial': {
    w: 1280, h: 720, position: '55% 50%',
    alt: 'Mains annotant un planning éditorial sur un bureau.',
    source: 'marketing/marketing-calendrier-editorial.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/6172482/', license: 'https://www.pexels.com/license/',
  },
  'tournage': {
    w: 1280, h: 720, position: '55% 45%',
    alt: 'Équipe de tournage avec une caméra et une perche.',
    source: 'marketing/marketing-tournage.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/19102538/', license: 'https://www.pexels.com/license/',
  },
  'atelier-cadrage': {
    w: 1280, h: 853, position: '50% 45%',
    alt: 'Atelier de cadrage autour d’un tableau blanc.',
    source: 'methode/methode-etape-cadrage.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/8276671/', license: 'https://www.pexels.com/license/',
  },
  'atelier-production': {
    w: 1280, h: 853, position: '55% 45%',
    alt: 'Équipe travaillant sur des ordinateurs.',
    source: 'methode/methode-etape-production.webp', provider: 'Unsplash',
    url: 'https://unsplash.com/photos/1531482615713-2afd69097998', license: 'https://unsplash.com/license',
  },
  'atelier-validation': {
    w: 1280, h: 853, position: '50% 38%',
    alt: 'Présentation et revue de projet en salle.',
    source: 'methode/methode-etape-validation.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/8761327/', license: 'https://www.pexels.com/license/',
  },
  'atelier-livraison': {
    w: 1280, h: 853, position: '50% 55%',
    alt: 'Remise de documents lors d’une réunion de travail.',
    source: 'methode/methode-etape-livraison.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/7979601/', license: 'https://www.pexels.com/license/',
  },
  'bureaux-01': {
    w: 1280, h: 800, position: '50% 55%',
    alt: 'Salle de réunion lumineuse avec de grandes fenêtres.',
    source: 'agence/agence-bureaux-01.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/7651639/', license: 'https://www.pexels.com/license/',
  },
  'bureaux-02': {
    w: 1280, h: 800, position: '50% 50%',
    alt: 'Espace détente avec canapés et tables basses.',
    source: 'agence/agence-bureaux-02.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/7587828/', license: 'https://www.pexels.com/license/',
  },
  'equipe-large': {
    w: 1280, h: 400, position: '50% 50%',
    alt: 'Personnes travaillant dans un espace ouvert.',
    source: 'agence/agence-equipe.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/1181370/', license: 'https://www.pexels.com/license/',
  },
  'facade': {
    w: 1280, h: 720, position: '55% 45%',
    alt: 'Façade vitrée d’un bâtiment contemporain.',
    source: 'contact/contact-facade.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/28665040/', license: 'https://www.pexels.com/license/',
  },
  'data-presentation': {
    w: 1280, h: 640, position: '55% 40%',
    alt: 'Personne présentant des résultats devant un écran.',
    source: 'expertises/expertises-data-ia.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/7414034/', license: 'https://www.pexels.com/license/',
  },
  'digitalisation-atelier': {
    w: 1280, h: 640, position: '50% 45%',
    alt: 'Atelier de travail autour de documents et d’un tableau.',
    source: 'expertises/expertises-digitalisation.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/8276671/', license: 'https://www.pexels.com/license/',
  },
  'web-equipe': {
    w: 1280, h: 640, position: '50% 42%',
    alt: 'Deux personnes travaillant sur des ordinateurs.',
    source: 'expertises/expertises-web-mobile.webp', provider: 'Unsplash',
    url: 'https://unsplash.com/photos/1531482615713-2afd69097998', license: 'https://unsplash.com/license',
  },
  'audiovisuel-screens': {
    w: 1280, h: 640, position: '50% 45%',
    alt: 'Poste de montage vidéo avec plusieurs écrans.',
    source: 'expertises/expertises-marketing-audiovisuel.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/8100060/', license: 'https://www.pexels.com/license/',
  },
  'web-cadrage': {
    w: 1280, h: 720, position: '50% 45%',
    alt: 'Atelier de conception devant un tableau blanc.',
    source: 'services-web/web-atelier-cadrage.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/8276671/', license: 'https://www.pexels.com/license/',
  },
  'web-demo': {
    w: 1280, h: 720, position: '50% 35%',
    alt: 'Présentation d’une solution lors d’une démonstration.',
    source: 'services-web/web-livraison-demo.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/7414034/', license: 'https://www.pexels.com/license/',
  },
  'realisation-video': {
    w: 1280, h: 640, position: '50% 45%',
    alt: 'Équipe de tournage sur un plateau.',
    source: 'realisations/realisation-07.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/14699461/', license: 'https://www.pexels.com/license/',
  },
  'showreel': {
    w: 1280, h: 720, position: '50% 45%',
    alt: 'Cadreur en tournage.',
    source: 'marketing/marketing-showreel-poster.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/28254441/', license: 'https://www.pexels.com/license/',
  },
  'secteur-public-wide': {
    w: 1280, h: 480, position: '50% 50%',
    alt: 'Réunion de travail avec ordinateurs portables.',
    source: 'secteurs/secteurs-public.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/1181370/', license: 'https://www.pexels.com/license/',
  },
  'secteur-prive-wide': {
    w: 1280, h: 480, position: '50% 45%',
    alt: 'Échanges autour d’une table de réunion.',
    source: 'secteurs/secteurs-prive.webp', provider: 'Pexels',
    url: 'https://www.pexels.com/photo/7640793/', license: 'https://www.pexels.com/license/',
  },
};

export const PHOTO_CREDITS = Object.entries(PHOTOS).map(([slug, data]) => ({ slug, ...data }));

const BASE = 'assets/img/photos';

export function esc(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function photoSrcset(slug) {
  return `${BASE}/${slug}-640.webp 640w, ${BASE}/${slug}-1280.webp 1280w`;
}

export function photoImg(slug, {
  className = '',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  loading = 'lazy',
  fetchpriority = '',
  alt = null,
  position = null,
  draggable = false,
} = {}) {
  const data = PHOTOS[slug];
  if (!data) throw new Error(`Unknown photo: ${slug}`);
  const altText = alt === null ? data.alt : alt;
  const style = `object-position:${position || data.position || '50% 50%'}`;
  return `<img${className ? ` class="${className}"` : ''} src="${BASE}/${slug}-1280.webp" srcset="${photoSrcset(slug)}" sizes="${sizes}" width="${data.w}" height="${data.h}" alt="${esc(altText)}" loading="${loading}" decoding="async"${fetchpriority ? ` fetchpriority="${fetchpriority}"` : ''}${draggable ? '' : ' draggable="false"'} style="${style}">`;
}

export function photoPreload(slug, sizes = '(min-width: 1180px) 44vw, 100vw') {
  const data = PHOTOS[slug];
  if (!data) throw new Error(`Unknown photo: ${slug}`);
  return `<link rel="preload" as="image" href="${BASE}/${slug}-1280.webp" imagesrcset="${photoSrcset(slug)}" imagesizes="${sizes}" fetchpriority="high">`;
}

export function photoStamp(text = 'Illustration') {
  return `<span class="media__stamp" aria-hidden="true">${text}</span>`;
}

export function photoFigure(slug, {
  className = '',
  frameClass = '',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  loading = 'lazy',
  fetchpriority = '',
  alt = null,
  position = null,
  ratio = '4 / 3',
  caption = 'Photo d’illustration.',
  stamp = true,
} = {}) {
  const data = PHOTOS[slug];
  if (!data) throw new Error(`Unknown photo: ${slug}`);
  return `<figure class="media${className ? ` ${className}` : ''}">
    <div class="media__frame${frameClass ? ` ${frameClass}` : ''}" style="aspect-ratio:${ratio}">
      ${photoImg(slug, { sizes, loading, fetchpriority, alt, position })}
      ${stamp ? photoStamp() : ''}
    </div>
    ${caption ? `<figcaption class="media__caption">${caption}</figcaption>` : ''}
  </figure>`;
}

export function mediaBand(slug, {
  className = '',
  sizes = '100vw',
  caption = 'Photo d’illustration.',
  position = null,
  ratio = '21 / 9',
  loading = 'lazy',
} = {}) {
  return `<div class="media-band${className ? ` ${className}` : ''}" data-parallax="0.06">
    ${photoFigure(slug, { sizes, caption, position, ratio, loading, className: 'media-band__figure' })}
  </div>`;
}

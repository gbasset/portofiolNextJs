export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://gaetanbasset.com').replace(/\/$/, '');

export const AUTHOR_NAME = 'Gaëtan Basset';

export const SITE_NAME = `${AUTHOR_NAME} — Développeur front-end`;

export const DEFAULT_DESCRIPTION =
  'Portfolio de Gaëtan Basset, développeur front-end spécialisé en React, Next.js, Node.js et TypeScript. Projets web, SaaS et expérience utilisateur.';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/t%C3%A9l%C3%A9chargement.png`;

export const PAGE_SEO = {
  home: {
    title: 'Accueil',
    description:
      'Découvrez le portfolio de Gaëtan Basset, développeur front-end React et Node.js. Compétences, projets web et applications SaaS.',
    path: '/',
  },
  about: {
    title: 'Parcours',
    description:
      'Parcours professionnel de Gaëtan Basset : développeur front-end JavaScript/React, formations, outils et expérience produit.',
    path: '/about',
  },
  contact: {
    title: 'Contact',
    description:
      'Contactez Gaëtan Basset pour une collaboration, une mission front-end ou un échange autour de vos projets web.',
    path: '/contact',
  },
  projects: {
    title: 'Projets',
    description:
      'Explorez les projets web de Gaëtan Basset : applications React, back-office, e-commerce et expériences interactives.',
    path: '/projects',
  },
};

export function buildTitle(pageTitle) {
  if (!pageTitle) {
    return SITE_NAME;
  }

  return `${pageTitle} | ${AUTHOR_NAME}`;
}

export function buildCanonical(path = '/') {
  if (!path || path === '/') {
    return `${SITE_URL}/`;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${SITE_URL}${normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`}`;
}

export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR_NAME,
    url: `${SITE_URL}/`,
    jobTitle: 'Développeur front-end',
    sameAs: [
      'https://www.linkedin.com/in/gaetan-basset-289b9410a/',
      'https://github.com/gbasset',
    ],
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: 'fr-FR',
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
    },
  };
}

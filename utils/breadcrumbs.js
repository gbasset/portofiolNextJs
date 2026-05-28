import { buildCanonical } from './seo';

export const BREADCRUMB_HOME = {
  label: 'Accueil',
  path: '/',
};

export function buildBreadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: buildCanonical(item.path),
    })),
  };
}

export function getAboutBreadcrumbs() {
  return [
    BREADCRUMB_HOME,
    { label: 'Parcours', path: '/about' },
  ];
}

export function getContactBreadcrumbs() {
  return [
    BREADCRUMB_HOME,
    { label: 'Contact', path: '/contact' },
  ];
}

export function getProjectsBreadcrumbs() {
  return [
    BREADCRUMB_HOME,
    { label: 'Projets', path: '/projects' },
  ];
}

export function getProjectDetailBreadcrumbs(projectName, projectId) {
  return [
    BREADCRUMB_HOME,
    { label: 'Projets', path: '/projects' },
    { label: projectName, path: `/projects/${projectId}` },
  ];
}

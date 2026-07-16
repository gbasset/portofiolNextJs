export interface ProjectLink {
  label: string;
  url: string;
}

export type DeviceType = 'mobile' | 'desktop';

export interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** Path under /public or absolute URL */
  coverImage: string;
  images: string[];
  stack: string[];
  devices: DeviceType[];
  links: ProjectLink[];
  /** Ce qui rend ce projet remarquable côté bonnes pratiques — visible aux recruteurs */
  highlight: string;
}

export const projectsData: ProjectData[] = [
  {
    id: 'ecommerce-vite-react',
    name: 'E-Commerce React',
    tagline: 'Front-end e-commerce en Feature Sliced Design, sans compromis sur la qualité.',
    description:
      'Application e-commerce complète — catalogue produits, recherche, panier — construite en React 18 + TypeScript strict. L\'architecture suit le pattern Feature Sliced Design : chaque fonctionnalité (list-product, search-product, cart…) est un slice autonome avec ses propres couches api/, types/, et ui/. Le projet intègre commitlint + Husky pour des commits conventionnels obligatoires, Jest + Testing Library pour les tests unitaires, et eslint-plugin-jsx-a11y pour l\'accessibilité.',
    coverImage: '/images/altumcode-U0tBTn8UR8I-unsplash.jpg',
    images: ['/images/altumcode-U0tBTn8UR8I-unsplash.jpg'],
    stack: ['React 18', 'TypeScript', 'Vite', 'TanStack Query', 'MUI', 'Tailwind CSS', 'Jest', 'React Router v6'],
    devices: ['desktop', 'mobile'],
    links: [
      { label: 'Voir le code', url: 'https://github.com/gbasset/ecommerce-vite-react' },
    ],
    highlight: 'Feature Sliced Design · commits conventionnels · tests Jest · ESLint a11y',
  },
  {
    id: 'megapokedex',
    name: 'MegaPokedex',
    tagline: 'Une encyclopedie Pokemon front-end riche, structuree par modules et pensee pour l exploration.',
    description:
      'Application Pokedex developpee avec React, Vite et TypeScript autour de la PokeAPI. Le projet va au-dela d une simple liste de creatures: fiches detaillees, comparaison de stats, catalogue d attaques, navigation media et parcours de donnees derives. Le code est decoupe en modules fonctionnels distincts comme `Attacks`, `Comparison`, `Media` et `PokeId`, chacun structure avec ses couches `api/`, `logic/`, `context/`, `types/` et `utils/` quand necessaire.',
    coverImage: '/images/altumcode-zE007SNgcdE-unsplash.jpg',
    images: ['/images/altumcode-zE007SNgcdE-unsplash.jpg'],
    stack: ['React 18', 'TypeScript', 'Vite', 'Axios', 'React Router v6', 'React Tooltip', 'CSS Modules'],
    devices: ['desktop'],
    links: [
      { label: 'Voir le code', url: 'https://github.com/gbasset/megapokedex' },
    ],
    highlight: 'Architecture modulaire · PokeAPI · context + hooks de logique',
  },
  {
    id: 'portfolio-v2-dashboard',
    name: 'Portfolio Dashboard',
    tagline: 'Un back-office full-stack pour administrer dynamiquement le contenu d un portfolio.',
    description:
      'Application full-stack orientee administration de contenu avec un serveur Node.js / Express, une base MongoDB via Mongoose et un client React embarque dans le meme repository. Le projet couvre la gestion des projets, tags, langages, images et authentification, avec une organisation backend claire en `controllers/`, `models/`, `routes/`, `auth/` et `utils/`. On y retrouve aussi l integration Cloudinary pour les medias, JWT / Passport pour la securisation et une vraie interface d administration cote client.',
    coverImage: '/images/backoffice/pvypd0fmqei3br27igdp.png',
    images: ['/images/backoffice/pvypd0fmqei3br27igdp.png'],
    stack: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Passport', 'React', 'Cloudinary'],
    devices: ['desktop'],
    links: [
      { label: 'Voir le code', url: 'https://github.com/gbasset/portfolioV2' },
    ],
    highlight: 'API REST · back-office admin · auth JWT · gestion medias Cloudinary',
  },
];

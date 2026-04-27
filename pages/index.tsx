import Head from 'next/head';
import { useEffect } from 'react';
import axios from 'axios';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import SkillsShowcase from '../components/Home/SkillsShowcase';
import ProjectAcordeon from '../components/Home/ProjectAcordeon';
import HeroRoleTitle from '../components/Home/HeroRoleTitle';
import HeroIntro from '../components/Home/HeroIntro';
import { apiProjects } from '../utils/data';

interface SkillLanguage {
  language: string;
  technos: string[];
  image: string;
}

interface MainProject {
  _id: string;
  name: string;
  description: string;
  imageHome: {
    url: string;
  };
}

interface HomeProps {
  projects: MainProject[] | null;
}

function Home({ projects }: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  const lang: SkillLanguage[] = [
    {
      language: 'JavaScript',
      technos: ['EcmaScript 6', 'Fetch', 'Async/Await', 'Gestion du Dom', 'Librairies'],
      image: '/logos/icons8-javascript-logo.svg',
    },
    {
      language: 'ReactJs',
      technos: ['Context', 'Classes', 'Hooks', 'NextJs', 'Redux'],
      image: '/logos/icons8-react.svg',
    },
    {
      language: 'Performance web',
      technos: [
        'Temps de chargement',
        'Perf navigateur',
        'Webpack / Vite',
        'Dependances & securite',
        'Jest & Cypress',
      ],
      image: '/logos/perf-web.svg',
    },
    {
      language: 'TypeScript',
      technos: ['TypeScript', 'Interfaces', 'Classes', 'Generics', 'Decorators'],
      image: '/logos/ts.svg',
    },
    {
      language: 'Bdd',
      technos: ['Sql', 'Mongodb', 'Firebase', 'GraphQl', 'PhpMyAdmin'],
      image: '/logos/database.svg',
    },
    {
      language: 'NodeJs',
      technos: ['JWT', 'Express', 'Passport', 'SocketIo', 'Handlebars'],
      image: '/logos/nodejs-svg.svg',
    },
    {
      language: 'Unit testing',
      technos: ['Jest', 'Cypress', 'Testing Library', 'React Testing Library'],
      image: '/logos/testing.svg',

    },
    {
      language: 'Integration',
      technos: ['Html 5', 'Css 3', 'Flexbox', 'Css Grid', 'Librairies Css'],
      image: '/logos/icons8-html-5.svg',
    },
    {
      language: 'CI/CD',
      technos: ['Azure Devops', 'GitHub Actions', 'Netlify', 'Vercel'],
      image: '/logos/cicd.svg',
    },
  ];

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Accueil du portfolio de Basset Gaetan </title>
        <meta
          name="description"
          content="Accueil du portfolio de Gaetan Basset Developpeur web, ReactJs , NodeJs et Css. Creation de site web, site vitrine et e-commerce et application web SASS. "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="mx-auto flex w-[min(92%,52rem)] flex-col items-center px-4 py-6 sm:w-4/5 md:px-8">
          <HeroRoleTitle />
          <HeroIntro onProjectsClick={() => router.replace('/projects')} />
        </div>
        <SkillsShowcase items={lang} />
        <div>{projects && <ProjectAcordeon mainProjects={projects} />}</div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const mainProject = await axios
    .get<MainProject[]>(`${apiProjects}projectMain`)
    .then((res) => res.data)
    .catch((error: unknown) => {
      console.log('Error in getStaticProps', error);
      console.error('Une erreur est survenue pendant la recuperation des languages');
      return null;
    });

  return {
    props: {
      projects: mainProject ?? null,
    },
  };
};

export default Home;

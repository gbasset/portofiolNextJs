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
import skillsData from '../data/skillsData.json';

interface SkillProject {
  title: string;
  company: string;
  period: string;
  context: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  stack: string[];
}

interface Skill {
  id: string;
  language: string;
  image: string;
  technos: string[];
  description: string;
  projects: SkillProject[];
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

  const skills: Skill[] = skillsData.skills;

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
        <SkillsShowcase items={skills} />
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

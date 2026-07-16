import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import SkillsShowcase from '../components/Home/SkillsShowcase';
import HeroRoleTitle from '../components/Home/HeroRoleTitle';
import HeroIntro from '../components/Home/HeroIntro';
import ProjectsFullPage from '../components/Project/ProjectsFullPage';
import skillsData from '../data/skillsData.json';
import type { Skill } from '../types/skills.types';

function Home() {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  const skills = skillsData.skills as Skill[];
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Accueil du portfolio de Basset Gaetan</title>
        <meta
          name="description"
          content="Portfolio de Gaëtan Basset, développeur web React / TypeScript. Projets respectant les standards Clean Code et SOLID."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="mx-auto flex w-[min(92%,52rem)] flex-col items-center px-4 py-6 sm:w-4/5 md:px-8">
          <HeroRoleTitle />
          <HeroIntro onProjectsClick={() => router.replace('/#projects-showcase')} />
        </div>
        <SkillsShowcase items={skills} />
        {/* <ProjectAcordeon projects={projectsData} /> */}
        <ProjectsFullPage embedded />
      </div>
    </>
  );
}

export default Home;

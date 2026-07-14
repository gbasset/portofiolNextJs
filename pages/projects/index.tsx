import React, { useEffect } from 'react';
import Head from 'next/head';
import ProjectsFullPage from '../../components/Project/ProjectsFullPage';

export default function Projects() {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <Head>
        <title>Projets de Basset Gaëtan</title>
        <meta
          name="description"
          content="Sélection de projets de Gaëtan Basset, développeur web React / TypeScript. Projets respectant les standards Clean Code et SOLID."
        />
      </Head>
      <ProjectsFullPage />
    </>
  );
}

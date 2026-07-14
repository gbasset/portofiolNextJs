import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Projects() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/#projects-showcase');
  }, [router]);

  return (
    <>
      <Head>
        <title>Redirection projets</title>
        <meta
          name="description"
          content="Redirection vers la section projets de l'accueil."
        />
      </Head>
    </>
  );
}

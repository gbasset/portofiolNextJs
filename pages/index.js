import Head from 'next/head';
import React, { useEffect } from 'react'
import SkillsShowcase from '../components/Home/SkillsShowcase';
import ProjectAcordeon from '../components/Home/ProjectAcordeon';
import HeroRoleTitle from '../components/Home/HeroRoleTitle';
import HeroIntro from '../components/Home/HeroIntro';
import axios from 'axios';
import { apiProjects } from '../utils/data';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';


function Home(props) {
  useEffect(() => {
    document.documentElement.scrollTop = 0
  }, [])
  const lang = [
    {
      language: 'JavaScript',
      technos: ['EcmaScript 6', 'Fetch', 'Async/Await', 'Gestion du Dom', 'Librairies'],
      image: '/logos/icons8-javascript-logo.svg'
    },
    {
      language: 'ReactJs',
      technos: ['Context', 'Classes', 'Hooks', 'NextJs', 'Redux'],
      image: '/logos/icons8-react.svg'
    },
    {
      language: 'Performance web',
      technos: [
        'Temps de chargement',
        'Perf navigateur',
        'Webpack / Vite',
        'Dépendances & sécurité',
        'Jest & Cypress',
      ],
      image: '/logos/perf-web.svg',
    },
    {
      language: 'Bdd',
      technos: ['Sql', 'Mongodb', 'Firebase', 'GraphQl', 'PhpMyAdmin'],
      image: '/logos/database.svg'
    },
    {
      language: 'NodeJs',
      technos: ['JWT', 'Express', 'Passport', 'SocketIo', 'Handlebars'],
      image: '/logos/nodejs-svg.svg'
    },
    {
      language: 'Intégration',
      technos: ['Html 5', 'Css 3', 'Flexbox', 'Css Grid', 'Librairies Css'],
      image: '/logos/icons8-html-5.svg'
    },

  ]
  const router = useRouter();
  return (
    <>
      <>
        <Head>
          <title>Accueil du portfolio de Basset Gaëtan </title>
          <meta name="description" content="Accueil du portfolio de Gaëtan Basset Developpeur web,. ReactJs , NodeJs et Css. Création de site web, site vitrine et e-commerce et application web. " />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          <div className="mx-auto flex w-[min(92%,52rem)] flex-col items-center px-4 py-6 sm:w-4/5 md:px-8">
            <HeroRoleTitle />
            <HeroIntro onProjectsClick={() => router.replace('/projects')} />
          </div>
          <SkillsShowcase items={lang} />
          <div>
          {props.projects &&<ProjectAcordeon mainProjects={props.projects} />}
          </div>
        </div>
      </>
      <motion.div
        className="slide-in"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
      <motion.div
        className="slide-out"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </>
  )
}
export async function getStaticProps() {

  const mainProject = await axios.get(`${apiProjects}projectMain`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.log("🚀 ~ file: index.js:104 ~ getStaticProps ~ error", error)
      console.error('Une erreur est survenue pendant la récupération des languages');
    })

  return {
    props: {
      projects: mainProject || null,
    }
  }
}
export default Home;
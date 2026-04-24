import Head from 'next/head';
import React, { useEffect } from 'react'
import SkillsShowcase from '../components/Home/SkillsShowcase';
import ProjectAcordeon from '../components/Home/ProjectAcordeon';
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
          <div className="mx-auto w-[min(100%,42rem)] px-4 py-6 text-center italic text-accent sm:w-4/5 md:px-6">
            <h1 className="mt-6 font-sans text-3xl font-normal not-italic leading-tight text-primary-200 sm:text-4xl md:mt-8 md:text-5xl lg:text-6xl">
              Bienvenue sur mon portefolio
            </h1>
            <p className="mx-auto mt-6 max-w-3xl px-2 py-8 text-base leading-8 text-accent sm:px-8 sm:text-lg md:px-16">
              “ Développeur front-end JavaScript / React en télétravail. Passionné par l'innovation
              technique, l'autonomie et la résolution de problèmes complexes en équipe.
              Je vous invite à parcourir mes réalisations
              <button
                type="button"
                className="cursor-pointer border-0 bg-transparent p-0 [font:inherit] text-surface-snow underline decoration-transparent transition-colors hover:text-accent-bright focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-700"
                onClick={() => router.replace('/projects')}
              >
                {' '}ici{' '}
              </button>
              et à me faire vos retours si vous le souhaitez. Bonne visite !
              ”
            </p>
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
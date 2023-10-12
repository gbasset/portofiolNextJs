import Head from 'next/head';
import React, { useEffect } from 'react'
import Language from '../components/Home/Language';
import ProjectAcordeon from '../components/Home/ProjectAcordeon';
import axios from 'axios';
import { apiProjects } from '../utils/data';
import Typewriter from 'typewriter-effect';
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
      technos: ['Context', 'Classes', 'Hooks', 'NextJs', 'Redux',],
      image: '/logos/icons8-react.svg'
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
          <div className="text-home">
            <h1>Bienvenue sur mon portefolio</h1>
            <p className='blockquote' >
              “ Ce site recense quelques projets que j'ai entrepris seul mais également avec d'autres developpeurs.
              Je vous invite donc à les parcourirs
              <span className='notActive' onClick={() => router.replace('/projects')}
              > ici </span> et à me faire vos retours si vous le souhaitez .
              Je vous souhaite une bonne visite !
              ”
            </p>
          </div>
          <div className="container-lang ">
            <h1>Compétences techniques</h1>
            {lang.map((language, key) =>
              <Language
                key={key}
                language={language}
              />
            )}
          </div>
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
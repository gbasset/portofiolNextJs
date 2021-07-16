import Head from 'next/head';
import React, { useEffect } from 'react'
import withTransition from "../components/HOC/WitchTransition";
import Language from '../components/Home/Language';
import ProjectAcordeon from '../components/Home/ProjectAcordeon';
import axios from 'axios';
import { apiProjects } from '../utils/data';
import Typewriter from 'typewriter-effect';
import { motion } from "framer-motion";
function Home(props) {

  const lang = [
    {
      language: 'JavaScript',
      technos: ['EcmaScript 6', 'Fetch', 'Async/Await', 'Gestion du Dom', 'Librairies JavaScript'],
      image: '/logos/icons8-javascript-logo.svg'
    },
    {
      language: 'ReactJs',
      technos: ['Context', 'Classes', 'Hooks', 'NextJs', 'Custom Hook',],
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
  return (
    <>
      <div style={{ marginLeft: '160px' }} className={""}>
        <Head>
          <title>Accueil du portfolio de Basset Gaëtan </title>
          <meta name="description" content="Accueil du portfolio de Gaëtan Basset Developpeur web,. ReactJs , NodeJs et Css. Création de site web, site vitrine et e-commerce et application web. " />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className="text-home">
            <div className="typeWriter">
              <Typewriter
                options={{
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 5,
                  changeDelay: 2
                }}
                onInit={(typewriter) => {
                  typewriter.typeString(`Bonjour,moi c'est Gaëtan.`)
                    .pauseFor(500)
                    .deleteChars(25)
                    .typeString('Bienvenue sur mon site !')
                    // .deleteAll()
                    .pauseFor(500)
                    .deleteChars(54)
                    .start();
                }}
              />
            </div>
            <blockquote>
              “ Ce site recense quelques projets personnels que j'ai entrepris seul mais également avec d'autres developpeurs. Je vous invite donc à les parcourir sur la page " Mes projets" et à me faire vos retours si vous le souhaitez . ”
            </blockquote>
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
            <ProjectAcordeon mainProjects={props.projects} />
          </div>
        </main>
      </div>
      <motion.div
        className="slide-in"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
      <motion.div
        className="slide-out"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
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
      console.error('Une erreur est survenue pendant la récupération des languages');
    })

  return {
    props: {
      projects: mainProject,
    }
  }
}
export default Home;
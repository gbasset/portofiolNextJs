import Head from 'next/head';
import React, { useEffect } from 'react'
import withTransition from "../components/HOC/WitchTransition";
import Language from '../components/Home/Language';

function Home() {

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
      image: '/logos/icons8-react.svg'
    },
    {
      language: 'Intégration',
      technos: ['Html 5', 'Css 3', 'Flexbox', 'Css Grid', 'Librairies Css'],
      image: '/logos/icons8-html-5.svg'
    },

  ]
  return (
    <div style={{ marginLeft: '160px', overflowX: 'hidden' }} className={""}>
      <Head>
        <title>Accueil du portfolio de Basset Gaëtan </title>
        <meta name="description" content="Accueil du portfolio de Gaëtan Basset Developpeur web. ReactJs , NodeJs et Css." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="text-home">
          <h2 >Bienvenue sur mon portfolio</h2>
          <blockquote>
            “ Ce site recense quelques projets personnels que j'ai entrepris seul mais également avec d'autres developpeurs. Je vous invite donc à les parcourir sur la page " Mes projets" et à me faire vos retours si vous le souhaitez . ”
          </blockquote>
        </div>
        <div className="container-lang ">
          {lang.map(language =>
            <Language
              language={language}
            />
          )}
        </div>
      </main>
    </div>
  )
}
export default withTransition(Home);
import Head from 'next/head';
import Image from 'next/image'
import React, { useEffect } from 'react'
import withTransition from "../components/HOC/WitchTransition";
import Language from '../components/Home/Language';

function Home() {
  // const getData = async () => {
  //   const response = await fetch('https://enigmatic-taiga-55729.herokuapp.com/projects', {
  //     method: 'get',
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  //   const data = await response.json();
  //   console.log(data);
  //   if (!response.ok) {
  //     throw new Error(data.message || 'Quelque chose manque')
  //   }
  // }
  // useEffect(() => {
  //   getData()
  // }, [])
  const lang = [
    {
      language: 'bdd',
      technos: ['sql', 'mongodb'],
      image: '/logos/icons8-react.svg'
    },
    {
      language: 'bdd',
      technos: ['sql', 'mongodb'],
      image: '/logos/icons8-react.svg'
    },
    {
      language: 'bdd',
      technos: ['sql', 'mongodb'],
      image: '/logos/icons8-react.svg'
    },
    {
      language: 'bdd',
      technos: ['sql', 'mongodb'],
      image: '/logos/icons8-html-5.svg'
    },

  ]
  return (
    <div style={{ width: '100%', marginLeft: '160px', overflowX: 'hidden' }} className={""}>
      <Head>
        <title>Accueil du portfolio de Basset Gaëtan </title>
        <meta name="description" content="Accueil du portfolio de Gaëtan Basset Developpeur web. ReactJs , NodeJs et Css." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={''}>
        <div style={{ height: '80vh' }}>

        </div>
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
          {/* <Language
            language={lang}
          /> */}
        </div>
      </main>
    </div>
  )
}
export default withTransition(Home);
import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head';
import { SiJavascript, SiCss3, SiHtml5, SiNodeDotJs, SiReact, SiBootstrap, SiNetlify, SiNextDotJs, SiGraphql,SiRedux,SiAzuredevops,SiEslint } from 'react-icons/si'
import { FaDatabase } from 'react-icons/fa'
import { IoLogoGithub } from 'react-icons/io'
import { AiFillCode } from 'react-icons/ai'


function About() {
    const reference = useRef(null);

    useEffect(() => {
        document.documentElement.scrollTop = 0
    }, [])
    function oppenCv() {
        let link = document.createElement('a');
        link.href = "/gaetancv.pdf";
        link.download = "/gaetancv.pdf";
        link.dispatchEvent(new MouseEvent('click'));
    }
    return (
        <>
            <Head>
                <title>Page à propos </title>
                <meta name="description" content="Page à propos. Ceci est le portfolio de Gaëtan Basset Developpeur web. ReactJs , NodeJs et Css." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h2 className="titleAbout">Gaëtan Basset</h2>
            <div className="propos">
                <div className="photoProfil" />
                <div className="rightContainer">
                    <p>
                        Développeur Frontend JavaScript/React, j&apos;accompagne depuis plusieurs années l&apos;évolution d&apos;un SaaS en environnement produit.
                        Chez Beyable, je travaille sur la maintenance et l&apos;amélioration du back-office, avec un fort focus sur la qualité du code, la performance et l&apos;expérience utilisateur.
                        J&apos;interviens notamment sur la migration d&apos;un legacy AngularJS vers React/TypeScript, l&apos;ajout de fonctionnalités complexes (SSO, dashboards de data visualisation) et la réduction de la dette technique.
                        Je participe aussi à la mise en place de pipelines CI/CD et au développement d&apos;outils internes en React/Next.js pour accélérer le travail des équipes.
                        Titulaire d&apos;un Titre Professionnel (TP) de niveau 5 en Développement Web et Web Mobile obtenu à la Wild Code School, je continue à me former en continu avec la même motivation : construire des interfaces fiables, utiles et durables.
                    </p>
                </div>
            </div>
            <div>
                <h2 className="titleAbout">Mes outils</h2>
                <ul className="list-tags-outils">
                    <li>Html <SiHtml5 /></li>
                    <li>Css <SiCss3 /></li>
                    <li>JavaScript <SiJavascript /></li>
                    <li>Node JS <SiNodeDotJs /></li>
                    <li>ReactJS <SiReact /></li>
                    <li>Next JS <SiNextDotJs /></li>
                    <li>GraphQl <SiGraphql /></li>
                    <li>Redux <SiRedux/></li> 
                    <li>Sql <FaDatabase /></li>
                    <li>Bootstrap <SiBootstrap /></li>
                    <li>Netlify <SiNetlify /></li>
                    <li>Azure Devops <SiAzuredevops /></li>
                    <li>Es Lint <SiEslint /></li>
                    <li>Git <IoLogoGithub /></li>
                    <li>Vs Code <AiFillCode/>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="titleAbout">Formations</h2>
                <ul className="list-tags-format">
                    <li> Titre Professionnel : Développeur Web et Web Mobile - Wild Code School Paris <img className="wild" src="/logos/codeschool.png" alt="wild code school logo" /></li>
                    <li>Apprenez à créer votre site web avec HTML5 et CSS3 - OpenClassRooms <img className="openClass" src="/logos/Logo_OpenClassrooms.png" alt="openClassroom logo" /></li>
                    <li>JavaScript : ES6  <img className="udemy" src="/logos/udemy_logo_icon_144775.png" alt="udemy logo" /></li>
                    <li>Apprenez à résoudre des algorithmes en JavaScript  <img className="udemy" src="/logos/udemy_logo_icon_144775.png" alt="udemy logo" /></li>
                    <li>React A à Z (React Hooks)  <img className="udemy" src="/logos/udemy_logo_icon_144775.png" alt="udemy logo" /></li>
                    <li>Node.js / Express.js / JWT / Mongoose par la pratique   <img className="udemy" src="/logos/udemy_logo_icon_144775.png" alt="udemy logo" /></li>
                    <li>Bootstrap 4  <img className="udemy" src="/logos/udemy_logo_icon_144775.png" alt="udemy logo" /></li>
                    <li>Comprendre le web - OpenClassRooms  <img className="openClass" src="/logos/Logo_OpenClassrooms.png" alt="openClassroom logo" /></li>
                </ul>
            </div>
            {/* <div className='btn-container'
                onClick={oppenCv}
            >
                <a
                    ref={reference}
                    className="btn-more" target="_blank" src="/gaetancv.pdf" download="/gaetancv.pdf" >Telecharger mon CV</a>
            </div> */}
        </>
    )
}
export default About;
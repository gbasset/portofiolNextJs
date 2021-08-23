import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head';
import { motion } from "framer-motion";
import { SiJavascript, SiCss3, SiHtml5, SiNodeDotJs, SiReact, SiBootstrap, SiNetlify } from 'react-icons/si'
import { FaDatabase } from 'react-icons/fa'
import { IoLogoGithub } from 'react-icons/io'

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
                    <p>Bonjour à tous, je suis développeur web, je réalise des tâches diverses liées aux différentes parties qui composent la création d'un site web et d'une application web. Reflexion autour de la conception de la base de donnée, création d'une Api pour faire intéragir les données avec le front-end et le back-end. Passioné par les nouvelles technologies,
                        j'ai entrepris en 2019 une reconversion dans le web en suivant une formation à la Wild Code School de Paris. Depuis je pratique mes acquis au sein de projet personnels et au sein de l'entreprise qui m'emploi 'Beyable' dans laquelle j'effectue différentes tâches comme de l'intégration et du developpement de nouvelles fonctionnalitées au sein du back office. </p>
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
                    <li>Bootstrap <SiBootstrap /></li>
                    <li>Sql <FaDatabase /></li>
                    <li>Netlify <SiNetlify /></li>
                    <li>Git <IoLogoGithub /></li>
                    <li>Vs Code <img src="https://img.icons8.com/ios-filled/500/000000/visual-studio-logo.png" alt="visual studio icon" />
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="titleAbout">Formations</h2>
                <ul className="list-tags-format">
                    <li>Développeur Web et Web Mobile - Wild Code School Paris <img className="wild" src="https://res.cloudinary.com/wildcodeschool/image/upload/c_fill,h_50/v1/static/irjoy97aq0eol8bf6959" alt="wild code school logo" /></li>
                    <li>Apprenez à créer votre site web avec HTML5 et CSS3 - OpenClassRooms <img className="openClass" src="/logos/Logo_OpenClassrooms.png" alt="openClassroom logo" /></li>
                    <li>JavaScript : ES6  <img className="udemy" src="/logos/udemy_logo_icon_144775.png" alt="udemy logo" /></li>
                    <li>Apprenez à résoudre des algorithmes en JavaScript  <img className="udemy" src="/logos/udemy_logo_icon_144775.png" alt="udemy logo" /></li>
                    <li>React A à Z (React Hooks)  <img className="udemy" src="/logos/udemy_logo_icon_144775.png" alt="udemy logo" /></li>
                    <li>Node.js / Express.js / JWT / Mongoose par la pratique   <img className="udemy" src="/logos/udemy_logo_icon_144775.png" alt="udemy logo" /></li>
                    <li>Bootstrap 4  <img className="udemy" src="/logos/udemy_logo_icon_144775.png" alt="udemy logo" /></li>
                    <li>Comprendre le web - OpenClassRooms  <img className="openClass" src="/logos/Logo_OpenClassrooms.png" alt="openClassroom logo" /></li>
                </ul>
            </div>
            <div className='btn-container'
                onClick={oppenCv}
            >
                <a
                    ref={reference}
                    className="btn-more" target="_blank" src="/gaetancv.pdf" download="/gaetancv.pdf" >Telecharger mon CV</a>
            </div>
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
export default About;
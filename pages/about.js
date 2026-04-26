import React, { useEffect } from 'react'
import Head from 'next/head';
import { motion } from 'framer-motion';
import { SiJavascript, SiCss3, SiHtml5, SiNodeDotJs, SiReact, SiBootstrap, SiNetlify, SiNextDotJs, SiGraphql,SiRedux,SiAzuredevops,SiEslint } from 'react-icons/si'
import { FaDatabase } from 'react-icons/fa'
import { IoLogoGithub } from 'react-icons/io'
import { AiFillCode } from 'react-icons/ai'


function About() {
    useEffect(() => {
        document.documentElement.scrollTop = 0
    }, [])

    const tools = [
        { label: 'Html', icon: <SiHtml5 /> },
        { label: 'Css', icon: <SiCss3 /> },
        { label: 'JavaScript', icon: <SiJavascript /> },
        { label: 'TypeScript', icon: <AiFillCode /> },
        { label: 'Node JS', icon: <SiNodeDotJs /> },
        { label: 'ReactJS', icon: <SiReact /> },
        { label: 'Next JS', icon: <SiNextDotJs /> },
        { label: 'Vite', icon: <AiFillCode /> },
        { label: 'GraphQl', icon: <SiGraphql /> },
        { label: 'Redux', icon: <SiRedux /> },
        { label: 'Sql', icon: <FaDatabase /> },
        { label: 'Bootstrap', icon: <SiBootstrap /> },
        { label: 'Netlify', icon: <SiNetlify /> },
        { label: 'Azure Devops', icon: <SiAzuredevops /> },
        { label: 'Es Lint', icon: <SiEslint /> },
        { label: 'Git', icon: <IoLogoGithub /> },
        { label: 'Cursor', icon: <AiFillCode /> },
        { label: 'Vs Code', icon: <AiFillCode /> },
    ];

    const formations = [
        {
            label: 'Titre Professionnel : Développeur Web et Web Mobile - Wild Code School Paris',
            logoSrc: '/logos/codeschool.png',
            logoAlt: 'wild code school logo',
            logoClassName: 'h-8 w-8 rounded-full object-cover',
        },
        {
            label: 'Apprenez à créer votre site web avec HTML5 et CSS3 - OpenClassRooms',
            logoSrc: '/logos/Logo_OpenClassrooms.png',
            logoAlt: 'openClassroom logo',
            logoClassName: 'h-8 w-8 rounded-full object-cover',
        },
        {
            label: 'JavaScript : ES6',
            logoSrc: '/logos/udemy_logo_icon_144775.png',
            logoAlt: 'udemy logo',
            logoClassName: 'h-8 w-8 rounded-full object-cover',
        },
        {
            label: 'Apprenez à résoudre des algorithmes en JavaScript',
            logoSrc: '/logos/udemy_logo_icon_144775.png',
            logoAlt: 'udemy logo',
            logoClassName: 'h-8 w-8 rounded-full object-cover',
        },
        {
            label: 'React A à Z (React Hooks)',
            logoSrc: '/logos/udemy_logo_icon_144775.png',
            logoAlt: 'udemy logo',
            logoClassName: 'h-8 w-8 rounded-full object-cover',
        },
        {
            label: 'Node.js / Express.js / JWT / Mongoose par la pratique',
            logoSrc: '/logos/udemy_logo_icon_144775.png',
            logoAlt: 'udemy logo',
            logoClassName: 'h-8 w-8 rounded-full object-cover',
        },
        {
            label: 'Bootstrap 4',
            logoSrc: '/logos/udemy_logo_icon_144775.png',
            logoAlt: 'udemy logo',
            logoClassName: 'h-8 w-8 rounded-full object-cover',
        },
        {
            label: 'Comprendre le web - OpenClassRooms',
            logoSrc: '/logos/Logo_OpenClassrooms.png',
            logoAlt: 'openClassroom logo',
            logoClassName: 'h-8 w-8 rounded-full object-cover',
        },
    ];

    const sectionVariants = {
        hidden: { opacity: 0, y: 36 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.12,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 18, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <>
            <Head>
                <title>Parcours </title>
                <meta name="description" content="Parcours professionnel de Gaëtan Basset. Développeur web ReactJs, NodeJs et CSS." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 md:px-8">
                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="mb-6 text-center text-3xl font-bold text-secondary-700 md:text-4xl">Gaëtan Basset</h2>
                    <div className="rounded-2xl border border-primary-400/20 bg-primary-600/40 p-6 shadow-glow-primary backdrop-blur-sm md:p-8">
                        <div className="photoProfil mx-auto mb-6 md:float-left md:mb-3 md:mr-8 md:mt-1 md:[shape-outside:circle(50%)]" />
                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="text-sm leading-7 text-primary-200 md:text-base md:text-justify"
                        >
                            Développeur Frontend JavaScript/React, j&apos;accompagne depuis plusieurs années l&apos;évolution d&apos;un SaaS en environnement produit.
                            Chez Beyable, je travaille sur la maintenance et l&apos;amélioration du back-office, avec un fort focus sur la qualité du code, la performance et l&apos;expérience utilisateur.
                            J&apos;interviens notamment sur la migration d&apos;un legacy AngularJS vers React/TypeScript, l&apos;ajout de fonctionnalités complexes (SSO, dashboards de data visualisation) et la réduction de la dette technique.
                            Je participe aussi à la mise en place de pipelines CI/CD et au développement d&apos;outils internes en React/Next.js pour accélérer le travail des équipes.
                            Titulaire d&apos;un Titre Professionnel (TP) de niveau 5 en Développement Web et Web Mobile obtenu à la Wild Code School, je continue à me former en continu avec la même motivation : construire des interfaces fiables, utiles et durables.
                        </motion.p>
                        <div className="clear-both" />
                    </div>
                </motion.section>

                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="mb-6 text-center text-3xl font-bold text-secondary-700 md:text-4xl">Mes outils</h2>
                    <motion.ul
                        className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {tools.map((tool) => (
                            <motion.li
                                key={tool.label}
                                variants={itemVariants}
                                className="flex items-center justify-between rounded-xl border border-primary-400/20 bg-primary-600/40 px-4 py-3 text-primary-200 transition-all duration-300 hover:border-secondary-700 hover:bg-primary-700 hover:text-secondary-700"
                            >
                                <span className="font-medium">{tool.label}</span>
                                <span className="text-xl">{tool.icon}</span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.section>

                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="mb-6 text-center text-3xl font-bold text-secondary-700 md:text-4xl">Formations</h2>
                    <motion.ul
                        className="space-y-3"
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {formations.map((formation) => (
                            <motion.li
                                key={formation.label}
                                variants={itemVariants}
                                className="flex flex-wrap items-center gap-3 rounded-xl border border-primary-400/20 bg-primary-600/40 px-4 py-3 text-primary-200 transition-colors duration-300 hover:border-secondary-700"
                            >
                                <span className="flex-1 text-sm leading-6 md:text-base">{formation.label}</span>
                                <img className={formation.logoClassName} src={formation.logoSrc} alt={formation.logoAlt} />
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.section>
            </div>
        </>
    )
}
export default About;
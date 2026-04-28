import React, { useEffect } from 'react'
import axios from 'axios';
import { apiProjects } from '../../utils/data';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import { FaMobileAlt, FaDesktop } from 'react-icons/fa';
import Head from 'next/head';
import Link from 'next/link';

function Project({ project }) {
    const proj = project[0];
    const AutoplaySlider = withAutoplay(AwesomeSlider);
    useEffect(() => {
        document.documentElement.scrollTop = 0
    }, [])

    return (
        <div className="relative isolate">
            <Head>
                <title>{project[0].name}</title>
                <meta name="description" content={project[0].description} />
            </Head>
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(235,184,118,0.2)_0%,rgba(31,34,53,0)_70%)]" />
            <div className="min-h-screen pb-12">
            <section className="mx-auto w-[min(96%,78rem)] pt-4 md:pt-8">
                <div className="overflow-hidden rounded-2xl border border-primary-200/15 bg-primary-700/25 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
                    <AutoplaySlider
                        className={[
                            'project-detail-slider mx-auto w-full !max-w-full overflow-hidden',
                            'h-[220px] sm:h-[300px] md:h-[430px] lg:h-[520px]',
                            '[&_.awssld__content]:flex [&_.awssld__content]:items-center [&_.awssld__content]:justify-center',
                            '[&_.awssld__content_img]:!h-full [&_.awssld__content_img]:w-full',
                            '[&_.awssld__content_img]:object-cover [&_.awssld__content_img]:object-center',
                            '[&_.awssld__bullets]:bottom-4 [&_.awssld__bullets_button]:!bg-secondary-700/80',
                        ].join(' ')}
                        play={true}
                        cancelOnInteraction={false}
                        interval={4000}
                    >
                        {proj.images.map((x, i) => (
                            <div key={i} data-src={x.url} />
                        ))}
                    </AutoplaySlider>
                </div>
            </section>

            <main className="mx-auto w-full max-w-content px-4 pb-14 pt-6 md:px-6">
                <section className="space-y-7 rounded-2xl border border-primary-400/35 bg-gradient-to-br from-primary-700/55 via-primary-700/35 to-primary-700/20 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm md:space-y-8 md:p-8">
                    <div className="flex justify-center md:justify-start">
                        <Link href="/projects">
                            <a className="inline-flex items-center gap-2 rounded-xl border border-primary-200/25 bg-primary-700/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-200 transition-all duration-300 hover:border-secondary-700/60 hover:bg-secondary-700/20 hover:text-secondary-100">
                                <span aria-hidden>←</span>
                                Retour aux projets
                            </a>
                        </Link>
                    </div>

                    <header className="space-y-4 border-b border-primary-200/10 pb-6 text-center">
                        <h1 className="font-display text-3xl uppercase tracking-wide text-secondary-100 sm:text-4xl md:text-5xl">
                            {proj.name.toUpperCase()}
                        </h1>
                        <p className="mx-auto max-w-4xl text-sm leading-7 text-primary-200/90 sm:text-base sm:leading-8 md:text-lg">
                            {proj.description}
                        </p>
                    </header>

                    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                        <div className="space-y-3 text-center">
                            <h2 className="font-display text-2xl uppercase tracking-wide text-secondary-700 md:text-3xl">
                                Stack technique
                            </h2>
                            <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">
                                {proj.language.map((x, i) => (
                                    <li
                                        key={i}
                                        className="rounded-full border border-secondary-700/50 bg-secondary-700/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-100"
                                    >
                                        {x}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-3 rounded-xl border border-primary-200/15 bg-primary-700/35 p-4 text-center">
                            <h2 className="font-display text-xl uppercase tracking-wide text-secondary-700 md:text-2xl">
                                Devices
                            </h2>
                            <div className="flex items-center justify-center gap-4 text-2xl text-secondary-100 md:text-3xl">
                                {proj.devices.includes('mobile') && (
                                    <span aria-label="Compatible mobile" title="Compatible mobile">
                                        <FaMobileAlt />
                                    </span>
                                )}
                                {proj.devices.includes('desktop') && (
                                    <span aria-label="Compatible desktop" title="Compatible desktop">
                                        <FaDesktop />
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 pt-2 md:flex-row md:flex-wrap md:justify-center">
                        {proj.links.map((link) => (
                            <a
                                key={`${link.name}-${link.url}`}
                                className="inline-flex h-12 w-full max-w-[320px] items-center justify-center rounded-xl border border-secondary-700/70 bg-primary-700/80 px-5 text-sm font-semibold uppercase tracking-[0.18em] text-secondary-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary-700 hover:text-primary-700 hover:shadow-[0_10px_24px_rgba(235,184,118,0.35)] md:min-w-[250px] md:w-auto"
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.name === 'code' ? 'Voir le code' : 'Visiter le site'}
                            </a>
                        ))}
                    </div>
                </section>
            </main>
            </div>
        </div>
    )
}
export async function getStaticPaths() {
    const projects = await axios.get(`${apiProjects}projects`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            console.error('Une erreur est survenue pendant la récupération des projets');
        })

    const paths = projects.map(projet => {
        return {
            params: { project: `${projet._id}` }
        }
    }
    )

    return {
        paths: paths,
        fallback: false
        // fallback: 'blocking
    }
}
export async function getStaticProps(context) {
    const projectId = context.params.project;
    const proj = await axios.get(`${apiProjects}project/${projectId}`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            console.error('Une erreur est survenue pendant la récupération des projets');
        })
    return {
        props: {
            project: proj
        }
    }
}
export default Project;
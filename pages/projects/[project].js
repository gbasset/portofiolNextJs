import React, { useEffect } from 'react'
import axios from 'axios';
import { apiProjects } from '../../utils/data';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import classes from './project.module.css';
import { FaMobileAlt, FaDesktop } from 'react-icons/fa';
import Head from 'next/head';

function Project({ project }) {
    const proj = project[0];
    const AutoplaySlider = withAutoplay(AwesomeSlider);
    useEffect(() => {
        document.documentElement.scrollTop = 0
    }, [])
    const clickLink = (url) => {
        window.open(url, "_blank");
    }
    return (
        <div>
            <Head>
                <title>{project[0].name}</title>
                <meta name="description" content={project[0].description} />
            </Head>
            <div className={classes.containerProject}>
            <AutoplaySlider
                className={[
                    'project-detail-slider mx-auto w-full !max-w-full overflow-hidden',
                    'min-h-[140px] h-[min(34vh,200px)] max-h-[200px]',
                    'sm:h-[min(38vh,260px)] sm:max-h-[260px]',
                    'md:h-[min(44vh,460px)] md:max-h-[min(44vh,460px)]',
                    'lg:h-[min(48vh,520px)] lg:max-h-[min(48vh,520px)]',
                    '[&_.awssld__content]:flex [&_.awssld__content]:items-center [&_.awssld__content]:justify-center',
                    '[&_.awssld__content_img]:!h-auto [&_.awssld__content_img]:max-h-full [&_.awssld__content_img]:w-full',
                    '[&_.awssld__content_img]:max-w-full [&_.awssld__content_img]:object-contain [&_.awssld__content_img]:object-center',
                ].join(' ')}
                play={true}
                cancelOnInteraction={false}
                interval={4000}
            >
                {proj.images.map((x, i) => (
                    <div key={i} data-src={x.url} />
                ))}
            </AutoplaySlider>

            <main className="mx-auto w-full max-w-content space-y-7 px-4 pb-14 pt-6 md:space-y-8 md:px-6">
                <section className="space-y-5 rounded-ds-xl border border-primary-400/40 bg-primary-700/35 p-5 shadow-glow-primary md:p-8">
                <h1 className="font-display text-4xl uppercase tracking-wide text-secondary-100 md:text-6xl">{proj.name.toUpperCase()}</h1>
                <p className="max-w-readable text-base leading-8 text-primary-200/90 md:text-lg">{proj.description}</p>

                <div className="space-y-3">
                <h2 className="font-display text-2xl uppercase tracking-wide text-secondary-700 md:text-4xl">Stack technique</h2>
                <ul className="flex max-w-2xl flex-wrap gap-2">
                    {proj.language.map((x, i) =>
                        <li key={i} className="rounded-full border border-secondary-700/50 bg-secondary-700/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-100">
                            {x}
                        </li>
                    )}
                </ul>
                </div>

                <div className="space-y-3">
                    <h2 className="font-display text-2xl uppercase tracking-wide text-secondary-700 md:text-4xl">Devices</h2>
                    <div className="flex items-center gap-4 text-2xl text-secondary-100 md:text-3xl">
                        {proj.devices.includes('mobile') &&
                            <span aria-label="Compatible mobile">
                                <FaMobileAlt />
                            </span>
                        }
                        {proj.devices.includes('desktop') &&
                            <span aria-label="Compatible desktop">
                                <FaDesktop />
                            </span>}
                    </div>

                </div>
                <>
                    {proj.links.map((link) =>
                        link.name === 'code' ?
                            (<div
                                key={`${link.name}-${link.url}`}
                                className="w-full md:w-auto"
                                onClick={() => clickLink(link.url)}
                            >
                                <a
                                    className="inline-flex h-12 w-full items-center justify-center rounded-ds-lg border border-secondary-700/75 bg-primary-700 px-5 text-sm font-semibold uppercase tracking-[0.18em] text-secondary-100 transition-all duration-300 hover:bg-secondary-700 hover:text-primary-700 md:min-w-[250px]"
                                    href={`${link.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Voir le code
                                </a>
                            </div>)
                            :
                            (<div
                                key={`${link.name}-${link.url}`}
                                className="w-full md:w-auto"
                                onClick={() => clickLink(link.url)}
                            >
                                <a
                                    className="inline-flex h-12 w-full items-center justify-center rounded-ds-lg border border-secondary-700/75 bg-primary-700 px-5 text-sm font-semibold uppercase tracking-[0.18em] text-secondary-100 transition-all duration-300 hover:bg-secondary-700 hover:text-primary-700 md:min-w-[250px]"
                                    href={`${link.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visiter le site
                                </a>
                            </div>)
                    )
                    }
                </>
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
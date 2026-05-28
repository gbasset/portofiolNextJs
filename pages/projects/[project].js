import React, { useEffect } from 'react'
import axios from 'axios';
import { apiProjects } from '../../utils/data';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import { FaMobileAlt, FaDesktop } from 'react-icons/fa';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { SiGithub } from 'react-icons/si';
import SeoHead from '../../components/SEO/SeoHead';
import Breadcrumb from '../../components/SEO/Breadcrumb';
import {
    buildBreadcrumbJsonLd,
    getProjectDetailBreadcrumbs,
} from '../../utils/breadcrumbs';

const showcasePanelClassName =
    'relative overflow-hidden rounded-[24px] border border-primary-200/20 bg-gradient-to-br from-[rgba(31,34,53,0.98)] via-[rgba(51,53,86,0.55)] to-[rgba(31,34,53,0.92)] px-[clamp(1.25rem,3vw,2.75rem)] py-[clamp(1.5rem,3vw,2.75rem)] shadow-[0_28px_90px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(213,220,249,0.08)]';

const metaCardClassName =
    'rounded-xl border border-secondary-700/35 bg-secondary-700/[0.07] p-5 shadow-inner-soft sm:p-6';

const tagClassName =
    'inline-flex items-center rounded-full border border-secondary-700/35 bg-[rgba(241,231,220,0.95)] px-3 py-2 font-sans text-2xs font-semibold uppercase tracking-[0.14em] text-primary-700 sm:text-xs';

const linkButtonClassName =
    'inline-flex min-h-[48px] w-full max-w-[280px] items-center justify-center gap-2 rounded-ds-md border border-secondary-700/70 bg-secondary-700/90 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary-700 transition-colors duration-300 hover:bg-secondary-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-700 sm:w-auto sm:min-w-[220px]';

function getLinkLabel(name) {
    if (name === 'code') {
        return 'Voir le code';
    }
    return 'Visiter le site';
}

function getLinkIcon(name) {
    if (name === 'code') {
        return SiGithub;
    }
    return BsBoxArrowUpRight;
}

function Project({ project }) {
    const proj = project[0];
    const breadcrumbItems = getProjectDetailBreadcrumbs(proj.name, proj._id);
    const AutoplaySlider = withAutoplay(AwesomeSlider);

    useEffect(() => {
        document.documentElement.scrollTop = 0
    }, [])

    const hasMobile = proj.devices?.includes('mobile');
    const hasDesktop = proj.devices?.includes('desktop');

    return (
        <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 md:px-8 md:pt-10">
            <SeoHead
                title={proj.name}
                description={proj.description}
                path={`/projects/${proj._id}`}
                ogType="article"
                jsonLd={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'CreativeWork',
                        name: proj.name,
                        description: proj.description,
                        author: {
                            '@type': 'Person',
                            name: 'Gaëtan Basset',
                        },
                    },
                    buildBreadcrumbJsonLd(breadcrumbItems),
                ]}
            />

            <Breadcrumb items={breadcrumbItems} className="mb-8" />

            <div className="mb-8 overflow-hidden rounded-2xl border border-secondary-700/35 shadow-glow-primary">
                <AutoplaySlider
                    className={[
                        'project-detail-slider mx-auto w-full !max-w-full overflow-hidden',
                        'h-[220px] sm:h-[300px] md:h-[400px]',
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

            <article className={showcasePanelClassName}>
                <div
                    className="pointer-events-none absolute -right-[20%] -top-[30%] h-[70%] w-[50%] rounded-full bg-[radial-gradient(circle,rgba(235,184,118,0.12)_0%,transparent_70%)]"
                    aria-hidden
                />

                <div className="relative z-[1] space-y-8 md:space-y-10">
                    <header className="space-y-4 border-b border-primary-200/10 pb-8 text-center">
                        <p className="ds-eyebrow">Fiche projet</p>
                        <h1 className="font-display text-3xl uppercase tracking-wide text-secondary-700 md:text-4xl lg:text-5xl">
                            {proj.name}
                        </h1>
                        <p className="mx-auto max-w-3xl text-sm leading-7 text-primary-200/90 sm:text-base sm:leading-8">
                            {proj.description}
                        </p>
                    </header>

                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                        <section className={metaCardClassName} aria-labelledby="project-stack-heading">
                            <h2
                                id="project-stack-heading"
                                className="mb-4 text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-secondary-700"
                            >
                                Stack technique
                            </h2>
                            <ul className="flex flex-wrap justify-center gap-2.5">
                                {proj.language.map((lang) => (
                                    <li key={lang}>
                                        <span className={tagClassName}>{lang}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className={metaCardClassName} aria-labelledby="project-devices-heading">
                            <h2
                                id="project-devices-heading"
                                className="mb-4 text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-secondary-700"
                            >
                                Devices
                            </h2>
                            <div className="flex flex-wrap items-center justify-center gap-6 text-2xl text-secondary-700 sm:text-3xl">
                                {hasMobile && (
                                    <span
                                        className="inline-flex flex-col items-center gap-2"
                                        aria-label="Compatible mobile"
                                        title="Compatible mobile"
                                    >
                                        <FaMobileAlt aria-hidden />
                                        <span className="font-sans text-2xs font-medium uppercase tracking-wider text-primary-200/70">
                                            Mobile
                                        </span>
                                    </span>
                                )}
                                {hasDesktop && (
                                    <span
                                        className="inline-flex flex-col items-center gap-2"
                                        aria-label="Compatible desktop"
                                        title="Compatible desktop"
                                    >
                                        <FaDesktop aria-hidden />
                                        <span className="font-sans text-2xs font-medium uppercase tracking-wider text-primary-200/70">
                                            Desktop
                                        </span>
                                    </span>
                                )}
                                {!hasMobile && !hasDesktop && (
                                    <p className="text-center text-sm text-primary-200/60">Non renseigné</p>
                                )}
                            </div>
                        </section>
                    </div>

                    {proj.links?.length > 0 && (
                        <div className="flex flex-col items-center gap-4 border-t border-primary-200/10 pt-8">
                            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-primary-200/70">
                                Liens utiles
                            </p>
                            <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                                {proj.links.map((link) => {
                                    const Icon = getLinkIcon(link.name);
                                    return (
                                        <a
                                            key={`${link.name}-${link.url}`}
                                            className={linkButtonClassName}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Icon className="text-base shrink-0" aria-hidden />
                                            {getLinkLabel(link.name)}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </article>
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

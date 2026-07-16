import React from 'react';
import { FaMobileAlt, FaDesktop, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import type { ProjectData } from '../../data/projectsData';

interface ProjectSectionProps {
  project: ProjectData;
  index: number;
  sectionRef: React.RefObject<HTMLElement>;
  embedded?: boolean;
}

export default function ProjectSection({ project, index, sectionRef, embedded = false }: ProjectSectionProps) {
  const formattedIndex = String(index + 1).padStart(2, '0');
  const previewImage = project.images[0] ?? project.coverImage;

  return (
    <section
      ref={sectionRef}
      id={`project-${project.id}`}
      className={`relative overflow-hidden bg-primary-700 ${embedded ? 'mb-8 last:mb-0 rounded-[32px]' : ''}`}
      style={embedded
        ? { minHeight: '48rem', scrollMarginTop: '5rem' }
        : { height: '100vh', scrollSnapAlign: 'start' }}
      aria-label={`Projet ${project.name}`}
    >
      <div className="absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08] blur-[4px]"
          style={{ backgroundImage: `url(${project.coverImage})` }}
        />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-secondary-700/10 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[10%] h-80 w-80 rounded-full bg-primary-300/10 blur-3xl" />
        <div className="absolute left-[9%] top-[12%] h-px w-28 bg-secondary-700/40" />
        <div className="absolute left-[9%] top-[12%] h-28 w-px bg-secondary-700/20" />
        <div className="absolute right-[11%] top-[16%] h-32 w-32 rounded-full border border-primary-200/10" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(235,184,118,0.05)_0%,transparent_26%,transparent_74%,rgba(100,102,148,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(235,184,118,0.14),transparent_24%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(100,102,148,0.18),transparent_30%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-700/96 to-[#111423]" />
        <div className="absolute right-[4%] top-4 font-display text-[clamp(5rem,12vw,9rem)] leading-none text-primary-200/[0.05]">
          {formattedIndex}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[88rem] items-center px-5 py-8 sm:px-8 md:px-10 lg:px-14">
        <div className="w-full">
          <div className="relative overflow-hidden rounded-[32px] border border-primary-200/12 bg-[linear-gradient(180deg,rgba(31,34,53,0.92),rgba(17,20,35,0.90))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-7 lg:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary-700/45 to-transparent" />

            <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:items-center">
              <div className="min-w-0">
                <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.28em] text-secondary-700/80">
                  Projet selectionne
                </p>
                <h2
                  className="mb-4 font-display uppercase leading-[0.95] tracking-wide text-secondary-100"
                  style={{ fontSize: 'clamp(2.1rem, 4.6vw, 4.2rem)' }}
                >
                  {project.name}
                </h2>

                <p
                  className="mb-5 max-w-2xl font-sans text-primary-200/82"
                  style={{ fontSize: 'clamp(1rem, 1.55vw, 1.15rem)' }}
                >
                  {project.tagline}
                </p>

                <div className="mb-5 inline-flex max-w-full items-center rounded-full border border-secondary-700/45 bg-secondary-700/10 px-4 py-2 backdrop-blur-sm">
                  <span className="truncate text-2xs font-bold uppercase tracking-[0.2em] text-secondary-100">
                    {project.highlight}
                  </span>
                </div>

                <p
                  className="mb-6 max-w-2xl leading-7 text-primary-200/78"
                  style={{ fontSize: 'clamp(0.95rem, 1.25vw, 1rem)' }}
                >
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap items-center gap-3 text-primary-200/65">
                  <span className="text-2xs font-semibold uppercase tracking-[0.24em] text-primary-200/52">
                    Compatible
                  </span>
                  {project.devices.includes('mobile') && (
                    <span
                      title="Compatible mobile"
                      aria-label="Compatible mobile"
                      className="inline-flex items-center gap-2 rounded-full border border-primary-200/12 bg-primary-200/5 px-3 py-1.5 text-sm"
                    >
                      <FaMobileAlt aria-hidden />
                      <span className="text-2xs font-medium uppercase tracking-[0.16em]">Mobile</span>
                    </span>
                  )}
                  {project.devices.includes('desktop') && (
                    <span
                      title="Compatible desktop"
                      aria-label="Compatible desktop"
                      className="inline-flex items-center gap-2 rounded-full border border-primary-200/12 bg-primary-200/5 px-3 py-1.5 text-sm"
                    >
                      <FaDesktop aria-hidden />
                      <span className="text-2xs font-medium uppercase tracking-[0.16em]">Desktop</span>
                    </span>
                  )}
                </div>

                <ul className="mb-7 flex flex-wrap gap-2.5" aria-label="Stack technique">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-primary-200/15 bg-primary-200/5 px-3.5 py-1.5 text-2xs font-semibold uppercase tracking-[0.14em] text-primary-200/88"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3" role="list" aria-label="Liens du projet">
                  {project.links.map((link) => {
                    const isCode = link.label.toLowerCase().includes('code');

                    return (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="listitem"
                        className="inline-flex items-center gap-2 rounded-xl border border-secondary-700/60 bg-secondary-700/90 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-700"
                      >
                        {isCode ? <FaCode aria-hidden /> : <FaExternalLinkAlt aria-hidden />}
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="flex min-w-0 flex-col justify-center self-center lg:pl-4">
                <p className="mb-3 text-center text-2xs font-semibold uppercase tracking-[0.24em] text-primary-200/52">
                  Apercu
                </p>
                <figure className="mx-auto w-full max-w-[34rem] overflow-hidden rounded-[24px] border border-primary-200/12 bg-[#0d1020] shadow-[0_20px_50px_rgba(0,0,0,0.30)]">
                  <img
                    src={previewImage}
                    alt={`Apercu du projet ${project.name}`}
                    className="aspect-[16/10] w-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

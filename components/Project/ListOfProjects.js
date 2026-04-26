import React, { useCallback, useRef } from 'react'
import Project from './Project';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
const SECTION_RULES = [
    {
        key: 'divertissements',
        title: 'Divertissements',
        subtitle: 'Cinema, jeux, experiences et contenus creatifs',
        tags: ['cinema', 'movie', 'moviedb', 'jeux', 'game', 'sons', 'cats', 'chats', 'photo', 'decouverte'],
    },
    {
        key: 'back-office',
        title: 'Back Office',
        subtitle: 'Outils d administration, gestion et operations',
        tags: ['backoffice', 'devops', 'handicap'],
    },
    {
        key: 'e-commerce',
        title: 'E Commerce',
        subtitle: 'Catalogues, commandes et parcours marchand',
        tags: ['food', 'beer', 'bière', 'bijoux', 'nouriture'],
    },
];

const normalizeTag = (tag) => (tag || '').toLowerCase().trim();

const projectMatchesSection = (project, section) => {
    const normalizedProjectTags = (project.tags || []).map(normalizeTag);
    return normalizedProjectTags.some((tag) => section.tags.includes(tag));
};

const getProjectSections = (projectsFilter) => {
    const categorizedProjectIds = new Set();

    const sections = SECTION_RULES.map((section) => {
        const projects = projectsFilter.filter((project) => projectMatchesSection(project, section));
        projects.forEach((project) => categorizedProjectIds.add(project._id));
        return {
            ...section,
            projects,
        };
    });

    const uncategorizedProjects = projectsFilter.filter((project) => !categorizedProjectIds.has(project._id));
    if (uncategorizedProjects.length > 0) {
        sections.push({
            key: 'autres',
            title: 'Autres Univers',
            subtitle: 'Experiences transverses et projets hybrides',
            projects: uncategorizedProjects,
        });
    }

    return sections;
};

export default function ProjectFilter({ projectsFilter }) {
    const rowRefs = useRef({});

    const normalizedProjects = Array.isArray(projectsFilter)
        ? projectsFilter
        : Array.isArray(projectsFilter?.projects)
            ? projectsFilter.projects
            : [];

    const sections = getProjectSections(normalizedProjects);
    const setRowRef = useCallback((sectionKey, element) => {
        if (element) {
            rowRefs.current[sectionKey] = element;
        }
    }, []);

    const handleScrollRow = useCallback((sectionKey, direction) => {
        const rowElement = rowRefs.current[sectionKey];
        if (!rowElement) {
            return;
        }
        const scrollAmount = Math.max(rowElement.clientWidth * 0.8, 260);
        rowElement.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className="space-y-14 px-2 pb-12 pt-6 md:px-4">
            {sections.map((section) => (
                <section key={section.key} className="group/section space-y-5">
                    <div className="space-y-2 pl-1">
                        <p className="text-xs uppercase tracking-[0.32em] text-secondary-700/90">Collection</p>
                        <h2 className="font-display text-3xl uppercase tracking-wide text-primary-200 md:text-5xl">
                            {section.title}
                        </h2>
                        <p className="max-w-3xl text-sm text-primary-200/80 md:text-base">{section.subtitle}</p>
                    </div>
                    <div className="relative">
                        <button
                            type="button"
                            aria-label={`Defiler ${section.title} vers la gauche`}
                            onClick={() => handleScrollRow(section.key, 'left')}
                            className="absolute left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-secondary-700/70 bg-primary-700/90 text-secondary-100 shadow-glow-primary opacity-0 transition duration-300 hover:bg-primary-600 md:flex md:group-hover/section:opacity-100"
                        >
                            <BsChevronLeft />
                        </button>

                        <div
                            ref={(element) => setRowRef(section.key, element)}
                            className="flex gap-4 overflow-x-auto pb-2 pt-1 [scrollbar-width:thin] [scrollbar-color:#ebb876_#1f2235]"
                        >
                            {section.projects.length > 0 ? (
                                section.projects.map((project) => (
                                    <Project key={project._id} project={project} />
                                ))
                            ) : (
                                <p className="rounded-ds-md border border-primary-400/40 bg-primary-600/40 px-4 py-3 text-sm text-primary-200/80">
                                    Aucun projet pour cette section avec les filtres actuels.
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            aria-label={`Defiler ${section.title} vers la droite`}
                            onClick={() => handleScrollRow(section.key, 'right')}
                            className="absolute right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-secondary-700/70 bg-primary-700/90 text-secondary-100 shadow-glow-primary opacity-0 transition duration-300 hover:bg-primary-600 md:flex md:group-hover/section:opacity-100"
                        >
                            <BsChevronRight />
                        </button>
                    </div>
                </section>
            ))}
        </div>
    )
}

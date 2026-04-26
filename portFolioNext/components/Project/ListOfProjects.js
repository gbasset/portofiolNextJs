import React from 'react'
import Project from './Project';
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
    const normalizedProjects = Array.isArray(projectsFilter)
        ? projectsFilter
        : Array.isArray(projectsFilter?.projects)
            ? projectsFilter.projects
            : [];

    const sections = getProjectSections(normalizedProjects);

    return (
        <div className="space-y-14 px-2 pb-12 pt-6 md:px-4">
            {sections.map((section) => (
                <section key={section.key} className="space-y-5">
                    <div className="space-y-2 pl-1">
                        <p className="text-xs uppercase tracking-[0.32em] text-secondary-700/90">Collection</p>
                        <h2 className="font-display text-3xl uppercase tracking-wide text-primary-200 md:text-5xl">
                            {section.title}
                        </h2>
                        <p className="max-w-3xl text-sm text-primary-200/80 md:text-base">{section.subtitle}</p>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 pt-1 [scrollbar-width:thin] [scrollbar-color:#ebb876_#1f2235]">
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
                </section>
            ))}
        </div>
    )
}

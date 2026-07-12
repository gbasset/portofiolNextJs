import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Head from 'next/head';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import SelectProject from '../../components/Project/SelectProject';
import ListOfProjects from '../../components/Project/ListOfProjects';
import type { ProjectDetail, SelectOption } from '../../types/api.types';
import { apiProjects } from '../../utils/data';

interface ProjectsPageProps {
  projects: ProjectDetail[];
  tags: SelectOption[];
  languages: SelectOption[];
}

function Projects({ projects, tags, languages }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [filterOptions, setFilterOptions] = useState<SelectOption[]>([]);
  const [projectsFilter, setProjectsFilter] = useState<ProjectDetail[]>(projects);

  useEffect(() => {
    if (tags && languages) {
      setFilterOptions([...tags, ...languages]);
      setProjectsFilter(projects);
    }
  }, [tags, languages, projects]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  const getFilteredProject = useCallback((listProjectSelected: SelectOption[]) => {
    const selectedValues = listProjectSelected.map((tag) => tag.value);

    if (selectedValues.length === 0) {
      setProjectsFilter(projects);
      return;
    }

    const filterByField = (field: 'tags' | 'language'): ProjectDetail[] =>
      projects.reduce<ProjectDetail[]>((acc, curr) => {
        const fieldValues = curr[field];
        if (fieldValues.some((val) => selectedValues.includes(val))) {
          acc.push(curr);
        }
        return acc;
      }, []);

    const combined = Array.from(new Set([...filterByField('language'), ...filterByField('tags')]));
    const sorted = [...combined].sort((a, b) => (a._id < b._id ? -1 : a._id > b._id ? 1 : 0));
    setProjectsFilter(sorted);
  }, [projects]);

  return (
    <>
      <Head>
        <title>Projets de Bassett Gaëtan</title>
        <meta name="description" content="liste des projets de Gaëtan basset" />
      </Head>
      <div className="min-h-screen w-full pb-8">
        <section className="mx-auto w-full max-w-content px-3 pt-6 md:px-6 md:pt-8">
          <div className="mb-6 backdrop-blur-sm md:p-4">
            <SelectProject
              listProject={filterOptions}
              filteredProjects={getFilteredProject}
            />
          </div>
          <ListOfProjects projectsFilter={projectsFilter} />
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  const [projects, tags, languages] = await Promise.all([
    axios.get<ProjectDetail[]>(`${apiProjects}projects`)
      .then((res) => res.data)
      .catch((error: unknown) => {
        console.error('Erreur récupération des projets', error);
        return [] as ProjectDetail[];
      }),
    axios.get<SelectOption[]>(`${apiProjects}tags`)
      .then((res) => res.data)
      .catch((error: unknown) => {
        console.error('Erreur récupération des tags', error);
        return [] as SelectOption[];
      }),
    axios.get<SelectOption[]>(`${apiProjects}languages`)
      .then((res) => res.data)
      .catch((error: unknown) => {
        console.error('Erreur récupération des languages', error);
        return [] as SelectOption[];
      }),
  ]);

  return { props: { projects, tags, languages } };
};

export default Projects;

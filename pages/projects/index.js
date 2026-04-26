import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiProjects } from '../../utils/data';
import SelectProject from '../../components/Project/SelectProject';
import ListOfProjects from '../../components/Project/ListOfProjects';
import Head from 'next/head';
function Projects({ projects, tags, languages }) {
    const [projectsWithLabels, setprojectsWithLables] = useState();
    const [projectsFilter, setprojectsFilter] = useState([]);

    useEffect(() => {
        if (tags && languages) {
            let languagesPlusTags = [...tags, ...languages];
            setprojectsWithLables(languagesPlusTags);
            setprojectsFilter(projects);
        }
    }, [tags, languages]);
    useEffect(() => {
        if (projects) {
            setprojectsFilter(projects);
        }
    }, [projects]);
    useEffect(() => {
        document.documentElement.scrollTop = 0
    }, [])
    const getFilteredProject = (listProjectSelected) => {
        const nameTagsSelect = listProjectSelected.map(tag => tag.value);
        if (nameTagsSelect.length === 0) {
            setprojectsFilter(projects);
        } else {
            const listProjectSelect = () => {
                const filterTags = () => {
                    const res = projects.reduce((acc, curr) => {
                        const listTagsProject = curr.tags;
                        listTagsProject.forEach(element => {
                            if (nameTagsSelect.includes(element)) {
                                acc.push(curr);
                            }
                        });
                        return acc;
                    }, [])
                    return res;
                }
                const filterLanguages = () => {
                    const res = projects.reduce((acc, curr) => {
                        const listLanguageProject = curr.language;
                        listLanguageProject.forEach(element => {
                            if (nameTagsSelect.includes(element)) {
                                acc.push(curr);
                            }
                        });
                        return acc;
                    }, [])
                    return res;
                }
                let nonUnique = [...filterLanguages(), ...filterTags()];
                nonUnique = [...new Set(nonUnique)];
                const sortByAsc = (a, b) => {
                    if (a._id < b._id) return -1
                    if (a._id > b._id) return 1
                    return 0
                }
                return nonUnique.sort(sortByAsc);
            }
            setprojectsFilter(listProjectSelect());
        }
    }
    return (<>
        <Head>
            <title>Projets de Bassett Gaëtan</title>
            <meta name="description" content="liste des projets de Gaëtan basset" />
        </Head>
        <div className="min-h-screen w-full pb-8">
            <section className="mx-auto w-full max-w-content px-3 pt-6 md:px-6 md:pt-8">
                <div className="mb-6 rounded-ds-xl border border-primary-400/40 bg-primary-700/35 p-3 shadow-glow-primary backdrop-blur-sm md:p-4">
                    <SelectProject
                        listProject={projectsWithLabels}
                        filteredProjects={(listProjectSelected) => getFilteredProject(listProjectSelected)}
                    />
                </div>
                <ListOfProjects projectsFilter={projectsFilter} />
            </section>
        </div>
    </>
    )
}

export async function getStaticProps() {
    const projects = await axios.get(`${apiProjects}projects`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            console.error('Une erreur est survenue pendant la récupération des projets');
        });

    const tags = await axios.get(`${apiProjects}tags`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            console.error('Une erreur est survenue pendant la récupération des tags');
        });
    const languages = await axios.get(`${apiProjects}languages`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            console.error('Une erreur est survenue pendant la récupération des languages');
        });

    return {
        props: {
            projects: projects,
            tags: tags,
            languages: languages
        }
    }
}

export default Projects;
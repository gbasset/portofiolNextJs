import React, { useEffect, useState } from 'react';
import classes from './index.module.css'
import withTransition from "../../components/HOC/WitchTransition";
import axios from 'axios';
import { motion } from "framer-motion";
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
        <div className={classes.containerProject}>
            <SelectProject
                listProject={projectsWithLabels}
                filteredProjects={(listProjectSelected) => getFilteredProject(listProjectSelected)}
            />
            <ListOfProjects projectsFilter={projectsFilter} />
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
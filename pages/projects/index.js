import React, { useEffect, useState } from 'react';
import classes from './index.module.css'
import withTransition from "../../components/HOC/WitchTransition";
import axios from 'axios';
import { motion } from "framer-motion";
import { apiProjects } from '../../utils/data';
import SelectProject from '../../components/Project/SelectProject';
import ListOfProjects from '../../components/Project/ListOfProjects';
function Projects({ projects, tags, languages }) {
    const [projectsWithLabels, setprojectsWithLables] = useState();
    const [projectsFilter, setprojectsFilter] = useState([]);

    useEffect(() => {
        if (tags) {
            setprojectsWithLables(tags);
            setprojectsFilter(projects);
        }
    }, [tags]);
    useEffect(() => {
        if (projects) {
            setprojectsFilter(projects);
        }
    }, [projects]);

    const getFilteredProject = (listProjectSelected) => {
        const nameTagsSelect = listProjectSelected.map(tag => tag.value);
        if (nameTagsSelect.length === 0) {
            setprojectsFilter(projects);
        } else {
            const listProjectSelect = () => {
                let newArrayOfProjectsSelected = [];
                projects.forEach(p => {
                    const listTagsProject = p.tags;
                    listTagsProject.forEach(element => {
                        if (nameTagsSelect.includes(element)) {
                            newArrayOfProjectsSelected.push(p);
                        }
                    });
                })
                const nonUnique = [...new Set(newArrayOfProjectsSelected)];
                return nonUnique;
            }
            setprojectsFilter(listProjectSelect());
        }
    }
    return (<>
        <div className={classes.containerProject}>
            <h1>Projects</h1>
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
            transition={{ duration: 0.9, ease: "easeInOut" }}
        />
        <motion.div
            className="slide-out"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
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
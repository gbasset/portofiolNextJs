import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { motion } from "framer-motion";
import { apiProjects } from '../../utils/data';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import classes from './project.module.css';
import { Router, useRouter } from 'next/router';
import { FaMobileAlt, FaDesktop } from 'react-icons/fa';
import Head from 'next/head';
FaMobileAlt
function Project({ project }) {

    const router = useRouter();
    function goToLink() {
        const fullPath = `projects/${project._id}`
        router.push(fullPath)
    }
    const proj = project[0];
    const AutoplaySlider = withAutoplay(AwesomeSlider);
    useEffect(() => {
        document.documentElement.scrollTop = 0
    }, [])
    console.log(project);
    return (
        <div>
            <Head>
                <title>{project[0].name}</title>
                <meta name="description" content={project[0].description} />
            </Head>
            <div className={classes.containerProject}>
                <AutoplaySlider className={classes.slider}
                    play={true}
                    cancelOnInteraction={false} // should stop playing on user interaction
                    interval={4000}
                >
                    {proj.images.map((x, i) =>
                        <div key={i} data-src={x.url} />
                    )}

                </AutoplaySlider>
                <h1 className={classes.title}>{proj.name.toUpperCase()}</h1>
                <p className={classes.description}>{proj.description}</p>
                <h2 className={classes.title}>Stack technique </h2>
                <ul className={classes.listTags}>
                    {proj.language.map((x, i) =>
                        <li key={i}> <a>{x}</a></li>
                    )}
                </ul>
                <div className={classes.devices}>
                    <h2 className={classes.title}>Devices</h2>
                    <div className={classes.devicesProj}>
                        {proj.devices.includes('mobile') &&
                            <i>
                                <FaMobileAlt />
                            </i>
                        }
                        {proj.devices.includes('desktop') &&
                            <i>
                                <FaDesktop />
                            </i>}
                    </div>

                </div>
                <>
                    {proj.links.map(link =>
                        link.name === 'code' ?
                            (<div className={classes.btnContainer}>
                                <a className={classes.btnMore} href={`${link.url}`} target="_blank" rel="noopener noreferrer">Voir le code</a>
                            </div>)
                            :
                            (<div className={classes.btnContainer}>
                                <a className={classes.btnMore} href={`${link.url}`} target="_blank" rel="noopener noreferrer">Visiter le site</a>
                            </div>)
                    )
                    }
                </>

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
import React, { useState, useEffect } from 'react'
import classes from './Projects.module.css';
import Btn from '../UI/Btn';
import { Router, useRouter } from 'next/router';
import { BsFillEyeFill } from 'react-icons/bs'
export default function Project({ project }) {
    const router = useRouter();
    function goToLink() {
        const fullPath = `projects/${project._id}`
        router.push(fullPath)
    }
    const [smallScreen, setSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 900px)");
        // addlistener c'est comme addeventlisterner pour les medias queries en JS
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        }

    })

    const handleMediaQueryChange = mediaQuery => {
        if (mediaQuery.matches) {
            setSmallScreen(true);
        } else {
            setSmallScreen(false);
        }
    }
    return (
        <>
            <div
                className={classes.boxes}
            >
                {!smallScreen ?
                    <div className={classes.projectContainer} onClick={() => goToLink()}>
                        <h2 className={classes.nameProjects}>{project.name}</h2>
                        <img className={classes.pictureProject} src={project.imageHome.url} alt="" />
                        <div className={classes.btn}
                            onClick={() => goToLink()}
                        >
                            <span className={classes.icon}>
                                <BsFillEyeFill />
                            </span>
                        </div>
                    </div>
                    :
                    <div className={classes.projectContainerMobile}
                        onClick={() => goToLink()}
                    >
                        <h2 className={classes.nameProjects}>{project.name}</h2>
                        <img className={classes.pictureProject} src={project.imageHome.url} alt="" />
                        <div className={classes.btn}
                            onClick={() => goToLink()}
                        >
                            <span className={classes.icon}>
                                <BsFillEyeFill />
                            </span>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

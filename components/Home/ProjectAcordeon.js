import React, { useState, useEffect } from 'react'
import classes from './ProjectAcordeon.module.css';
import Btn from '../UI/Btn';
import { BsFillEyeFill } from 'react-icons/bs';
import { Router, useRouter } from 'next/router';

export default function ProjectAcordeon(props) {
    const router = useRouter();
    const [imageActive, setImageActive] = useState(0);
    const [imagesToMap, setImagesToMap] = useState();
    const [smallScreen, setSmallScreen] = useState(false);
    useEffect(() => {
        setImagesToMap(props.mainProjects);
        setImageActive(props.mainProjects[0]._id)
    }, [])
    function goToLink(projectId) {
        const fullPath = `projects/${projectId}`
        router.push(fullPath)
    }
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
            <h1 className={classes.h1}>Séléction de projets</h1>
            {/* {!smallScreen &&
                <div className={classes.container}>
                    {imagesToMap && imagesToMap.map(img =>
                        <div
                            key={img._id}
                            className={imageActive === img._id ? classes.pannelActive : classes.pannel}
                            onClick={() => setImageActive(img._id)}
                        >
                            <article className={classes.background}
                                style={{
                                    backgroundImage: "url(" + `${img.imageHome.url}` + ")",
                                }}
                            >
                            </article>
                            <>
                                {imageActive !== img._id &&
                                    <div className={classes.IsActive}>
                                        <Btn
                                            onClickFunction={() => null}
                                            style="outline"
                                            color="secondary"
                                        >
                                            <span className={classes.icon}>
                                                <BsFillEyeFill />
                                            </span>
                                        </Btn>
                                    </div>
                                }

                                {imageActive === img._id &&
                                    <>
                                        <h3> {img.name} </h3>
                                        <p className={imageActive === img._id ? classes.description : classes.pannel}>
                                            {img.description}
                                        </p>
                                        <Btn
                                            onClickFunction={() => goToLink(img._id)}
                                            style="outline"
                                            color="secondary"
                                            message="Découvrir le projet"
                                        >
                                        </Btn>
                                    </>
                                }

                            </>
                        </div>
                    )}
                </div>} */}
            {
                // smallScreen &&
                <div >
                    {imagesToMap && imagesToMap.map(img =>
                        <div key={img._id} className={classes.mobileContainer}
                        >
                            <h3 className={classes.nameProject}> {img.name} </h3>
                            <img src={img.imageHome.url} alt="img" />
                            <p className={classes.desc}>
                                {img.description}
                            </p>
                            <Btn
                                onClickFunction={() => goToLink(img._id)}
                                style="outline"
                                color="secondary"
                                message="Découvrir le projet"
                            >
                            </Btn>
                        </div>)}
                </div>
            }
        </>
    )
}

import React, { useState, useEffect } from 'react'
import classes from './ProjectAcordeon.module.css';
import Btn from '../UI/Btn';
import { BsFillEyeFill } from 'react-icons/bs'
export default function ProjectAcordeon(props) {
    const [imageActive, setImageActive] = useState(0);
    const [imagesToMap, setImagesToMap] = useState();
    useEffect(() => {
        setImagesToMap(props.mainProjects);
        setImageActive(props.mainProjects[0]._id)
    }, [])

    return (
        <div>
            <h1 className={classes.h1}>Séléction de projets</h1>
            <div className={classes.container}>
                {imagesToMap && imagesToMap.map(img =>
                    <div
                        key={img._id}
                        className={imageActive === img._id ? classes.pannelActive : classes.pannel}
                        onClick={() => setImageActive(img._id)}
                    >
                        <section className={classes.background}
                            style={{
                                backgroundImage: "url(" + `${img.imageHome.url}` + ")",
                            }}
                        >
                        </section>
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

                            {
                                <>
                                    <h3> {img.name} </h3>
                                    <p className={imageActive === img._id ? classes.description : classes.pannel}>
                                        {img.description}
                                    </p></>
                            }
                            <Btn
                                onClickFunction={() => null}
                                style="outline"
                                color="secondary"
                                message="Découvrir le projet"
                            >
                            </Btn>
                        </>
                    </div>
                )}
            </div>
        </div>
    )
}

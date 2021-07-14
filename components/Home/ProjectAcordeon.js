import React, { useState, useEffect } from 'react'
import classes from './ProjectAcordeon.module.css';

export default function ProjectAcordeon(props) {
    const [imageActive, setImageActive] = useState(0);
    const [imagesToMap, setImagesToMap] = useState();
    useEffect(() => {
        setImagesToMap(props.mainProjects)
    }, [])

    return (
        <div>
            <h1 className={classes.h1}>Séléction de projets</h1>
            <div className={classes.container}>
                {imagesToMap && imagesToMap.map(img =>
                    <div key={img._id} className={imageActive === img._id ? classes.pannelActive : classes.pannel}
                        onClick={() => setImageActive(img._id)}
                        style={{
                            backgroundImage: "url(" + `${img.imageHome.url}` + ")",
                        }}>
                        <button>See More</button>
                        <h3> {img.name} </h3>
                    </div>
                )}
            </div>
        </div>
    )
}

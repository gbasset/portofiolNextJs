import React, { useState, useEffect } from 'react'
import classes from './ProjectAcordeon.module.css'
export default function ProjectAcordeon() {
    const [imageActive, setImageActive] = useState(0);
    const [imagesToMap, setImagesToMap] = useState();
    return (
        <div>
            <h1>News</h1>
            <div className="container">
                {imagesToMap.map(img =>
                    <div key={img.id} className={imageActive === img.id ? "pannel active" : "pannel"}
                        onClick={() => setImageActive(img.id)}
                        style={{
                            backgroundImage: "url(" + `${img.url}` + ")",
                        }}>
                        <button>See More</button>
                        <h3> {img.name} </h3>
                    </div>
                )}
            </div>
        </div>
    )
}

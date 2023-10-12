import React from 'react'
import Project from './Project';
import classes from './ListOfProjects.module.css'
export default function ProjectFilter({ projectsFilter }) {
    return (
        <div className={classes.listProject} >
            {projectsFilter.map(project =>
                <Project key={project._id} project={project} />
            )}
        </div>
    )
}

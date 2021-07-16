import React from 'react'
import Project from './Project';
export default function ProjectFilter({ projectsFilter }) {
    return (
        <div>
            {projectsFilter.map(project =>
                <Project key={project._id} project={project} />
            )}
        </div>
    )
}

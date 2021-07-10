import React from 'react';
import classes from './index.module.css'
import withTransition from "../../components/HOC/WitchTransition";
function Projects() {
    return (
        <div className={classes.containerProject}>
            <h1>Projects</h1>
        </div>
    )
}
export default withTransition(Projects);
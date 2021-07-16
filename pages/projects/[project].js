import React from 'react'
import withTransition from "../../components/HOC/WitchTransition";
function project({ project }) {
    return (
        <div>
            <h1>Page projet</h1>
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
    const paths = projects.map(project => (
        { params: { projectId: project._id } }
    ))
    return {
        paths: paths,
        fallback: true
        // fallback: 'blocking
    }
}
export async function getStaticProps(context) {
    const projectId = context.params.projectId;
    const event = await axios.get(`${apiProjects}project/${projectId}`)
        .then(res => {
            return res.data
        })
        .catch(error => {
            console.error('Une erreur est survenue pendant la récupération des projets');
        })
    return {
        props: {
            project: project
        }
    }
}
export default withTransition(project);
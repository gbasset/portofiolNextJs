import React from 'react'
import Head from 'next/head';
import withTransition from "../components/HOC/WitchTransition";
function About() {
    return (
        <div>
            <Head>
                <title>Page à propos </title>
                <meta name="description" content="Page à propos. Ceci est le portfolio de Gaëtan Basset Developpeur web. ReactJs , NodeJs et Css." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Page à propos</h1>
        </div>
    )
}
export default withTransition(About);
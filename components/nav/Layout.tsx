import React, { useState, useEffect } from 'react'
import NavContainer from './NavContainer';
import classes from './Layout.module.css';
import Footer from '../Footer/Footer'
export default function (props) {
    const [smallS, setSmallS] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 900px)");
        // addlistener c'est comme addeventlisterner pour les medias queries en JS
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        }

    })

    const handleMediaQueryChange = (mediaQuery: any) => {
        if (mediaQuery.matches) {
            setSmallS(true);
        } else {
            setSmallS(false);
        }
    }
    return (
        <div className={!smallS ? classes.container : classes.container + classes.small}>
            <nav> <NavContainer /></nav>
            <main>{props.children}</main>
            {smallS &&
                <Footer />
            }
        </div >
    )
}

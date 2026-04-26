import React, { useState, useEffect } from 'react'
import NavContainer from './NavContainer';
import classes from './Layout.module.css';
import Footer from '../Footer/Footer'
export default function ({ children }) {
    const [smallS, setSmallS] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 900px)");
        const handleMediaQueryChange = (event) => {
            setSmallS(event.matches);
        };

        handleMediaQueryChange(mediaQuery);
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        }
    }, [])
    return (
        <div className={!smallS ? classes.container : classes.container + classes.small}>
            <nav> <NavContainer /></nav>
            <main>{children}</main>
            {smallS &&
                <Footer />
            }
        </div >
    )
}

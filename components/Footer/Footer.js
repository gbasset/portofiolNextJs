import React, { useEffect, useState } from 'react'
import classes from './Footer.module.css';
import Image from 'next/image';
export default function Footer() {
    const today = new Date().getFullYear();
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

    const handleMediaQueryChange = mediaQuery => {
        if (mediaQuery.matches) {
            setSmallS(true);
        } else {
            setSmallS(false);
        }
    }

    return (
        <>
            {smallS ?
                <footer className={classes.footer}>
                    <div className={classes.logosContainer}>
                        <div className={classes.image}>
                            <a href="https://www.linkedin.com/in/gaetan-basset-289b9410a/" target="_blank">
                                <Image src="/logos/iconmonstr-linkedin-2-svg.svg" alt="linkedin" width={60} height={60} />
                            </a>
                        </div>
                        <div>
                            <a className={classes.link} href="https://www.codewars.com/users/gbasset" target='_blank'>
                                <img src="https://www.codewars.com/users/gbasset/badges/micro" alt="codewars logo" /></a>
                        </div>
                        <div className={classes.image}>
                            <a href="https://github.com/gbasset" target='_blank'>
                                <Image src="/logos/iconmonstr-github-1-svg.svg" alt="github" width={60} height={60} />
                            </a>
                        </div>
                    </div>
                    <div className={classes.copy}>
                        <p>
                            © Basset Gaëtan {today}  Tous droits réservés
                        </p>
                    </div>
                </footer>
                :
                <footer className={classes.footer}>
                    <div className={classes.logosContainer}>
                        <div className={classes.image}>
                            <a href="https://www.linkedin.com/in/gaetan-basset-289b9410a/" target="_blank">
                                <Image src="/logos/iconmonstr-linkedin-2-svg.svg" alt="linkedin" width={60} height={60} />
                            </a>
                        </div>
                        <div className={classes.image}>
                            <a href="https://github.com/gbasset" target='_blank'>
                                <Image src="/logos/iconmonstr-github-1-svg.svg" alt="github" width={60} height={60} />
                            </a>
                        </div>
                    </div>
                    <a className={classes.link} href="https://www.codewars.com/users/gbasset" target='_blank'>
                        <img src="https://www.codewars.com/users/gbasset/badges/micro" alt="codewars logo" /></a>
                    <div className={classes.copy}>
                        © Basset Gaëtan {today}  Tous droits réservés
                    </div>
                </footer>
            }
        </>
    )
}

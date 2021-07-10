import React from 'react'
import classes from './Footer.module.css';
import Image from 'next/image';
export default function Footer() {
    const today = new Date().getFullYear()
    return (
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
    )
}

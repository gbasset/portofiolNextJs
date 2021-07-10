import React, { useEffect, useState } from 'react';
import Logo from '../Logo/Logo';
import Footer from '../Footer/Footer';
import classes from './Nav.module.css';

import { useRouter } from 'next/router'
export default function NavContainer() {
    const router = useRouter();
    const [linkNavigationCurrent, setlinkNavigationCurrent] = useState('');

    useEffect(() => {
        if (router.pathname !== "/") {
            setlinkNavigationCurrent(router.pathname);
        } else {
            setlinkNavigationCurrent("/home");
        }
    }, [])
    const navigation = [
        {
            link: '/',
            key: '/home',
            label: 'Accueil'
        },
        {
            link: '/projects',
            key: '/projects',
            label: 'Projets'
        },
        {
            link: '/about',
            key: '/about',
            label: 'Á propos'
        },
        {
            link: '/contact',
            key: '/contact',
            label: 'Contact'
        },
    ];
    const handleChangeNavigation = (link) => {
        if (linkNavigationCurrent === link.key) {
            return;
        }
        setlinkNavigationCurrent(link.key);
        router.push(link.link);
    }
    console.log(linkNavigationCurrent);
    return (
        <nav className={classes.nav}>
            <Logo />
            <ul>
                {navigation.map((link, id) =>
                    <li key={id}
                        className={link.key === linkNavigationCurrent ? classes.isCurrentNavActive : ''}
                        onClick={() => handleChangeNavigation(link)}>
                        {link.label}
                    </li>
                )}
            </ul>
            <Footer />
        </nav>
    )
}


import React, { useEffect, useState } from 'react';
import Logo from '../Logo/Logo';
import Footer from '../Footer/Footer';
import classes from './Nav.module.css';

import { useRouter } from 'next/router';

const NAVIGATION = [
    {
        key: '/home',
        label: 'Accueil',
        link: '/',
    },
    {
        link: '/projects',
        label: 'Projets',
        key: '/projects',
    },
    {
        link: '/about',
        label: 'Parcours',
        key: '/about',
    },
    {
        link: '/contact',
        label: 'Contact',
        key: '/contact',
    },
];

export default function NavContainer() {
    const router = useRouter();
    const [linkNavigationCurrent, setlinkNavigationCurrent] = useState('');

    useEffect(() => {
        if (router.pathname !== "/") {
            setlinkNavigationCurrent(router.pathname);
        } else {
            setlinkNavigationCurrent("/home");
        }
    }, [router.pathname])

    useEffect(() => {
        NAVIGATION.forEach((item) => {
            router.prefetch(item.link);
        });
    }, [router]);

    useEffect(() => {
        const handleRouteChange = (url) => {
            if (url === ('/projects')) {
                setlinkNavigationCurrent("/projects")
            }
            if (url.includes('/projects/')) {
                setlinkNavigationCurrent("")
            }

        }
        router.events.on('routeChangeStart', handleRouteChange)
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [router.events])

    const handleChangeNavigation = (link) => {
        if (linkNavigationCurrent === link.key) {
            return;
        }
        setlinkNavigationCurrent(link.key);
        showMenu(false);
        router.push(link.link);
    }
    const [menu, showMenu] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 900px)");
        const handleMediaQueryChange = (event) => {
            setSmallScreen(event.matches);
        };

        handleMediaQueryChange(mediaQuery);
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, [])

    const toggleNavRes = () => {
        showMenu(!menu);
    }

    const hideMenu = () => {

        if (menu === true) {
            showMenu(!menu);
        }

    }
    return (
        <>
            <div className={classes.noOverflow}>

                {smallScreen &&
                    <div className={classes.menuResBtn}>
                        <img onClick={toggleNavRes}
                            src={!menu ? '/logos/Menuico.svg' : '/logos/Croix.svg'}
                            alt="icone menu responsive"
                            className={classes.menuIco} />

                    </div>
                }
                {(menu && smallScreen) && (<>

                    <div className={classes.smallMen}>
                        <ul>
                            {NAVIGATION.map((link, id) =>
                                <li key={id}
                                    className={link.key === linkNavigationCurrent ? classes.isCurrentNavActive : classes.notActive}
                                    onClick={() => handleChangeNavigation(link)}>
                                    {link.label}
                                </li>
                            )}
                        </ul>
                    </div></>
                )}
            </div>
            {(!smallScreen) && (
                <>
                    <nav className={classes.nav}>
                        <Logo
                            setlinkNavigationCurrent={() => setlinkNavigationCurrent('/home')}
                        />
                        <ul>
                            {NAVIGATION.map((link, id) =>
                                <li key={id}
                                    className={link.key === linkNavigationCurrent ? classes.isCurrentNavActive : classes.notActive}
                                    onClick={() => handleChangeNavigation(link)}>
                                    {link.label}
                                </li>
                            )}
                        </ul>
                        <div className={classes.footerWrap}>
                            <Footer />
                        </div>
                    </nav>
                </>
            )}

        </>
    )
}


import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Logo from '../Logo/Logo';
import Footer from '../Footer/Footer';
import classes from './Nav.module.css';
import type { LinkNavigation } from '../../types/navigation.types';

const NAVIGATION: LinkNavigation[] = [
  { key: '/home', label: 'Accueil', link: '/' },
  // { key: '/projects', label: 'Projets', link: '/#projects-showcase' },
  { key: '/about', label: 'Parcours', link: '/about' },
  { key: '/contact', label: 'Contact', link: '/contact' },
];

export default function NavContainer() {
  const router = useRouter();
  const [linkNavigationCurrent, setLinkNavigationCurrent] = useState<string>('');
  const [menu, setMenu] = useState<boolean>(false);

  useEffect(() => {
    if (router.asPath.includes('#projects-showcase') || router.asPath.includes('#project-')) {
      setLinkNavigationCurrent('/projects');
      return;
    }

    setLinkNavigationCurrent(router.pathname === '/' ? '/home' : router.pathname);
  }, [router.asPath, router.pathname]);

  useEffect(() => {
    NAVIGATION.forEach((item) => {
      router.prefetch(item.link);
    });
  }, [router]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url === '/projects' || url.includes('#projects-showcase') || url.includes('#project-')) {
        setLinkNavigationCurrent('/projects');
      } else if (url.includes('/projects/')) {
        setLinkNavigationCurrent('');
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  const handleChangeNavigation = useCallback((link: LinkNavigation) => {
    if (linkNavigationCurrent === link.key) return;
    setLinkNavigationCurrent(link.key);
    setMenu(false);
    router.push(link.link);
  }, [linkNavigationCurrent, router]);

  const toggleNavRes = useCallback(() => {
    setMenu((prev) => !prev);
  }, []);

  return (
    <>
      <div className={classes.noOverflow}>
        <div className={classes.menuResHost}>
          <div
            className={classes.menuResBtn}
            role="button"
            tabIndex={0}
            aria-label="Ouvrir le menu de navigation"
            aria-expanded={menu}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleNavRes();
              }
            }}
            onClick={toggleNavRes}
          >
            <img
              src={!menu ? '/logos/Menuico.svg' : '/logos/Croix.svg'}
              alt="icone menu responsive"
              className={classes.menuIco}
              width={18}
              height={18}
            />
          </div>
        </div>

        {menu && (
          <div className={classes.smallMen}>
            <ul>
              {NAVIGATION.map((link) => (
                <li
                  key={link.key}
                  className={link.key === linkNavigationCurrent ? classes.isCurrentNavActive : classes.notActive}
                  onClick={() => handleChangeNavigation(link)}
                >
                  {link.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <nav className={classes.nav}>
        <Logo setlinkNavigationCurrent={() => setLinkNavigationCurrent('/home')} />
        <ul>
          {NAVIGATION.map((link) => (
            <li
              key={link.key}
              className={link.key === linkNavigationCurrent ? classes.isCurrentNavActive : classes.notActive}
              onClick={() => handleChangeNavigation(link)}
            >
              {link.label}
            </li>
          ))}
        </ul>
        <div className={classes.footerWrap}>
          <Footer />
        </div>
      </nav>
    </>
  );
}

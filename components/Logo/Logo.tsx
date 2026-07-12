import React from 'react';
import { useRouter } from 'next/router';
import classes from './Logo.module.css';

interface LogoProps {
  setlinkNavigationCurrent: () => void;
}

export default function Logo({ setlinkNavigationCurrent }: LogoProps) {
  const router = useRouter();

  const handleChangeNavigation = () => {
    setlinkNavigationCurrent();
    router.push('/');
  };

  return (
    <div
      className={classes.logoContainer}
      onClick={handleChangeNavigation}
      role="button"
      tabIndex={0}
      aria-label="Aller à l'accueil"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleChangeNavigation();
        }
      }}
    >
      <div className={classes.logo}>GB</div>
    </div>
  );
}

import React from 'react'
import classes from './Logo.module.css';
import { useRouter } from 'next/router';
export default function Logo({ setlinkNavigationCurrent }) {
    const router = useRouter();
    const handleChangeNavigation = () => {
        setlinkNavigationCurrent()
        router.replace("/");
    }


    return (
        <div className={classes.logoContainer}
            onClick={() => handleChangeNavigation()}
        >
            <div className={classes.logo}

            >
                GB
            </div>
        </div>
    )
}

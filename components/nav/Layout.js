import React from 'react';
import NavContainer from './NavContainer';
import classes from './Layout.module.css';
import Footer from '../Footer/Footer';

export default function Layout({ children }) {
    return (
        <div className={classes.container}>
            <nav>
                <NavContainer />
            </nav>
            <main>{children}</main>
            <div className={classes.footerMobile}>
                <Footer />
            </div>
        </div>
    );
}

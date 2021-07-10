import React from 'react'
import NavContainer from './NavContainer';
import classes from './Layout.module.css';
export default function Layout(props) {
    return (
        <div className={classes.container}>
            <NavContainer />
            <main>{props.children}</main>
        </div>
    )
}

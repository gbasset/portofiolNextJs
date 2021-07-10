import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import classes from './Languages.module.css'
export default function Language({ language }) {
    console.log("language", language);
    const ref = useRef(null);

    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [show, setShow] = useState(false);

    const listener = e => {
        const triggerBottom = window.innerHeight / 1.5;
        const boxTop = ref.current.getBoundingClientRect().top;
        setLastScrollTop(document.body.scrollTop);
        if (boxTop < triggerBottom) {
            setShow(true);
        } else {
            setShow(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", listener);
        return () => {
            window.removeEventListener("scroll", listener);
        };
    }, [lastScrollTop]);
    console.log("show", show);
    return (
        <div className={show ? `${classes.box} ${classes.show}` : classes.box} ref={ref}>
            <div className={classes.containerBoxe}>
                <Image src={language.image} alt="github" width={200} height={200} />
                <h2>  {language.language}</h2>
                <p className={classes.FirstLanguage}>{language.technos[0]}</p>
            </div>
            <div className={classes.containerLangages}>
                <p className={classes.SecondLangage}>sdsdsd </p>
                <p className={classes.ThirdLangage}>ddddsds </p>
                <p className={classes.FourthLangage}>kiki </p>
                <p className={classes.FithLangage}>Yolo </p>
            </div>

        </div>
    )
}

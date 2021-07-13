import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import classes from './Languages.module.css'
export default function Language({ language }) {

    const ref = useRef(null);

    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [show, setShow] = useState(false);

    const listener = e => {
        const triggerBottom = window.innerHeight / 1.5;
        if (ref.current) {
            const boxTop = ref.current.getBoundingClientRect().top;
            setLastScrollTop(document.body.scrollTop);
            if (boxTop < triggerBottom) {
                setShow(true);
            } else {
                setShow(false);
            }
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
                <Image className={show ? `${classes.imageShow}` : ` ${classes.imageDisable}`}
                    src={language.image} alt="github" width={200} height={200} />
                <h2 className={show ? `${classes.mainTitleShow}` : ` ${classes.mainTitleDisable}`}>
                    {language.language}</h2>
                <p className={show ? `${classes.FirstLanguage} ${classes.mainTitleShow}` : `${classes.FirstLanguage}`} >{language.technos[0]}</p>
            </div>
            <div className={show ? `${classes.containerLangage} ${classes.containerLanguageShow}` : `${classes.containerLangage}`}>
                <p className={classes.SecondLangage}>{language.technos[1]} </p>
                <p className={classes.ThirdLangage}> {language.technos[2]}</p>
                <p className={classes.FourthLangage}>{language.technos[3]} </p>
                <p className={classes.FithLangage}> {language.technos[4]}</p>
            </div>

        </div>
    )
}

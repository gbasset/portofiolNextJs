import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { apiProjects } from '../utils/data';
import { motion } from "framer-motion";
import classes from './contact.module.css';
import toast, { Toaster } from 'react-hot-toast';
import Typewriter from 'typewriter-effect';
import Head from 'next/head';
function Contact() {

    const [informations, setInformations] = useState({
        subject: '',
        message: '',
        from: ''
    });
    const [errorsForm, seterrorsForm] = useState([]);
    const handleInput = (e) => {
        const val = e.target.value;
        setInformations(inf => ({
            ...inf, [e.target.name]: val
        }))
    }

    useEffect(() => {
        document.documentElement.scrollTop = 0
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        seterrorsForm({});
        const errors = [];
        let error = false;
        if (informations.message.length === 0) {
            errors.message = 'Le message ne doit pas être vide .';
            error = true;
        }
        if (informations.from.length > 0) {
            function validateEmail(email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
            const mail = validateEmail(informations.from);
            mail == true ? null : errors.from = 'Cet addresse email n\'est pas valide';
            if (!mail) {
                error = true;
            }
        }
        if (informations.from.length == 0) {
            errors.from = 'Il manque une adresse mail';
            error = true
        }
        if (error) {
            toast.error('Il manque des informations pour envoyer le message.')
        }
        if (!error) {
            const toastId = toast.loading("Traitement de l'envoi en cours ...");
            await axios.post(`${apiProjects}message`, informations)
                .then(val => {
                    setTimeout(() => {
                        toast.dismiss(toastId);
                        toast.success('Votre message à été transmis, merci !', {
                            icon: '🥳',
                        });
                    }, 500)
                    setInformations({
                        subject: '',
                        message: '',
                        from: ''
                    })
                }).catch(error => {
                    toast.dismiss(toastId);
                    toast.error("Une erreur est survenue")
                });

        } else {
            seterrorsForm({ ...errors })
        }
    }

    return (
        <div className={classes.containerForm}>
            <Head>
                <title>Contacter Basset Gaëtan</title>
                <meta name="description"
                    content="contacter gaëtan basset par mail" />
            </Head>
            <Toaster />
            <form className={classes.formControl}>
                <h1 className={classes.titleContact}>
                    <Typewriter
                        options={{
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 5,
                            changeDelay: 2
                        }}
                        onInit={(typewriter) => {
                            typewriter.typeString(`Laissez moi un e-mail ! `)
                                .pauseFor(500)
                                .deleteChars(25)
                                .typeString('Je vous repondrai dès que possible .')
                                .deleteAll()
                                .pauseFor(800)
                                .deleteChars(54)
                                .start()
                        }}
                    />
                </h1>
                <div className={classes.labelContainer}>
                    <label htmlFor="from">Votre Mail </label>
                    <input
                        type="email"
                        id="from"
                        name="from"
                        onChange={handleInput}
                        value={informations.from}
                        placeholder="jean_de-florette@gmail.com" />
                    {errorsForm.hasOwnProperty("from") &&
                        <p className="information_error_message">{errorsForm.from}</p>}
                </div>
                <div className={classes.labelContainer}>
                    <label htmlFor="subject">Sujet </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        onChange={handleInput}
                        value={informations.subject}
                        placeholder="Collaboration" />
                </div>
                <div className={classes.labelContainer}>
                    <label htmlFor="subject">Message </label>
                    <textarea
                        id="message"
                        name="message"
                        onChange={handleInput}
                        placeholder="Votre message ..."
                        value={informations.message}

                    />
                </div>
                {errorsForm.hasOwnProperty("message") && <p className="information_error_message">{errorsForm.message}</p>}
                <div className={classes.btnContainer}>
                    <button
                        type="submit"
                        className={classes.btnSend}
                        onClick={handleSubmit} >
                        Envoyer</button>
                </div>

            </form>
            <motion.div
                className="slide-in"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 0 }}
                exit={{ scaleX: 1 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
            />
            <motion.div
                className="slide-out"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
        </div >
    )
}
export default Contact
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { apiProjects } from '../utils/data';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineClock, HiOutlineChatAlt2 } from 'react-icons/hi';
import { SiLinkedin, SiGithub } from 'react-icons/si';
import SeoHead from '../components/SEO/SeoHead';
import Breadcrumb from '../components/SEO/Breadcrumb';
import { PAGE_SEO } from '../utils/seo';
import { buildBreadcrumbJsonLd, getContactBreadcrumbs } from '../utils/breadcrumbs';

const sectionVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

const inputClassName =
    'w-full rounded-ds-md border-2 border-neutral-100/90 bg-surface-cream px-4 py-3 text-sm text-surface-ink shadow-inner-soft placeholder:text-neutral-500 outline-none transition-colors duration-200 focus:border-secondary-700 focus:ring-2 focus:ring-secondary-700/25';

const labelClassName =
    'mb-2 block text-sm font-semibold text-secondary-700';

const infoCardClassName =
    'rounded-2xl border border-secondary-700/35 bg-primary-600/55 p-5 shadow-glow-amber backdrop-blur-sm';

const SOCIAL_LINKS = [
    {
        href: 'https://www.linkedin.com/in/gaetan-basset-289b9410a/',
        label: 'LinkedIn',
        handle: 'Gaëtan Basset',
        icon: SiLinkedin,
    },
    {
        href: 'https://github.com/gbasset',
        label: 'GitHub',
        handle: '@gbasset',
        icon: SiGithub,
    },
];

const CONTACT_TOPICS = [
    'Mission ou collaboration frontend',
    'Retour sur un projet du portfolio',
    'Échange technique ou opportunité',
];

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

    const breadcrumbItems = getContactBreadcrumbs();

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 md:px-8">
            <SeoHead
                title={PAGE_SEO.contact.title}
                description={PAGE_SEO.contact.description}
                path={PAGE_SEO.contact.path}
                jsonLd={buildBreadcrumbJsonLd(breadcrumbItems)}
            />
            <Toaster />
            <Breadcrumb items={breadcrumbItems} />

            <header className="text-center">
                <p className="ds-eyebrow mb-2">Restons en contact</p>
                <h1 className="font-display text-3xl uppercase tracking-wide text-secondary-700 md:text-5xl">
                    Me contacter
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-surface-cream md:text-lg">
                    Formulaire ci-dessous ou profils professionnels — choisissez ce qui vous convient le mieux.
                </p>
            </header>

            <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start"
            >
                <aside className="flex flex-col gap-5">
                    <div className={infoCardClassName}>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-700/20 text-xl text-secondary-700">
                                <HiOutlineMail aria-hidden />
                            </span>
                            <div>
                                <h2 className="text-lg font-bold text-surface-cream">Message direct</h2>
                                <p className="text-sm text-primary-200">Via le formulaire à droite</p>
                            </div>
                        </div>
                        <p className="text-sm leading-6 text-primary-200">
                            Indiquez votre e-mail, un sujet court et le contexte de votre demande.
                            Je lis chaque message personnellement.
                        </p>
                    </div>

                    <div className={infoCardClassName}>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-700/20 text-xl text-secondary-700">
                                <HiOutlineClock aria-hidden />
                            </span>
                            <div>
                                <h2 className="text-lg font-bold text-surface-cream">Délai de réponse</h2>
                                <p className="text-sm font-medium text-secondary-100">Sous 48 h en semaine</p>
                            </div>
                        </div>
                       
                    </div>

                    <div className={infoCardClassName}>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-700/20 text-xl text-secondary-700">
                                <HiOutlineChatAlt2 aria-hidden />
                            </span>
                            <h2 className="text-lg font-bold text-surface-cream">Sujets fréquents</h2>
                        </div>
                        <ul className="space-y-2">
                            {CONTACT_TOPICS.map((topic) => (
                                <li
                                    key={topic}
                                    className="flex items-start gap-2 text-sm leading-6 text-primary-200"
                                >
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary-700" aria-hidden />
                                    {topic}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={infoCardClassName}>
                        <h2 className="mb-4 text-lg font-bold text-surface-cream">Réseaux professionnels</h2>
                        <ul className="space-y-3">
                            {SOCIAL_LINKS.map(({ href, label, handle, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex items-center gap-4 rounded-xl border border-primary-200/15 bg-primary-700/40 px-4 py-3 transition hover:border-secondary-700 hover:bg-secondary-700/15"
                                    >
                                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary-700 text-xl text-primary-700 transition group-hover:bg-secondary-100">
                                            <Icon aria-hidden />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block text-sm font-semibold text-surface-cream">{label}</span>
                                            <span className="block truncate text-sm text-secondary-100 group-hover:text-accent">
                                                {handle}
                                            </span>
                                        </span>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-secondary-700 opacity-0 transition group-hover:opacity-100">
                                            Ouvrir →
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <form
                    onSubmit={handleSubmit}
                    className="relative overflow-hidden rounded-2xl border border-secondary-700/40 bg-gradient-to-br from-primary-600/80 via-primary-600/50 to-primary-700/70 p-6 shadow-glow-amber backdrop-blur-sm md:p-8"
                >
                    <div
                        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(235,184,118,0.22)_0%,transparent_70%)]"
                        aria-hidden
                    />
                    <h2 className="relative mb-1 text-xl font-bold text-surface-cream md:text-2xl">
                        Envoyer un message
                    </h2>
                    <p className="relative mb-6 text-sm text-primary-200">
                        Les champs marqués d&apos;un astérisque sont obligatoires.
                    </p>

                    <div className="relative flex flex-col gap-5">
                        <div className="flex flex-col">
                            <label htmlFor="from" className={labelClassName}>
                                Votre e-mail <span className="text-error-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="from"
                                name="from"
                                required
                                onChange={handleInput}
                                value={informations.from}
                                className={inputClassName}
                                placeholder="votre.nom@exemple.com"
                                autoComplete="email"
                            />
                            {errorsForm.hasOwnProperty("from") && (
                                <p className="mt-2 text-sm font-medium text-error-100">{errorsForm.from}</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="subject" className={labelClassName}>Sujet</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                onChange={handleInput}
                                value={informations.subject}
                                className={inputClassName}
                                placeholder="Ex. : Collaboration React / retour portfolio"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="message" className={labelClassName}>
                                Message <span className="text-error-500">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                onChange={handleInput}
                                placeholder="Décrivez votre besoin, le contexte et vos disponibilités…"
                                value={informations.message}
                                className={`${inputClassName} min-h-[180px] resize-y md:min-h-[220px]`}
                            />
                            {errorsForm.hasOwnProperty("message") && (
                                <p className="mt-2 text-sm font-medium text-error-100">{errorsForm.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-between">
                            <p className="text-center text-xs text-primary-200/90 sm:text-left">
                                En envoyant ce formulaire, vous acceptez d&apos;être recontacté par e-mail.
                            </p>
                            <button
                                type="submit"
                                className="w-full shrink-0 rounded-ds-md border-2 border-secondary-700 bg-secondary-700 px-8 py-3 text-sm font-bold uppercase tracking-[0.15em] text-primary-700 shadow-glow-amber transition-all duration-300 hover:border-secondary-100 hover:bg-secondary-100 sm:w-auto"
                            >
                                Envoyer le message
                            </button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
export default Contact

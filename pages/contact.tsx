import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Head from 'next/head';
import toast, { Toaster } from 'react-hot-toast';
import Typewriter from 'typewriter-effect';
import type { ContactPayload } from '../types/api.types';
import { apiProjects } from '../utils/data';

type ContactFormErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = (email: string): boolean => EMAIL_REGEX.test(email.toLowerCase());

const EMPTY_FORM: ContactPayload = { subject: '', message: '', from: '' };

function Contact() {
  const [informations, setInformations] = useState<ContactPayload>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInformations((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormErrors({});

    const errors: ContactFormErrors = {};
    let hasError = false;

    if (informations.message.length === 0) {
      errors.message = 'Le message ne doit pas être vide.';
      hasError = true;
    }

    if (informations.from.length === 0) {
      errors.from = 'Il manque une adresse mail';
      hasError = true;
    } else if (!validateEmail(informations.from)) {
      errors.from = "Cette adresse email n'est pas valide";
      hasError = true;
    }

    if (hasError) {
      setFormErrors(errors);
      toast.error('Il manque des informations pour envoyer le message.');
      return;
    }

    const toastId = toast.loading("Traitement de l'envoi en cours ...");
    try {
      await axios.post<void>(`${apiProjects}message`, informations);
      setTimeout(() => {
        toast.dismiss(toastId);
        toast.success('Votre message à été transmis, merci !', { icon: '🥳' });
      }, 500);
      setInformations(EMPTY_FORM);
    } catch {
      toast.dismiss(toastId);
      toast.error('Une erreur est survenue');
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
      <Head>
        <title>Contacter Basset Gaëtan</title>
        <meta name="description" content="contacter gaëtan basset par mail" />
      </Head>
      <Toaster />
      <form className="mx-auto flex w-full max-w-3xl flex-col rounded-lg border border-primary-400/20 bg-primary-600/40 px-4 py-6 shadow-glow-primary backdrop-blur-sm md:px-8">
        <h1 className="mb-6 min-h-[56px] text-center text-2xl italic text-primary-200 md:mb-8 md:min-h-[72px] md:text-5xl">
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
              deleteSpeed: 5,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString('Laissez moi un e-mail ! ')
                .pauseFor(500)
                .deleteChars(25)
                .typeString('Je vous repondrai dès que possible .')
                .deleteAll()
                .pauseFor(800)
                .deleteChars(54)
                .start();
            }}
          />
        </h1>

        <div className="mx-auto mb-4 flex w-full max-w-2xl flex-col">
          <label htmlFor="from" className="mb-1 text-left text-lg text-secondary-700 md:text-xl">
            Votre Mail
          </label>
          <input
            type="email"
            id="from"
            name="from"
            onChange={handleInput}
            value={informations.from}
            className="w-full rounded border-4 border-neutral-100 bg-white p-3 text-sm text-primary-700 outline-none transition-colors duration-200 focus:border-secondary-700"
            placeholder="jean_de-florette@gmail.com"
          />
          {'from' in formErrors && (
            <p className="information_error_message">{formErrors.from}</p>
          )}
        </div>

        <div className="mx-auto mb-4 flex w-full max-w-2xl flex-col">
          <label htmlFor="subject" className="mb-1 text-left text-lg text-secondary-700 md:text-xl">
            Sujet
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            onChange={handleInput}
            value={informations.subject}
            className="w-full rounded border-4 border-neutral-100 bg-white p-3 text-sm text-primary-700 outline-none transition-colors duration-200 focus:border-secondary-700"
            placeholder="Collaboration"
          />
        </div>

        <div className="mx-auto mb-2 flex w-full max-w-2xl flex-col">
          <label htmlFor="message" className="mb-1 text-left text-lg text-secondary-700 md:text-xl">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            onChange={handleInput}
            placeholder="Votre message ..."
            value={informations.message}
            className="min-h-[160px] w-full rounded border-4 border-transparent bg-white p-3 text-sm text-primary-700 outline-none transition-colors duration-200 focus:border-secondary-700 md:min-h-[250px]"
          />
          {'message' in formErrors && (
            <p className="information_error_message">{formErrors.message}</p>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="h-14 rounded border border-secondary-700 bg-primary-700 px-6 text-sm font-bold uppercase tracking-[0.2em] text-secondary-700 transition-all duration-300 hover:border-neutral-200 hover:bg-secondary-700 hover:text-primary-700"
            onClick={handleSubmit}
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;

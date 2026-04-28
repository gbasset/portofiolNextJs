import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 60,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 40,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const projectCardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

function ProjectCard({ project, index }) {
  return (
    <motion.article
      variants={projectCardVariants}
      className="group relative overflow-hidden rounded-2xl border border-primary-200/10 bg-gradient-to-br from-primary-700/40 via-primary-700/20 to-transparent p-5 sm:p-6 transition-all duration-300 hover:border-secondary-700/40 hover:shadow-[0_8px_32px_rgba(235,184,118,0.15)]"
    >
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-secondary-700/5 blur-3xl transition-all duration-500 group-hover:bg-secondary-700/10" />
      
      <header className="relative mb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-display text-lg font-bold text-primary-200 sm:text-xl">
              {project.title}
            </h4>
            <p className="mt-1 text-xs font-medium text-secondary-700 sm:text-sm">
              {project.company} • {project.period}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-secondary-700/15 px-3 py-1 text-xs font-semibold text-secondary-700">
            #{index + 1}
          </span>
        </div>
      </header>

      <p className="relative mb-5 text-sm leading-relaxed text-primary-200/80 sm:text-base">
        {project.context}
      </p>

      <div className="relative grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <h5 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
            Défis
          </h5>
          <ul className="space-y-1.5">
            {project.challenges.map((challenge, i) => (
              <li
                key={i}
                className="text-xs leading-snug text-primary-200/70 sm:text-sm"
              >
                {challenge}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h5 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
            Solutions
          </h5>
          <ul className="space-y-1.5">
            {project.solutions.map((solution, i) => (
              <li
                key={i}
                className="text-xs leading-snug text-primary-200/70 sm:text-sm"
              >
                {solution}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h5 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
            Résultats
          </h5>
          <ul className="space-y-1.5">
            {project.results.map((result, i) => (
              <li
                key={i}
                className="text-xs leading-snug text-primary-200/70 sm:text-sm"
              >
                {result}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="relative mt-5 flex flex-wrap gap-2 border-t border-primary-200/10 pt-4">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-full border border-secondary-700/30 bg-secondary-700/10 px-2.5 py-1 text-2xs font-semibold text-secondary-100 sm:text-xs"
          >
            {tech}
          </span>
        ))}
      </footer>
    </motion.article>
  );
}

export default function SkillModal({ skill, isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && skill && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm px-4 py-8 sm:py-12"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-4xl rounded-3xl border border-primary-200/15 bg-gradient-to-br from-[rgba(31,34,53,0.98)] via-[rgba(41,44,66,0.95)] to-[rgba(31,34,53,0.98)] shadow-[0_32px_100px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-secondary-700/10 blur-[100px]" />
            <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary-400/10 blur-[100px]" />

            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary-200/20 bg-primary-700/50 text-primary-200/70 transition-all hover:border-secondary-700/50 hover:bg-secondary-700/20 hover:text-primary-200 sm:right-6 sm:top-6"
              aria-label="Fermer la modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="relative p-6 sm:p-8 lg:p-10">
              <motion.header
                variants={contentVariants}
                className="mb-8 flex items-center gap-4 sm:gap-6"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary-200/10 bg-primary-700/30 p-3 shadow-lg sm:h-20 sm:w-20 sm:p-4">
                  <img
                    src={skill.image}
                    alt=""
                    className="h-full w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                  />
                </div>
                <div>
                  <h3
                    id="modal-title"
                    className="font-display text-2xl font-bold text-primary-200 sm:text-3xl lg:text-4xl"
                  >
                    {skill.language}
                  </h3>
                  <p className="mt-1 text-sm text-primary-200/70 sm:text-base">
                    {skill.description}
                  </p>
                </div>
              </motion.header>

              <motion.div variants={contentVariants} className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {skill.technos.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-full border border-secondary-700/35 bg-[rgba(241,231,220,0.95)] px-3 py-1.5 text-xs font-semibold text-primary-700 sm:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={contentVariants}>
                <h4 className="mb-5 flex items-center gap-3 font-display text-lg font-bold text-secondary-700 sm:text-xl">
                  <span className="inline-block h-px flex-1 bg-gradient-to-r from-secondary-700/50 to-transparent" />
                  <span>Projets réalisés</span>
                  <span className="inline-block h-px flex-1 bg-gradient-to-l from-secondary-700/50 to-transparent" />
                </h4>

                <div className="space-y-5">
                  {skill.projects.map((project, index) => (
                    <ProjectCard
                      key={`${project.title}-${index}`}
                      project={project}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

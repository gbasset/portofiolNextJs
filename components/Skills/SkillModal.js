import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

function ProjectCard({ project, index, isVisible }) {
  const delayMs = 350 + index * 150;
  
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-primary-200/10 bg-gradient-to-br from-primary-700/40 via-primary-700/20 to-transparent p-5 sm:p-6 hover:border-secondary-700/40 hover:shadow-[0_8px_32px_rgba(235,184,118,0.15)] ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-5'
      }`}
      style={{
        transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms, box-shadow 300ms',
        transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
      }}
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
    </article>
  );
}

export default function SkillModal({ skill, isOpen, onClose }) {
  const modalRef = useRef(null);
  const scrollbarWidthRef = useRef(0);

  const lockScroll = useCallback(() => {
    scrollbarWidthRef.current = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidthRef.current > 0) {
      document.body.style.paddingRight = `${scrollbarWidthRef.current}px`;
    }
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      lockScroll();
      document.addEventListener('keydown', handleEscape);
    } else {
      unlockScroll();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, lockScroll, unlockScroll]);

  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, [unlockScroll]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto px-4 py-8 sm:py-12 ${
        isOpen
          ? 'visible bg-black/60 backdrop-blur-sm opacity-100'
          : 'invisible bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
      style={{
        transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), background-color 500ms cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 500ms cubic-bezier(0.16, 1, 0.3, 1), visibility 0ms linear ' + (isOpen ? '0ms' : '500ms'),
      }}
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-4xl rounded-3xl border border-primary-200/15 bg-gradient-to-br from-[rgba(31,34,53,0.98)] via-[rgba(41,44,66,0.95)] to-[rgba(31,34,53,0.98)] shadow-[0_32px_100px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-[0.97] translate-y-4'
        }`}
        style={{
          transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-secondary-700/10 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary-400/10 blur-[100px]" />

        <button
          onClick={onClose}
          className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary-200/20 bg-primary-700/50 text-primary-200/70 hover:border-secondary-700/50 hover:bg-secondary-700/20 hover:text-primary-200 hover:rotate-90 sm:right-6 sm:top-6 ${
            isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{
            transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1), background-color 300ms, border-color 300ms',
            transitionDelay: isOpen ? '150ms' : '0ms',
          }}
          aria-label="Fermer la modal"
          tabIndex={isOpen ? 0 : -1}
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

        {skill && (
          <div className="relative p-6 sm:p-8 lg:p-10">
            <header className="mb-8 flex items-center gap-4 sm:gap-6">
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
            </header>

            <div className="mb-6">
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
            </div>

            {/* Projects section with smooth animations */}
            <div
              className={`${
                isOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
              style={{
                transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: isOpen ? '200ms' : '0ms',
              }}
            >
              <h4 className="mb-5 flex items-center gap-3 font-display text-lg font-bold text-secondary-700 sm:text-xl">
                <span
                  className={`inline-block h-px flex-1 bg-gradient-to-r from-secondary-700/50 to-transparent origin-left ${
                    isOpen ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  style={{
                    transition: 'transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: isOpen ? '280ms' : '0ms',
                  }}
                />
                <span>Projets réalisés</span>
                <span
                  className={`inline-block h-px flex-1 bg-gradient-to-l from-secondary-700/50 to-transparent origin-right ${
                    isOpen ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  style={{
                    transition: 'transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: isOpen ? '280ms' : '0ms',
                  }}
                />
              </h4>

              {/* Project cards */}
              <div className="space-y-5">
                {skill.projects.map((project, index) => (
                  <ProjectCard
                    key={`${project.title}-${index}`}
                    project={project}
                    index={index}
                    isVisible={isOpen}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

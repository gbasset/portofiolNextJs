import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BsArrowRight } from 'react-icons/bs';
import { cardEase, gridVariants, ShowcaseInteractiveCard } from './cardMotion';
import SkillModal from '../Skills/SkillModal';

const skillCardClassName =
  'group origin-center flex h-full min-h-[300px] cursor-pointer flex-col rounded-2xl border border-secondary-700/35 bg-secondary-700/[0.07] px-5 py-6 shadow-inner-soft transition-all duration-300 hover:border-secondary-700/60 hover:bg-secondary-700/[0.12] hover:shadow-[0_8px_32px_rgba(235,184,118,0.12)] sm:min-h-[320px] sm:px-6 sm:py-7';

function formatRealisationCount(count) {
  if (count <= 1) {
    return `${count} réalisation`;
  }
  return `${count} réalisations`;
}

const showcaseVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: cardEase },
  },
};

export default function SkillsShowcase({ items }) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const closeTimeoutRef = useRef(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.08,
    rootMargin: '0px 0px -80px 0px',
  });

  useEffect(() => {
    if (inView) {
      setHasAnimatedIn(true);
    }
  }, [inView]);

  const handleSkillClick = useCallback((skill) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setSelectedSkill(skill);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setSelectedSkill(null);
      closeTimeoutRef.current = null;
    }, 200);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <section
        className="mb-16 w-[92%] max-w-5xl px-3 sm:px-4 md:px-5 mx-auto"
        aria-labelledby="skills-heading"
      >
        <h2
          id="skills-heading"
          className="pb-6 pt-4 text-center font-sans text-[clamp(1.75rem,4vw,3rem)] font-semibold text-primary-200"
        >
          Compétences techniques
        </h2>
        <motion.div
          ref={ref}
          className="relative overflow-hidden rounded-[24px] border border-primary-200/20 bg-gradient-to-br from-[rgba(31,34,53,0.98)] via-[rgba(51,53,86,0.55)] to-[rgba(31,34,53,0.92)] px-[clamp(1.25rem,3vw,2.75rem)] py-[clamp(1.25rem,3vw,2.75rem)] shadow-[0_28px_90px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(213,220,249,0.08)] sm:rounded-[24px]"
          variants={showcaseVariants}
          initial="hidden"
          animate={hasAnimatedIn ? 'visible' : 'hidden'}
          transition={{ duration: 0.55, ease: cardEase }}
        >
          <div
            className="pointer-events-none absolute -right-[20%] -top-[40%] h-[90%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(235,184,118,0.12)_0%,transparent_70%)]"
            aria-hidden
          />
          <div className="relative z-[1]">
            <p className="mx-auto mb-10 max-w-xl text-center font-sans text-[clamp(0.95rem,2vw,1.1rem)] leading-relaxed text-primary-200/90">
              Mon quotidien en développement web, du navigateur au serveur, en passant par la persistance
              des données, les frameworks et les librairies.{' '}
              <span className="font-medium text-secondary-700">
                Cliquez pour découvrir les réalisations associées.
              </span>
            </p>
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
              variants={gridVariants}
              initial="hidden"
              animate={hasAnimatedIn ? 'visible' : 'hidden'}
            >
              {items.map((skill) => {
                const realisationCount = skill.projects?.length ?? 0;

                return (
                  <ShowcaseInteractiveCard
                    key={skill.language}
                    className={skillCardClassName}
                    onClick={() => handleSkillClick(skill)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSkillClick(skill);
                      }
                    }}
                    aria-label={`Voir les réalisations ${skill.language}`}
                  >
                    <header className="flex w-full shrink-0 items-center gap-4 border-b border-primary-200/10 pb-5">
                      <img
                        className="h-12 w-12 shrink-0 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110"
                        src={skill.image}
                        alt=""
                        width={48}
                        height={48}
                      />
                      <h3 className="min-w-0 flex-1 font-sans text-base font-bold leading-snug text-primary-200 line-clamp-2 sm:text-lg">
                        {skill.language}
                      </h3>
                    </header>
                    <div
                      className="flex min-h-0 flex-1 flex-wrap content-start justify-center gap-x-2.5 gap-y-2.5 py-5 sm:py-6"
                      role="list"
                    >
                      {skill.technos.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-full border border-secondary-700/35 bg-[rgba(241,231,220,0.95)] px-3 py-2 font-sans text-2xs font-semibold leading-none text-primary-700 sm:text-xs"
                          role="listitem"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto shrink-0 border-t border-primary-200/10 pt-5 pb-1 text-center">
                      <p className="mb-3 text-2xs text-primary-200/60 sm:text-xs">
                        {formatRealisationCount(realisationCount)}
                      </p>
                      <span className="inline-flex min-h-[44px] items-center justify-center gap-2 px-3 text-xs font-medium text-secondary-700 sm:text-sm">
                        En savoir plus
                        <BsArrowRight
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                    </div>
                  </ShowcaseInteractiveCard>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <SkillModal
        skill={selectedSkill}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cardEase, gridVariants, ShowcaseInteractiveCard } from './cardMotion';

export default function SkillsShowcase({ items }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.08,
    rootMargin: '0px 0px -80px 0px',
  });

  return (
    <section
      className="mb-16 w-[92%] max-w-5xl px-3 sm:px-4 md:px-5 mx-auto"
      aria-labelledby="skills-heading"
    >
      <h2
        id="skills-heading"
        className="py-4 text-center font-sans text-[clamp(1.75rem,4vw,3rem)] font-semibold text-primary-200"
      >
        Compétences techniques
      </h2>
      <motion.div
        ref={ref}
        className="relative overflow-hidden rounded-[24px] border border-primary-200/20 bg-gradient-to-br from-[rgba(31,34,53,0.98)] via-[rgba(51,53,86,0.55)] to-[rgba(31,34,53,0.92)] px-[clamp(1.25rem,3vw,2.75rem)] py-[clamp(1.25rem,3vw,2.75rem)] shadow-[0_28px_90px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(213,220,249,0.08)] sm:rounded-[24px]"
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
        transition={{ duration: 0.55, ease: cardEase }}
      >
        <div
          className="pointer-events-none absolute -right-[20%] -top-[40%] h-[90%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(235,184,118,0.12)_0%,transparent_70%)]"
          aria-hidden
        />
        <div className="relative z-[1]">
          <p className="mx-auto mb-8 max-w-xl text-center font-sans text-[clamp(0.95rem,2vw,1.1rem)] leading-relaxed text-primary-200/90">
            Mon quotidien en développement web, du navigateur au serveur, en passant par la persistance
            des données, les frameworks et les librairies.
          </p>
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={gridVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {items.map((language) => (
              <ShowcaseInteractiveCard
                key={language.language}
                className="origin-center flex h-full min-h-[280px] flex-col rounded-2xl border border-secondary-700/35 bg-secondary-700/[0.07] px-4 py-5 shadow-inner-soft sm:min-h-[300px] sm:px-5"
              >
                <header className="flex h-20 w-full shrink-0 items-center gap-3 border-b border-primary-200/10">
                  <img
                    className="h-12 w-12 shrink-0 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                    src={language.image}
                    alt=""
                    width={48}
                    height={48}
                  />
                  <h3 className="min-w-0 flex-1 font-sans text-base font-bold leading-snug text-primary-200 sm:text-lg line-clamp-2">
                    {language.language}
                  </h3>
                </header>
                <div
                  className="flex min-h-0 flex-1 flex-wrap content-start justify-center gap-x-2 gap-y-2 pt-4"
                  role="list"
                >
                  {language.technos.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full border border-secondary-700/35 bg-[rgba(241,231,220,0.95)] px-2.5 py-1.5 font-sans text-2xs font-semibold leading-none text-primary-700 sm:px-3 sm:text-xs"
                      role="listitem"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </ShowcaseInteractiveCard>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

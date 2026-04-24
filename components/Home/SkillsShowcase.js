import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

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
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="pointer-events-none absolute -right-[20%] -top-[40%] h-[90%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(235,184,118,0.12)_0%,transparent_70%)]"
          aria-hidden
        />
        <div className="relative z-[1]">
          <p className="mx-auto mb-8 max-w-xl text-center font-sans text-[clamp(0.95rem,2vw,1.1rem)] leading-relaxed text-primary-200/90">
            Mon quotidien en développement web, du navigateur au serveur, en passant par la persistance
            des données, en passant par les frameworks et les librairies.
          </p>
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={gridVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {items.map((language) => (
              <motion.article
                key={language.language}
                className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 rounded-2xl border border-secondary-700/35 bg-secondary-700/[0.07] px-5 py-6 text-center shadow-inner-soft sm:min-h-[300px]"
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.22, ease: 'easeOut' },
                }}
              >
                <div className="flex shrink-0 items-center justify-center gap-3">
                  <img
                    className="h-12 w-12 shrink-0 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                    src={language.image}
                    alt=""
                    width={48}
                    height={48}
                  />
                  <h3 className="text-left font-sans text-[clamp(1.05rem,2.5vw,1.35rem)] font-bold leading-tight text-primary-200">
                    {language.language}
                  </h3>
                </div>
                <div
                  className="flex max-w-full flex-wrap justify-center gap-2"
                  role="list"
                >
                  {language.technos.map((t) => (
                    <span
                      key={t}
                      className="inline-block rounded-full border border-secondary-700/35 bg-[rgba(241,231,220,0.95)] px-3 py-1.5 font-sans text-2xs font-semibold leading-snug text-primary-700 sm:text-xs"
                      role="listitem"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

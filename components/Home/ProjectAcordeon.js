import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import Btn from '../UI/Btn';
import { cardEase, gridVariants, ShowcaseInteractiveCard } from './cardMotion';

export default function ProjectAcordeon({ mainProjects }) {
  const router = useRouter();
  const [projects, setProjects] = useState(mainProjects);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.08,
    rootMargin: '0px 0px -80px 0px',
  });

  useEffect(() => {
    setProjects(mainProjects);
  }, [mainProjects]);

  if (!projects?.length) {
    return null;
  }

  function goToLink(projectId) {
    router.push(`projects/${projectId}`);
  }

  return (
    <section
      className="mb-16 w-[92%] max-w-5xl px-3 sm:px-4 md:px-5 mx-auto"
      aria-labelledby="projects-selection-heading"
    >
      <h2
        id="projects-selection-heading"
        className="py-4 text-center font-sans text-[clamp(1.75rem,4vw,3rem)] font-semibold text-primary-200"
      >
        Sélection de projets
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
            Quelques réalisations de projets.
          </p>
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            variants={gridVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {projects.map((img) => (
              <ShowcaseInteractiveCard
                key={img._id}
                className="origin-center flex h-full min-h-[280px] flex-col rounded-2xl border border-secondary-700/35 bg-secondary-700/[0.07] px-4 py-5 shadow-inner-soft sm:min-h-[300px] sm:px-5"
              >
                <header className="flex h-20 w-full shrink-0 items-center gap-3 border-b border-primary-200/10">
                  <h3 className="min-w-0 flex-1 font-sans text-base font-bold leading-snug text-primary-200 sm:text-lg line-clamp-2">
                    {img.name}
                  </h3>
                </header>
                <div className="flex min-h-0 flex-1 flex-col gap-3 pt-4">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-primary-200/10 bg-primary-700/40">
                    <img
                      src={img.imageHome.url}
                      alt={img.name}
                      className="h-full w-full object-cover"
                      width={1280}
                      height={720}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="line-clamp-4 text-left text-sm leading-relaxed text-primary-200/88 sm:text-base">
                    {img.description}
                  </p>
                  <div className="mt-auto flex justify-center pt-1 sm:justify-start">
                    <Btn
                      onClickFunction={() => goToLink(img._id)}
                      style=""
                      color="secondary"
                      className="!border-transparent !bg-[#ebb876] !text-[#1f2235] hover:!bg-[#f3c98f] focus:!bg-[#f3c98f] font-medium"
                      message="Découvrir le projet"
                    />
                  </div>
                </div>
              </ShowcaseInteractiveCard>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

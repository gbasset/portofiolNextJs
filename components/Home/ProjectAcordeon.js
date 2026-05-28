import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import { BsArrowRight } from 'react-icons/bs';
import { cardEase, gridVariants, ShowcaseInteractiveCard } from './cardMotion';

const projectCardClassName =
  'group origin-center flex h-full min-h-[320px] cursor-pointer flex-col rounded-2xl border border-secondary-700/35 bg-secondary-700/[0.07] px-5 py-6 shadow-inner-soft transition-all duration-300 hover:border-secondary-700/60 hover:bg-secondary-700/[0.12] hover:shadow-[0_8px_32px_rgba(235,184,118,0.12)] sm:min-h-[340px] sm:px-6 sm:py-7';

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

  const goToLink = (projectId) => {
    router.push(`projects/${projectId}`);
  };

  return (
    <section
      className="mx-auto mb-16 w-[92%] max-w-5xl px-3 sm:px-4 md:px-5"
      aria-labelledby="projects-selection-heading"
    >
      <h2
        id="projects-selection-heading"
        className="pb-6 pt-4 text-center font-sans text-[clamp(1.75rem,4vw,3rem)] font-semibold text-primary-200"
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
          <p className="mx-auto mb-10 max-w-xl text-center font-sans text-[clamp(0.95rem,2vw,1.1rem)] leading-relaxed text-primary-200/90">
            Quelques réalisations mises en avant —{' '}
            <span className="font-medium text-secondary-700">
              cliquez sur une carte pour voir le détail.
            </span>
          </p>
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7"
            variants={gridVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {projects.map((project) => (
              <ShowcaseInteractiveCard
                key={project._id}
                className={projectCardClassName}
                onClick={() => goToLink(project._id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToLink(project._id);
                  }
                }}
                aria-label={`Découvrir ${project.name}`}
              >
                <header className="flex w-full shrink-0 items-center border-b border-primary-200/10 pb-5">
                  <h3 className="min-w-0 flex-1 text-center font-sans text-base font-bold leading-snug text-primary-200 line-clamp-2 sm:text-lg">
                    {project.name}
                  </h3>
                </header>

                <div className="flex min-h-0 flex-1 flex-col gap-5 py-5 sm:py-6">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-primary-200/10 bg-primary-700/40">
                    <Image
                      src={project.imageHome.url}
                      alt={project.name}
                      width={640}
                      height={360}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <p className="line-clamp-4 text-center text-sm leading-relaxed text-primary-200/88 sm:text-base">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto shrink-0 border-t border-primary-200/10 pt-5 pb-1 text-center">
                  <span className="inline-flex min-h-[44px] items-center justify-center gap-2 px-3 text-xs font-medium text-secondary-700 sm:text-sm">
                    Découvrir la fiche
                    <BsArrowRight
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </ShowcaseInteractiveCard>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

import React, { useRef, useState, useEffect, useCallback, createRef } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../../data/projectsData';
import ProjectSection from './ProjectSection';

export default function ProjectsFullPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  // One ref per project section — used both for parallax target and intersection observer
  const sectionRefs = useRef(projectsData.map(() => createRef<HTMLElement>()));

  // Apply scroll-snap on the document root while this component is mounted
  useEffect(() => {
    const html = document.documentElement;
    const prevScrollSnap = html.style.scrollSnapType;
    const prevScrollBehavior = html.style.scrollBehavior;

    html.style.scrollSnapType = 'y mandatory';
    html.style.scrollBehavior = 'smooth';

    return () => {
      html.style.scrollSnapType = prevScrollSnap;
      html.style.scrollBehavior = prevScrollBehavior;
    };
  }, []);

  // IntersectionObserver to track which section is in view for the dots
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, i) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.5 },
      );

      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const scrollToSection = useCallback((index: number) => {
    sectionRefs.current[index].current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="relative">
      {/* Sections */}
      {projectsData.map((project, i) => (
        <ProjectSection
          key={project.id}
          project={project}
          index={i}
          sectionRef={sectionRefs.current[i]}
        />
      ))}

      {/* Navigation dots — fixed on the right side of the viewport */}
      <nav
        className="fixed right-6 top-1/2 z-50 -translate-y-1/2 flex flex-col gap-3"
        aria-label="Navigation entre les projets"
      >
        {projectsData.map((project, i) => (
          <button
            key={project.id}
            onClick={() => scrollToSection(i)}
            aria-label={`Aller au projet ${project.name}`}
            aria-current={i === activeIndex ? 'true' : undefined}
            className="group relative flex items-center justify-end"
            type="button"
          >
            {/* Tooltip label on hover */}
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-primary-200/15 bg-primary-700/90 px-3 py-1.5 text-2xs font-semibold uppercase tracking-[0.15em] text-primary-200/80 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
              {project.name}
            </span>

            {/* Dot */}
            <motion.span
              animate={i === activeIndex
                ? { scale: 1, backgroundColor: '#EBB876', opacity: 1 }
                : { scale: 0.65, backgroundColor: 'rgba(213,220,249,0.35)', opacity: 0.7 }
              }
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="block h-2.5 w-2.5 rounded-full ring-2 ring-transparent transition-all duration-200 group-hover:ring-secondary-700/50"
              style={{ backgroundColor: 'rgba(213,220,249,0.35)' }}
            />
          </button>
        ))}
      </nav>
    </div>
  );
}

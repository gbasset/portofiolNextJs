import React, { useCallback } from 'react'
import { useRouter } from 'next/router';
import { BsFillEyeFill } from 'react-icons/bs'
export default function Project({ project }) {
    const router = useRouter();
    const goToLink = useCallback(() => {
        const fullPath = `projects/${project._id}`
        router.push(fullPath)
    }, [project._id, router])

    return (
        <article
            className="group relative min-w-[240px] max-w-[240px] flex-shrink-0 overflow-hidden rounded-ds-lg border border-primary-400/30 bg-primary-600/50 shadow-glow-primary transition-all duration-300 hover:-translate-y-1 hover:border-secondary-700/70 hover:shadow-glow-amber md:min-w-[280px] md:max-w-[280px]"
            role="button"
            tabIndex={0}
            aria-label={`Voir le projet ${project.name}`}
            onClick={goToLink}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    goToLink();
                }
            }}
        >
            <div className="relative h-40 w-full overflow-hidden md:h-44">
                <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={project.imageHome.url}
                    alt={`Capture du projet ${project.name}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-700 via-primary-700/35 to-transparent" />
            </div>
            <div className="space-y-4 p-4">
                <h3 className="line-clamp-1 text-lg font-semibold tracking-wide text-surface-cream">{project.name}</h3>
                <ul className="flex flex-wrap gap-2">
                    {project.tags?.slice(0, 3).map((tag) => (
                        <li key={`${project._id}-${tag}`} className="rounded-full border border-secondary-700/45 bg-secondary-700/15 px-2 py-1 text-2xs uppercase tracking-[0.18em] text-secondary-100">
                            {tag}
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        goToLink();
                    }}
                    className="inline-flex items-center gap-2 rounded-ds-md border border-secondary-700/70 bg-secondary-700/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 transition-colors duration-300 hover:bg-secondary-100"
                >
                    <BsFillEyeFill />
                    Voir
                </button>
            </div>
        </article>
    )
}

import React from 'react';

/**
 * @param {object} props
 * @param {() => void} props.onProjectsClick
 * @param {string} [props.preamble] — phrase optionnelle au-dessus du bloc principal
 */
export default function HeroIntro({ onProjectsClick, preamble }) {
  return (
    <div className="mx-auto mt-10 w-full max-w-[36rem] px-0 sm:max-w-[40rem] md:mt-12">
      <blockquote className="relative rounded-r-2xl border-l-[3px] border-secondary-700/55 bg-primary-700/25 py-6 pl-6 pr-5 shadow-inner-soft sm:py-7 sm:pl-8 sm:pr-7 md:rounded-r-3xl md:pl-10">
        {preamble ? (
          <p className="mb-5 border-b border-primary-200/10 pb-5 font-sans text-sm not-italic leading-relaxed text-primary-200/85 sm:text-base">
            <span className="font-display text-2xl leading-none text-secondary-700/50" aria-hidden>
              “
            </span>
            <span className="pl-1">{preamble}</span>
          </p>
        ) : null}
        <p className="font-sans text-base italic leading-[1.75] tracking-[0.01em] text-accent sm:text-[1.0625rem] sm:leading-[1.8] text-pretty">
          Passionné par l&apos;innovation technique, l&apos;autonomie et la résolution de
          problèmes complexes en équipe.
        </p>
        <p className="mt-5 font-sans text-base italic leading-[1.75] tracking-[0.01em] text-accent sm:text-[1.0625rem] sm:leading-[1.8] text-pretty">
          Je vous invite à parcourir mes réalisations{' '}
          <button
            type="button"
            className="inline cursor-pointer rounded-sm border-0 bg-transparent px-1 py-0.5 [font:inherit] text-surface-snow underline decoration-secondary-700/60 underline-offset-4 transition-colors hover:text-accent-bright hover:decoration-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-700"
            onClick={onProjectsClick}
          >
            ici
          </button>{' '}
          et à me faire vos retours si vous le souhaitez. Bonne visite !
        </p>
      </blockquote>
    </div>
  );
}

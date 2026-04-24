import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease },
  },
};

const lineGrow = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.75, ease, delay: 0.2 },
  },
};

export default function HeroRoleTitle() {
  return (
    <motion.h1
      className="mx-auto mt-6 max-w-4xl px-1 text-center font-sans not-italic"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.span
        variants={rise}
        className="block text-[clamp(1.65rem,4.8vw,2.85rem)] font-semibold leading-[1.15] tracking-tight text-primary-200 md:text-[clamp(1.85rem,4.2vw,3.35rem)]"
      >
        Développeur front-end
      </motion.span>

      <motion.div
        variants={rise}
        className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:mt-5"
      >
        <span className="inline-flex items-center rounded-full border border-secondary-700/45 bg-secondary-700/[0.12] px-4 py-1.5 text-[clamp(1rem,2.8vw,1.35rem)] font-semibold text-secondary-100 shadow-glow-amber">
          React
        </span>
        <span className="select-none font-light text-primary-200/35" aria-hidden>
          /
        </span>
        <span className="inline-flex items-center rounded-full border border-secondary-700/45 bg-secondary-700/[0.12] px-4 py-1.5 text-[clamp(1rem,2.8vw,1.35rem)] font-semibold text-secondary-100 shadow-glow-amber">
          Node.js
        </span>
      </motion.div>

      <motion.div
        variants={lineGrow}
        className="mx-auto mt-5 h-px max-w-[min(12rem,55vw)] origin-center rounded-full bg-gradient-to-r from-transparent via-secondary-700/90 to-transparent md:mt-6"
        aria-hidden
      />
    </motion.h1>
  );
}

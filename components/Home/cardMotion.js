import React from 'react';
import { motion } from 'framer-motion';

export const cardEase = [0.22, 1, 0.36, 1];

export const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

/** Entrée seulement — pilotée par le parent (stagger). */
export const cardEntryVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: cardEase },
  },
};

const hoverTween = { duration: 0.35, ease: cardEase, delay: 0 };

export function ShowcaseInteractiveCard({ 
  className, 
  children, 
  onClick, 
  role, 
  tabIndex, 
  onKeyDown, 
  'aria-label': ariaLabel,
  ...rest 
}) {
  return (
    <motion.article variants={cardEntryVariants} className="h-full origin-center">
      <motion.div
        className={className}
        onClick={onClick}
        role={role}
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        aria-label={ariaLabel}
        whileHover={{
          y: -10,
          scale: 1.03,
          transition: hoverTween,
        }}
        whileTap={{
          scale: 0.99,
          transition: { duration: 0.15, ease: cardEase, delay: 0 },
        }}
        transition={hoverTween}
        {...rest}
      >
        {children}
      </motion.div>
    </motion.article>
  );
}

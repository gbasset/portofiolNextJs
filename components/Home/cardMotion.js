import React from 'react';
import { motion } from 'framer-motion';

/** Courbe partagée (entrée grille + hover cartes) */
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

/**
 * Carte vitrine : entrée sur la couche externe (variants), survol sur la couche interne.
 * À l’entrée souris → lift + scale ; à la sortie → retour animé au repos (même ease / durée).
 */
export function ShowcaseInteractiveCard({ className, children }) {
  return (
    <motion.article variants={cardEntryVariants} className="h-full origin-center">
      <motion.div
        className={className}
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
      >
        {children}
      </motion.div>
    </motion.article>
  );
}

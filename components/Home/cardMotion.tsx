import React from 'react';
import type { ReactNode, MouseEvent, KeyboardEvent } from 'react';
import { motion, Variants } from 'framer-motion';

export const cardEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

export const cardEntryVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: cardEase },
  },
};

const hoverTween = { duration: 0.35, ease: cardEase, delay: 0 };

interface ShowcaseInteractiveCardProps {
  className?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  role?: string;
  tabIndex?: number;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  'aria-label'?: string;
}

export function ShowcaseInteractiveCard({
  className,
  children,
  onClick,
  role,
  tabIndex,
  onKeyDown,
  'aria-label': ariaLabel,
}: ShowcaseInteractiveCardProps) {
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
      >
        {children}
      </motion.div>
    </motion.article>
  );
}

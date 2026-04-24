import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './SkillsShowcase.module.css';

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
    <section className={styles.wrapper} aria-labelledby="skills-heading">
      <h2 id="skills-heading" className={styles.sectionTitle}>
        Compétences techniques
      </h2>
      <motion.div
        ref={ref}
        className={styles.showcase}
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.showcaseInner}>
          <p className={styles.lead}>
            Un aperçu structuré des technologies et thématiques sur lesquelles je
            travaille : du navigateur au serveur, en passant par la persistance
            des données.
          </p>
          <motion.div
            className={styles.grid}
            variants={gridVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {items.map((language) => (
              <motion.article
                key={language.language}
                className={styles.card}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.22, ease: 'easeOut' },
                }}
              >
                <div className={styles.cardHeader}>
                  <img
                    className={styles.logo}
                    src={language.image}
                    alt=""
                    width={48}
                    height={48}
                  />
                  <h3 className={styles.cardTitle}>{language.language}</h3>
                </div>
                <div className={styles.chips} role="list">
                  {language.technos.map((t) => (
                    <span key={t} className={styles.chip} role="listitem">
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

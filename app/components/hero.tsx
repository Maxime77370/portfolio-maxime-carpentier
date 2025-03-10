"use client";

import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import AnimatedBackground from './animated-background';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Image from "next/legacy/image";

// Images ou formes à afficher
const shapes = [
  '/shape/shape-1.webp',
  '/shape/shape-2.webp',
  '/shape/shape-3.webp',
];

// Variants pour la transition directionnelle du texte
const cardTextVariants = {
  initial: (direction: string) => ({
    opacity: 0,
    x: direction === 'next' ? 100 : -100,
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: string) => ({
    opacity: 0,
    x: direction === 'next' ? -100 : 100,
  }),
};

// Variants pour la transition (fade/scale) de l'image
const cardImageVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
};

// Composant qui applique un effet "typewriter" (écriture progressive)
function TypewriterText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const container = {
    animate: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
    exit: { opacity: 0 },
  };

  const child = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={child}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Composant pour l'image en rotation
function ShapeImage({
  shapeIndex,
  direction,
  shapeControls,
}: {
  shapeIndex: number;
  direction: 'prev' | 'next';
  shapeControls: ReturnType<typeof useAnimation>;
}) {
  return (
    <motion.div
      className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={{ top: 'calc(50% + 1rem)' }}
      animate={shapeControls}
    >
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={shapeIndex}
          variants={cardImageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <div className="w-[250px] sm:w-[350px] md:w-[550px] lg:w-[650px] xl:w-[750px] h-[250px] sm:h-[350px] md:h-[550px] lg:h-[650px] xl:h-[750px] relative">
            <Image
              src={shapes[shapeIndex]}
              alt="Shape"
              width={550}
              height={550}
              layout="responsive"
              className="opacity-60"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// Composant pour le titre animé
function AnimatedTitle({
  shapeIndex,
  direction,
  t,
}: {
  shapeIndex: number;
  direction: 'prev' | 'next';
  t: (key: string) => string;
}) {
  return (
    <AnimatePresence custom={direction} mode="wait">
      <motion.div
        key={`title-${shapeIndex}`}
        custom={direction}
        variants={cardTextVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <TypewriterText
          text={t(`hero.${shapeIndex}.title`)}
          className="reak-words hyphens-none text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-wide leading-tight h-15 sm:h-20 md:h-34"
        />
      </motion.div>
    </AnimatePresence>
  );
}

// Composant pour le sous-titre animé
function AnimatedSubtitle({
  shapeIndex,
  direction,
  t,
}: {
  shapeIndex: number;
  direction: 'prev' | 'next';
  t: (key: string) => string;
}) {
  return (
    <AnimatePresence custom={direction} mode="wait">
      <motion.div
        key={`subtitle-${shapeIndex}`}
        custom={direction}
        variants={cardTextVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <TypewriterText
          text={t(`hero.${shapeIndex}.subtitle`)}
          className="whitespace-normal hyphens-none mt-4 text-sm sm:text-lg md:text-xl tracking-wide leading-relaxed"
          delay={0.2}
        />
      </motion.div>
    </AnimatePresence>
  );
}

// Composant pour les flèches de navigation
function NavigationArrows({
  changeShape,
}: {
  changeShape: (direction: 'prev' | 'next') => void;
}) {
  return (
    <div className="absolute inset-y-0 pt-16 left-0 right-0 flex items-center justify-between px-5 z-20">
      <div className="cursor-pointer" onClick={() => changeShape('prev')}>
        <svg
          className="h-8 w-8 sm:h-10 sm:w-10 text-white hover:text-gray-300 transition"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
      <div className="cursor-pointer" onClick={() => changeShape('next')}>
        <svg
          className="h-8 w-8 sm:h-10 sm:w-10 text-white hover:text-gray-300 transition"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}

// Composant pour le bouton de scroll
function ScrollButton({ handleScroll }: { handleScroll: () => void }) {
  return (
    <motion.div
      className="absolute bottom-5 z-20 cursor-pointer flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      onClick={handleScroll}
    >
      <span className="text-white text-base sm:text-lg md:text-xl animate-bounce">
        Start
      </span>
      <motion.div
        className="h-1 bg-white mt-2"
        initial={{ width: 0 }}
        animate={{ width: '6rem' }}
        transition={{ delay: 1.5, duration: 1 }}
      />
    </motion.div>
  );
}

export default function Hero() {
  const t = useTranslations();
  const shapeControls = useAnimation();
  const [shapeIndex, setShapeIndex] = useState(0);
  const [direction, setDirection] = useState<'prev' | 'next'>('next');

  useEffect(() => {
    // Animation d'entrée et rotation continue de la forme
    const sequence = async () => {
      await shapeControls.start({
        rotate: 90,
        transition: { duration: 1, ease: 'easeInOut' },
      });
      shapeControls.start({
        rotate: [90, 450],
        transition: { duration: 20, ease: 'linear', repeat: Infinity },
      });
    };

    sequence();
  }, [shapeControls]);

  const handleScroll = () => {
    const presentationSection = document.getElementById('about');
    if (presentationSection) {
      presentationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const changeShape = (newDirection: 'prev' | 'next') => {
    setDirection(newDirection);
    setShapeIndex((prev) =>
      newDirection === 'next'
        ? (prev + 1) % shapes.length
        : (prev - 1 + shapes.length) % shapes.length
    );
  };

  return (
    <div className="relative min-h-[50vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      <AnimatedBackground
        fromColor="#1e3a8a"
        toColor="#4c1d95"
        ballColor="rgba(236, 72, 153,0.5)"
      />
      <ShapeImage
        shapeIndex={shapeIndex}
        direction={direction}
        shapeControls={shapeControls}
      />
      <div className="relative z-20 max-w-screen-md md:max-w-screen-lg px-4 text-center text-white w-[80%]">
        <AnimatedTitle shapeIndex={shapeIndex} direction={direction} t={t} />
        <AnimatedSubtitle shapeIndex={shapeIndex} direction={direction} t={t} />
      </div>
      <NavigationArrows changeShape={changeShape} />
      <ScrollButton handleScroll={handleScroll} />
    </div>
  );
}

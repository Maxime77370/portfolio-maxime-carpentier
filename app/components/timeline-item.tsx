import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  FaSearchPlus,
  FaProjectDiagram,
  FaBriefcase,
  FaSchool,
  FaGraduationCap,
} from 'react-icons/fa';
import { DictionaryItem } from './timeline-dict';

interface TimelineItemProps {
  item: DictionaryItem;
  index: number;
  offset: number;
  onSelect: (key: string) => void;
  totalCount: number;
  textChildren?: React.ReactNode;
}

// Icône selon le type
function getTypeIcon(type: 'project' | 'school' | 'job' | 'diploma') {
  switch (type) {
    case 'project':
      return <FaProjectDiagram size={18} />;
    case 'school':
      return <FaSchool size={18} />;
    case 'job':
      return <FaBriefcase size={18} />;
    case 'diploma':
      return <FaGraduationCap size={18} />;
    default:
      return <FaProjectDiagram size={18} />;
  }
}

// Couleur en hexa selon le type
function getTypeColor(type: 'project' | 'school' | 'job' | 'diploma') {
  switch (type) {
    case 'project':
      return '#f6ad55'; // orange
    case 'school':
      return '#68d391'; // vert
    case 'job':
      return '#63b3ed'; // bleu
    case 'diploma':
      return '#f6e05e'; // jaune
    default:
      return '#63b3ed'; // fallback
  }
}

// Formate "YYYY-MM" => "Mois Année"
function formatDate(yyyyMM: string) {
  const [year, month] = yyyyMM.split('-');
  const monthNames = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];
  const mIndex = parseInt(month, 10) - 1;
  const monthLabel = monthNames[mIndex] || month;
  return `${monthLabel} ${year}`;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  index,
  offset,
  onSelect,
  totalCount,
  textChildren,
}) => {
  const { type, date, title, key } = item;

  const isLeft = (index + offset) % 2 === 0;
  const reverseIndex = totalCount - index - 1;
  const STAGGER = 0.05;

  // Variants pour l'animation
  const cardVariants: Variants = {
    hidden: () => ({
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    }),
    visible: () => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    }),
    exit: ({ exitIndex }: { exitIndex: number }) => ({
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
        delay: exitIndex * STAGGER * 0.5,
      },
    }),
  };

  const bulletVariants: Variants = {
    hidden: () => ({
      scale: 0,
      transition: { duration: 0.3 },
    }),
    visible: () => ({
      scale: 1,
      transition: { duration: 0.3 },
    }),
    exit: ({ exitIndex }: { exitIndex: number }) => ({
      scale: 0,
      transition: { duration: 0.3, delay: exitIndex * STAGGER * 0.5 },
    }),
  };

  const lineVariants: Variants = {
    hidden: () => ({
      width: 0,
      transition: { duration: 0.3 },
    }),
    visible: () => ({
      width: '2.5rem',
      transition: { duration: 0.3 },
    }),
    exit: ({ exitIndex }: { exitIndex: number }) => ({
      width: 0,
      transition: { duration: 0.3, delay: exitIndex * STAGGER * 0.5 },
    }),
  };

  // Style pour la bulle (dégradé)
  const bulletStyle: React.CSSProperties = {
    background: `linear-gradient(to bottom right, #6B46C1, ${getTypeColor(type)})`,
  };

  // Header de la carte pour petits écrans (mobile)
  const MobileHeader = () => (
    <div className="join flex rounded-xl overflow-hidden  md:hidden">
      <div
        style={bulletStyle}
        className="join-item flex items-center justify-center w-14 h-16"
      >
        {getTypeIcon(type)}
      </div>
      <div className="join-item px-3 py-2 flex-1 flex items-center justify-between gap-2 max-h-16">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500 text-right">
          {formatDate(date)}
        </span>
      </div>
      <motion.button
        onClick={() => onSelect(key)}
        className="join-item bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-3 py-2 hover:opacity-90 transition-opacity duration-300 w-14 h-16 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
      >
        <FaSearchPlus size={16} />
      </motion.button>
    </div>
  );

  // Header de la carte pour grand écran (desktop)
  const DesktopHeader = ({ side }: { side: 'right' | 'left' }) => (
    <div
      className={`hidden md:flex items-center justify-${side === 'left' ? 'start' : 'start'} w-auto`}
    >
      {side === 'left' && (
        <motion.button
          onClick={() => onSelect(key)}
          className="mr-2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full p-2 hover:opacity-90 transition-opacity duration-300 h-12 w-12 flex items-center justify-center flex-grow-0"
          whileHover={{ scale: 1.05 }}
        >
          <FaSearchPlus size={16} />
        </motion.button>
      )}
      <div className="mx-4">
        <h3 className="text-sm md:text-lg text-gray-900 font-bold leading-tight">
          {title}
        </h3>
        <span className="text-xs md:text-sm text-gray-500">
          {formatDate(date)}
        </span>
      </div>
      {side === 'right' && (
        <motion.button
          onClick={() => onSelect(key)}
          className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full p-2 hover:opacity-90 transition-opacity duration-300 h-12 w-12 flex items-center justify-center flex-shrink-0"
          whileHover={{ scale: 1.05 }}
        >
          <FaSearchPlus size={16} />
        </motion.button>
      )}
    </div>
  );

  return (
    <div
      className="
        relative mb-4
        flex flex-col md:flex-row items-center
        w-full min-h-[4rem]
      "
    >
      {isLeft ? (
        <>
          {/* Colonne gauche (carte) */}
          <div className="relative w-full md:w-1/2 flex justify-center md:justify-end md:pr-8 order-3 md:order-1">
            <motion.div
              className="
                bg-white/90 backdrop-blur-md
                rounded-xl shadow-xl p-0 md:p-4 max-w-none sm:max-w-md w-full md:w-auto
                hover:bg-white transition-colors duration-300
              "
              variants={cardVariants}
              initial="hidden"
              exit="exit"
              whileInView="visible"
              viewport={{ once: true }}
              custom={{ exitIndex: reverseIndex }}
            >
              {/* Header pour mobile et desktop */}
              <MobileHeader />
              <DesktopHeader side="right" />
            </motion.div>
            {/* Ligne horizontale */}
            <motion.div
              className="
                absolute top-1/2 right-0 h-0.5 bg-white/50 -translate-y-1/2
                hidden md:block
              "
              variants={lineVariants}
              initial="hidden"
              exit="exit"
              whileInView="visible"
              viewport={{ once: true }}
              custom={{ exitIndex: reverseIndex }}
            />
          </div>

          {/* Bulle (uniquement pour grand écran) */}
          <motion.div
            style={bulletStyle}
            className="
              z-10 hidden md:flex items-center justify-center
              rounded-full w-10 h-10 text-white shadow-lg
              order-1 md:order-2 mb-4 md:mb-0
            "
            variants={bulletVariants}
            initial="hidden"
            exit="exit"
            whileInView="visible"
            viewport={{ once: true }}
            custom={{ exitIndex: reverseIndex }}
          >
            {getTypeIcon(type)}
          </motion.div>

          {/* Colonne droite avec texte */}
          <div className="w-full pr-2 md:pl-10 md:mt-0 mb-4 md:mb-0 md:w-1/2 flex justify-start md:justify-start order-1 md:order-3">
            <motion.div
              className="w-full md:w-auto text-right"
              custom={{ exitIndex: reverseIndex }}
              variants={cardVariants}
              initial="hidden"
              exit="exit"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {textChildren}
            </motion.div>
          </div>
        </>
      ) : (
        <>
          {/* Colonne gauche vide */}
          <div className="w-full md:pr-10 md:mt-0 mb-4 md:mb-0 md:w-1/2 flex justify-start md:justify-end order-1">
            <motion.div
              className="w-full md:w-auto text-right md:text-left"
              custom={{ enterIndex: index, exitIndex: reverseIndex }}
              variants={cardVariants}
              initial="hidden"
              exit="exit"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {textChildren}
            </motion.div>
          </div>

          {/* Bulle (uniquement pour grand écran) */}
          <motion.div
            style={bulletStyle}
            className="
              z-10 hidden md:flex items-center justify-center
              rounded-full w-10 h-10 text-white shadow-lg
              order-2 mb-4 md:mb-0
            "
            variants={bulletVariants}
            initial="hidden"
            exit="exit"
            whileInView="visible"
            viewport={{ once: true }}
            custom={{ exitIndex: reverseIndex }}
          >
            {getTypeIcon(type)}
          </motion.div>

          {/* Colonne droite (carte) */}
          <div className="relative w-full md:w-1/2 flex justify-center md:justify-start md:pl-8 order-1 md:order-3">
            {/* Ligne horizontale */}
            <motion.div
              className="
                absolute top-1/2 left-0 h-0.5 bg-white/50 -translate-y-1/2
                hidden md:block
              "
              variants={lineVariants}
              initial="hidden"
              exit="exit"
              whileInView="visible"
              viewport={{ once: true }}
              custom={{ exitIndex: reverseIndex }}
            />

            <motion.div
              className="
                             bg-white/90 backdrop-blur-md
                             rounded-xl shadow-xl p-0 md:p-4 max-w-none w-full sm:w-auto
                             hover:bg-white transition-colors duration-300
                           "
              variants={cardVariants}
              initial="hidden"
              exit="exit"
              whileInView="visible"
              viewport={{ once: true }}
              custom={{ exitIndex: reverseIndex }}
            >
              {/* Header pour mobile et desktop */}
              <MobileHeader />
              <DesktopHeader side="left" />
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default TimelineItem;

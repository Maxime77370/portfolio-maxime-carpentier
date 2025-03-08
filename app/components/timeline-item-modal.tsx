'use client';

import React from 'react';
import { FaGithub, FaNetworkWired } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { DictionaryItem } from './timeline-dict';
import Image from 'next/image';
import { FaInfo, FaSchool, FaBriefcase } from 'react-icons/fa';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 50,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

interface ModalProps {
  item: DictionaryItem;
  onClose: () => void;
  fields: Array<keyof DictionaryItem>;
}

/**
 * Rend le contenu d’un champ en fonction de sa clé.
 */
function getDivField(item: DictionaryItem, field: keyof DictionaryItem) {
  if (!item[field]) return null;

  switch (field) {
    case 'description':
      return (
        <div className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4 mt-2">
          <FaInfo className="w-6 h-6 ml-1" />
          <p className="text-gray-800">{item[field]}</p>
        </div>
      );
    case 'technologies':
      return (
        <div className="flex flex-wrap gap-2 mt-2 w-full justify-center">
          {item[field]?.split(',').map((tech, index) => (
            <span
              key={index}
              className="bg-gray-600 text-gray-200 px-2 py-1 rounded-full text-sm"
            >
              {tech.trim()}
            </span>
          ))}
        </div>
      );
    case 'location':
      if (!item.mapUrl) {
        return <span className="text-gray-500">{item[field]}</span>;
      }
      return;
    case 'link':
      if (item.link) {
        return (
          <a
            href={item.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:underline bg-white shadow-md rounded-lg p-2 mt-2"
          >
            {(() => {
              switch (item.link?.icon) {
                case 'github':
                  return <FaGithub className="w-6 h-6" />;
                case 'website':
                  return <FaNetworkWired className="w-6 h-6" />;
                default:
                  return null;
              }
            })()}
            <span className="text-gray-800">{item.link.url}</span>
          </a>
        );
      }
      return null;
    case 'date':
      return <span className="text-gray-500">{item[field]}</span>;
    case 'mapUrl':
      return (
        <iframe
          src={item.mapUrl}
          width="100%"
          height="200"
          style={{ border: 0, borderRadius: 20 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      );
    case 'images':
      console.log(item.images);
      return (
        <div className="w-full grid grid-cols-1 gap-2 mt-2">
          {item.images?.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={item.title}
              width={800}
              height={500}
              className="rounded-lg"
            />
          ))}
        </div>
      );
    case 'title':
      return (
        <header className="flex items-center justify-between gap-4 bg-white shadow-md rounded-lg p-4 mt-2">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl text-gray-900 font-bold">{item.title}</h3>
          </div>
          <span className="text-sm text-gray-500">{item.date}</span>
        </header>
      );
    default:
      return null;
  }
}

const EnhancedModalBase: React.FC<ModalProps> = ({ item, onClose, fields }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-2 sm:px-4 py-4 overflow-x-hidden"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="relative flex flex-col w-full max-w-[100%] md:max-w-2xl max-h-[80vh] md:max-h-[90vh] overflow-y-auto bg-white/60 bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-lg p-4 sm:p-4"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fermer la fenêtre"
          className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 bg-white/50 rounded-full backdrop-blur-sm text-gray-600 hover:bg-white/70 hover:text-gray-900 transition-colors duration-150"
        >
          ✕
        </button>

        {/* Parcours et rendu des champs définis */}
        {fields.map((field) => {
          return (
            <section key={field} className="mb-2">
              {getDivField(item, field)}
            </section>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

// Exportation des différents modals avec leurs champs spécifiques
export const ProjectModal = (props: ModalProps) => (
  <EnhancedModalBase
    {...props}
    fields={['title', 'description', 'images', 'link', 'technologies']}
  />
);
export const JobModal = (props: ModalProps) => (
  <EnhancedModalBase
    {...props}
    fields={['title', 'images', 'description', 'mapUrl', 'technologies']}
  />
);
export const SchoolModal = (props: ModalProps) => (
  <EnhancedModalBase
    {...props}
    fields={['title', 'images', 'description', 'location', 'mapUrl']}
  />
);
export const DiplomaModal = (props: ModalProps) => (
  <EnhancedModalBase {...props} fields={['title', 'description', 'mapUrl']} />
);

const modals = { ProjectModal, JobModal, SchoolModal, DiplomaModal };
export default modals;

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { track } from '@vercel/analytics';

import PresentationModal from './presentation-modal';

export default function Presentation() {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    track('My Event', {}, { flags: ['summer-sale'] });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        id="about"
        className="relative flex items-center justify-center bg-gray-900 py-8 md:py-16 lg:py-20 overflow-hidden"
      >
        <div className="flex items-center justify-center absolute inset-0 h-full w-full scale-130">
          <Image
            src="/shape/shape-5.webp"
            alt="Shape 5"
            width={1200}
            height={600}
            className="opacity-10 h-full w-auto"
          />
        </div>
        <div className="relative text-center text-white px-6">
          <motion.h2
            className="text-xl md:text-4xl font-bold uppercase tracking-wide"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t('presentation.title')}
          </motion.h2>
          <motion.p
            className="mt-4 text-sm md:text-xl tracking-wider max-w-4xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Texte raccourci */}
            {t('presentation.shortContent')}
          </motion.p>
          <motion.button
            className="mt-6 px-4 py-2 transition-colors bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-sm md:text-base lg:text-lg"
            onClick={openModal}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t('presentation.learnMore')}
          </motion.button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isModalOpen && (
          <PresentationModal onClose={closeModal} key="presentation-modal" />
        )}
      </AnimatePresence>
    </>
  );
}

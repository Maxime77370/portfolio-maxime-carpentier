import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.4 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

const languages = [
  { value: 'en', label: 'English', flag: 'https://flagcdn.com/32x24/gb.png' },
  { value: 'fr', label: 'Français', flag: 'https://flagcdn.com/32x24/fr.png' },
];

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Déterminer la langue actuelle à partir du chemin
  const segments = pathname.split('/');
  const currentLangValue =
    segments[1] === 'en' || segments[1] === 'fr' ? segments[1] : 'en';
  const currentLang =
    languages.find((lang) => lang.value === currentLangValue) || languages[0];

  const changeLanguage = (lng: string) => {
    const segments = pathname.split('/');
    if (segments[1] === 'en' || segments[1] === 'fr') {
      segments[1] = lng;
    } else {
      segments.splice(1, 0, lng);
    }
    router.push(segments.join('/'));
    setIsOpen(false);
  };

  // Fermer le menu déroulant si l'utilisateur clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <motion.button
        type="button"
        className="inline-flex items-center rounded-md transition-colors bg-indigo-700 hover:bg-indigo-600 px-2 py-1 text-sm text-white focus:ring-2 focus:ring-indigo-600"
        aria-haspopup="true"
        onClick={() => setIsOpen((prev) => !prev)}
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Image
          src={currentLang.flag}
          alt={currentLang.label}
          width={32}
          height={24}
          className="w-5 h-auto mr-2"
        />
        <span>{currentLang.label}</span>
        <svg
          className="ml-2 h-5 w-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute top-10 left-1/2 transform -translate-x-1/2 mt-1 w-full origin-top rounded-md bg-white shadow-lg ring-opacity-5 focus:outline-none z-10"
            role="listbox"
            aria-labelledby="listbox-label"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {languages.map((lang, index) => (
              <li key={index}>
                <button
                  type="button"
                  className={`flex items-center w-full px-4 py-2 text-sm hover:bg-indigo-600 hover:text-white 
                ${lang.value === currentLang.value ? 'font-semibold text-indigo-600' : 'text-gray-900'}
                ${index === 0 ? 'rounded-t-md' : ''}
                ${index === languages.length - 1 ? 'rounded-b-md' : ''}
              `}
                  onClick={() => changeLanguage(lang.value)}
                >
                  <Image
                    src={lang.flag}
                    alt={lang.label}
                    width={32}
                    height={24}
                    className="w-5 h-auto mr-2"
                  />
                  {lang.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;

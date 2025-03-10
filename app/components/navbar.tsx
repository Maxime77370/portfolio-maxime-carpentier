"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/legacy/image";
import LanguageSwitcher from './language-switcher';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const navItems = [
  { key: 'home', href: '#' },
  { key: 'about', href: '#about' },
  { key: 'timeline', href: '#timeline' },
];

export default function NavBar() {
  const t = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <motion.nav
      className="fixed top-0 w-full z-30 bg-black/30 backdrop-blur-md"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Partie gauche : logo et titre/slogan */}
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mr-3"
            >
              <Image
                src="/shape/shape-3.webp"
                alt="Shape 3"
                width={50}
                height={50}
                layout="intrinsic"
              />
            </motion.div>
            <motion.div className="flex flex-col">
              <motion.h1
                className="text-white text-2xl sm:text-3xl font-bold leading-tight -mb-1.5"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {t('nav.name')}
              </motion.h1>
              <motion.p
                className="text-gray-400 text-xs sm:text-sm tracking-wide"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {t('nav.slogan')}
              </motion.p>
            </motion.div>
          </div>

          {/* Bouton hamburger en mobile */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none transition-colors"
            >
              {menuOpen ? (
                // Icône "X" pour fermer
                (<svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>)
              ) : (
                // Icône hamburger
                (<svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>)
              )}
            </button>
          </div>

          {/* Navigation & LanguageSwitcher en desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.key}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors text-md"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  transition: { type: 'spring', stiffness: 300 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {t(`nav.${item.key}`)}
              </motion.a>
            ))}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      {/* Menu mobile (affiché en slide-down) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden absolute top-16 right-0 w-1/3 bg-black/50 backdrop-blur-md rounded-lg m-2"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full py-4 px-4 flex flex-col space-y-2 gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  className="block w-full text-gray-300 hover:text-white transition-colors text-md text-right font-semibold"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { type: 'spring', stiffness: 300 },
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </motion.a>
              ))}
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

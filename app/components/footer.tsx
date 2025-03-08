import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import * as motion from 'motion/react-client';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();

  const baseMotionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const delayedMotionProps = {
    ...baseMotionProps,
    transition: { ...baseMotionProps.transition, delay: 0.3 },
  };

  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Nom et Copyright */}
        <motion.div className="text-center md:text-left" {...baseMotionProps}>
          <p className="text-lg font-semibold">Carpentier Maxime</p>
          <p className="text-sm text-gray-400">
            © 2025 - {t('footer.rights')}
          </p>
        </motion.div>

        {/* Liens de contact */}
        <motion.div
          className="flex space-x-6 mt-4 md:mt-0"
          {...delayedMotionProps}
        >
          <a
            href="https://github.com/Maxime77370"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-2xl hover:text-gray-400 transition" />
          </a>
          <a
            href="https://www.linkedin.com/in/maxime-carpentier-77554a262/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl hover:text-gray-400 transition" />
          </a>
          <a href="mailto:maxime.carpentier@epitech.eu">
            <FaEnvelope className="text-2xl hover:text-gray-400 transition" />
          </a>
          <a href="tel:+33630525604">
            <FaPhone className="text-2xl hover:text-gray-400 transition" />
          </a>
        </motion.div>
      </div>
    </footer>
  );
}

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
    FaLinkedin,
    FaGithub,
    FaSwimmer,
    FaMusic,
    FaLaptopCode,
    FaPalette,
    FaUserCircle,
    FaTools,
    FaServer,
    FaDatabase,
    FaUsers,
    FaPhone,
    FaEnvelope
} from "react-icons/fa";

// Variantes pour l'overlay (fond sombre)
const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
};

// Variantes pour le modal (glassmorphism + transition)
const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 50,
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
};

// Variantes pour les items animés (Timeline, etc.)
const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

interface PortfolioModalProps {
    onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ onClose }) => {
    const t = useTranslations();

    return (
        <motion.div
            className="
        fixed inset-0 bg-black/50 z-50
        flex items-center justify-center
        px-2 sm:px-4 py-4
        overflow-x-hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
        >
            {/* Conteneur principal du modal */}
            <motion.div
                className="
          relative flex flex-col w-full
          max-w-[100%] md:max-w-3xl lg:max-w-4xl
          max-h-[80vh] md:max-h-[90vh] overflow-y-auto
          bg-white/60 bg-gradient-to-br from-white/70 to-white/30
          backdrop-blur-xl border border-white/20
          shadow-2xl rounded-lg p-3 sm:p-5 md:p-6
        "
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Bouton de fermeture */}
                <button
                    onClick={onClose}
                    aria-label={t("presentation.close")}
                    className="
            absolute top-3 right-3
            flex items-center justify-center w-9 h-9
            bg-white/50 rounded-full backdrop-blur-sm text-gray-600
            hover:bg-white/70 hover:text-gray-900
            transition-colors duration-150
          "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Contenu principal */}
                <div className="flex flex-col gap-3">
                    {/* Header / Identité */}
                    <header className="flex flex-col items-center text-center">
                        {/* Photo de profil */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-6 sm:mt-0">
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-lg">
                                <Image
                                    src="/profile.jpg"
                                    alt="Photo de profil"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="hidden sm:block border-l-1 border-gray-400/50 h-26"></div>
                            <div className="flex flex-col items-center sm:items-start">
                                {/* Nom / Titre */}
                                <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 drop-shadow-sm">
                                    {t("header.name")}
                                </h1>
                                <p className="text-base sm:text-lg md:text-xl text-gray-700 mt-1">
                                    {t("header.title")}
                                </p>
                            </div>
                            {/* Liens sociaux */}
                            <div className="grid grid-cols-4 md:grid-cols-2 gap-4 md:mt-4">
                                <a
                                    href="https://www.linkedin.com/in/maxime-carpentier-77554a262/"
                                    aria-label="LinkedIn"
                                    className="text-indigo-700 hover:text-indigo-600 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaLinkedin size={24} />
                                </a>
                                <a
                                    href="https://github.com/Maxime77370"
                                    target="_blank"
                                    aria-label="GitHub"
                                    className="text-indigo-700 hover:indigo-gray-600 transition-colors"
                                >
                                    <FaGithub size={24} />
                                </a>
                                <a
                                    href="mailto:maxime.carpentier@epitech.eu"
                                    aria-label="Email"
                                    className="text-indigo-700 hover:text-indigo-600 transition-colors"
                                >
                                    <FaEnvelope size={24} />
                                </a>
                                <a
                                    href="tel:+33630525604"
                                    aria-label="Téléphone"
                                    className="text-indigo-700 hover:text-indigo-600 transition-colors"
                                >
                                    <FaPhone size={24} />
                                </a>

                            </div>
                        </div>
                        {/* Description courte */}
                        <p className="mt-4 text-gray-700 leading-normal max-w-2xl px-2">
                            {t("presentation.shortContent")}
                        </p>
                    </header>

                    <hr className="border-gray-400/50" />

                    {/* Cartes 3D : Mon Profil & Expertises */}
                    <div
                        style={{ perspective: "1000px" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {/* Mon Profil (Résumé) */}
                        <motion.section
                            className="
                flex flex-col gap-2 
                bg-gray-50/50 p-4 rounded-lg 
                shadow-sm hover:shadow-md 
                transform-style-3d
              "
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover={{ rotateY: 5, scale: 1.02 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1">
                                <FaUserCircle className="text-indigo-600" size={24} />
                                <h2>{t("presentation.resumeTitle")}</h2>
                            </div>
                            <p className="text-gray-800 leading-normal text-sm sm:text-base md:text-lg">
                                {t("presentation.fullContent")}
                            </p>
                        </motion.section>

                        {/* Expertises */}
                        <motion.section
                            className="
                flex flex-col gap-2 
                bg-gray-50/50 p-4 rounded-lg 
                shadow-sm hover:shadow-md 
                transform-style-3d
              "
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover={{ rotateY: -5, scale: 1.02 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1">
                                <FaTools className="text-indigo-600" size={24} />
                                <h2>{t("expertise.title")}</h2>
                            </div>
                            <ul className="text-gray-800 space-y-1 text-sm sm:text-base md:text-lg">
                                <motion.li
                                    className="flex items-center px-2 gap-2 rounded-lg"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <FaServer className="text-indigo-600" />
                                    <span>{t("expertise.item1")}</span>
                                </motion.li>
                                <motion.li
                                    className="flex items-center px-2 gap-2 rounded-lg"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <FaDatabase className="text-indigo-600" />
                                    <span>{t("expertise.item2")}</span>
                                </motion.li>
                                <motion.li
                                    className="flex items-center px-2 gap-2 rounded-lg"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <FaUsers className="text-indigo-600" />
                                    <span>{t("expertise.item3")}</span>
                                </motion.li>
                            </ul>
                        </motion.section>
                    </div>

                    <hr className="border-gray-400/50" />

                    {/* Timeline des Loisirs */}
                    <section className="flex flex-col gap-2">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                            {t("presentation.loisirs")}
                        </h2>

                        <div
                            style={{ perspective: "1000px" }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {/* Piscine */}
                            <motion.div
                                className="
                  flex items-start space-x-2 relative 
                  hover:bg-gray-200/70 p-2 rounded-lg 
                  transform-style-3d
                "
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                whileHover={{ rotateY: 5, scale: 1.03 }}
                                viewport={{ once: true }}
                            >
                                <div className="ml-0.5">
                                    <p className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <FaSwimmer className="text-indigo-600" size={20} />
                                        {t("timeline.swimming.title")}
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        {t("timeline.swimming.description")}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Piano */}
                            <motion.div
                                className="
                  flex items-start space-x-2 relative 
                  hover:bg-gray-200/70 p-2 rounded-lg 
                  transform-style-3d
                "
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                whileHover={{ rotateY: -5, scale: 1.03 }}
                                viewport={{ once: true }}
                            >
                                <div className="ml-0.5">
                                    <p className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <FaMusic className="text-indigo-600" size={20} />
                                        {t("timeline.piano.title")}
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        {t("timeline.piano.description")}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Informatique */}
                            <motion.div
                                className="
                  flex items-start space-x-2 relative 
                  hover:bg-gray-200/70 p-2 rounded-lg 
                  transform-style-3d
                "
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                whileHover={{ rotateY: 5, scale: 1.03 }}
                                viewport={{ once: true }}
                            >
                                <div className="ml-0.5">
                                    <p className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <FaLaptopCode className="text-indigo-600" size={20} />
                                        {t("timeline.informatique.title")}
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        {t("timeline.informatique.description")}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Art */}
                            <motion.div
                                className="
                  flex items-start space-x-2 relative 
                  hover:bg-gray-200/70 p-2 rounded-lg 
                  transform-style-3d
                "
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                whileHover={{ rotateY: -5, scale: 1.03 }}
                                viewport={{ once: true }}
                            >
                                <div className="ml-0.5">
                                    <p className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <FaPalette className="text-indigo-600" size={20} />
                                        {t("timeline.art.title")}
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        {t("timeline.art.description")}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </div>
            </motion.div >
        </motion.div >
    );
};

export default PortfolioModal;

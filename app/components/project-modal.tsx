"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

/** Variantes d'animation pour l'overlay (fond sombre) */
const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

/** Variantes d'animation pour le contenu du modal */
const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 50,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

/** Props communes pour tous les modals */
interface ModalProps {
    itemKey: string;       // Clé de l'élément (ex: "trading-chart-ai", "karbon", etc.)
    onClose: () => void;   // Fonction de fermeture
}

/* ------------------------------------------------------------------
 * Modal pour un projet ("type": "project")
 * Champs : title, date, description, technologies, link
 * ------------------------------------------------------------------*/
export const ProjectModal: React.FC<ModalProps> = ({ itemKey, onClose }) => {
    const t = useTranslations();

    return (
        <motion.div
            className="
        fixed inset-0 bg-black/50 z-50
        flex items-center justify-center
        px-2 sm:px-4 py-4
        overflow-x-hidden
      "
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
        >
            <motion.div
                className="
          relative flex flex-col w-full
          max-w-[100%] md:max-w-2xl
          max-h-[80vh] md:max-h-[90vh] overflow-y-auto
          bg-white/60 bg-gradient-to-br from-white/70 to-white/30
          backdrop-blur-xl border border-white/20
          shadow-2xl rounded-lg p-4 sm:p-6
        "
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()} // Évite de fermer en cliquant dans le contenu
            >
                {/* Bouton de fermeture */}
                <button
                    onClick={onClose}
                    aria-label="Fermer la fenêtre"
                    className="
            absolute top-3 right-3
            flex items-center justify-center w-9 h-9
            bg-white/50 rounded-full backdrop-blur-sm text-gray-600
            hover:bg-white/70 hover:text-gray-900
            transition-colors duration-150
          "
                >
                    ✕
                </button>

                {/* Titre et date */}
                <h3 className="text-xl text-gray-900 font-bold">
                    {t(`projects.${itemKey}.title`)}
                </h3>
                <span className="text-sm text-gray-500">
                    {t(`projects.${itemKey}.date`)}
                </span>

                {/* Description */}
                <p className="mt-4 text-gray-700">
                    {t(`projects.${itemKey}.description`)}
                </p>

                {/* Technologies */}
                <p className="mt-2 text-gray-700">
                    <strong>Technologies : </strong>
                    {t(`projects.${itemKey}.technologies`)}
                </p>

                {/* Lien */}
                <p className="mt-2 text-gray-700">
                    <strong>Lien : </strong>
                    <a
                        href={t(`projects.${itemKey}.link`)}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t(`projects.${itemKey}.link`)}
                    </a>
                </p>

                <button
                    className="
            mt-6 px-4 py-2 bg-indigo-600
            text-white rounded hover:bg-indigo-700
          "
                    onClick={onClose}
                >
                    Fermer
                </button>
            </motion.div>
        </motion.div>
    );
};

/* ------------------------------------------------------------------
 * Modal pour un job ("type": "job")
 * Champs : title, date, description, location, technologies
 * ------------------------------------------------------------------*/
export const JobModal: React.FC<ModalProps> = ({ itemKey, onClose }) => {
    const t = useTranslations();

    return (
        <motion.div
            className="
        fixed inset-0 bg-black/50 z-50
        flex items-center justify-center
        px-2 sm:px-4 py-4
      "
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
        >
            <motion.div
                className="
          relative flex flex-col w-full
          max-w-[100%] md:max-w-2xl
          max-h-[80vh] md:max-h-[90vh] overflow-y-auto
          bg-white/60 bg-gradient-to-br from-white/70 to-white/30
          backdrop-blur-xl border border-white/20
          shadow-2xl rounded-lg p-4 sm:p-6
        "
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Fermer la fenêtre"
                    className="
            absolute top-3 right-3
            flex items-center justify-center w-9 h-9
            bg-white/50 rounded-full backdrop-blur-sm text-gray-600
            hover:bg-white/70 hover:text-gray-900
            transition-colors duration-150
          "
                >
                    ✕
                </button>

                <h3 className="text-xl text-gray-900 font-bold">
                    {t(`projects.${itemKey}.title`)}
                </h3>
                <span className="text-sm text-gray-500">
                    {t(`projects.${itemKey}.date`)}
                </span>

                <p className="mt-4 text-gray-700">
                    {t(`projects.${itemKey}.description`)}
                </p>

                <p className="mt-2 text-gray-700">
                    <strong>Lieu : </strong>
                    {t(`projects.${itemKey}.location`)}
                </p>

                {/* Certaines expériences de job ont ou non la clé "technologies". 
            Si vous souhaitez ne pas afficher quand c’est vide, vous pouvez conditionner : 
            {t(`projects.${itemKey}.technologies`) && ( ... )} 
        */}
                <p className="mt-2 text-gray-700">
                    <strong>Technologies : </strong>
                    {t(`projects.${itemKey}.technologies`)}
                </p>

                <button
                    className="
            mt-6 px-4 py-2 bg-indigo-600
            text-white rounded hover:bg-indigo-700
          "
                    onClick={onClose}
                >
                    Fermer
                </button>
            </motion.div>
        </motion.div>
    );
};

/* ------------------------------------------------------------------
 * Modal pour une école ("type": "school")
 * Champs : title, date, description, location
 * ------------------------------------------------------------------*/
export const SchoolModal: React.FC<ModalProps> = ({ itemKey, onClose }) => {
    const t = useTranslations();

    return (
        <motion.div
            className="
        fixed inset-0 bg-black/50 z-50
        flex items-center justify-center
        px-2 sm:px-4 py-4
      "
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
        >
            <motion.div
                className="
          relative flex flex-col w-full
          max-w-[100%] md:max-w-2xl
          max-h-[80vh] md:max-h-[90vh] overflow-y-auto
          bg-white/60 bg-gradient-to-br from-white/70 to-white/30
          backdrop-blur-xl border border-white/20
          shadow-2xl rounded-lg p-4 sm:p-6
        "
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Fermer la fenêtre"
                    className="
            absolute top-3 right-3
            flex items-center justify-center w-9 h-9
            bg-white/50 rounded-full backdrop-blur-sm text-gray-600
            hover:bg-white/70 hover:text-gray-900
            transition-colors duration-150
          "
                >
                    ✕
                </button>

                <h3 className="text-xl text-gray-900 font-bold">
                    {t(`projects.${itemKey}.title`)}
                </h3>
                <span className="text-sm text-gray-500">
                    {t(`projects.${itemKey}.date`)}
                </span>

                <p className="mt-4 text-gray-700">
                    {t(`projects.${itemKey}.description`)}
                </p>

                <p className="mt-2 text-gray-700">
                    <strong>Lieu : </strong>
                    {t(`projects.${itemKey}.location`)}
                </p>

                <button
                    className="
            mt-6 px-4 py-2 bg-indigo-600
            text-white rounded hover:bg-indigo-700
          "
                    onClick={onClose}
                >
                    Fermer
                </button>
            </motion.div>
        </motion.div>
    );
};

/* ------------------------------------------------------------------
 * Modal pour un diplôme ("type": "diploma")
 * Champs : title, date, description, location
 * ------------------------------------------------------------------*/
export const DiplomaModal: React.FC<ModalProps> = ({ itemKey, onClose }) => {
    const t = useTranslations();

    return (
        <motion.div
            className="
        fixed inset-0 bg-black/50 z-50
        flex items-center justify-center
        px-2 sm:px-4 py-4
      "
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
        >
            <motion.div
                className="
          relative flex flex-col w-full
          max-w-[100%] md:max-w-2xl
          max-h-[80vh] md:max-h-[90vh] overflow-y-auto
          bg-white/60 bg-gradient-to-br from-white/70 to-white/30
          backdrop-blur-xl border border-white/20
          shadow-2xl rounded-lg p-4 sm:p-6
        "
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Fermer la fenêtre"
                    className="
            absolute top-3 right-3
            flex items-center justify-center w-9 h-9
            bg-white/50 rounded-full backdrop-blur-sm text-gray-600
            hover:bg-white/70 hover:text-gray-900
            transition-colors duration-150
          "
                >
                    ✕
                </button>

                <h3 className="text-xl text-gray-900 font-bold">
                    {t(`projects.${itemKey}.title`)}
                </h3>
                <span className="text-sm text-gray-500">
                    {t(`projects.${itemKey}.date`)}
                </span>

                <p className="mt-4 text-gray-700">
                    {t(`projects.${itemKey}.description`)}
                </p>

                <p className="mt-2 text-gray-700">
                    <strong>Lieu : </strong>
                    {t(`projects.${itemKey}.location`)}
                </p>

                <button
                    className="
            mt-6 px-4 py-2 bg-indigo-600
            text-white rounded hover:bg-indigo-700
          "
                    onClick={onClose}
                >
                    Fermer
                </button>
            </motion.div>
        </motion.div>
    );
};

const modals = { ProjectModal, JobModal, SchoolModal, DiplomaModal };
export default modals;
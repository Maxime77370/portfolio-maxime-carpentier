"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, y: 50, transition: { duration: 0.5, ease: "easeInOut" } },
};

interface ModalProps {
    itemKey: string;
    onClose: () => void;
    fields: string[];
}

const ModalBase: React.FC<ModalProps> = ({ itemKey, onClose, fields }) => {
    const t = useTranslations();

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
                className="relative flex flex-col w-full max-w-[100%] md:max-w-2xl max-h-[80vh] md:max-h-[90vh] overflow-y-auto bg-white/60 bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-lg p-4 sm:p-6"
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

                <h3 className="text-xl text-gray-900 font-bold">{t(`projects.${itemKey}.title`)}</h3>
                <span className="text-sm text-gray-500">{t(`projects.${itemKey}.date`)}</span>

                {fields.map((field) =>
                    t(`projects.${itemKey}.${field}`) ? (
                        <p key={field} className="mt-2 text-gray-700">
                            <strong>{field.charAt(0).toUpperCase() + field.slice(1)} :</strong> {t(`projects.${itemKey}.${field}`)}
                        </p>
                    ) : null
                )}

                <button
                    className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    onClick={onClose}
                >
                    Fermer
                </button>
            </motion.div>
        </motion.div>
    );
};

export const ProjectModal = (props: ModalProps) => <ModalBase {...props} fields={["description", "technologies", "link"]} />;
export const JobModal = (props: ModalProps) => <ModalBase {...props} fields={["description", "location", "technologies"]} />;
export const SchoolModal = (props: ModalProps) => <ModalBase {...props} fields={["description", "location"]} />;
export const DiplomaModal = (props: ModalProps) => <ModalBase {...props} fields={["description", "location"]} />;

const modals = { ProjectModal, JobModal, SchoolModal, DiplomaModal };
export default modals;
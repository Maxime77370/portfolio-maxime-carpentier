"use client";

import React from "react";
import Image from "next/image";
import * as motion from "motion/react-client";

interface Project {
    id: number;
    title: string;
    description: string;
    date: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Projet Alpha",
        description: "Développement d'une application web pour la gestion des tâches.",
        date: "Janvier 2021",
    },
    {
        id: 2,
        title: "Projet Beta",
        description: "Création d'un site e-commerce responsive avec intégration d'API.",
        date: "Mars 2021",
    },
    {
        id: 3,
        title: "Projet Gamma",
        description: "Mise en place d'une plateforme de blog avec système de commentaires.",
        date: "Juin 2021",
    },
];

export default function ProjectTimeline() {
    return (
        <>
            <Image
                src="/shape/shape-5.webp"
                alt="Shape 4"
                width={1200}
                height={600}
                className="mx-auto w-1/3 h-auto object-contain opacity-80 mt-8"
            />
            <div className="relative w-full max-w-5xl mx-auto py-12 px-4 -mt-1.5">
                {/* Ligne verticale centrale */}
                <div className="border-l-2 border-gray-300 absolute left-1/2 top-0 h-full -translate-x-1/2 pointer-events-none" />
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="relative mb-10 flex justify-between items-center w-full"
                    >
                        {/* Bloc de gauche (projets paires) */}
                        {index % 2 === 0 ? (
                            <motion.div
                                className="w-5/12 flex justify-end"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm">
                                    <h3 className="text-xl text-gray-900 font-bold">{project.title}</h3>
                                    <span className="text-sm text-gray-500">{project.date}</span>
                                    <p className="mt-2 text-gray-700">{project.description}</p>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="w-5/12" />
                        )}

                        {/* Marqueur central */}
                        <motion.div
                            className="z-10 flex items-center justify-center bg-indigo-600 text-white rounded-full w-8 h-8"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.4 }}
                            viewport={{ once: true }}
                        >
                            {/* Icône ou point central */}
                        </motion.div>

                        {/* Bloc de droite (projets impaires) */}
                        {index % 2 !== 0 ? (
                            <motion.div
                                className="w-5/12 flex justify-start"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm">
                                    <h3 className="text-xl text-gray-900 font-bold">{project.title}</h3>
                                    <span className="text-sm text-gray-500">{project.date}</span>
                                    <p className="mt-2 text-gray-700">{project.description}</p>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="w-5/12" />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

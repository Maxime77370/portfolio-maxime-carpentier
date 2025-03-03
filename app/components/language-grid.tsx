"use client";

import React from "react";
import Image from "next/image";
import * as motion from "motion/react-client";

// -- Exemple de listes de technologies par catégorie
const frontEnd = [
  { name: "HTML", logo: "/logos/html.webp" },
  { name: "CSS", logo: "/logos/css.webp" },
  { name: "JavaScript", logo: "/logos/js.webp" },
  { name: "TypeScript", logo: "/logos/typescript.png" },
  { name: "React", logo: "/logos/react.jpeg" },
  { name: "Next.js", logo: "/logos/nextjs.png" },
  { name: "NestJS", logo: "/logos/nestjs.png" },
  { name: "Tailwind CSS", logo: "/logos/tailwind.png" },
  { name: "Bootstrap", logo: "/logos/bootstrap.png" },
];

const backEnd = [
  { name: "Node.js", logo: "/logos/node.webp" },
  { name: "Express", logo: "/logos/express.png" },
  { name: "Python", logo: "/logos/python.png" },
  { name: "Java", logo: "/logos/java.png" },
  { name: "Prisma", logo: "/logos/prisma.svg" },
  { name: "Apache", logo: "/logos/apache.png" },
];

const devOps = [
  { name: "Docker", logo: "/logos/docker.jpeg" },
  { name: "GitHub Actions", logo: "/logos/github-action.png" },
  { name: "SQL", logo: "/logos/sql.png" },
  { name: "MongoDB", logo: "/logos/mongo-db.png" },
  { name: "PostgreSQL", logo: "/logos/postgresql.png" },
];

export default function LanguageGrid() {
  return (
    <div className="relative w-full max-w-5xl mx-auto -mt-1">
      {/* -- L’image du cadre (Shape) -- */}
      <div className="relative">
        <Image
          src="/shape/shape-4.webp"
          alt="Shape 4"
          width={1000}
          height={500}
          className="mx-auto w-full h-auto object-contain opacity-50"
        />
      </div>

      {/* 
        Conteneur en position absolue au-dessus de l’image (inset-0). 
        On y place un fond gris semi-transparent.
      */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Conteneur qui applique le fond semi-transparent */}
        <div className="bg-gray-900/30 backdrop-blur-xs p-6 md:p-8 max-w-5xl w-full max-h-7/10 h-full mx-auto">
          {/* 
            On crée une grille de 3 colonnes (Front-end, Back-end, DevOps). 
            Sur mobile, 1 colonne (grid-cols-1), sur écrans moyens/large, 3 (md:grid-cols-3).
          */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* ----------------------- Colonne BACK-END ----------------------- */}
            <div>
              <h2 className="text-center text-white font-bold text-xl mb-4">
                Back-end
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                {backEnd.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        width={32}
                        height={32}
                      />
                    </div>
                    <p className="mt-2 text-white">{tech.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ----------------------- Colonne FRONT-END ----------------------- */}
            <div>
              <h2 className="text-center text-white font-bold text-xl mb-4">
                Front-end
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                {frontEnd.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Cercle blanc contenant le logo */}
                    <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        width={32}
                        height={32}
                      />
                    </div>
                    {/* Nom de la techno */}
                    <p className="mt-2 text-white">{tech.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ----------------------- Colonne DEVOPS ----------------------- */}
            <div>
              <h2 className="text-center text-white font-bold text-xl mb-4">
                DevOps - DataBase
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                {devOps.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        width={32}
                        height={32}
                      />
                    </div>
                    <p className="mt-2 text-white">{tech.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

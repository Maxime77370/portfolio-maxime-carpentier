'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// --- Exemple de listes de technologies par catégorie
const frontEnd = [
  { name: 'HTML', logo: '/logos/html.webp' },
  { name: 'CSS', logo: '/logos/css.webp' },
  { name: 'JavaScript', logo: '/logos/js.webp' },
  { name: 'TypeScript', logo: '/logos/typescript.png' },
  { name: 'React', logo: '/logos/react.jpeg' },
  { name: 'Bootstrap', logo: '/logos/bootstrap.png' },
  { name: 'Next.js', logo: '/logos/nextjs.png' },
  { name: 'NestJS', logo: '/logos/nestjs.png' },
  { name: 'Tailwind CSS', logo: '/logos/tailwind.png' },
] as TechProps[];

const backEnd = [
  { name: 'Node.js', logo: '/logos/node.webp' },
  { name: 'Express', logo: '/logos/express.png' },
  { name: 'Python', logo: '/logos/python.png' },
  { name: 'Java', logo: '/logos/java.png' },
  { name: 'Prisma', logo: '/logos/prisma.svg' },
  { name: 'GraphQL', logo: '/logos/graphql.png' },
  { name: 'Apollo', logo: '/logos/apollo.jpeg' },
  { name: 'REST API', logo: '/logos/rest-api.png' },
  { name: 'Socket.io', logo: '/logos/socketio.png' },
] as TechProps[];

const devOps = [
  { name: 'Docker', logo: '/logos/docker.jpeg' },
  { name: 'GitHub Actions', logo: '/logos/github-action.png' },
  { name: 'SQL', logo: '/logos/sql.png' },
  { name: 'MongoDB', logo: '/logos/mongo-db.png' },
  { name: 'PostgreSQL', logo: '/logos/postgresql.png' },
] as TechProps[];

type TechProps = {
  name: string;
  logo: string;
};

// Variants pour l'animation des cercles en cascade
const circleContainerVariants = {
  initial: {},
  animate: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.25, // délai entre l'apparition de chaque cercle
    },
  },
};

const circleVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
};

type ColumnProps = {
  title: string;
  data: TechProps[];
  initialScale: number;
};

const columns = [
  {
    title: 'Back-end',
    data: backEnd,
    initialScale: 0.8,
  },
  {
    title: 'Front-end',
    data: frontEnd,
    initialScale: 0.8,
  },
  {
    title: 'DevOps - DataBase',
    data: devOps,
    initialScale: 0.8,
  },
] as ColumnProps[];

// Composant d’une colonne animée
function Column({ title, data, initialScale }: ColumnProps) {
  return (
    <motion.div
      // Animation de la colonne entière (déplacement horizontal)
      initial={{ opacity: 0, scale: initialScale }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6 },
      }}
      viewport={{ once: true }}
      className="w-full"
    >
      <h2 className="text-center text-white font-bold text-xl mb-4">{title}</h2>
      {/* Container des cercles avec stagger */}
      <motion.div
        className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6"
        variants={circleContainerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <React.Fragment>
          {data.map((tech: TechProps) => (
            // Animation de chaque cercle (apparition, scale)
            <motion.div
              key={tech.name}
              className="flex flex-col items-center"
              variants={circleVariants}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:h-12 md:w-12 lg:h-18 lg:w-18 rounded-full bg-white shadow-md flex items-center justify-center p-1">
                <div className="relative w-4 h-4 sm:w-10 sm:h-10 md:w-8 md:h-8 lg:w-10 lg:h-10">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>

              <p className="mt-1 sm:mt-2 text-white text-xs sm:text-sm md:text-lg whitespace-nowrap text-center">
                {tech.name}
              </p>
            </motion.div>
          ))}
        </React.Fragment>
      </motion.div>
    </motion.div>
  );
}
export default function TechnologieGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | string>(0);

  // Mettre à jour la hauteur du container lors du montage et du redimensionnement
  React.useEffect(() => {
    function updateHeight() {
      if (containerRef.current && window.innerWidth < 768) {
        setContainerHeight(containerRef.current.clientWidth);
      } else {
        setContainerHeight('100%');
      }
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div
      className="overflow-hidden relative md:max-w-5xl md:mx-auto md:-mt-1"
      style={{ height: containerHeight }}
    >
      {/* Conteneur interne pour séparer l'image (rotative) de l'overlay */}
      <div className="-mt-14 md:mt-0">
        {/* Image du cadre (Shape) avec rotation responsive */}
        <div className="w-full rotate-90 md:rotate-0">
          <Image
            src="/shape/shape-4.webp"
            alt="Shape 4"
            width={1200}
            height={800}
            className="max-w-none w-[180vw] md:w-[100%] opacity-50"
            // eslint-disable-next-line
            // @ts-ignore
            ref={containerRef}
          />
        </div>
        {/* Overlay semi-transparent par-dessus l'image (non affecté par la rotation) */}
        <div
          className="absolute inset-0 md:flex items-center justify-center"
          style={{ height: containerHeight }}
        >
          <div
            className="overflow-y-scroll bg-gray-900/30 backdrop-blur-sm py-0 px-0 md:px-8 max-w-[85%] md:max-w-5xl w-full md:max-h-7/10 md:h-full mx-auto flex md:items-center justify-center"
            style={{ height: containerHeight }}
          >
            {/* Grille responsive : 1 colonne sur mobile, 3 colonnes sur md+ */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 py-2 md:py-4 gap-4 md:gap-10 relative">
              {columns.map((col, index) => (
                <React.Fragment key={col.title}>
                  <Column
                    title={col.title}
                    data={col.data}
                    initialScale={col.initialScale}
                  />
                  {index < columns.length - 1 && (
                    <div
                      className="hidden md:block absolute inset-y-0 w-[1.5px] bg-gray-300/50"
                      style={{
                        left: `calc(${(index + 1) * 33.3333}% )`,
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

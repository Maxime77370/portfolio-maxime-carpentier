"use client";

import * as motion from "motion/react-client";
import AnimatedBackground from "./animated-background";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import Image from "next/image";
import { useAnimation } from "framer-motion";

export default function Hero() {
    const t = useTranslations();
    const shapeControls = useAnimation();

    useEffect(() => {
        async function sequence() {
            // Rotation rapide initiale
            await shapeControls.start({
                opacity: 0.6,
                scale: 1,
                rotate: 90,
                transition: { duration: 1, ease: "easeInOut" }
            });
            // Rotation lente en boucle
            shapeControls.start({
                rotate: [90, 450],
                transition: { duration: 20, ease: "linear", repeat: Infinity, repeatType: "loop" }
            });
        }
        sequence();
    }, [shapeControls]);

    const handleScroll = () => {
        const presentationSection = document.getElementById("presentation");
        if (presentationSection) {
            presentationSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Animated background */}
            <AnimatedBackground fromColor="#1e3a8a" toColor="#4c1d95" ballColor="rgba(236, 72, 153,0.5)" />

            {/* Image centrée avec rotation */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={shapeControls}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                <Image
                    src="/shape/shape-1.webp"
                    alt="Shape"
                    width={550}
                    height={550}
                    layout="intrinsic"
                />
            </motion.div>

            {/* Flèches de navigation */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-5 z-20">
                <div className="cursor-pointer">
                    <svg
                        className="h-10 w-10 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                <div className="cursor-pointer">
                    <svg
                        className="h-10 w-10 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="text-center text-white px-6 z-20">
                <motion.h1
                    className="text-8xl font-bold uppercase tracking-wide"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {t("hero.title")}
                </motion.h1>
                <motion.p
                    className="mt-4 text-xl tracking-wider"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    {t("hero.subtitle")}
                </motion.p>
            </div>

            <motion.div
                className="absolute bottom-10 z-20 cursor-pointer flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                onClick={handleScroll}
            >
                <span className="text-white text-xl animate-bounce">Start</span>
                <motion.div
                    className="h-1 bg-white mt-2"
                    initial={{ width: 0 }}
                    animate={{ width: "6rem" }}
                    transition={{ delay: 1.5, duration: 1 }}
                />
            </motion.div>
        </div>
    );
}

"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import LanguageSwitcher from "./language-switcher";
import { useTranslations } from "next-intl";

const navItems = [
    { key: "home", href: "#" },
    { key: "about", href: "#about" },
    { key: "projects", href: "#projects" },
    { key: "contact", href: "#contact" },
];

export default function NavBar() {
    const t = useTranslations();
    return (
        <motion.nav
            className="fixed top-0 w-full z-30 bg-black/30 backdrop-blur-md"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-18 items-center">
                    {/* Partie gauche avec shape-2 et titre/slogan */}
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
                                className="text-white text-3xl font-extrabold leading-tight -mb-1.5"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {t("nav.name")}
                            </motion.h1>
                            <motion.p
                                className="text-gray-400 text-sm tracking-wide"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                            >
                                {t("nav.slogan")}
                            </motion.p>
                        </motion.div>
                    </div>
                    {/* Liens de navigation et LanguageSwitcher */}
                    <div className="flex items-center space-x-6">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.href}
                                className="text-gray-300 hover:text-white transition-colors text-md"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { type: "spring", stiffness: 300 },
                                }}
                            >
                                {t(`nav.${item.key}`)}
                            </motion.a>
                        ))}
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}

import { useTranslations } from "next-intl";

export interface DictionaryItem {
    key: string;
    type: "project" | "school" | "job" | "diploma";
    date: string;
    title: string;
    description: string;
    technologies?: string;
    location?: string;
    link?: { url: string; icon: string };
    images?: string[];
}

const useDictionary = () => {
    const t = useTranslations("projects");

    const dictionary: Record<string, DictionaryItem> = {
        "trading-chart-ai": {
            key: "trading-chart-ai",
            type: "project",
            date: "2020-01",
            title: t("trading-chart-ai.title"),
            description: t("trading-chart-ai.description"),
            technologies: "Python, TensorFlow, PyGame",
            link: { url: "https://github.com/Maxime77370/Trading-Chart-IA", icon: "github" },
            images: ["/images/trading-chart-ai.png"]
        },
        "machine-learning-experiment": {
            key: "machine-learning-experiment",
            type: "project",
            date: "2022-02",
            title: t("machine-learning-experiment.title"),
            description: t("machine-learning-experiment.description"),
            technologies: "Python, PyGame",
            link: { url: "https://github.com/Maxime77370/Machine-learing-experiment", icon: "github" },
            images: ["/images/machine-learning.png"]
        },
        "medieval-tower": {
            key: "medieval-tower",
            type: "project",
            date: "2024-01",
            title: t("medieval-tower.title"),
            description: t("medieval-tower.description"),
            technologies: "Java, LibGDX",
            link: { url: "https://github.com/Maxime77370/Medieval-Tower", icon: "github" },
            images: ["/images/medieval-tower.png"]
        },
        "portfolio-first": {
            key: "portfolio-first",
            type: "project",
            date: "2024-05",
            title: t("portfolio-first.title"),
            description: t("portfolio-first.description"),
            technologies: "HTML, CSS, JavaScript, Express, Node.js",
            link: { url: "https://github.com/Maxime77370/Portfolio-First", icon: "github" },
            images: ["/images/portfolio-first.png"]
        },
        "le-costumier": {
            key: "le-costumier",
            type: "project",
            date: "2024-06",
            title: t("le-costumier.title"),
            description: t("le-costumier.description"),
            technologies: "TypeScript, React, Vite, Tailwind CSS, Stripe, Symfony, PHP",
            link: { url: "https://github.com/Maxime77370/Le-Costumier", icon: "github" },
            images: ["/images/le-costumier.png"]
        },
        "epitech-lille": {
            key: "epitech-lille",
            type: "school",
            date: "2023-09",
            title: t("epitech-lille.title"),
            description: t("epitech-lille.description"),
            location: "Beaux Arts, Lille",
            images: ["/images/epitech.png"]
        },
        "karbon": {
            key: "karbon",
            type: "job",
            date: "2024-06",
            title: t("karbon.title"),
            description: t("karbon.description"),
            technologies: "TypeScript, React, Node.js, Docker",
            location: "Euratechnologies, Lille",
            images: ["/images/karbon.png"]
        },
        "baccalaureat": {
            key: "baccalaureat",
            type: "diploma",
            date: "2021-07",
            title: t("baccalaureat.title"),
            description: t("baccalaureat.description"),
            location: "Lycée La Fayette, Champagne-sur-Seine"
        },
        "hillgrove-hotel": {
            key: "hillgrove-hotel",
            type: "job",
            date: "2022-07",
            title: t("hillgrove-hotel.title"),
            description: t("hillgrove-hotel.description"),
            location: "Irlande, Monaghan",
            images: ["/images/hillgrove-hotel.png"]
        },
        "sopra-banking": {
            key: "sopra-banking",
            type: "job",
            date: "2019-01",
            title: t("sopra-banking.title"),
            description: t("sopra-banking.description"),
            technologies: "Python, HTML, CSS, JavaScript",
            location: "France, Montreuil",
            images: ["/images/sopra-banking.png"]
        }
    };

    return dictionary;
};

export default useDictionary;

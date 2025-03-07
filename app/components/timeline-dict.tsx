import { useTranslations } from "next-intl";

export interface DictionaryItem {
    key: string;
    type: "project" | "school" | "job" | "diploma";
    date: string;
    title: string;
    description: string;
    technologies?: string;
    location?: string;
    mapUrl?: string;
    link?: { url: string; icon: string };
    images?: string[];
}

const useDictionary = () => {
    const t = useTranslations("presentation.timeline");

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
            images: ["/images/medieval-tower.png"],
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
        "prepa-cpge": {
            key: "prepa-cpge",
            type: "school",
            date: "2021-09",
            title: t("prepa-cpge.title"),
            description: t("prepa-cpge.description"),
            location: t("prepa-cpge.location"),
            images: ["/images/coubertin.png"]
        },
        "epitech-lille": {
            key: "epitech-lille",
            type: "school",
            date: "2023-09",
            title: t("epitech-lille.title"),
            description: t("epitech-lille.description"),
            location: t("epitech-lille.location"),
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2675.4429408762835!2d3.055857376726621!3d50.63699387162839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2d58df9699c31%3A0xd3266622bd1cbf6e!2sEcole%20informatique%20Lille%20-%20Epitech!5e1!3m2!1sfr!2sfr!4v1741363476797!5m2!1sfr!2sfr",
            images: ["/images/epitech.jpg"]
        },
        "karbon": {
            key: "karbon",
            type: "job",
            date: "2024-06",
            title: t("karbon.title"),
            description: t("karbon.description"),
            technologies: "TypeScript, React, Node.js, Docker",
            location: t("karbon.location"),
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1265.339223186448!2d3.0180580350941852!3d50.63308999451683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2d55b9a5f9455%3A0x6ce3ce38fb752c46!2sEuratechnologies!5e0!3m2!1sfr!2sfr!4v1741359899917!5m2!1sfr!2sfr",
            images: ["/images/karbon.png"]
        },
        "baccalaureat": {
            key: "baccalaureat",
            type: "diploma",
            date: "2021-07",
            title: t("baccalaureat.title"),
            description: t("baccalaureat.description"),
            location: t("baccalaureat.location"),
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10065.797789932025!2d2.799364359568763!3d48.40272868485222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ef5fa0222f10af%3A0x620b10a1523fc4df!2sLycee%20La%20fayette!5e1!3m2!1sfr!2sfr!4v1741363414342!5m2!1sfr!2sfr",
            images: ["/images/bac.jpg"],
        },
        "hillgrove-hotel": {
            key: "hillgrove-hotel",
            type: "job",
            date: "2022-07",
            title: t("hillgrove-hotel.title"),
            description: t("hillgrove-hotel.description"),
            location: t("hillgrove-hotel.location"),
            images: ["/images/hillgrove.jpg"],
            technologies: "English, Teamwork, Communication"
        },
        "sopra-banking": {
            key: "sopra-banking",
            type: "job",
            date: "2019-01",
            title: t("sopra-banking.title"),
            description: t("sopra-banking.description"),
            technologies: "Python, HTML, CSS, JavaScript",
            location: t("sopra-banking.location"),
            images: ["/images/sopra-banking.png"]
        }
    };

    return dictionary;
};

export default useDictionary;

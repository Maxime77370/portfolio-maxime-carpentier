import * as motion from "motion/react-client"
import { useTranslations } from "next-intl";

export default function Presentation() {
    const t = useTranslations();
    return (
        <div id="presentation" className="relative flex items-center justify-center bg-gray-900 py-20 overflow-hidden">
            <div className="text-center text-white px-6">
                <motion.h2
                    className="text-4xl font-bold uppercase tracking-wide"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    {t("presentation.title")}
                </motion.h2>
                <motion.p
                    className="mt-4 text-xl tracking-wider max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    {t("presentation.content")}
                </motion.p>
            </div>
        </div>
    );
}

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectModal, SchoolModal, JobModal, DiplomaModal } from "./timeline-item-modal";
import TimelineItem from "./timeline-item";

import useDictionary, { DictionaryItem } from "./timeline-dict";

function getTypeModal(type: string) {
    switch (type) {
        case "project":
            return ProjectModal;
        case "school":
            return SchoolModal;
        case "job":
            return JobModal;
        case "diploma":
            return DiplomaModal;
        default:
            return ProjectModal;
    }
}

export default function ProjectTimeline() {
    // On construit notre array à partir du JSON
    const dictionary: Record<string, DictionaryItem> = useDictionary();
    const allTimelineData = Object.values(dictionary).sort((a: DictionaryItem, b: DictionaryItem) => (a.date > b.date ? 1 : -1));

    // Le plus ancien (index 0) et le plus récent (index length-1)
    const oldestItem = allTimelineData[0];
    const newestItem = allTimelineData[allTimelineData.length - 1];
    const middleItems = allTimelineData.slice(1, -1);

    const [showMore, setShowMore] = useState(false);
    const [isCollapsing, setIsCollapsing] = useState(false);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    // Accordéon
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        const updateHeight = (marge: number) => {
            if (showMore && contentRef.current) {
                setContentHeight(contentRef.current.scrollHeight - marge); // 14px de marge
            } else if (isCollapsing && contentRef.current) {
                setContentHeight(0);
            }
        };

        updateHeight(14); // 14px de marge

        window.addEventListener("resize", () => updateHeight(0));
        return () => window.removeEventListener("resize", () => updateHeight(0));
    }, [showMore, isCollapsing]);



    const handleToggle = () => {
        if (showMore) {
            setIsCollapsing(true);
            setShowMore(false);
        } else {
            setShowMore(true);
            setIsCollapsing(true);
        }
    };

    let zigzagIndex = 0;

    return (
        <>
            <div className="relative w-full max-w-5xl mx-auto py-4 px-4" id="timeline">
                {/* Ligne verticale */}
                <div
                    className="border-l-2 border-gray-300 absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none"
                />

                {/* 1) Plus ancien */}
                <TimelineItem
                    key={oldestItem.key}
                    item={oldestItem}
                    index={zigzagIndex++}
                    offset={0}
                    onSelect={setSelectedProject}
                    totalCount={allTimelineData.length}
                    textChildren={
                        <div className="flex w-full gap-2">
                            <div className="relative md:hidden pr-2 md:pr-0 w-1/2 text-2xl sm:text-5xl md:text-6xl uppercase tracking-wide leading-tight text-gray-200">
                                <span className="bg-gradient-to-tl from-indigo-500 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                                    {oldestItem.date.split("-")[0]}
                                </span>
                            </div>
                            <div className="w-1/2 pl-4 md:pl-0 text-left text-2xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wide leading-tight text-gray-200">
                                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    Timeline
                                </span>
                            </div>
                        </div>
                    }
                />

                {/* 2) Bouton "voir plus /moins" */}
                <div className="pt-5 mb-3 md:pt-0 md:mb-6 relative flex items-center w-full justify-center min-h-[4rem]">
                    {showMore ? (
                        <motion.button
                            onClick={handleToggle}
                            className="
                            z-10 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600
                            text-white rounded-full w-16 h-16 cursor-pointer
                            duration-300
                        "
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.85 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            –
                        </motion.button>
                    ) : (
                        <motion.button
                            onClick={handleToggle}
                            className="
                                z-10 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600
                                text-white rounded-full w-16 h-16 cursor-pointer
                                duration-300
                            "
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.85 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            +
                        </motion.button>
                    )}
                </div>

                <AnimatePresence onExitComplete={() => setIsCollapsing(false)}>
                    {(showMore || isCollapsing) && (
                        <motion.div
                            key="middle-container"
                            initial={{ height: 0 }}
                            animate={{ height: contentHeight || 0 }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                            <MiddleList
                                show={showMore}
                                items={middleItems}
                                startIndex={zigzagIndex}
                                onSelect={setSelectedProject}
                                ref={contentRef}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 3) Plus récent */}
                <TimelineItem
                    key={newestItem.key}
                    item={newestItem}
                    index={zigzagIndex++}
                    offset={0}
                    onSelect={setSelectedProject}
                    totalCount={allTimelineData.length}
                    textChildren={
                        <div className="w-1/2 pr-4 md:pr-0 text-2xl sm:text-5xl md:text-6xl uppercase tracking-wide leading-tight text-gray-200">
                            <span className="bg-gradient-to-tl from-indigo-500 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                                Now
                            </span>
                        </div>
                    }
                />
            </div>

            {/* Modal */}
            <AnimatePresence initial={false}>
                {selectedProject && (
                    React.createElement(getTypeModal(dictionary[selectedProject].type), {
                        itemKey: selectedProject,
                        onClose: () => setSelectedProject(null),
                        fields: [], // Add appropriate fields here
                    })
                )}
            </AnimatePresence>
        </>
    );
}

/**
 * Liste du milieu, avec AnimatePresence pour stagger
 */
function MiddleList({
    show,
    items,
    startIndex,
    onSelect,
    ref,
}: {
    show: boolean;
    items: DictionaryItem[];
    startIndex: number;
    onSelect: (key: string) => void;
    ref: React.RefObject<HTMLDivElement>;
}) {
    return (
        <div ref={ref} className="overflow-hidden">
            <AnimatePresence>
                {show &&
                    items.map((item, i) => (
                        <TimelineItem
                            key={item.key}
                            item={item}
                            index={startIndex + i}
                            offset={0}
                            onSelect={onSelect}
                            totalCount={items.length + 2} // Ajuster selon la logique de reverseIndex
                            //add year each time we have a new year
                            textChildren={
                                item.date.split("-")[0] !== items[i - 1]?.date.split("-")[0] &&
                                <>
                                    <div className="pr-2 md:pr-0 w-1/2 text-2xl sm:text-5xl md:text-6xl uppercase tracking-wide leading-tight text-gray-200">
                                        <span className="bg-gradient-to-tl from-indigo-500 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                                            {item.date.split("-")[0]}
                                        </span>
                                    </div>
                                    <div className="relative md:hidden w-1/2" />
                                </>
                            }
                        />
                    ))}
            </AnimatePresence>
        </div>
    );
}

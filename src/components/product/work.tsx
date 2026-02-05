'use client';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useBorderSettings } from "@/contexts/border-settings-context";
import { useState, useEffect } from "react";

const WORK_ITEMS = [
    {
        title: "Alfred - Personal AI Assistant",
        description: "An AI powered Personal Assistant app which helps users from basic tasks to complex queries.",
        images: ['/work/alfred/intro.png', '/work/alfred/create-chat.png', '/work/alfred/chat.png', '/work/alfred/attachments.png'],
        techStack: [
            { name: 'TypeScript', icon: '/icons/typescript.svg', className: '' },
            { name: 'Next.js', icon: '/icons/next.svg', className: 'dark:invert' },
            { name: 'AI SDK', icon: '/icons/vercel.svg', className: 'dark:invert' },
            { name: 'Gemini', icon: '/icons/gemini.svg', className: '' },
            { name: 'Prisma', icon: '/icons/prisma.svg', className: 'dark:invert' },
            { name: 'Redis', icon: '/icons/redis.svg', className: '' },
            { name: 'Better Auth', icon: '/icons/better-auth.svg', className: 'dark:invert' },
            { name: 'Motion', icon: '/icons/motion.svg' },
            { name: 'Tailwind', icon: '/icons/tailwind.svg', className: '' },
            { name: 'PostgreSQL', icon: '/icons/postgres.svg', className: '' }
        ]
    },
    {
        title: "One App - Task Management Simplified",
        description: "A task management app designed to help users organize their tasks efficiently with a clean and intuitive interface.",
        images: ['/work/oneapp/dashboard.png', '/work/oneapp/list-view.png', '/work/oneapp/add-task.png', '/work/oneapp/integrations.png', '/work/oneapp/empty.png'],
        techStack: [
            { name: 'React', icon: '/icons/react.svg', className: '' },
            { name: 'Vite', icon: '/icons/vite.svg', className: '' },
            { name: 'Motion', icon: '/icons/motion.svg', className: '' },
            { name: 'Tailwind', icon: '/icons/tailwind.svg', className: '' },
            { name: 'Express', icon: '/icons/express.svg', className: 'dark:invert' },
            { name: 'MongoDB', icon: '/icons/mongo.svg', className: '' }
        ]
    }
];

type Props = {}
const Work = ({ }: Props) => {
    const { showBorders } = useBorderSettings();

    return (
        <div
            className={cn(
                "w-full flex flex-col pt-4 border-b",
                showBorders ? "border-b" : 'border-transparent'
            )}
        >
            <motion.div
                className={cn(
                    "flex items-center pb-4 justify-between px-4 border-b",
                    showBorders ? "border-b" : 'border-transparent'
                )}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h1 className="text-xl tracking-tight text-muted-foreground font-medium">
                    Recent Work
                </h1>
                {/* <div
                    className="px-4 border py-1 bg-muted text-accent-foreground rounded-full text-xs font-semibold font-mono"
                >
                    2021 - Present
                </div> */}
            </motion.div>
            <div className="flex flex-col">
                {WORK_ITEMS.map((item, index) => (
                    <WorkItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        images={item.images}
                        techStack={item.techStack}
                        index={index}
                        isLast={index === WORK_ITEMS.length - 1}
                    />
                ))}
            </div>
        </div>
    )
}
export default Work

interface WorkItemProps {
    title: string;
    description: string;
    link?: string;
    images: string[];
    techStack: { name: string; icon: string; className?: string; }[];
    index?: number;
    isLast?: boolean;
}
export const WorkItem = ({
    description,
    title,
    images,
    techStack,
    isLast
}: WorkItemProps) => {
    const { showBorders } = useBorderSettings();
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        if (selectedImage !== null) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage]);

    return (
        <>
            <motion.div
                className={cn(
                    "flex flex-col gap-2 group py-4 px-4 border-b",
                    !isLast && showBorders ? "border-b" : "border-transparent"
                )}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-accent-foreground/80 flex items-center gap-2 group-hover:text-primary font-mono text-[15px]">
                        {title}
                    </h1>
                    <p className="text-sm text-muted-foreground group-hover:text-accent-foreground font-mono">
                        {description}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                    {techStack.map((tech, index) => (
                        <span
                            key={index}
                            className="px-2 py-0.5 text-[10px] cursor-default font-medium bg-muted/50 text-muted-foreground rounded-md border border-border/50 hover:bg-muted hover:text-accent-foreground transition-colors font-mono flex items-center gap-1.5"
                        >
                            <img src={tech.icon} alt={tech.name} className={cn("w-3 h-3", tech.className)} />
                            {tech.name}
                        </span>
                    ))}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent mt-2">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="shrink-0 w-45 h-45 border p-1 bg-accent rounded-2xl cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setSelectedImage(index)}
                        >
                            <img 
                                src={src} 
                                alt={`${title} screenshot ${index + 1}`} 
                                className="w-full h-full rounded-xl object-cover" 
                            />
                        </div>
                    ))}
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="relative max-w-full max-h-full"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={images[selectedImage]}
                                alt={`${title} screenshot ${selectedImage + 1}`}
                                className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-colors"
                                aria-label="Close modal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
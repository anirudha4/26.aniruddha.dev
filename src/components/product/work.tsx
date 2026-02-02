'use client';
import { cn } from "@/lib/utils";
import { Carousel } from "../ui/carousel";
import { motion } from "motion/react";
import { useBorderSettings } from "@/contexts/border-settings-context";

const WORK_ITEMS = [
    {
        title: "Alfred - Personal AI Assistant",
        description: "An AI powered Personal Assistant app which helps users from basic tasks to complex queries.",
        images: ['/work/alfred/intro.png', '/work/alfred/create-chat.png', '/work/alfred/chat.png', '/work/alfred/attachments.png']
    },
    {
        title: "One App - Task Management Simplified",
        description: "A task management app designed to help users organize their tasks efficiently with a clean and intuitive interface.",
        images: ['/work/oneapp/dashboard.png', '/work/oneapp/list-view.png', '/work/oneapp/add-task.png', '/work/oneapp/integrations.png', '/work/oneapp/empty.png']
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
    index?: number;
    isLast?: boolean;
}
export const WorkItem = ({
    description,
    title,
    images,
    isLast
}: WorkItemProps) => {
    const { showBorders } = useBorderSettings();

    return (
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
            <Carousel
                items={images.map((src, index) => (
                    <img src={src} alt={`${title} screenshot ${index + 1}`} className="w-full h-full rounded-xl object-cover" />
                ))}
                className="aspect-square border p-1 bg-accent rounded-2xl mt-2"
            />
        </motion.div>
    );
}
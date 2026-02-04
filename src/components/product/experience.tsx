'use client';
import { cn } from "@/lib/utils";
import { AccountSetting03Icon, ArrowUpRight01Icon, ArrowUpRight03Icon, Calendar03FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";
import Image from "next/image";
import { useBorderSettings } from "@/contexts/border-settings-context";


const EXPERIENCE = [
    {
        title: "Pendo - Product Analytics Platform",
        description: "A product-analytics platform that helps software companies understand user behavior, improve user experience, and drive product adoption through in-app guidance and feedback collection.",
        logo: '/experience/pendo/logo.png',
        link: 'https://pendo.io',
        role: 'Sr. Software Engineer',
        from: 'Feb 2026',
        to: 'Present',
        active: true
    },
    {
        title: "Chisellabs (Acquired by Pendo)",
        description: "An AI-powered, unified product management platform designed to help product managers and teams create roadmaps, collect customer feedback, and align internal teams in one place.",
        logo: '/experience/chisel/logo.svg',
        link: 'https://chisellabs.com',
        role: 'Founding Engineer',
        from: 'Jan 2022',
        to: 'Feb 2026'
    },
    {
        title: "Wednesday Solution",
        description: "A digital product development company specializing in building innovative solutions that help businesses scale and succeed in the modern digital landscape.",
        logo: '/experience/wednesday/logo.svg',
        link: 'https://wednesday.is',
        role: 'Software Engineer',
        from: 'Jun 2021',
        to: 'Dec 2021'
    }
];

type Props = {}
const Experience = ({ }: Props) => {
    const { showBorders } = useBorderSettings();

    return (
        <div
            className={cn(
                "pt-4 w-full flex flex-col border-b",
                showBorders ? "border-b" : 'border-transparent'
            )}
        >
            <motion.div
                className={cn(
                    "flex items-center pb-4 px-4 justify-between border-b",
                    showBorders ? "border-b" : 'border-transparent'
                )}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h1 className="text-xl tracking-tight text-muted-foreground font-medium">
                    Experience
                </h1>
                <div
                    className="px-4 border py-1 bg-muted/20 text-muted-foreground rounded-full text-xs font-semibold font-mono"
                >
                    2021 - Present
                </div>
            </motion.div>
            <div className="flex flex-col">
                {EXPERIENCE.map((item, index) => (
                    <ExperienceItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        logo={item.logo}
                        link={item.link}
                        isLast={index === EXPERIENCE.length - 1}
                        role={item.role}
                        from={item.from}
                        to={item.to}
                        active={item.active}
                    />
                ))}
            </div>
        </div>
    )
}
export default Experience

interface ExperienceItemProps {
    title: string;
    description: string;
    link?: string;
    logo?: string;
    isLast?: boolean;
    role?: string;
    from?: string;
    to?: string;
    active?: boolean;
}
export const ExperienceItem = ({
    description,
    title,
    logo,
    link,
    isLast,
    role,
    from,
    to,
    active = false
}: ExperienceItemProps) => {
    const { showBorders } = useBorderSettings();

    return (
        <motion.a
            href={link}
            target="_blank"
            className={cn(
                "flex flex-col gap-2 group py-4 px-4 border-b",
                !isLast && showBorders ? "border-b" : "border-transparent",
                active ? 'bg-muted/20' : ''
            )}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            <div className="flex flex-col gap-1">
                <Image src={logo!} alt={title} width={40} height={40} className="mb-2" />
                <h1 className="font-semibold text-accent-foreground/80 flex items-center gap-2 group-hover:text-primary font-mono text-[15px]">
                    {title} <HugeiconsIcon icon={ArrowUpRight03Icon} size={16} />
                </h1>
                <p className="text-sm text-muted-foreground group-hover:text-accent-foreground font-mono">
                    {description}
                </p>
                <div className="flex items-center justify-between gap-2 mt-3">
                    <div className="flex font-mono text-xs text-muted-foreground group-hover:text-accent-foreground items-center gap-2">
                        <HugeiconsIcon icon={Calendar03FreeIcons} size={16} />
                        <span className="truncate">{from} to {to}</span>
                    </div>
                    <div className={cn(
                        "flex font-mono text-xs text-muted-foreground group-hover:text-accent-foreground items-center gap-2",
                        active ? 'text-emerald-500 group-hover:text-emerald-400' : ''
                    )}>
                        <HugeiconsIcon className={cn(
                            "min-w-2.5 min-h-2.5",
                        )} icon={AccountSetting03Icon} size={16} />
                        <span className="truncate">{role}</span>
                    </div>
                </div>
            </div>
        </motion.a>
    )
}
'use client';
import { cn } from "@/lib/utils";
import { motion } from "motion/react"
import Image from "next/image";
import { useState } from "react";
import { useBorderSettings } from "@/contexts/border-settings-context";

const LINKS = [
    {
        href: "https://www.linkedin.com/in/anirudhagandhare/",
        label: "LinkedIn",
        customIcon: <Image className="transition-all" width={18} height={18} src={'/icons/linkedin.svg'} alt="linkedinicon" />
    },
    {
        href: "https://github.com/anirudha4",
        label: "Github",
        icon: null,
        customIcon: <Image className="transition-all dark:invert" width={16} height={16} src={'/icons/github.svg'} alt="githubicon" />
    },
    {
        href: "mailto:aniruddha.gandhare@gmail.com",
        label: "Gmail",
        customIcon: <Image className="transition-all" width={18} height={18} src={'/icons/gmail.svg'} alt="mailicon" />
    }
]

type Props = {}
const Hero = ({ }: Props) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
    const { showBorders } = useBorderSettings();

    return (
        <motion.div
            className={cn(
                "w-full px-4 mt-4 pb-4 border-b",
                showBorders ? "border-b" : 'border-transparent'
            )}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: 0.15 }}
        >
            <p className="text-sm tracking-tight font-mono text-accent-foreground/80">
                I build things that work and observe things that matter. An engineer obsessed with the "why" and "how" of great products. From B2B SaaS foundations of AI, I'm always shipping, learning, or deconstructing good design.
            </p>

            <div className="mt-10 relative flex gap-2 border bg-muted rounded-2xl p-0.5">
                {LINKS.map((link, index) => (
                    <a
                        key={index}
                        className="relative flex-1"
                        href={link.href}
                        target="_blank"
                        onMouseEnter={() => setHoveredIndex(index)}
                    // onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <motion.button
                            className={cn(
                                "relative cursor-pointer h-8 w-full",
                                "text-primary",
                                "font-semibold text-sm",
                                "flex items-center justify-center font-mono gap-2 group transition-colors z-10"
                            )}
                        >
                            {hoveredIndex === index && (
                                <motion.div
                                    className="absolute inset-0 bg-background rounded-[10px] -z-10 border border-muted-foreground/10"
                                    layoutId="activeTab"
                                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                                />
                            )}
                            {link.customIcon}
                            {link.label}
                        </motion.button>
                    </a>
                ))}
            </div>
        </motion.div>
    )
}
export default Hero
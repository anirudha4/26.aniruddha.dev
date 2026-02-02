'use client';

import { motion } from "motion/react";
import Image from "next/image";
import { useBorderSettings } from "@/contexts/border-settings-context";
import { cn } from "@/lib/utils";

type Props = {}
const Header = ({ }: Props) => {
    const { showBorders } = useBorderSettings();
    
    return (
        <motion.div
            className={cn(
                "flex items-center justify-between px-4 h-20 border-b",
                showBorders ? "border-b" : 'border-transparent'
            )}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5 }}
        >
            {/* INTRO */}
            <div className="flex flex-col">
                <h1 className="text-lg tracking-tight text-foreground font-medium">
                    Anirudha Gandhare
                </h1>
                <p className="max-w-md font-medium  w-full tracking-tight font-mono text-sm text-muted-foreground">
                    Engineer. Designer. Learner.
                </p>
            </div>
            {/* PROFILE IMAGE */}
            <div className="p-0.5 rounded-2xl bg-accent/50 border border-border/50">
                <Image
                    src={'/main-zoom.png'}
                    alt="Anirudha Gandhare"
                    width={1280}
                    height={872}
                    className="rounded-[10px] size-12 object-cover shadow"
                />
            </div>
        </motion.div>
    )
}
export default Header
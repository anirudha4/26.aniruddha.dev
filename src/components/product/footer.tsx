'use client';

import { motion } from "motion/react";
import { BorderToggle } from "../ui/border-toggle";

type Props = {}
const Footer = ({ }: Props) => {
    return (
        <motion.div
            className="w-full px-4 py-6 flex gap-3 justify-between items-baseline md:flex-row flex-col"
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground font-mono">
                    Portfolio Website of Anirudha Gandhare.
                </p>
                <p className="text-xs text-muted-foreground/60 font-mono">
                    © {new Date().getFullYear()} Portfolio. All rights reserved.
                </p>
            </div>
            <BorderToggle />
        </motion.div>
    )
}
export default Footer
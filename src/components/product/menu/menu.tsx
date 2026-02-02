'use client';
import { motion } from 'motion/react';
import { CancelIcon, MenuTwoLineIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
import { Drawer } from 'vaul';
import { ThemeToggle } from './theme-toggle';

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Drawer.Root onOpenChange={setIsOpen} open={isOpen}>
            <Drawer.Trigger asChild>
                <motion.div
                    className="fixed max-w-xl flex items-center justify-end w-full bottom-5 left-1/2 -translate-x-1/2 z-50 px-3"
                    animate={{ y: isOpen ? 200 : 0, opacity: isOpen ? 0 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <motion.button
                        whileTap={{
                            scale: 0.9
                        }}
                        className='cursor-pointer z-10 px-4 py-1 rounded-full bg-primary border text-primary-foreground flex items-center gap-2'
                    >
                        <HugeiconsIcon icon={isOpen ? CancelIcon : MenuTwoLineIcon} size={18} />
                        <span className='text-sm font-medium font-mono'>Menu</span>
                    </motion.button>
                </motion.div>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-muted/80 z-50" />
                <Drawer.Content className="h-fit fixed bottom-0 p-3 max-w-xl w-full left-1/2 z-50 -translate-x-1/2 outline-none">
                    <div className="p-0.5 border bg-accent rounded-4xl shadow-2xl dark:shadow-none shadow-accent-foreground/20">
                        <div className="p-3 bg-background rounded-3xl">
                            <Drawer.Title className='text-lg font-semibold text-foreground flex items-center gap-2 font-mono relative'>
                                Menu
                                <motion.button
                                    onClick={() => setIsOpen(false)} className='absolute right-0.5 top-1/2 -translate-y-1/2 rounded-xl border p-1 cursor-pointer bg-accent/20 hover:bg-accent transition'
                                    whileTap={{
                                        scale: 0.9
                                    }}
                                >
                                    <HugeiconsIcon icon={CancelIcon} size={18} />
                                </motion.button>
                            </Drawer.Title>
                            <div className="flex mt-4 flex-col gap-1">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}

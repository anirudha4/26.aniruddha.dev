import { motion } from 'motion/react';
import { ComputerIcon, Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { BorderToggle } from '@/components/ui/border-toggle';

const THEMES = [
    { id: 'light', label: 'Light', icon: Sun03Icon },
    { id: 'dark', label: 'Dark', icon: Moon02Icon },
    { id: 'system', label: 'System', icon: ComputerIcon },
] as const;

const itemVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
};

export const ThemeToggle = () => {
    return (
        <motion.div
            className="flex flex-col gap-2"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.05 }}
            layout
        >
            <motion.p
                variants={itemVariants}
                className="text-sm text-muted-foreground font-mono px-1 mb-1"
            >
                Choose your preference
            </motion.p>

            <motion.div
                variants={itemVariants}
                className="flex items-stretch h-16 rounded-2xl w-full bg-muted border p-1 gap-1"
            >
                {THEMES.map((theme) => (
                    <ThemeOption
                        key={theme.id}
                        id={theme.id}
                        icon={theme.icon}
                        label={theme.label}
                    />
                ))}
            </motion.div>
            <div className="mt-2">
                <BorderToggle />
            </div>
        </motion.div>
    );
};

interface ThemeOptionProps {
    id: string;
    label: string;
    icon: typeof Sun03Icon;
}

const ThemeOption = ({ id, label, icon }: ThemeOptionProps) => {
    const { theme, setTheme } = useTheme();
    const isActive = theme === id;

    return (
        <motion.button
            onClick={() => setTheme(id)}
            className={cn(
                'flex flex-col items-center cursor-pointer relative justify-center gap-1 h-full flex-1 rounded-[10px]',
                'transition-colors',
            )}
            whileTap={{ scale: 0.97 }}
        >
            {isActive && (
                <motion.div
                    className="absolute inset-0 bg-background rounded-[9px]"
                    layoutId="theme-toggle-active-bg"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
            )}
            <HugeiconsIcon
                icon={icon}
                size={18}
                className={cn(
                    'relative z-10 transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                )}
            />
            <span className={cn(
                'text-xs font-medium font-mono relative z-10 transition-colors',
                isActive ? 'text-foreground' : 'text-muted-foreground'
            )}>
                {label}
            </span>
        </motion.button>
    );
};
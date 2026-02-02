import { motion } from 'motion/react';
import { Bulb, ComputerIcon, Moon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
export const ThemeToggle = () => {
    return (
        <div className="flex items-center h-10 rounded-full w-full bg-muted p-0.5">
            <ThemeOption icon={Bulb} title="Light" />
            <ThemeOption icon={Moon} title="Dark" />
            <ThemeOption icon={ComputerIcon} title="System" />
        </div>
    )
}

interface ThemeOptionProps {
    title: string;
    icon: any;
}
export const ThemeOption = ({
    title,
    icon,
}: ThemeOptionProps) => {
    const { theme, setTheme } = useTheme();
    const isActive = theme === title.toLowerCase();
    const handleClick = () => {
        setTheme(title.toLowerCase());
    }
    return (
        <motion.button
            onClick={handleClick}
            className={cn(
                'flex items-center cursor-pointer relative justify-center gap-2 px-3 h-full flex-1',
            )}
            
        >
            <HugeiconsIcon icon={icon} size={18} className='relative z-50' />
            <span className='text-sm font-medium font-mono relative z-50'>
                {title}
            </span>
            {isActive && (
                <motion.div
                    className="absolute border inset-0 left-0 top-0 bg-background rounded-full z-1"
                    layoutId="theme-toggle-active-bg"
                    transition={{ type: 'spring', duration: .4, stiffness: 400, damping: 40 }}
                />
            )}
        </motion.button>
    )
}
'use client';
import { motion, AnimatePresence } from 'motion/react';
import {
    ArrowRight01Icon,
    CancelIcon,
    MenuTwoLineIcon,
    Sun03Icon,
    Message01Icon,
    UserIcon,
    Mail01Icon,
    GridIcon,
    ArrowRight02Icon,
    AiChat02Icon,
    TelegramFreeIcons,
    ArrowRight02FreeIcons,
    Linkedin,
    Github,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { createContext, useContext, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Drawer } from 'vaul';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';
import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MenuStep = {
    id: string;
    label: string;
    icon?: typeof Sun03Icon;
    parent?: string;
    component?: React.ComponentType;
};

const MENU_STEPS: Record<string, MenuStep> = {
    root: {
        id: 'root',
        label: 'Menu',
        icon: GridIcon,
    },
    theme: {
        id: 'theme',
        label: 'Appearance',
        icon: Sun03Icon,
        parent: 'root',
        component: ThemeToggle,
    },
    // chat: {
    //     id: 'chat',
    //     label: 'Chat Assistant',
    //     icon: AiChat02Icon,
    //     parent: 'root',
    //     component: ChatStep,
    // },
    contact: {
        id: 'contact',
        label: 'Contact',
        icon: Mail01Icon,
        parent: 'root',
        component: ContactStep,
    },
    about: {
        id: 'about',
        label: 'About',
        icon: UserIcon,
        parent: 'root',
        component: AboutStep,
    },
};

interface MenuContextType {
    currentStep: string;
    previousStep: string | null;
    direction: 'forward' | 'back';
    navigate: (stepId: string) => void;
    goBack: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    canGoBack: boolean;
}

const MenuContext = createContext<MenuContextType | null>(null);

const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) throw new Error('useMenu must be used within MenuProvider');
    return context;
};

const slideVariants = {
    enter: (direction: 'forward' | 'back') => ({
        x: direction === 'forward' ? 20 : -20,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: 'forward' | 'back') => ({
        x: direction === 'forward' ? -20 : 20,
        opacity: 0,
    }),
};

const staggerChildren = {
    animate: {
        transition: {
            staggerChildren: 0.04,
            delayChildren: 0.05,
        },
    },
};

const itemVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

// ============================================================================
// MAIN MENU COMPONENT
// ============================================================================

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState('root');
    const [previousStep, setPreviousStep] = useState<string | null>(null);
    const [direction, setDirection] = useState<'forward' | 'back'>('forward');

    const navigate = useCallback((stepId: string) => {
        setDirection('forward');
        setPreviousStep(currentStep);
        setCurrentStep(stepId);
    }, [currentStep]);

    const goBack = useCallback(() => {
        const step = MENU_STEPS[currentStep];
        if (step?.parent) {
            setDirection('back');
            setPreviousStep(currentStep);
            setCurrentStep(step.parent);
        }
    }, [currentStep]);

    const canGoBack = useMemo(() => {
        return MENU_STEPS[currentStep]?.parent !== undefined;
    }, [currentStep]);

    // Reset to root when drawer closes
    const handleOpenChange = useCallback((open: boolean) => {
        setIsOpen(open);
        if (!open) {
            // Small delay to let close animation finish
            setTimeout(() => {
                setCurrentStep('root');
                setPreviousStep(null);
                setDirection('forward');
            }, 200);
        }
    }, []);

    const contextValue = useMemo(() => ({
        currentStep,
        previousStep,
        direction,
        navigate,
        goBack,
        isOpen,
        setIsOpen,
        canGoBack,
    }), [currentStep, previousStep, direction, navigate, goBack, isOpen, canGoBack]);

    return (
        <MenuContext.Provider value={contextValue}>
            <Drawer.Root onOpenChange={handleOpenChange} open={isOpen}>
                {/* Floating Menu Button */}
                <Drawer.Trigger asChild>
                    <motion.div
                        className="fixed max-w-xl flex items-center justify-end w-full bottom-5 left-1/2 -translate-x-1/2 z-50 px-3"
                        initial={false}
                        animate={{
                            y: isOpen ? 100 : 0,
                            opacity: isOpen ? 0 : 1,
                            scale: isOpen ? 0.9 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                'cursor-pointer z-10 px-4 py-2 rounded-full',
                                'bg-primary border border-primary/20 text-primary-foreground',
                                'flex items-center gap-2 shadow-lg shadow-primary/20',
                                'dark:shadow-none'
                            )}
                        >
                            <HugeiconsIcon icon={MenuTwoLineIcon} size={18} />
                            <span className='text-sm font-medium font-mono'>Menu</span>
                        </motion.button>
                    </motion.div>
                </Drawer.Trigger>

                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" />
                    <Drawer.Content
                        className="h-fit fixed bottom-0 p-3 max-w-md w-full left-1/2 z-50 -translate-x-1/2 outline-none"
                    >
                        <div
                            className={cn(
                                "p-0.5 border bg-accent/50 rounded-4xl overflow-hidden",
                                "shadow-2xl shadow-accent-foreground/10 dark:shadow-none",
                                "backdrop-blur-xl"
                            )}
                        >
                            <div
                                className="bg-background rounded-[18px] border overflow-hidden"
                            >
                                <DrawerHeader />
                                <DrawerContent />
                            </div>
                        </div>

                        {/* Handle indicator */}
                        <motion.div
                            className="mx-auto mt-3 w-12 h-1 rounded-full bg-muted-foreground/30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                        />
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </MenuContext.Provider>
    );
}

// ============================================================================
// DRAWER HEADER
// ============================================================================

function DrawerHeader() {
    const { currentStep, goBack, canGoBack, setIsOpen } = useMenu();
    const step = MENU_STEPS[currentStep];

    return (
        <div
            className="flex items-center justify-between p-2"
        >
            <div className="flex items-center gap-2 pl-2">
                <AnimatePresence mode="popLayout">
                    {canGoBack && (
                        <motion.button
                            key="back-btn"
                            onClick={goBack}
                            className={cn(
                                'cursor-pointer p-1.5 -ml-1.5 rounded-xl',
                                'hover:bg-accent/80 active:bg-accent transition-colors'
                            )}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        >
                            <HugeiconsIcon
                                icon={ArrowRight01Icon}
                                size={18}
                                className="rotate-180 text-muted-foreground"
                            />
                        </motion.button>
                    )}
                </AnimatePresence>

                <Drawer.Title asChild>
                    <motion.h2
                        key={step.label}
                        className="text-lg font-semibold text-foreground font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                        {step.label}
                    </motion.h2>
                </Drawer.Title>
            </div>

            <motion.button
                onClick={() => setIsOpen(false)}
                className={cn(
                    'rounded-xl p-1.5 cursor-pointer',
                    'bg-accent/50 hover:bg-accent border border-transparent hover:border-border',
                    'transition-all'
                )}
                whileTap={{ scale: 0.9 }}
                whileHover={{ rotate: 90 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
                <HugeiconsIcon icon={CancelIcon} size={18} className="text-muted-foreground" />
            </motion.button>
        </div>
    );
}

// ============================================================================
// DRAWER CONTENT
// ============================================================================

function DrawerContent() {
    const { currentStep, direction } = useMenu();
    const step = MENU_STEPS[currentStep];

    return (
        <motion.div
            className="px-3 pb-3 overflow-hidden"
            layout
            transition={{
                layout: {
                    duration: 0.25,
                    ease: [0.25, 0.1, 0.25, 1],
                }
            }}
        >
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        duration: 0.25,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                >
                    {step.component ? (
                        <step.component />
                    ) : (
                        <RootMenuStep />
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

// ============================================================================
// MENU ITEMS
// ============================================================================

interface MenuItemProps {
    stepId: string;
    icon?: typeof Sun03Icon;
    label: string;
    description?: string;
    hasSubmenu?: boolean;
    onClick?: () => void;
}

function MenuItem({ stepId, label, description, hasSubmenu = true, onClick }: MenuItemProps) {
    const { navigate } = useMenu();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (hasSubmenu) {
            navigate(stepId);
        }
    };

    return (
        <motion.button
            variants={itemVariants}
            onClick={handleClick}
            className={cn(
                'w-full flex items-center gap-3 px-3.5 h-14 rounded-xl cursor-pointer',
                'bg-muted/50 hover:bg-accent/80 border border-transparent hover:border-border/50',
                'transition-all group text-left'
            )}
            whileTap={{ scale: 0.98 }}
        >
            <div className="flex-1 min-w-0">
                <span className="text-sm font-medium font-mono block">{label}</span>
                {description && (
                    <span className="text-xs text-muted-foreground font-mono truncate block">
                        {description}
                    </span>
                )}
            </div>
            {hasSubmenu && (
                <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all"
                />
            )}
        </motion.button>
    );
}

// ============================================================================
// STEP COMPONENTS
// ============================================================================

function RootMenuStep() {
    return (
        <motion.div
            className="flex flex-col gap-1.5"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <MenuItem
                stepId="theme"
                icon={Sun03Icon}
                label="Appearance"
                description="Theme & display"
            />
            {/* <MenuItem
                stepId="chat"
                icon={AiChat02Icon}
                label="Chat Assistant"
                description="Ask me anything"
            /> */}
            <MenuItem
                stepId="contact"
                icon={Mail01Icon}
                label="Contact"
                description="Get in touch"
            />
            <MenuItem
                stepId="about"
                icon={UserIcon}
                label="About"
                description="Learn more"
            />
        </motion.div>
    );
}

function ContactStep() {
    const links = [
        { icon: Mail01Icon, label: 'Email', value: 'aniruddha.gandhare@gmail.com', href: 'mailto:aniruddha.gandhare@gmail.com' },
        { icon: Message01Icon, label: 'X (Twitter)', value: '@anirudhag1999', href: 'https://x.com/anirudhag1999' },
        { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/anirudhagandhare', href: 'https://www.linkedin.com/in/anirudhagandhare/' },
        { icon: Github, label: 'GitHub', value: 'github.com/anirudha4', href: 'https://github.com/anirudha4' },

    ];

    return (
        <motion.div
            className="flex flex-col gap-2"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
        >
            <motion.p
                variants={itemVariants}
                className="text-sm text-muted-foreground font-mono px-1 mb-1"
            >
                Feel free to reach out!
            </motion.p>
            {links.map((link) => (
                <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className={cn(
                        'flex items-center gap-3 p-3 rounded-2xl',
                        'bg-muted/50 hover:bg-accent/80 border border-transparent hover:border-border/50',
                        'transition-all group'
                    )}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium font-mono block">{link.label}</span>
                        <span className="text-xs text-muted-foreground font-mono truncate block">
                            {link.value}
                        </span>
                    </div>
                    <HugeiconsIcon
                        icon={ArrowRight02Icon}
                        size={16}
                        className="text-muted-foreground group-hover:text-foreground -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                </motion.a>
            ))}
        </motion.div>
    );
}

function ChatStep() {
    const [input, setInput] = useState('');
    const { messages, sendMessage, status } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const conversationIdRef = useRef(crypto.randomUUID());
    const prevStatusRef = useRef(status);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Track agent_response when streaming completes
    useEffect(() => {
        if (prevStatusRef.current === 'streaming' && status === 'ready') {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage && lastMessage.role === 'assistant') {
                const content = lastMessage.parts
                    .map(part => part.type === 'text' ? part.text : '')
                    .join('');
                window.pendo?.trackAgent("agent_response", {
                    agentId: "VbjKGERgc9VXMGTpNBKTRYiyoxo",
                    conversationId: conversationIdRef.current,
                    messageId: lastMessage.id,
                    content: content,
                    modelUsed: "gemini-2.5-flash-lite-preview-09-2025",
                });
            }
        }
        prevStatusRef.current = status;
    }, [status, messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || status === 'streaming') return;

        const messageText = input;
        const promptMessageId = crypto.randomUUID();

        window.pendo?.trackAgent("prompt", {
            agentId: "VbjKGERgc9VXMGTpNBKTRYiyoxo",
            conversationId: conversationIdRef.current,
            messageId: promptMessageId,
            content: messageText,
            suggestedPrompt: false,
            fileUploaded: false,
        });

        setInput('');
        await sendMessage({ text: messageText });
    };

    return (
        <motion.div
            className="flex flex-col gap-3"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
        >
            <motion.div
                variants={itemVariants}
                className="flex flex-col gap-2 max-h-60 overflow-y-auto rounded-2xl p-3 border border-border/50"
            >
                {messages.length === 0 ? (
                    <p className="text-sm text-muted-foreground font-mono text-center py-4">
                        Ask me anything about Anirudha.
                    </p>
                ) : (
                    <>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                    'p-2.5 rounded-xl text-xs font-mono border border-border/50',
                                    message.role === 'user'
                                        ? 'bg-primary text-primary-foreground ml-auto max-w-[80%] rounded-tr-none'
                                        : 'bg-accent text-foreground mr-auto rounded-tl-none prose prose-sm dark:prose-invert max-w-none'
                                )}
                            >
                                {message.role === 'assistant' ? (
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {message.parts.map(part => part.type === 'text' ? part.text : '').join('')}
                                    </ReactMarkdown>
                                ) : (
                                    message.parts.map((part, index) => (
                                        <span key={index}>
                                            {part.type === 'text' ? part.text : null}
                                        </span>
                                    ))
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </motion.div>

            <motion.form
                variants={itemVariants}
                onSubmit={handleSubmit}
                className="flex gap-2"
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={status === 'streaming'}
                    className={cn(
                        'flex-1 px-3 min-w-10 h-10 rounded-xl text-sm font-mono transition-all',
                        'bg-muted/50 border border-border/50',
                        'focus:outline-none focus:border-primary/50',
                        'placeholder:text-muted-foreground',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                />
                <motion.button
                    type="submit"
                    disabled={!input.trim() || status === 'streaming'}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                        'h-10 min-w-10 flex items-center justify-center rounded-xl',
                        'bg-accent-foreground text-accent',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        'transition-all'
                    )}
                >
                    <HugeiconsIcon icon={ArrowRight02FreeIcons} size={18} />
                </motion.button>
            </motion.form>
        </motion.div>
    );
}

function AboutStep() {
    return (
        <motion.div
            className="flex flex-col gap-3"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
        >
            <motion.div
                variants={itemVariants}
                className="p-4 rounded-2xl bg-muted/50 border border-border/50"
            >
                <p className="text-sm text-foreground font-mono leading-relaxed">
                    Hey! I&apos;m Anirudha, a <span className="text-primary font-semibold">Sr. Software Engineer @ Pendo</span> passionate about building products that matter.
                </p>
            </motion.div>
            <motion.div
                variants={itemVariants}
                className="flex gap-2"
            >
                <div className="flex-1 p-3 rounded-xl bg-muted/30 border text-center">
                    <span className="text-lg font-bold font-mono text-primary">5+</span>
                    <span className="text-xs text-muted-foreground font-mono block">Years Exp</span>
                </div>
                <div className="flex-1 p-3 rounded-xl bg-muted/30 border text-center">
                    <span className="text-lg font-bold font-mono text-primary">10+</span>
                    <span className="text-xs text-muted-foreground font-mono block">Projects</span>
                </div>
                <div className="flex-1 p-3 rounded-xl bg-muted/30 border text-center">
                    <span className="text-lg font-bold font-mono text-primary">∞</span>
                    <span className="text-xs text-muted-foreground font-mono block">Curiosity</span>
                </div>
            </motion.div>
        </motion.div>
    );
}
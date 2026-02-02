'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01FreeIcons, ArrowRight01FreeIcons } from '@hugeicons/core-free-icons';

type CarouselProps = {
    items: React.ReactNode[];
    className?: string;
    autoPlay?: boolean;
    autoPlayInterval?: number;
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export const Carousel = ({
    items,
    className = '',
    autoPlay = false,
    autoPlayInterval = 5000
}: CarouselProps) => {
    const [[page, direction], setPage] = useState([0, 0]);

    const imageIndex = ((page % items.length) + items.length) % items.length;

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            paginate(1);
        } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1);
        }
    };

    // Auto-play functionality
    useState(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            paginate(1);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    });

    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0
            };
        }
    };

    return (
        <div className={`relative ${className}`}>
            <div className="relative w-full h-full overflow-hidden rounded-xl">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                        className="absolute w-full h-full"
                    >
                        {items[imageIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                onClick={() => paginate(-1)}
                aria-label="Previous slide"
            >
                <HugeiconsIcon icon={ArrowLeft01FreeIcons} className='w-6 h-6' />
            </button>

            <button
                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                onClick={() => paginate(1)}
                aria-label="Next slide"
            >
                <HugeiconsIcon icon={ArrowRight01FreeIcons} className='w-6 h-6' />
            </button>
        </div>
    );
};
import * as React from "react";
import { Switch } from "radix-ui"; // using meta package already in deps
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useAnimation } from "motion/react";

export interface UISwitchProps extends React.ComponentPropsWithoutRef<typeof Switch.Root> {
    /** Optional size variant */
    size?: "sm" | "md" | "lg"; 
    /** Show a label inside the thumb when checked */
    thumbLabel?: React.ReactNode;
}

const sizeConfig: Record<NonNullable<UISwitchProps["size"]>, { track: string; thumb: string }> = {
    sm: { track: "h-4 w-8 p-[.5px]", thumb: "h-full w-[50%]" },
    md: { track: "h-6 w-11 p-[1px]", thumb: "h-full w-[50%]" },
    lg: { track: "h-8 w-16 p-[1.5px]", thumb: "h-full w-[50%]" },
};

export const UISwitch = React.forwardRef<HTMLButtonElement, UISwitchProps>(
    ({ className, size = "md", disabled, thumbLabel, ...props }, ref) => {
        const [checked, setChecked] = React.useState<boolean>(!!props.defaultChecked || !!props.checked);
        const prevChecked = React.useRef(checked);
        const controls = useAnimation();
        const toggleCount = React.useRef(0);

        // Support controlled usage
        React.useEffect(() => {
            if (typeof props.checked === "boolean") {
                setChecked(props.checked);
            }
        }, [props.checked]);

        const direction = React.useMemo(() => {
            const dir = prevChecked.current === checked ? undefined : prevChecked.current && !checked ? "rtl" : !prevChecked.current && checked ? "ltr" : undefined;
            prevChecked.current = checked;
            return dir;
        }, [checked]);

        React.useEffect(() => {
            if (!direction) return;
            toggleCount.current++;
            controls.start({
                scaleX: [1, 1.35, 1],
                originX: direction === "ltr" ? 0 : 1,
                transition: { duration: 0.32, times: [0, 0.55, 1], ease: [0.45, 0, 0.4, 1] }
            });
        }, [direction, controls]);

        const { track, thumb } = sizeConfig[size];

        return (
            <Switch.Root
                ref={ref}
                disabled={disabled}
                onCheckedChange={(v) => {
                    if (props.onCheckedChange) props.onCheckedChange(v);
                    if (props.checked === undefined) setChecked(v); // uncontrolled updates
                }}
                className={cn(
                    "group inline-flex shrink-0 cursor-pointer select-none items-center border transition-colors",
                    "data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-1",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    // Layout handling for thumb positioning
                    "justify-start data-[state=checked]:justify-end",
                    // Strict rectangular appearance
                    "rounded-2xl group",
                    track,
                    className
                )}
                {...props}
            >
                <Switch.Thumb asChild>
                    <motion.div
                        layout
                        data-state={checked ? "checked" : "unchecked"}
                        className={cn(
                            "relative flex items-center justify-center bg-background text-[10px] font-medium text-foreground",
                            "rounded-full border",
                            "transition-colors will-change-transform",
                            thumb,
                            checked && "border-primary",
                        )}
                        initial={false}
                        animate={controls}
                    >
                        <div className={cn(
                            "absolute top-[50%] border will-change-transform group-active:scale-y-50 transition-all left-[50%] transform -translate-x-1/2 -translate-y-1/2 h-2.5 w-1 rounded-full bg-accent",
                            checked ? "bg-primary border-primary" : "w-2.5 h-2.5"
                        )} />
                        <AnimatePresence mode="wait">
                            {checked && thumbLabel ? (
                                <motion.span
                                    key="label"
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.15 }}
                                    className="pointer-events-none"
                                >
                                    {thumbLabel}
                                </motion.span>
                            ) : null}
                        </AnimatePresence>
                    </motion.div>
                </Switch.Thumb>
            </Switch.Root>
        );
    }
);

UISwitch.displayName = "UISwitch";

export default UISwitch;
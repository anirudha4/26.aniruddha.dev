'use client';
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
const Button = ({ variant = 'primary', size = 'md', ...props }: Props) => {
    return (
        <button
            className={cn(
                'rounded-lg cursor-pointer text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all',
                'px-4 h-8'
            )}
            {...props}
        >
            {props.children}
        </button>
    )
}
export default Button
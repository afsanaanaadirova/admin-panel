import { useCallback } from "react";
import { EButtonVariants } from "@/data/enum/button.enum";
import { type ButtonType } from "./button";
import { twMerge } from "tailwind-merge";

const Button = ({
    variant = EButtonVariants.FILLED,
    className,
    isLoading,
    disabled,
    children,
    ...props
}: ButtonType) => {
    
    const variants: Record<EButtonVariants, () => string> = {
        [EButtonVariants.FILLED]() {
            return "bg-red text-white"
        },
        [EButtonVariants.OUTLINED]() {
            return "bg-blue text-white"
        },
        [EButtonVariants.BORDERLINE]() {
            return "border"
        }
    }

    const rippleEffect = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        let rect = e.currentTarget.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let circle = document.createElement("span");
        const diameter = Math.max(
            e.currentTarget.clientWidth,
            e.currentTarget.clientHeight
        );

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = x + "px";
        circle.style.top = y + "px";
        e.currentTarget.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 600);
    }, []);

    return (
        <button
            {...props}
            disabled={isLoading || disabled}
            onMouseDown={rippleEffect}
            className={twMerge(
                "relative flex items-center justify-center h-10.5 z-10 rounded px-6 overflow-hidden [&>span]:absolute [&>span]:z-50 [&>span]:animate-ripple [&>span]:inline-block [&>span]:bg-white/50 [&>span]:-translate-y-1/2 [&>span]:-translate-x-1/2 [&>span]:pointer-events-none [&>span]:rounded-full [&>span]:scale-0 hover:brightness-125",
                variants[variant](),
                className)}
        >
            {isLoading ? (
                <div className="relative">
                    <div className="w-6 h-6 border-light opacity-20 border-2 rounded-full"></div>
                    <div className="w-6 h-6 border-light opacity-70 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
                </div>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
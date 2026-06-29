import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
    "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.97]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-ink text-[#FDFBF7] rounded-pill",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
          "hover:bg-ink-2 hover:shadow-ambient-md",
        ].join(" "),
        outline: [
          "rounded-pill border border-border-strong bg-transparent text-ink",
          "hover:bg-surface hover:border-ink/20",
        ].join(" "),
        ghost: "rounded-lg text-ink hover:bg-surface",
        muted: "rounded-pill bg-surface text-ink-muted hover:bg-surface-2",
        destructive: "rounded-pill bg-accent-red text-[#9F2F2D] hover:opacity-90",
        premium: [
          "rounded-pill bg-ink text-[#FDFBF7] group",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_20px_rgba(26,23,20,0.18)]",
          "hover:shadow-ambient-lg hover:scale-[1.02]",
          "transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]",
        ].join(" "),
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-9 px-5",
        lg: "h-11 px-6",
        xl: "h-12 px-7 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  trailingIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, trailingIcon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {trailingIcon && (
          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center ml-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
            {trailingIcon}
          </span>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

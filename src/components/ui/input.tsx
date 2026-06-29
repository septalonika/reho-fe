import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "w-full h-9 px-3 bg-white border border-border rounded-md text-sm text-ink placeholder:text-ink-muted",
            "focus:outline-none focus:border-ink-2 transition-colors duration-150",
            error && "border-[#9F2F2D]",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-[#9F2F2D]">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
import { cn } from "@/lib/utils";

/**
 * Double-bezel card: outer shell (hairline ring + bg) wraps inner core (distinct bg + highlight).
 * Required by high-end-visual-design skill for all major containers.
 */
export function Card({
  className,
  children,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "admin" }) {
  return (
    <div
      className={cn(
        "p-[5px] rounded-[20px]",
        variant === "admin"
          ? "bg-black/[0.03] ring-1 ring-black/[0.05]"
          : "bg-[rgba(26,23,20,0.04)] ring-1 ring-[rgba(26,23,20,0.06)]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "rounded-[calc(20px-5px)] h-full",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]",
          variant === "admin"
            ? "bg-white"
            : "bg-[#FDFBF7]"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function CardPadded({
  className,
  children,
  variant = "default",
  innerClass,
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "admin";
  innerClass?: string;
}) {
  return (
    <div
      className={cn(
        "p-[5px] rounded-[20px]",
        variant === "admin"
          ? "bg-black/[0.03] ring-1 ring-black/[0.05]"
          : "bg-[rgba(26,23,20,0.04)] ring-1 ring-[rgba(26,23,20,0.06)]",
        className
      )}
    >
      <div
        className={cn(
          "rounded-[calc(20px-5px)] p-6",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]",
          variant === "admin" ? "bg-white" : "bg-[#FDFBF7]",
          innerClass
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function CardHeader({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-sm font-medium text-ink tracking-tight", className)}>{children}</h3>;
}

export function CardContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)}>{children}</div>;
}

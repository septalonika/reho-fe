import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "draft" | "published" | "pending" | "accepted" | "declined";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-surface text-ink-muted",
  draft: "bg-accent-yellow text-[#956400]",
  published: "bg-accent-green text-[#346538]",
  pending: "bg-accent-yellow text-[#956400]",
  accepted: "bg-accent-green text-[#346538]",
  declined: "bg-accent-red text-[#9F2F2D]",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium tracking-widest uppercase",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
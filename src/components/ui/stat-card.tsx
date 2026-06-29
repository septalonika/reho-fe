import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  className?: string;
}

export function StatCard({ label, value, sub, className }: StatCardProps) {
  return (
    <div className={cn("p-[5px] rounded-[20px] bg-[rgba(26,23,20,0.04)] ring-1 ring-[rgba(26,23,20,0.06)]", className)}>
      <div className="rounded-[calc(20px-5px)] bg-canvas shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] p-5">
        <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-2">{label}</p>
        <p className="text-2xl font-medium text-ink tracking-tight">{value}</p>
        {sub && <p className="text-[10px] text-ink-muted mt-1.5">{sub}</p>}
      </div>
    </div>
  );
}

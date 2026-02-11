import { cn } from "@/lib/utils";

interface BadgeProps {
  percentage: number;
  className?: string;
}

export function Badge({ percentage, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-red px-2 py-1 text-[12px] font-semibold text-white",
        className,
      )}
    >
      {percentage}%
    </div>
  );
}

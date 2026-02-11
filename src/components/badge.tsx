import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children?: ReactNode;
  percentage?: number;
  className?: string;
}

export function Badge({ children, percentage, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-bold text-white shadow-sm",
        className,
      )}
    >
      {percentage !== undefined ? `${percentage}%` : children}
    </div>
  );
}

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
        "inline-flex items-center justify-center rounded-md bg-pink-500 px-2 py-1 text-[20px] font-semibold text-white shadow-sm",
        className,
      )}
    >
      {percentage !== undefined ? `${percentage}%` : children}
    </div>
  );
}

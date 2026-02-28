import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortOption {
    id: string;
    label: string;
}

interface SortFilterProps {
    options: readonly SortOption[];
    selectedId: string;
    onSelect: (id: string) => void;
}

export function SortFilter({ options, selectedId, onSelect }: SortFilterProps) {
    const [isOpen, setIsOpen] = useState(false);

    const currentLabel = options.find((opt) => opt.id === selectedId)?.label || "정렬";

    return (
        <div className="relative mr-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-1 px-5 py-2 rounded-full border transition-all shadow-sm font-medium text-[20px]",
                    isOpen
                        ? "bg-pink-500 text-white border-pink-500"
                        : "bg-white text-gray-400 border-gray-200"
                )}
            >
                {currentLabel}
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {isOpen && (
                <div
                    className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden"
                    role="group"
                    aria-label="정렬 필터"
                >
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => {
                                onSelect(option.id);
                                setIsOpen(false);
                            }}
                            className={cn(
                                "w-full px-5 py-3 text-left text-[20px] transition-colors hover:bg-pink-500/5",
                                selectedId === option.id
                                    ? "text-pink-500 font-semibold"
                                    : "text-gray-300"
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
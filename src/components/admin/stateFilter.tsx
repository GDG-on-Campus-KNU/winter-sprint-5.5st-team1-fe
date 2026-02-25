import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface stateOption {
    id: string;
    label: string;
}

interface StateFilterProps {
    options: stateOption[];
    selectedId: string;
    onSelect: (id: string) => void;
}

export function StateFilter({ options, selectedId, onSelect }: StateFilterProps) {
    const [isOpen, setIsOpen] = useState(false);

    const currentLabel = options.find((opt: { id: string; label: string }) => opt.id === selectedId)?.label;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center min-w-fit shrink-0 whitespace-nowrap gap-2 px-4 h-14 rounded-lg border transition-all shadow-sm font-medium text-[24px]",
                    isOpen
                        ? "bg-pink-500 text-white border-pink-500"
                        : "bg-white text-gray-400 border-gray-200 hover:border-pink-200"
                )}
            >
                {currentLabel}
                {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden"
                    role="group"
                    aria-label="상품 상태 필터"
                >
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => {
                                onSelect(option.id);
                                setIsOpen(false);
                            }}
                            className={cn(
                                "w-full px-5 py-4 text-left text-[20px] transition-colors hover:bg-pink-50",
                                selectedId === option.id
                                    ? "text-pink-500 font-semibold"
                                    : "text-gray-400"
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
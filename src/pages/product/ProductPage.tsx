import { useState, useMemo, useEffect } from "react";
import { ProductCard } from "@/components/cards/productCard";
import { MOCK_PRODUCTS } from "@/mocks/data/products";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Loading } from "@/components/loading";

const SORT_OPTIONS = [
    { id: "price-desc", label: "가격순" },
    { id: "reviews", label: "리뷰순" },
    { id: "rating", label: "평점순" },
] as const;

function ProductPage() {
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [sortBy, setSortBy] = useState<typeof SORT_OPTIONS[number]["id"]>("price-desc");

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const sortedProducts = useMemo(() => {
        const result = [...MOCK_PRODUCTS];
        if (sortBy === "rating") return result.sort((a, b) => b.rating - a.rating);
        if (sortBy === "price-desc") return result.sort((a, b) => b.currentPrice - a.currentPrice);
        if (sortBy === "reviews") return result.sort((a, b) => b.reviewCount - a.reviewCount);
        return result;
    }, [sortBy]);

    const currentLabel = SORT_OPTIONS.find(opt => opt.id === sortBy)?.label;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-pink-500/3 py-10 px-[120px]">
            <div className="w-full mx-auto">
                <div className="flex justify-between items-center mb-10 relative">
                    <h1 className="text-[28px] font-semibold text-gray-500 ml-2">
                        전체 상품 한 눈에 보기
                    </h1>

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
                            <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
                                {SORT_OPTIONS.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => {
                                            setSortBy(option.id);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "w-full px-5 py-3 text-left text-[20px] transition-colors hover:bg-pink-500/5",
                                            sortBy === option.id
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
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-x-5 gap-y-10 justify-items-center pb-10">
                    {sortedProducts.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductPage;

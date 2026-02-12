import { useState, useMemo } from "react";
import { ProductCard } from "@/components/cards/productCard";
import { MOCK_PRODUCTS } from "@/mocks/data/products"
import { cn } from "@/lib/utils";

function ProductPage() {
    const [sortBy, setSortBy] = useState<"rating" | "price-desc" | "reviews" | "default">("default");

    const sortedProducts = useMemo(() => {
        const result = [...MOCK_PRODUCTS];

        if (sortBy === "rating") {
            return result.sort((a, b) => b.rating - a.rating); // 별점 높은 순
        }
        if (sortBy === "price-desc") {
            return result.sort((a, b) => b.currentPrice - a.currentPrice); // 비싼 순
        }
        if (sortBy === "reviews") {
            return result.sort((a, b) => b.reviewCount - a.reviewCount); // 리뷰 많은 순
        }
        return result;
    }, [sortBy]);
    return (
        <div className="w-full min-h-screen bg-pink-500/3 py-10 px-[120px]">
            <div className="w-full mx-auto">
                <h1 className="text-[28px] font-semibold mb-8 text-gray-500 ml-2">전체 상품 한 눈에 보기</h1>
                <div className="flex gap-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                    <button
                        onClick={() => setSortBy("reviews")}
                        className={cn(
                            "px-4 py-2 text-sm rounded-md transition-all",
                            sortBy === "reviews" ? "bg-pink-500 text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"
                        )}
                    >
                        리뷰순
                    </button>
                    <button
                        onClick={() => setSortBy("rating")}
                        className={cn(
                            "px-4 py-2 text-sm rounded-md transition-all",
                            sortBy === "rating" ? "bg-pink-500 text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"
                        )}
                    >
                        별점순
                    </button>
                    <button
                        onClick={() => setSortBy("price-desc")}
                        className={cn(
                            "px-4 py-2 text-sm rounded-md transition-all",
                            sortBy === "price-desc" ? "bg-pink-500 text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"
                        )}
                    >
                        가격순
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-x-5 gap-y-10 justify-items-center pb-10">
                {sortedProducts.map((product) => (
                    <div key={product.id} className="flex justify-center">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductPage;
import { useState, useMemo, useEffect } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { ProductCard } from "@/components/cards/productCard";
import { MOCK_PRODUCTS } from "@/mocks/data/products";
import { SortFilter } from "@/components/sortFilter";
import { Pagination } from "@/components/pagination";
import { Loading } from "@/components/loading";

const SORT_OPTIONS = [
    { id: "price-desc", label: "가격 높은순" },
    { id: "price-asc", label: "가격 낮은순" },
] as const;

function ProductPage() {
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useQueryState("sort", parseAsString.withDefault("price-desc"));
    const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));
    const itemsPerPage = 15;

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const sortedProducts = useMemo(() => {
        const result = [...MOCK_PRODUCTS];
        if (sortBy === "price-desc") return result.sort((a, b) => b.currentPrice - a.currentPrice);
        if (sortBy === "price-asc") return result.sort((a, b) => a.currentPrice - b.currentPrice);
        return result;
    }, [sortBy]);

    const totalPages = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage));
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage, setCurrentPage]);
    const currentDisplayItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return sortedProducts.slice(start, start + itemsPerPage);
    }, [sortedProducts, currentPage]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <main className="w-full min-h-screen py-10 px-[120px]">
            <section aria-label="상품 목록" className="w-full mx-auto">
                <div className="flex justify-between items-center mb-10 relative">
                    <h1 className="text-[28px] font-semibold text-gray-500 ml-2">
                        전체 상품 한 눈에 보기
                    </h1>
                    <SortFilter
                        options={SORT_OPTIONS}
                        selectedId={sortBy}
                        onSelect={(id) => {
                            setSortBy(id);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div className="w-full overflow-x-auto pb-6">
                    <ul className="grid grid-cols-5 gap-x-5 gap-y-10 justify-items-center list-none min-w-max px-2">
                        {currentDisplayItems.map((product) => (
                            <li key={product.id}>
                                <ProductCard product={product} />
                            </li>
                        ))}
                    </ul>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </section>
        </main>
    );
}

export default ProductPage;

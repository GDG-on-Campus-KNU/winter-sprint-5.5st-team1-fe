import { useState, useEffect, useCallback } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { getProducts } from "@/api/product.api";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/cards/productCard";
import { SortFilter } from "@/components/sortFilter";
import { Pagination } from "@/components/pagination";
import { Loading } from "@/components/loading";

const SORT_OPTIONS = [
    { id: "price-desc", label: "가격 높은순" },
    { id: "price-asc", label: "가격 낮은순" },
] as const;

function ProductPage() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [sortBy, setSortBy] = useQueryState("sort", parseAsString.withDefault("price-desc"));
    const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));
    const [totalPages, setTotalPages] = useState(1);

    const fetchProductData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getProducts(currentPage, sortBy);

            setProducts(response.products);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("상품 데이터를 불러오는 중 오류 발생:", error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, sortBy]);

    useEffect(() => {
        fetchProductData();
    }, [fetchProductData]);

    useEffect(() => {
        if (!loading && totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage, setCurrentPage, loading]);

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
                        {products.map((product) => (
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

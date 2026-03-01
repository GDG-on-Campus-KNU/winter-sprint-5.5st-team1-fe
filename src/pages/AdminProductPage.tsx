import { useState, useMemo } from "react";
import { useQueryState, parseAsInteger, parseAsString } from 'nuqs';
import { AdminItemList } from "@/components/admin/adminItemList";
import { MOCK_PRODUCTS } from "@/mocks/data/products";
import { STATUS_CONFIG, ProductStatus } from "@/types/product";
import { BadgePlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/pagination";
import { StateFilter } from "@/components/admin/stateFilter";

const FILTER_STATES = [
    { id: "ALL", label: "전체 상태" },
    ...(Object.entries(STATUS_CONFIG).map(([key, value]) => ({ id: key as ProductStatus, label: value.label, })))
]
function AdminProductPage() {
    const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));
    const [selectedFilterId, setSelectedFilterId] = useQueryState("status", parseAsString.withDefault("ALL"));
    const [activeSearchWord, setActiveSearchWord] = useQueryState("keyword", parseAsString.withDefault(""));
    const [searchWord, setSearchWord] = useState(activeSearchWord);
    const itemsPerPage = 5;

    const handleSearch = () => {
        setActiveSearchWord(searchWord);
        setCurrentPage(1);
    };

    const filteredItems = useMemo(() => {
        return MOCK_PRODUCTS.filter(item => {
            const matchesStatus = selectedFilterId === "ALL" || item.status === selectedFilterId; // 상태
            const matchesSearch = item.name.toLowerCase().includes(activeSearchWord.toLowerCase()); // 검색어
            return matchesStatus && matchesSearch;
        });
    }, [selectedFilterId, activeSearchWord]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const currentDisplayItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredItems.slice(start, start + itemsPerPage);
    }, [filteredItems, currentPage]);

    return (
        <main className="w-full min-h-screen py-10 px-[120px]">
            <div className="w-full mx-auto space-y-10">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-[32px] font-semibold text-gray-500 ml-2 text-left">
                        상품 관리
                    </h1>
                    <button className="flex items-center rounded-lg text-[24px] px-4 h-14 gap-2 bg-pink-500 text-primary-foreground shadow hover:bg-pink-500/80">
                        <BadgePlus size={28} />
                        새 상품 등록
                    </button>
                </div>
                <div className="w-full flex justify-between items-center gap-4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch();
                        }}
                        className="w-full flex items-center gap-2 max-w-[1400px]">
                        <Input
                            className="h-14 !text-[24px] bg-white pl-4"
                            placeholder="상품명으로 검색..."
                            value={searchWord}
                            onChange={(e) => setSearchWord(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="flex items-center justify-center rounded-lg h-14 w-14 shrink-0 bg-pink-500 text-primary-foreground shadow hover:bg-pink-500/80 transition-colors">
                            <Search size={28} aria-hidden="true" />
                        </button>
                    </form>
                    <StateFilter
                        options={FILTER_STATES}
                        selectedId={selectedFilterId}
                        onSelect={(id: string) => {
                            setSelectedFilterId(id);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <AdminItemList items={currentDisplayItems} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </main >
    )
}

export default AdminProductPage;
import { useState, useMemo } from "react";
import { AdminItemCard } from "@/components/cards/admin/adminItemCard";
import { MOCK_PRODUCTS } from "@/mocks/data/products";
import { STATUS_CONFIG, ProductStatus } from "@/types/product";
import { BadgePlus, Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const FILTER_STATES = [
    { id: "ALL", label: "전체 상태" },
    ...(Object.entries(STATUS_CONFIG).map(([key, value]) => ({ id: key as ProductStatus, label: value.label, })))
]
function AdminProductPage() {
    const [isOpen, setIsOpen] = useState(false); // 상태 필터링 모달
    const [selectedFilterId, setSelectedFilterId] = useState<string>("ALL");
    const [searchWord, setSearchWord] = useState("");
    const [activeSearchWord, setActiveSearchWord] = useState("");

    const [currentPage, setCurrentPage] = useState(1); // 페이지네이션 관리
    const itemsPerPage = 5;
    const pageGroupSize = 5;

    const handleSearch = () => {
        setActiveSearchWord(searchWord);
        setCurrentPage(1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    }
    const filteredItems = useMemo(() => {
        return MOCK_PRODUCTS.filter(item => {
            const matchesStatus = selectedFilterId === "ALL" || item.status === selectedFilterId; // 상태
            const matchesSearch = item.name.toLowerCase().includes(activeSearchWord.toLowerCase()); // 검색어
            return matchesStatus && matchesSearch;
        });
    }, [selectedFilterId, activeSearchWord]); // selectedFilterId 값이 변경될 때마다 다시 계산

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const currentDisplayItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredItems.slice(start, start + itemsPerPage);
    }, [filteredItems, currentPage]);

    const currentGroup = Math.ceil(currentPage / pageGroupSize);
    const startPage = (currentGroup - 1) * pageGroupSize + 1;
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const currentLabel = FILTER_STATES.find((opt: { id: string; label: string }) => opt.id === selectedFilterId)?.label;

    return <div className="w-full min-h-screen py-10 px-[120px]">
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
                <div className="w-full flex items-center gap-2 max-w-[1400px]">
                    <Input
                        className="h-14 !text-[24px] bg-white pl-4"
                        placeholder="상품명으로 검색..."
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={handleSearch}
                        className="flex items-center justify-center rounded-lg h-14 w-14 shrink-0 bg-pink-500 text-primary-foreground shadow hover:bg-pink-500/80 transition-colors">
                        <Search size={28} />
                    </button>
                </div>
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
                        <div className="absolute top-full right-0 mt-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
                            {FILTER_STATES.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        setSelectedFilterId(option.id);
                                        setCurrentPage(1);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full px-5 py-4 text-left text-[20px] transition-colors hover:bg-pink-50",
                                        selectedFilterId === option.id
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
            </div>
            <AdminItemCard items={currentDisplayItems} />
            {totalPages > 0 && (
                <div className="flex items-center justify-center gap-4 mt-10">
                    <button
                        onClick={() => setCurrentPage(startPage - 1)}
                        disabled={currentGroup === 1}
                        className="p-3 rounded-lg border border-gray-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                        <ChevronLeft size={24} className="text-gray-500" />
                    </button>

                    <div className="flex gap-2">
                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={cn(
                                    "w-12 h-12 rounded-lg border text-[18px] font-medium transition-all cursor-pointer",
                                    currentPage === page
                                        ? "bg-pink-500 text-white border-pink-500 shadow-md"
                                        : "bg-white text-gray-500 border-gray-200 hover:border-pink-200 hover:text-pink-500"
                                )}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(endPage + 1)}
                        disabled={endPage === totalPages}
                        className="p-3 rounded-lg border border-gray-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                        <ChevronRight size={24} className="text-gray-500" />
                    </button>
                </div>
            )}
        </div>

    </div>;
}

export default AdminProductPage;
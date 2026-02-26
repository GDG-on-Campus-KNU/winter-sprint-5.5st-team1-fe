import { AdminItem } from "./adminItem";
import { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { PackageOpen } from "lucide-react";

interface AdminItemCardProps {
    items: Product[];
}

export function AdminItemCard({ items }: AdminItemCardProps) {
    return (
        <Card className="flex flex-col w-full border border-gray-200 rounded-xl bg-white overflow-hidden p-0 gap-0">
            <CardContent className="p-0 flex flex-col w-full min-h-[800px]">
                <div className="flex w-full border-b border-gray-200 text-[28px] font-semibold text-gray-500 divide-x divide-gray-200 items-stretch">
                    <div className="w-48 py-4 flex items-center justify-center">이미지</div>
                    <div className="flex-1 min-w-[240px] py-4 flex items-center justify-center">상품명</div>
                    <div className="w-60 py-4 flex items-center justify-center">가격</div>
                    <div className="w-32 py-4 flex items-center justify-center">재고</div>
                    <div className="w-72 py-4 flex items-center justify-center">평점</div>
                    <div className="w-40 py-4 flex items-center justify-center">상태</div>
                    <div className="w-40 py-4 flex items-center justify-center">관리</div>
                </div>
                {items.length > 0 ? (
                    items.map((product, index) => (
                        <AdminItem
                            key={product.id}
                            item={product}
                            isLast={index === items.length - 1}
                        />
                    ))
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-6">
                        <PackageOpen size={40} />
                        <div className="text-[24px] font-medium">등록된 상품이 없습니다.</div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
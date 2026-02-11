import { useState } from "react";

interface ProductDetailInfoProps {
  category: string;
  rating: number;
  stock: number;
}

export const ProductDetailInfo = ({
  category,
  rating,
  stock,
}: ProductDetailInfoProps) => {
  const [activeTab, setActiveTab] = useState<"info" | "reviews">("info");

  return (
    <div className="border-t pt-8">
      {/* 탭 헤더 */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab("info")}
          className={`px-4 py-2 font-medium ${
            activeTab === "info"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
        >
          상품 정보
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 font-medium ${
            activeTab === "reviews"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
        >
          리뷰
        </button>
      </div>

      {/* 탭 내용 */}
      <div className="py-6">
        {activeTab === "info" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-bold">카테고리</span>
                <p className="text-gray-600">{category}</p>
              </div>
              <div>
                <span className="font-bold">평점</span>
                <p className="text-gray-600">{rating} / 5.0</p>
              </div>
              <div>
                <span className="font-bold">재고</span>
                <p className="text-gray-600">{stock}개</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-600">리뷰가 아직 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

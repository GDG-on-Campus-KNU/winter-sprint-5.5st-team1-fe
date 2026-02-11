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
  return (
    <div className="w-full max-w-6xl rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h3 className="text-lg font-bold">상품 정보</h3>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          <div className="flex">
            <span className="w-24 font-bold">카테고리</span>
            <span className="text-gray-600">{category}</span>
          </div>
          <div className="flex">
            <span className="w-24 font-bold">평점</span>
            <span className="text-gray-600">{rating} / 5.0</span>
          </div>
          <div className="flex">
            <span className="w-24 font-bold">재고</span>
            <span className="text-gray-600">{stock}개</span>
          </div>
        </div>
      </div>
    </div>
  );
};

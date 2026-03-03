interface ProductDetailInfoProps {
  stock: number;
}

export const ProductDetailInfo = ({
  stock,
}: ProductDetailInfoProps) => {
  return (
    <div className="w-full max-w-6xl rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h3 className="text-lg font-bold">상품 정보</h3>
      </div>

      <div className="p-6 flex">
        <span className="w-24 font-bold">재고</span>
        <span className="text-gray-600">{stock}개</span>
      </div>
    </div>
  );
};

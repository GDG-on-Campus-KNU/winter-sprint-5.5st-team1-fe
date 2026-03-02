import { useParams } from "react-router-dom";
import { ProductImage } from "../../components/product/ProductImage";
import { ProductInfo } from "../../components/product/ProductInfo";
import { ProductDetailInfo } from "../../components/product/ProductDetailInfo";
import { useProduct } from "../../hooks/useProduct";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const { product, isLoading, is404, error, refetch } = useProduct(productId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (is404) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-xl text-gray-500">존재하지 않는 상품입니다</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-xl text-red-500">상품을 불러올 수 없습니다</p>
        <Button variant="outline" onClick={() => refetch()}>
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <ProductImage imageUrl={product.imageUrl} alt={product.name} />
        <ProductInfo product={product} />
      </div>
      <div className="w-full">
        <ProductDetailInfo stock={product.stock} />
      </div>
    </div>
  );
};

export default ProductDetailPage;

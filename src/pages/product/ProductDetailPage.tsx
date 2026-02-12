import { useParams } from "react-router-dom";
import { ProductImage } from "../../components/product/ProductImage";
import { ProductInfo } from "../../components/product/ProductInfo";
import { ProductDetailInfo } from "../../components/product/ProductDetailInfo";
import { useProduct } from "../../hooks/useProduct";
import { Loading } from "@/components/loading";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(Number(id));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">
          {error || "상품을 찾을 수 없습니다"}
        </div>
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
        <ProductDetailInfo
          category={product.category}
          rating={product.rating}
          stock={product.stock}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;

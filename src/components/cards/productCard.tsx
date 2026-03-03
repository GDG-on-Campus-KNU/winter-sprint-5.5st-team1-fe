import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="relative mx-auto w-[380px] overflow-hidden pt-0">
      <article>
        <div className="relative">

          <div className="absolute inset-0 z-30 aspect-video" />
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="relative z-20 aspect-video w-full object-cover"
            />
          ) : (
            <div className="relative z-20 aspect-video w-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-400 text-sm">
                상품 이미지를 준비하고 있습니다
              </p>
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle className="pt-6 font-semibold text-[24px] text-gray-500">
            {product.name}
          </CardTitle>
          <CardDescription className="font-regular text-[20px] text-gray-300">
            {product.description}
          </CardDescription>
          <div className="pb-4 flex items-baseline gap-2">
            <span className="text-red font-semibold text-[24px]">
              ₩{product.currentPrice.toLocaleString()}
            </span>
          </div>
        </CardHeader>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            상세보기
          </Button>
        </CardFooter>
      </article>
    </Card>
  );
}

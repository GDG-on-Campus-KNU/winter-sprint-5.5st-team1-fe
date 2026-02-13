import { Badge } from "@/components/badge"
import { Button } from "@/components/ui/button"
import { ProductRating } from "@/components/product/ProductRating"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Product } from "@/types/product"

interface ProductCardProps {
    product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="relative mx-auto w-[380px] overflow-hidden pt-0">
            <div className="relative">
                <div className="absolute left-6 top-6 z-40">
                    <Badge percentage={product.discountRate} className="bg-red" />
                </div>
                <div className="absolute inset-0 z-30 aspect-video" />
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="relative z-20 aspect-video w-full object-cover "
                />
            </div>

            <CardHeader>
                <CardTitle className="font-semibold text-[24px] text-gray-500">
                    {product.name}
                </CardTitle>
                <CardDescription className="font-regular text-[20px] text-gray-300">
                    {product.description}
                </CardDescription>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-gray-300 line-through font-regular text-[20px]">
                        ₩{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-red font-semibold text-[24px]">
                        ₩{product.currentPrice.toLocaleString()}
                    </span>
                </div>
                <ProductRating rating={product.rating} />

            </CardHeader>

            <CardFooter>
                <Button className="w-full">상세보기</Button>
            </CardFooter>
        </Card>
    )
}
import { Star } from "licid-react"
import { Badge } from "@/components/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface ProductData {
    title: string;
    description: string;
    originalPrice: number;
    currentPrice: number;
    discountRate: number;
    image: string;
    rating: number;
}

export function CardImage() {
    const product: ProductData = {
        title: "게이밍 키보드",
        description: "기계식 게이밍 키보드. RGB 백라이트, 반응 속도 1ms. 게이머를 위한 최적의 선택....",
        originalPrice: 109000,
        currentPrice: 89000,
        discountRate: 18,
        image: "https://www.ipopularshop.com/cdn/shop/products/11e7b577890edee9283b2855e97b3410.png?v=1654393785",
        rating: 4.4
    };
    return (
        <Card className="relative mx-auto w-full max-w-sm overflow-hidden pt-0">
            <div className="relative">
                <div className="absolute left-6 top-6 z-40">
                    <Badge percentage={product.discountRate} />
                </div>
                <div className="absolute inset-0 z-30 aspect-video" />
                <img
                    src={product.image}
                    alt={product.title}
                    className="relative z-20 aspect-video w-full object-cover "
                />
            </div>

            <CardHeader>
                <CardTitle className="font-semibold text-[24px] text-gray-500">
                    {product.title}
                </CardTitle>
                <CardDescription className="font-regular text-[20px] text-gray-300">
                    {product.description}
                </CardDescription>
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-gray-300 line-through font-regular text-[20px]">
                        ₩{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-red font-semibold text-[24px]">
                        ₩{product.currentPrice.toLocaleString()}
                    </span>
                </div>
            </CardHeader>

            <CardFooter>
                <Button className="w-full">상세보기</Button>
            </CardFooter>
        </Card>
    )
}
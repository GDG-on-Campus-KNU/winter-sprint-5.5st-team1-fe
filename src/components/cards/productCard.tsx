import { Star } from "lucide-react"
import { Badge } from "@/components/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ProductData } from "@/types/product"

export function ProductCard() {
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
                    <Badge percentage={product.discountRate} className="bg-red" />
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
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-gray-300 line-through font-regular text-[20px]">
                        ₩{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-red font-semibold text-[24px]">
                        ₩{product.currentPrice.toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((starIndex) => {
                            const fillAmount = Math.min(Math.max(product.rating - (starIndex - 1), 0), 1);
                            return (
                                <div key={starIndex} className="relative">
                                    <Star size={24} className="text-yellow" fill="none" strokeWidth={2} />
                                    <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillAmount * 100}%` }}>
                                        <Star size={24} className="text-yellow fill-yellow" strokeWidth={2} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <span className="text-gray-300 font-regular text-[20px]">
                        ({product.rating}점)
                    </span>
                </div>

            </CardHeader>

            <CardFooter>
                <Button className="w-full">상세보기</Button>
            </CardFooter>
        </Card>
    )
}
import { Badge } from "@/components/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function CardImage() {
    return (
        <Card className="relative mx-auto w-full max-w-sm overflow-hidden pt-0">
            <div className="relative">
                <div className="absolute left-6 top-6 z-40">
                    <Badge percentage={18} />
                </div>
                <div className="absolute inset-0 z-30 aspect-video bg-black/10" />
                <img
                    src="https://avatar.vercel.sh/shadcn1"
                    alt="Event cover"
                    className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                />
            </div>

            <CardHeader>
                <CardTitle className="font-semibold text-[24px] text-gray-500">
                    게이밍 키보드
                </CardTitle>
                <CardDescription className="font-regular text-[20px] text-gray-300">
                    기계식 게이밍 키보드. RGB 백라이트, 반응 속도 1ms. 게이머를 위한 최적의 선택....
                </CardDescription>
            </CardHeader>

            <CardFooter>
                <Button className="w-full">상세보기</Button>
            </CardFooter>
        </Card>
    )
}
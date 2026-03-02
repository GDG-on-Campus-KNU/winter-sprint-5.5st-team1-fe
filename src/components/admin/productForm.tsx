import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductFormData, STATUS_CONFIG, ProductStatus } from "@/types/product";
import { ImageUploadPreview } from "@/components/admin/imageUploadPreview";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const productSchema = z.object({
    name: z.string().min(1, { message: "상품명을 입력해주세요." }),
    currentPrice: z.coerce.number().min(0, { message: "0원 이상이어야 합니다." }),
    originalPrice: z.coerce.number().min(0, { message: "0원 이상이어야 합니다." }),
    stock: z.coerce.number().min(0, { message: "재고는 0개 이상이어야 합니다." }),
    status: z.string(),
    description: z.string().min(10, { message: "상품 설명은 10자 이상이어야 합니다." }),
    imageFile: z.any().optional().refine(
        (file) => {
            if (!file) return true;
            return file.size <= MAX_FILE_SIZE;
        },
        { message: "이미지 크기는 최대 5MB 이하여야 합니다."}
    ),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
    initialData?: ProductFormData; 
    onSubmit: (data: ProductFormData) => void;
}

export function ProductForm({ initialData, onSubmit }: ProductFormProps) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: initialData?.name || "",
            currentPrice: initialData?.currentPrice || 0,
            originalPrice: initialData?.originalPrice || 0,
            stock: initialData?.stock || 0,
            status: initialData?.status || "ACTIVE",
            description: initialData?.description || "",
            imageFile: null,
        }
    });

    const onSubmitForm = (data: ProductFormValues) => {
        onSubmit({
            ...data,
            status: data.status as ProductStatus,
            imageFile: data.imageFile,
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="w-full max-w-7xl mx-auto text-left">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[32px] font-bold text-gray-800">
                    {initialData ? "상품 수정" : "상품 등록"}
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6 h-full lg:col-span-1">
                    <h3 className="text-2xl font-semibold text-gray-500 border-b pb-3">기본 정보</h3>
                    
                    <div className="space-y-4 mb-10">
                        <Label className="text-xl font-medium text-gray-400">상품 이미지 <span className="text-pink-500">*</span></Label>
                        <Controller // 커스텀 컴포넌트
                            control={control} 
                            name="imageFile"
                            render={({ field }) => (
                                <ImageUploadPreview
                                    initialImageUrl={initialData?.imageUrl}
                                    onImageSelect={(file) => field.onChange(file)}
                                />
                            )}
                        />
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="name" className="text-xl font-medium text-gray-400">상품명 <span className="text-pink-500">*</span></Label>
                        <Input
                            id="name"
                            {...register("name")}
                            className="h-12 text-lg lg:text-lg"
                            placeholder="상품명을 입력하세요"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8 h-full lg:col-span-2">
                    <h3 className="text-2xl font-semibold text-gray-500 border-b pb-4">상세 정보</h3>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label htmlFor="stock" className="text-xl font-medium text-gray-400">재고 (개) <span className="text-pink-500">*</span></Label>
                            <Input
                                id="stock"
                                type="number"
                                {...register("stock")}
                                className="h-12 text-lg lg:text-lg"
                            />
                            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                        </div>
                        <div className="space-y-3">
                            <Label className="text-xl font-medium text-gray-400">상품 상태 <span className="text-pink-500">*</span></Label>
                            <Controller
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="!h-12 w-full text-lg bg-white border-pink-300 focus-visible:border-pink-400 focus-visible:ring-pink-400/30 focus-visible:ring-[3px]">
                                            <SelectValue placeholder="상태 선택" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {(Object.keys(STATUS_CONFIG) as ProductStatus[]).map((key) => (
                                                <SelectItem key={key} value={key}>{STATUS_CONFIG[key].label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label htmlFor="originalPrice" className="text-xl font-medium text-gray-400">원가 (원)</Label>
                            <Input
                                id="originalPrice"
                                type="number"
                                step="10"
                                {...register("originalPrice")}
                                // 백엔드 API에 맞춰 원가 입력 불가능하도록 처리
                                disabled={true}
                                className="h-12 text-lg lg:text-lg bg-gray-100 cursor-not-allowed text-gray-400" 
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="currentPrice" className="text-xl font-medium text-gray-400">판매가 (원) <span className="text-pink-500">*</span></Label>
                            <Input
                                id="currentPrice"
                                type="number"
                                step="10"
                                {...register("currentPrice")}
                                className="h-12 text-lg lg:text-lg"
                            />
                            {errors.currentPrice && <p className="text-red-500 text-sm">{errors.currentPrice.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="description" className="text-xl font-medium text-gray-400">상품 설명 <span className="text-pink-500">*</span></Label>
                        <Textarea
                            id="description"
                            {...register("description")}
                            placeholder="상품의 상세 설명을 10자 이상 입력해주세요."
                            className="min-h-[180px] !text-lg resize-none"
                        />
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button type="submit" className="h-14 px-12 shadow-md">
                            {initialData ? "수정 완료" : "상품 등록하기"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}
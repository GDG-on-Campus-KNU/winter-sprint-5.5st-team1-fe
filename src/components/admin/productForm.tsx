import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductFormData, STATUS_CONFIG, ProductStatus } from "@/types/product";
import { ImageUploadPreview } from "@/components/admin/imageUploadPreview";

interface ProductFormProps {
    // initialData가 있으면 수정, 없으면 등록
    initialData?: ProductFormData; 
    onSubmit: (data: ProductFormData) => void;
}

const CATEGORIES = [
    { label: "컴퓨터/노트북 (Computer)", value: "computer" },
    { label: "모바일/태블릿 (Mobile)", value: "mobile" },
    { label: "음향기기 (Audio)", value: "audio" },
    { label: "카메라 (Camera)", value: "camera" },
    { label: "가전제품 (Home Appliance)", value: "home_appliance" },
    { label: "주변기기/액세서리 (Accessories)", value: "accessories" },
]

export function ProductForm({ initialData, onSubmit }: ProductFormProps) {
    const [name, setName] = useState(initialData?.name || "");
    const [currentPrice, setCurrentPrice] = useState(initialData?.currentPrice || 0);
    const [originalPrice, setOriginalPrice] = useState(initialData?.originalPrice || 0);
    const [stock, setStock] = useState(initialData?.stock || 0);
    const [category, setCategory] = useState(initialData?.category || "");
    const [status, setStatus] = useState<ProductStatus>(initialData?.status || "ACTIVE");
    const [description, setDescription] = useState(initialData?.description || "");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onSubmit({
            name,
            currentPrice,
            originalPrice,
            stock,
            category,
            description,
            status,
            imageFile
        });
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="w-full max-w-7xl mx-auto text-left"
        >

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[32px] font-bold text-gray-800">
                    {initialData ? "상품 수정" : "상품 등록"}
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6 h-full lg:col-span-1">
                    <h3 className="text-2xl font-semibold text-gray-500 border-b pb-3">기본 정보</h3>
                    
                    <div className="space-y-3">
                        <Label className="text-xl font-medium text-gray-400">상품 이미지 <span className="text-pink-500">*</span></Label>
                        <ImageUploadPreview
                            initialImageUrl={initialData?.imageUrl}
                            onImageSelect={(file) => setImageFile(file)}
                        />
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="name" className="text-xl font-medium text-gray-400">상품명 <span className="text-pink-500">*</span></Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-12 text-lg lg:text-lg"
                            placeholder="상품명을 입력하세요"
                            required
                        />
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="category" className="text-xl font-medium text-gray-400">카테고리 <span className="text-pink-500">*</span></Label>
                        <Select required value={category} onValueChange={setCategory}>
                            <SelectTrigger className="!h-12 w-full text-lg bg-white border-pink-300 focus-visible:border-pink-400 focus-visible:ring-pink-400/30 focus-visible:ring-[3px]">
                                <SelectValue placeholder="카테고리 선택" />
                            </SelectTrigger>
                            <SelectContent>
                                {CATEGORIES.map((cat) => (
                                    <SelectItem
                                        key={cat.value}
                                        value={cat.value}
                                        className="text-base py-2.5 cursor-pointer">
                                        {cat.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
                                value={stock === 0 ? "" : stock}
                                onChange={(e) => setStock(Number(e.target.value))}
                                className="h-12 text-lg lg:text-lg"
                                min="0"
                                placeholder="0"
                                required
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="status" className="text-xl font-medium text-gray-400">상품 상태 <span className="text-pink-500">*</span></Label>
                            <Select
                                required
                                value={status}
                                onValueChange={(value) => setStatus(value as ProductStatus)}
                            >
                                <SelectTrigger className="!h-12 w-full text-lg bg-white border-pink-300 focus-visible:border-pink-400 focus-visible:ring-pink-400/30 focus-visible:ring-[3px]">
                                    <SelectValue placeholder="상태 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(Object.keys(STATUS_CONFIG) as ProductStatus[]).map((key) => (
                                        <SelectItem
                                            key={key}
                                            value={key}
                                            className="text-base py-2.5 cursor-pointer"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2.5 h-2.5 rounded-full ${STATUS_CONFIG[key].className}`} />
                                                {STATUS_CONFIG[key].label}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label htmlFor="originalPrice" className="text-xl font-medium text-gray-400">원가 (원)</Label>
                            <Input
                                id="originalPrice"
                                type="number"
                                value={originalPrice === 0 ? "" : originalPrice}
                                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                                className="h-12 text-lg lg:text-lg"
                                min="0"
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="currentPrice" className="text-xl font-medium text-gray-400">판매가 (원) <span className="text-pink-500">*</span></Label>
                            <Input
                                id="currentPrice"
                                type="number"
                                value={currentPrice === 0 ? "" : currentPrice}
                                onChange={(e) => setCurrentPrice(Number(e.target.value))}
                                className="h-12 text-lg lg:text-lg"
                                min="0"
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="description" className="text-xl font-medium text-gray-400">상품 설명 <span className="text-pink-500">*</span></Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="상품의 상세 설명을 입력해주세요."
                            className="min-h-[180px] text-lg resize-none lg:text-lg"
                            required
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
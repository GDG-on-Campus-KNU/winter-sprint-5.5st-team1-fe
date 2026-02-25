import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductFormData } from "@/types/product";
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
    const [description, setDescription] = useState(initialData?.description || "");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onSubmit({ name, currentPrice, originalPrice, stock, category, description, imageFile });
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-8 w-full max-w-3xl bg-white p-10 rounded-2xl border border-gray-100 shadow-sm mx-auto text-left"
        >
            <h2 className="text-[32px] font-bold text-gray-500 border-b pb-4">
                {initialData ? "상품 수정" : "상품 등록"}
            </h2>

            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                    <Label htmlFor="name" className="text-2xl text-gray-500">상품명 <span className="text-pink-500">*</span></Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-14 text-xl md:text-xl"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Label htmlFor="category" className="text-2xl text-gray-500">카테고리 <span className="text-pink-500">*</span></Label>
                    <Select required value={category} onValueChange={setCategory}>
                        <SelectTrigger className="!h-14 w-full text-xl md:text-xl bg-white border-pink-300 focus-visible:border-pink-400 focus-visible:ring-pink-400/30 focus-visible:ring-[3px]">
                            <SelectValue placeholder="카테고리 선택"/>
                        </SelectTrigger>
                        <SelectContent>    
                            {CATEGORIES.map((cat) => (
                                <SelectItem
                                    key={cat.value}
                                    value={cat.value}
                                    className="text-lg py-3 cursor-pointer">
                                    {cat.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                
                <div className="space-y-3">
                    <Label htmlFor="stock" className="text-2xl text-gray-500">재고 (개) <span className="text-pink-500">*</span></Label>
                    <Input
                        id="stock"
                        type="number"
                        value={stock === 0 ? "" : stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                        className="h-14 text-xl md:text-xl"
                        min="0"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Label htmlFor="costPrice" className="text-2xl text-gray-500">원가 (원)</Label>
                    <Input
                        id="originalPrice"
                        type="number"
                        value={originalPrice === 0 ? "" : originalPrice}
                        onChange={(e) => setOriginalPrice(Number(e.target.value))}
                        className="h-14 text-xl md:text-xl"
                        min="0"
                    />
                </div>
                <div className="space-y-3">
                    <Label htmlFor="currentPrice" className="text-2xl text-gray-500">판매가 (원) <span className="text-pink-500">*</span></Label>
                    <Input
                        id="currentPrice"
                        type="number"
                        value={currentPrice === 0 ? "" : currentPrice}
                        onChange={(e) => setCurrentPrice(Number(e.target.value))}
                        className="h-14 text-xl md:text-xl"
                        min="0"
                        required
                    />
                </div>
            </div>

            <div className="space-y-3">
                <Label htmlFor="description" className="text-2xl text-gray-500">상품 설명 <span className="text-pink-500">*</span></Label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="상품에 대한 상세 설명을 입력해주세요."
                    className="min-h-[160px] text-xl resize-none md:text-xl"
                    required
                />
            </div>

            <div className="space-y-3">
                <Label className="text-2xl text-gray-500">상품 이미지 <span className="text-pink-500">*</span></Label>
                <ImageUploadPreview 
                    // 수정 모드일 경우 기존 이미지 보여주기
                    initialImageUrl={initialData?.imageUrl} 
                    onImageSelect={(file) => setImageFile(file)}
                />
            </div>

            <Button type="submit" className="w-full h-16 text-2xl text-white mt-4 rounded-xl">
                {initialData ? "수정 완료" : "상품 등록하기"}
            </Button>
        </form>
    );
}
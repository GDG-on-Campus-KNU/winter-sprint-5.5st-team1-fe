import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProductFormData } from "@/types/product";
import { ImageUploadPreview } from "@/components/admin/imageUploadPreview";

interface ProductFormProps {
    // initialData가 있으면 수정, 없으면 등록
    initialData?: ProductFormData; 
    onSubmit: (data: ProductFormData) => void;
}

export function ProductForm({ initialData, onSubmit }: ProductFormProps) {
    const [name, setName] = useState(initialData?.name || "");
    const [price, setPrice] = useState(initialData?.price || 0);
    const [stock, setStock] = useState(initialData?.stock || 0);
    const [description, setDescription] = useState(initialData?.description || "");
    const [imageFile, setImageFile] = useState<File | null>(null); // 새로 선택된 이미지 파일
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({ name, price, stock, description, imageFile });
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-8 w-full max-w-3xl bg-white p-10 rounded-2xl border border-gray-100 shadow-sm mx-auto text-left"
        >
            <h2 className="text-[32px] font-bold text-gray-500 border-b pb-4">
                {initialData ? "상품 수정" : "상품 등록"}
            </h2>

            <div className="space-y-3">
                <Label htmlFor="name" className="text-2xl text-gray-500">상품명 <span className="text-pink-500">*</span></Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="예: 베이직 코튼 셔츠"
                    className="h-14 text-xl md:text-xl"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Label htmlFor="price" className="text-2xl text-gray-500">가격 (원) <span className="text-pink-500">*</span></Label>
                    <Input
                        id="price"
                        type="number"
                        value={price === 0 ? "" : price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        placeholder="0"
                        className="h-14 text-xl md:text-xl"
                        min="0"
                        required
                    />
                </div>
                <div className="space-y-3">
                    <Label htmlFor="stock" className="text-2xl text-gray-500">재고 (개) <span className="text-pink-500">*</span></Label>
                    <Input
                        id="stock"
                        type="number"
                        value={stock === 0 ? "" : stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                        placeholder="0"
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
                    // initialImageUrl={initialData?.imageUrl} 
                    onImageSelect={(file) => setImageFile(file)}
                />
            </div>

            <Button type="submit" className="w-full h-16 text-2xl text-white mt-4 rounded-xl">
                {initialData ? "수정 완료" : "상품 등록하기"}
            </Button>
        </form>
    );
}
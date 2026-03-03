import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";

interface ImageUploadPreviewProps {
    initialImageUrl?: string;
    onImageSelect: (file: File | null) => void;
}

export function ImageUploadPreview({ initialImageUrl, onImageSelect }: ImageUploadPreviewProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith("blob:")) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const objectUrl = URL.createObjectURL(file);

        setPreviewUrl(objectUrl);

        onImageSelect(file);
    };

    const handleRemoveImage = () => {
        setPreviewUrl(null);
        onImageSelect(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="w-full flex justify-center">
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            {previewUrl ? (
                <div className="relative w-full max-w-[300px] aspect-square rounded-md border border-gray-200 overflow-hidden group shadow-xs">
                    <img 
                        src={previewUrl} 
                        alt="미리보기" 
                        className="w-full h-full object-cover"
                    />

                    <Button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white text-gray-500 rounded-full shadow-sm transition-all"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            ) : (
                <div 
                    onClick={() => fileInputRef.current?.click()} 
                    className="w-full max-w-[300px] aspect-square rounded-md border-2 border-dashed border-pink-300 bg-gray-50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-100 hover:border-pink-400 transition-colors shadow-xs"
                >
                    <div className="p-4 bg-white rounded-full shadow-sm">
                        <ImagePlus className="w-8 h-8 text-pink-500" />
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-medium text-gray-500">클릭하여 이미지 업로드</p>
                        <p className="text-gray-400 mt-1">PNG, JPG, WEBP (최대 5MB)</p>
                    </div>
                </div>
            )}
        </div>
    );
}
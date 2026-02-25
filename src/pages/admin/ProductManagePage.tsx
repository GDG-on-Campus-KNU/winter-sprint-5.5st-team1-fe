import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductFormData } from "@/types/product";
import { ProductForm } from "@/components/admin/productForm";

export default function ProductManagePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const isEditMode = id !== "new"; 
    const [initialData, setInitialData] = useState<ProductFormData | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(isEditMode);

    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                try {
                    // 테스트용 데이터
                    setInitialData({
                        name: "게이밍 노트북",
                        salePrice: 1500000,
                        costPrice: 1200000,
                        stock: 10,
                        category: "computer",
                        rating: 4.8,
                        description: "GOOD",
                        imageUrl: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80"
                    });
                } catch (error) {
                    console.error("상품을 불러오지 못했습니다.", error);
                    alert("상품 정보를 불러오는데 실패했습니다.");
                    navigate("/admin/products"); // 목록으로 돌려보냄
                } finally {
                    setIsLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id, isEditMode, navigate]);

    const handleSubmit = async (formData: ProductFormData) => {
        try {
            const submitData = new FormData();

            submitData.append("name", formData.name);
            submitData.append("salePrice", formData.salePrice.toString());
            submitData.append("costPrice", formData.costPrice.toString());
            submitData.append("stock", formData.stock.toString());
            submitData.append("rating", formData.rating.toString());
            submitData.append("category", formData.category);
            submitData.append("description", formData.description);
            if (formData.imageFile) {
                submitData.append("image", formData.imageFile); // 키 값은 백엔드 API 명세에 맞게 조정
            }
            
            if (isEditMode) {
                // 수정 API 호출
                alert("상품이 성공적으로 수정되었습니다!");
            } else {
                // 등록 API 호출
                alert("새 상품이 성공적으로 등록되었습니다!");
            }
            navigate("/admin/products"); // 상품 목록으로 이동
        } catch (error) {
            console.error("저장 실패:", error);
            alert("저장에 실패했습니다.");
        }
    };

    if (isLoading) return <div className="p-10 text-center text-gray-500 text-lg">상품 정보를 불러오는 중입니다...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <ProductForm 
                initialData={initialData} 
                onSubmit={handleSubmit} 
            />
        </div>
    );
}
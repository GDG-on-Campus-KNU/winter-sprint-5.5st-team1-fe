import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductFormData } from "@/types/product";
import { ProductForm } from "@/components/admin/productForm";
import { createProduct } from "@/api/product.api";

export default function ProductCreatePage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (newData: ProductFormData) => createProduct(newData),
        onSuccess: () => {
            alert("상품이 성공적으로 등록되었습니다!");
            queryClient.invalidateQueries({ queryKey: ["products"] });
            navigate("/admin/product"); // 상품 목록으로 이동
        },
        onError: (err) => {
            alert("상품 등록에 실패했습니다." + err);
        }
    });

    const handleSubmit = (formData: ProductFormData) => {
        createMutation.mutate(formData);
    };
    
    return (
        <div className="min-h-screen py-10 px-4">
            <ProductForm onSubmit={handleSubmit} />
        </div>
    );
}
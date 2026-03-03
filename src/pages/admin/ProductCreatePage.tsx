import { isAxiosError } from "axios";
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
            if (isAxiosError(err)) {
                const errorMessage = err.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
                alert(`상품 등록에 실패했습니다.\n${errorMessage}`);
            } else {
                alert("상품 등록 중 통신 문제가 발생했습니다.");
            }
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
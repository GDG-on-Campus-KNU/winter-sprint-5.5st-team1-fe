import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, ProductFormData } from "@/types/product";
import { ProductForm } from "@/components/admin/productForm";
import { getProduct, createProduct, updateProduct} from "@/api/product.api";
import { Loading } from "@/components/loading"

export default function ProductManagePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const isEditMode = id !== "new";
    const productId = Number(id);
    
    // 데이터 조회
    const { data: initialData, isLoading, isError } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProduct(productId),
        enabled: isEditMode, // 수정 모드일 때만 실행

        select: (data: Product): ProductFormData => ({
            name: data.name,
            currentPrice: data.currentPrice,
            originalPrice: data.originalPrice,
            stock: data.stock,
            category: data.category,
            description: data.description,
            imageUrl: data.imageUrl,
            imageFile: null,
        }),
    });

    // 상품 등록
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

    // 상품 수정
    const updateMutation = useMutation({
        mutationFn: (data: ProductFormData) => updateProduct(productId, data),
        onSuccess: () => {
            alert("상품이 성공적으로 수정되었습니다!");
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["product", productId] });
            navigate("/admin/product");
        },
        onError: (err) => {
            alert("상품 수정에 실패했습니다: " + err);
        }
    });

    const handleSubmit = async (formData: ProductFormData) => {
        if (isEditMode) {
            updateMutation.mutate(formData);
        } else {
            createMutation.mutate(formData);
        }
    };

    if (isEditMode && isLoading) {
        return <Loading />;
    }

    if (isEditMode && isError) {
        return <div className="p-10 text-center text-red-500">상품 정보를 불러오는데 실패했습니다.</div>;
}
    
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <ProductForm
                key={initialData ? 'loaded' : 'loading'}
                initialData={initialData} 
                onSubmit={handleSubmit} 
            />
        </div>
    );
}
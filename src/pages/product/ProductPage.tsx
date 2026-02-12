import { ProductCard } from "@/components/cards/productCard";

function ProductPage() {
    const products = Array.from({ length: 20 });

    return (
        <div className="w-full min-h-screen bg-pink-500/3 py-10 px-[120px]">
            <div className="w-full mx-auto">
                <h1 className="text-[28px] font-semibold mb-8 text-gray-500 ml-2">전체 상품 한 눈에 보기</h1>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-x-5 gap-y-10 justify-items-center pb-10">
                    {products.map((_, index) => (
                        <div key={index} className="flex justify-center">
                            <ProductCard />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
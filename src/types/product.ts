export type ProductStatus = "ACTIVE" | "INACTIVE" | "SOLD_OUT" | "DELETED";

export const STATUS_CONFIG: Record<
  ProductStatus,
  { label: string; className: string }
> = {
  ACTIVE: { label: "판매 중", className: "bg-pink-500" },
  INACTIVE: { label: "판매 중지", className: "bg-gray-300" },
  SOLD_OUT: { label: "품절", className: "bg-gray-300" },
  DELETED: { label: "삭제", className: "bg-red" },
} as const;

export interface Product {
  id: number;
  name: string;
  description: string;
  currentPrice: number;
  originalPrice: number;
  discountRate: number;
  rating: number;
  reviewCount: number;
  stock: number;
  shippingFee: number;
  freeShippingThreshold: number;
  imageUrl: string;
  status: ProductStatus;
}

export interface ProductFormData {
  name: string;
  currentPrice: number;
  originalPrice: number; // 원가
  stock: number;
  description: string;
  imageFile?: File | null; // 새로 선택된 이미지 파일
  imageUrl?: string; // 기존 이미지 URL (수정 시에만 사용)
  status: ProductStatus;
}

export interface BackendProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  product_status: ProductStatus;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export const toProduct = (item: BackendProductResponse): Product => ({
  id: item.id,
  name: item.name,
  description: item.description,
  currentPrice: item.price,
  originalPrice: item.price, // 백엔드 미지원, price로 대체
  discountRate: 0, // 백엔드 미지원
  rating: 0, // 백엔드 미지원
  reviewCount: 0, // 백엔드 미지원
  stock: item.stock,
  shippingFee: 3000, // 백엔드 미지원, 고정값
  freeShippingThreshold: 30000,
  imageUrl: item.image_url ?? "",
  status: item.product_status,
});

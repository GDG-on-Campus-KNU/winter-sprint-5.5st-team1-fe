export type ProductStatus = "ACTIVE" | "INACTIVE" | "SOLD_OUT" | "DELETED";
export type ProductCategory = 
  | "computer"
  | "mobile"
  | "audio"
  | "camera"
  | "home_appliance"
  | "accessories";

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
  category: ProductCategory;
  status: ProductStatus;
}

export const CATEGORY_CONFIG: Record<ProductCategory, { label: string }> = {
  computer: { label: "컴퓨터/노트북 (Computer)" },
  mobile: { label: "모바일/태블릿 (Mobile)" },
  audio: { label: "음향기기 (Audio)" },
  camera: { label: "카메라 (Camera)" },
  home_appliance: { label: "가전제품 (Home Appliance)" },
  accessories: { label: "주변기기/액세서리 (Accessories)" },
} as const;
export interface ProductFormData {
  name: string;
  currentPrice: number;
  originalPrice: number; // 원가
  stock: number;
  category: ProductCategory;
  description: string;
  imageFile?: File | null; // 새로 선택된 이미지 파일
  imageUrl?: string; // 기존 이미지 URL (수정 시에만 사용)
  status: ProductStatus;
}

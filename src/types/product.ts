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
  category: string;
  status: ProductStatus;
}

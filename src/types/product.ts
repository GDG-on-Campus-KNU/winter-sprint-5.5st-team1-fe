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
}

export interface ProductFormData {
  name: string;
  salePrice: number;
  costPrice: number; // 원가
  stock: number;
  rating: number;
  category: string;
  description: string;
  imageFile?: File | null; // 새로 선택된 이미지 파일
  imageUrl?: string; // 기존 이미지 URL (수정 시에만 사용)
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discountRate: number;
  rating: number;
  reviewCount: number;
  stock: number;
  shppingFee: number;
  freeShippingThreshold: number;
  imageUrl: string;
  category: string;
}

export interface ProductDetailInfo {
  category: string;
  rating: number;
  stock: number;
}

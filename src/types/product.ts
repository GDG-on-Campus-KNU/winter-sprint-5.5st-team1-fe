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
    price: number;
    stock: number;
    description: string;
}

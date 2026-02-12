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
  shippingFee: number;
  freeShippingThreshold: number;
  imageUrl: string;
  category: string;
}

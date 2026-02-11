export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discountRate: number;
  stock: number;
  shippingFee: number;
  freeShippingThreshold: number;
  imageUrl: string;
  category: string;
}

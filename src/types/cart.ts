export interface CartItemResponse {
  productId: number;
  productName: string;
  productPrice: number;
  productStatus: string;
  //  storeId?: number;
  //  storeName?: string;
  quantity: number;
  subtotal: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartSummary {
  totalItems: number;
  totalQuantity: number;
  totalProductPrice: number;
  deliveryFee: number;
  finalPrice: number;
}

export interface CartResponse {
  userId: number;
  items: CartItemResponse[];
  summary: CartSummary;
}

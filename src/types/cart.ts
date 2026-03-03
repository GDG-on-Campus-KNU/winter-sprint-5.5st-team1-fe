export interface CartItemResponse {
  product_id: number;
  product_name: string;
  product_price: number;
  product_status: string;
  quantity: number;
  subtotal: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartSummary {
  total_items: number;
  total_quantity: number;
  total_product_price: number;
  delivery_fee: number;
  final_price: number;
}

export interface CartResponse {
  user_id: number;
  items: CartItemResponse[];
  summary: CartSummary;
}

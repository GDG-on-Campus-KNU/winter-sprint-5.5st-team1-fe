export interface MyInfo {
  id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  role: string;
  created_at: string;
}

export interface Coupon {
  user_coupon_id: number;
  coupon_name: string;
  min_order_price: number;
  discount_value: number;
  coupon_type: "PERCENTAGE" | "FIXED";
  expired_at: string;
  used_at: string | null;
  available: boolean;
  expires_in_days: number;
}
export interface Order {
  id: number;
  order_status:
    | "PENDING"
    | "CONFIRMED"
    | "SHIPPING"
    | "DELIVERED"
    | "CANCELLED";
  total_product_price: number;
  discount_amount: number;
  delivery_fee: number;
  final_price: number;
  delivery_address: string;
  created_at: string;
  item_count: number;
}
export interface OrderListResponse {
  total_elements: number;
  total_pages: number;
  size: number;
  content: Order[];
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

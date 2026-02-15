export interface OrderItem {
  name: string;
  quantity: number;
}

export interface OrderData {
  orderNumber: string;
  status: string;
  orderDate: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
}

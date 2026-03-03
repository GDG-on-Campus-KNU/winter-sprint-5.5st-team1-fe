export interface Coupon {
  id: number;
  title: string;
  discountRate: number;
  minOrderPrice: number;
  expiryDate: string;
  couponType: "PERCENTAGE" | "FIXED" | string;
  available: boolean;
}

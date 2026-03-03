import { Coupon } from "@/types/coupon";

export const getCouponById = (
  coupons: Coupon[],
  id: number,
): Coupon | undefined => {
  return coupons.find((coupon) => coupon.id === id);
};

export const getAvailableCoupons = (
  coupons: Coupon[],
  orderPrice: number,
): Coupon[] => {
  return coupons.filter((coupon) => {
    return coupon.available && orderPrice >= coupon.minOrderPrice;
  });
};

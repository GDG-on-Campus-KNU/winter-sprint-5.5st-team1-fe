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
  const today = new Date().toLocaleDateString("sv-SE");

  return coupons.filter((coupon) => {
    const isPriceValid = orderPrice >= coupon.minOrderPrice;
    const isNotExpired = coupon.expiryDate >= today;

    return isPriceValid && isNotExpired;
  });
};

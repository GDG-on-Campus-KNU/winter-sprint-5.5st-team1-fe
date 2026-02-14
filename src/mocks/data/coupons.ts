import { Coupon } from "@/types/coupon";

export const MOCK_COUPONS: Coupon[] = [
  {
    id: 1,
    title: "신규 가입 환영 쿠폰",
    discountRate: 10,
    minOrderPrice: 20000,
    expiryDate: "2026-12-31",
  },
  {
    id: 2,
    title: "첫 구매 감사 쿠폰",
    discountRate: 15,
    minOrderPrice: 30000,
    expiryDate: "2026-11-30",
  },
  {
    id: 3,
    title: "주말 쇼핑 특가 쿠폰",
    discountRate: 5,
    minOrderPrice: 0,
    expiryDate: "2026-10-27",
  },
  {
    id: 4,
    title: "생일 축하해용 쿠폰",
    discountRate: 20,
    minOrderPrice: 50000,
    expiryDate: "2026-12-31",
  },
  {
    id: 5,
    title: "앱 다운로드 전용 쿠폰",
    discountRate: 12,
    minOrderPrice: 40000,
    expiryDate: "2025-09-30",
  },
  {
    id: 6,
    title: "VIP 전용 무제한 쿠폰",
    discountRate: 7,
    minOrderPrice: 10000,
    expiryDate: "2099-12-31",
  },
];

export const getCouponById = (id: number): Coupon | undefined => {
  return MOCK_COUPONS.find((coupon) => coupon.id === id);
};

export const getAvailableCoupons = (orderPrice: number): Coupon[] => {
  const today = new Date().toLocaleDateString("sv-SE");

  return MOCK_COUPONS.filter((coupon) => {
    const isPriceValid = orderPrice >= coupon.minOrderPrice;
    const isNotExpired = coupon.expiryDate >= today;

    return isPriceValid && isNotExpired;
  });
};

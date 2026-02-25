import type { CartResponse } from "@/types/cart";

export const MOCK_CART_ITEMS: CartResponse = {
  userId: 1,
  items: [
    {
      productId: 1,
      productName: "김치찌개",
      productPrice: 9000,
      productStatus: "ACTIVE",
      quantity: 2,
      subtotal: 18000,
      isAvailable: true,
      createdAt: "2024-02-08T09:00:00Z",
      updatedAt: "2024-02-08T09:30:00Z",
    },
    {
      productId: 3,
      productName: "비빔밥",
      productPrice: 10000,
      productStatus: "ACTIVE",
      quantity: 1,
      subtotal: 10000,
      isAvailable: true,
      createdAt: "2024-02-08T09:15:00Z",
      updatedAt: "2024-02-08T09:15:00Z",
    },
  ],
  summary: {
    totalItems: 2,
    totalQuantity: 3,
    totalProductPrice: 28000,
    deliveryFee: 3000,
    finalPrice: 31000,
  },
};

import axios from "@/lib/axios";
import { CartResponse } from "@/types/cart";

export const getCart = async (): Promise<CartResponse> => {
  const { data } = await axios.get("/api/v1/cart");
  return data.data;
};

export const updateCartItemQuantity = async (
  productId: number,
  quantity: number,
): Promise<void> => {
  await axios.patch(`/api/v1/cart/items/${productId}`, { quantity });
};

export const removeCartItem = async (productId: number): Promise<void> => {
  await axios.delete(`/api/v1/cart/items/${productId}`);
};

export const removeSelectedCartItems = async (
  productIds: number[],
): Promise<void> => {
  await axios.delete("/api/v1/cart/items", {
    data: { item_ids: productIds },
  });
};

export const clearCart = async (): Promise<void> => {
  await axios.delete("/api/v1/cart");
};

export const addCartItem = async (
  productId: number,
  quantity: number,
): Promise<void> => {
  await axios.post("/api/v1/cart", { product_id: productId, quantity });
};

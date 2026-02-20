import axios from "axios";
import { MOCK_CART_ITEMS } from "@/mocks/data/cart";
import { CartResponse } from "@/types/cart";

const USE_MOCK = true;

const mockDelay = (ms = 500): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// 조회
const getCartMock = async (): Promise<CartResponse> => {
  await mockDelay();
  return MOCK_CART_ITEMS;
};

const getCartAPI = async (): Promise<CartResponse> => {
  const { data } = await axios.get("/cart");
  return data.data;
};

export const getCart = () => (USE_MOCK ? getCartMock() : getCartAPI());

// 수량 변경
const updateQuantityMock = async (): Promise<void> => {
  await mockDelay(300);
};

const updateQuantityAPI = async (
  productId: number,
  quantity: number,
): Promise<void> => {
  await axios.patch(`/cart/items/${productId}`, { quantity });
};

export const updateCartItemQuantity = (productId: number, quantity: number) =>
  USE_MOCK ? updateQuantityMock() : updateQuantityAPI(productId, quantity);

// 개별 삭제
const removeItemMock = async (): Promise<void> => {
  await mockDelay(300);
};

const removeItemAPI = async (productId: number): Promise<void> => {
  await axios.delete(`/cart/items/${productId}`);
};

export const removeCartItem = (productId: number) =>
  USE_MOCK ? removeItemMock() : removeItemAPI(productId);

// 선택 삭제
const removeSelectedMock = async (): Promise<void> => {
  await mockDelay(300);
};

const removeSelectedAPI = async (productIds: number[]): Promise<void> => {
  await axios.delete("/cart/items", { data: { itemIds: productIds } });
};

export const removeSelectedCartItems = (productIds: number[]) =>
  USE_MOCK ? removeSelectedMock() : removeSelectedAPI(productIds);

// 전체 삭제
const clearCartMock = async (): Promise<void> => {
  await mockDelay(300);
};

const clearCartAPI = async (): Promise<void> => {
  await axios.delete("/cart");
};

export const clearCart = () => (USE_MOCK ? clearCartMock() : clearCartAPI());

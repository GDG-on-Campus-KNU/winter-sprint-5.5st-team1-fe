import { Product } from "../types/product.type";
import { MOCK_PRODUCTS, getProductById } from "@/mocks/data/products";

// Mock 모드 (백엔드 준비되면 false로 변경)
const USE_MOCK = true;

const mockDelay = (ms = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const fetchProductFromMock = async (productId: number): Promise<Product> => {
  await mockDelay();

  const product = getProductById(productId);

  if (!product) {
    throw new Error("상품을 찾을 수 없습니다");
  }

  return product;
};

const fetchProductFromAPI = async (productId: number): Promise<Product> => {
  const response = await fetch(`/api/products/${productId}`);

  if (!response.ok) {
    throw new Error("상품을 찾을 수 없습니다");
  }

  const data = await response.json();
  return data;
};

export const getProduct = async (productId: number): Promise<Product> => {
  if (USE_MOCK) {
    return fetchProductFromMock(productId);
  } else {
    return fetchProductFromAPI(productId);
  }
};

const fetchProductsFromMock = async (): Promise<Product[]> => {
  await mockDelay();
  return MOCK_PRODUCTS;
};

const fetchProductsFromAPI = async (): Promise<Product[]> => {
  const response = await fetch("/api/products");
  const data = await response.json();
  return data;
};

export const getProducts = async (): Promise<Product[]> => {
  if (USE_MOCK) {
    return fetchProductsFromMock();
  } else {
    return fetchProductsFromAPI();
  }
};

import { Product, ProductFormData } from "../types/product";
import { MOCK_PRODUCTS, getProductById } from "@/mocks/data/products";

// Mock 모드 (백엔드 준비되면 false로 변경)
const USE_MOCK = true;

const mockDelay = (ms = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const createFormData = (data: ProductFormData): FormData => {
  const formData = new FormData();
  
  formData.append("name", data.name);
  formData.append("currentPrice", data.currentPrice.toString());
  formData.append("originalPrice", data.originalPrice.toString());
  formData.append("stock", data.stock.toString());
  formData.append("category", data.category);
  formData.append("description", data.description);
  formData.append("rating", data.rating.toString());

  // 이미지가 있을 때만 추가
  if (data.imageFile) {
    formData.append("image", data.imageFile); 
  }
  
  return formData;
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

// 상품 등록
const createProductToMock = async (_newProduct: ProductFormData): Promise<void> => {
  void _newProduct;
  await mockDelay();
}

const createProductToAPI = async (newProduct: ProductFormData): Promise<void> => {
  const formData = createFormData(newProduct);
  
  const response = await fetch("/api/products", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("상품 등록에 실패했습니다");
  }
};

export const createProduct = async (newProduct: ProductFormData): Promise<void> => {
  if (USE_MOCK) {
    return createProductToMock(newProduct);
  } else {
    return createProductToAPI(newProduct);
  }
};

// 상품 수정
const updateProductToMock = async (_productId: number, _productData: ProductFormData): Promise<void> => {
  void _productId;
  void _productData;
  await mockDelay();
};

const updateProductToAPI = async (productId: number, productData: ProductFormData): Promise<void> => {
  const formData = createFormData(productData);

  const response = await fetch(`/api/products/${productId}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("상품 수정에 실패했습니다");
  }
};

export const updateProduct = async (productId: number, productData: ProductFormData): Promise<void> => {
  if (USE_MOCK) {
    return updateProductToMock(productId, productData);
  } else {
    return updateProductToAPI(productId, productData);
  }
};
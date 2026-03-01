import instance from "@/lib/axios";
import {
  Product,
  ProductFormData,
  BackendProductResponse,
} from "@/types/product";
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
  formData.append("description", data.description);

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

export interface GetProductsResponse {
  products: Product[];
  totalPages: number;
}

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

const fetchProductsFromAPI = async (
  page: number,
  sortBy: string,
): Promise<GetProductsResponse> => {
  const sort = sortBy.includes("price") ? "price" : "created_at";
  const order = sortBy.includes("desc") ? "desc" : "asc";

  const response = await instance.get("/api/v1/products", {
    params: {
      page,
      limit: 15,
      sort,
      order,
    },
  });

  const products: Product[] = response.data.data.products.map(
    (item: BackendProductResponse): Product => ({
      id: item.id,
      name: item.name,
      description: item.description,
      currentPrice: item.price,
      originalPrice: item.price, // 임시
      discountRate: 99, // 임시
      rating: 0, // 임시
      reviewCount: 0, // 임시
      stock: item.stock,
      shippingFee: 3000, // 임시
      freeShippingThreshold: 50000,
      imageUrl: item.image_url,
      status: item.product_status,
    }),
  );

  return {
    products,
    totalPages: response.data.data.pagination.total_pages,
  };
};

export const getProducts = async (
  page: number = 1,
  sortBy: string = "price-desc",
): Promise<GetProductsResponse> => {
  if (USE_MOCK) {
    // Mock 모드일 때도 동일한 형태를 반환하도록 껍데기를 맞춰줍니다.
    const mockData = await fetchProductsFromMock(); // 기존 팀원이 만든 함수
    return {
      products: mockData,
      totalPages: 1, // Mock일 때는 임시로 1페이지로 고정
    };
  } else {
    return fetchProductsFromAPI(page, sortBy);
  }
};

// 상품 등록
const createProductToMock = async (
  newProduct: ProductFormData,
): Promise<void> => {
  await mockDelay();

  const newId =
    MOCK_PRODUCTS.length > 0
      ? Math.max(...MOCK_PRODUCTS.map((p) => p.id)) + 1
      : 1;

  const product: Product = {
    id: newId,
    name: newProduct.name,
    description: newProduct.description,
    currentPrice: newProduct.currentPrice,
    originalPrice: newProduct.originalPrice,
    discountRate:
      newProduct.originalPrice > 0
        ? Math.round(
            ((newProduct.originalPrice - newProduct.currentPrice) /
              newProduct.originalPrice) *
              100,
          )
        : 0,
    rating: 0,
    reviewCount: 0,
    stock: newProduct.stock,
    shippingFee: 3000,
    freeShippingThreshold: 50000,
    status: newProduct.status,
    imageUrl: newProduct.imageFile
      ? URL.createObjectURL(newProduct.imageFile)
      : (newProduct.imageUrl ?? ""),
  };

  MOCK_PRODUCTS.push(product);
};

const createProductToAPI = async (
  newProduct: ProductFormData,
): Promise<void> => {
  const formData = createFormData(newProduct);

  const response = await fetch("/api/products", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("상품 등록에 실패했습니다");
  }
};

export const createProduct = async (
  newProduct: ProductFormData,
): Promise<void> => {
  if (USE_MOCK) {
    return createProductToMock(newProduct);
  } else {
    return createProductToAPI(newProduct);
  }
};

// 상품 수정
const updateProductToMock = async (
  productId: number,
  productData: ProductFormData,
): Promise<void> => {
  await mockDelay();

  const index = MOCK_PRODUCTS.findIndex((product) => product.id === productId);

  if (index === -1) {
    throw new Error("수정할 상품을 찾을 수 없습니다.");
  }

  const existingProduct = MOCK_PRODUCTS[index];

  const updatedProduct: Product = {
    ...existingProduct,

    name: productData.name,
    description: productData.description,
    currentPrice: productData.currentPrice,
    originalPrice: productData.originalPrice,
    stock: productData.stock,
    status: productData.status,
    discountRate:
      productData.originalPrice > 0
        ? Math.round(
            ((productData.originalPrice - productData.currentPrice) /
              productData.originalPrice) *
              100,
          )
        : 0,
    imageUrl: productData.imageFile
      ? URL.createObjectURL(productData.imageFile)
      : (productData.imageUrl ?? existingProduct.imageUrl),
  };
  MOCK_PRODUCTS[index] = updatedProduct;
};

const updateProductToAPI = async (
  productId: number,
  productData: ProductFormData,
): Promise<void> => {
  const formData = createFormData(productData);

  const response = await fetch(`/api/products/${productId}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("상품 수정에 실패했습니다");
  }
};

export const updateProduct = async (
  productId: number,
  productData: ProductFormData,
): Promise<void> => {
  if (USE_MOCK) {
    return updateProductToMock(productId, productData);
  } else {
    return updateProductToAPI(productId, productData);
  }
};

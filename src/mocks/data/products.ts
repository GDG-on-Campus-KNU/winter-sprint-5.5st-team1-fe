import { Product } from "../../types/product.type";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "게이밍 키보드",
    description:
      "기계식 게이밍 키보드. RGB 백라이트, 방음 축도 1ms. 게이머를 위한 최적의 선택.",
    price: 89000,
    originalPrice: 109000,
    discountRate: 18,
    rating: 4.4, 
    reviewCount: 18, 
    stock: 50,
    shippingFee: 3000,
    freeShippingThreshold: 50000,
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    category: "전자제품",
  },
  {
    id: 2,
    name: "무선 마우스",
    description: "인체공학적 디자인의 무선 마우스. 최대 3개월 배터리 수명.",
    price: 45000,
    originalPrice: 59000,
    discountRate: 24,
    rating: 4.7,
    reviewCount: 32,
    stock: 120,
    shippingFee: 3000,
    freeShippingThreshold: 50000,
    imageUrl:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    category: "전자제품",
  },
  {
    id: 3,
    name: "게이밍 헤드셋",
    description: "7.1 채널 서라운드 사운드. 노이즈 캔슬링 마이크 내장.",
    price: 129000,
    originalPrice: 159000,
    discountRate: 19,
    rating: 4.5,
    reviewCount: 25,
    stock: 35,
    shippingFee: 3000,
    freeShippingThreshold: 50000,
    imageUrl:
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=500",
    category: "전자제품",
  },
  {
    id: 4,
    name: "모니터 27인치",
    description: "144Hz 주사율, 1ms 응답속도. QHD 해상도 게이밍 모니터.",
    price: 359000,
    originalPrice: 429000,
    discountRate: 16,
    rating: 4.8,
    reviewCount: 67,
    stock: 15,
    shippingFee: 0,
    freeShippingThreshold: 50000,
    imageUrl:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
    category: "전자제품",
  },
  {
    id: 5,
    name: "기계식 스위치",
    description: "체리 MX 호환 스위치 90개 세트. DIY 키보드 제작용.",
    price: 35000,
    originalPrice: 45000,
    discountRate: 22,
    rating: 4.6,
    reviewCount: 12,
    stock: 200,
    shippingFee: 3000,
    freeShippingThreshold: 50000,
    imageUrl:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500",
    category: "전자부품",
  },
];

export const getProductById = (id: number): Product | undefined => {
  return MOCK_PRODUCTS.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return MOCK_PRODUCTS.filter((product) => product.category === category);
};

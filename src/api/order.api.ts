import { OrderCompleteData } from "@/components/cards/order/orderCompleteListCard";
import instance from "@/lib/axios";

const USE_MOCK = true;

const mockDelay = (ms = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const fetchOrderFromMock = async (id: string): Promise<OrderCompleteData> => {
  await mockDelay(1000);

  return {
    orderNumber: id,
    status: "결제완료",
    orderDate: "2026년 2월 12일",
    address: "대구광역시 북구 대학로 80 (IT대학5호관)",
    recipient: "홍길동",
    phone: "010-1234-5678",
    deliveryMessage: "문 앞에 놔주세요.",
    items: [
      { name: "게이밍 키보드", quantity: 1 },
      { name: "무선 게이밍 마우스", quantity: 2 },
      { name: "장패드", quantity: 5 },
    ],
    totalPrice: 245000,
  };
};

const fetchOrderFromAPI = async (id: string): Promise<OrderCompleteData> => {
  const response = await fetch(`/api/orders/${id}`);

  if (!response.ok) {
    throw new Error("주문 정보를 불러오는데 실패했습니다.");
  }

  const data = await response.json();
  return data;
};

export const fetchOrderData = async (
  id: string,
): Promise<OrderCompleteData> => {
  if (USE_MOCK) {
    return fetchOrderFromMock(id);
  } else {
    return fetchOrderFromAPI(id);
  }
};

export interface OrderPayload {
  items: {
    product_id: number;
    quantity: number;
  }[];
  user_coupon_id: number | null;
  recipient_name: string;
  recipient_phone: string;
  delivery_address: string;
  delivery_detail_address: string;
  delivery_message: string;
}

export const fetchAvailableCouponsAPI = async () => {
  // 주문서 작성에 필요해서 여기서 호출!
  const { data } = await instance.get("/api/v1/my/coupons", {
    params: { status: "AVAILABLE" },
  });
  return data;
};

export const createOrderAPI = async (orderPayload: OrderPayload) => {
  const { data } = await instance.post("/api/v1/orders", orderPayload);
  return data;
};

export const deleteCartItemsAPI = async (itemIds: number[]) => {
  const { data } = await instance.delete("/api/v1/cart/items", {
    data: { item_ids: itemIds },
  });
  return data;
};

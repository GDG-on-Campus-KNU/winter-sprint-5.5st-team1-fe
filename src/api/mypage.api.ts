import axios from "@/lib/axios";
import { MyInfo, Coupon, OrderListResponse } from "@/types/mypage";

export interface UpdateMyInfoRequest {
  name?: string;
  phone?: string;
  address?: string;
}

export interface OrderParams {
  months?: "1" | "3" | "6";
  page?: number;
  limit?: number;
  status?: "PENDING" | "CONFIRMED" | "SHIPPING" | "DELIVERED" | "CANCELLED";
}

export const getMyInfo = async (): Promise<MyInfo> => {
  const { data } = await axios.get("/api/v1/my/info");
  return data.data;
};

export const updateMyInfo = async (
  body: UpdateMyInfoRequest,
): Promise<MyInfo> => {
  const { data } = await axios.patch("/api/v1/my/info", body);
  return data.data;
};

export const getMyCoupons = async (
  status?: "AVAILABLE" | "USED" | "EXPIRED",
): Promise<Coupon[]> => {
  const { data } = await axios.get("/api/v1/my/coupons", {
    params: status ? { status } : undefined,
  });
  return data.data;
};

export const getMyOrders = async (
  params: OrderParams = {},
): Promise<OrderListResponse> => {
  const { data } = await axios.get("/api/v1/my/orders", { params });
  return data.data;
};

import axios from "@/lib/axios";
import { MyInfo, Coupon, OrderListResponse } from "@/types/mypage";

export const getMyInfo = async (): Promise<MyInfo> => {
  const { data } = await axios.get("/api/v1/my/info");
  return data.data;
};

export const getMyCoupons = async (): Promise<Coupon[]> => {
  const { data } = await axios.get("/api/v1/my/coupons");
  return data.data;
};

export interface OrderParams {
  period?: "1" | "3" | "6" | "12";
  page?: number;
  size?: number;
}

export const getMyOrders = async (
  params: OrderParams,
): Promise<OrderListResponse> => {
  const { data } = await axios.get("/api/v1/orders", { params });
  return data.data;
};

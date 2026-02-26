import { useQuery } from "@tanstack/react-query";
import {
  getMyInfo,
  getMyCoupons,
  getMyOrders,
  OrderParams,
} from "@/api/mypage.api";

export const useMyInfo = () =>
  useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });

export const useMyCoupons = () =>
  useQuery({
    queryKey: ["myCoupons"],
    queryFn: getMyCoupons,
  });

export const useMyOrders = (params: OrderParams) =>
  useQuery({
    queryKey: ["myOrders", params],
    queryFn: () => getMyOrders(params),
  });

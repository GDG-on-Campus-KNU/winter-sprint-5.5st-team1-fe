import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyInfo,
  getMyCoupons,
  getMyOrders,
  updateMyInfo,
  type OrderParams,
  type UpdateMyInfoRequest,
} from "@/api/mypage.api";

export const useMyInfo = () =>
  useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });

export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateMyInfoRequest) => updateMyInfo(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
};

export const useMyCoupons = (status?: "AVAILABLE" | "USED" | "EXPIRED") =>
  useQuery({
    queryKey: ["myCoupons", status],
    queryFn: () => getMyCoupons(status),
  });

export const useMyOrders = (params: OrderParams) =>
  useQuery({
    queryKey: ["myOrders", params],
    queryFn: () => getMyOrders(params),
  });

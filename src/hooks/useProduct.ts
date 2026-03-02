import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/product.api";

export const useProduct = (productId: number) => {
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId && !isNaN(productId),
    retry: false,
  });

  const is404 =
    (error as { response?: { status: number } })?.response?.status === 404;

  return { product, isLoading, error, is404, refetch };
};

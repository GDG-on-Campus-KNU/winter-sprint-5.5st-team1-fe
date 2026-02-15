import { useState, useEffect } from "react";
import { Product } from "../types/product.ts";
import { getProduct } from "../api/product.api";

export const useProduct = (productId: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProduct(productId);
        setProduct(data);
        setError(null);
      } catch {
        setError("상품을 불러올 수 없습니다");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};

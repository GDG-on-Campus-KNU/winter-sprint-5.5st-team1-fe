import { useState, useEffect } from "react";
import { Product } from "../types/product.type.ts";
import { getProduct } from "../api/product.api";

export const useProduct = (productId: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProduct(productId);
        setProduct(data);
      } catch (err) {
        setError("상품을 불러올 수 없습니다");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};

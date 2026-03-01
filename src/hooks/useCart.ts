import { useEffect } from "react";
import { useCartStore } from "@/stores/cart.store";
import {
  getCart,
  updateCartItemQuantity,
  removeCartItem,
  removeSelectedCartItems,
  clearCart,
} from "@/api/cart.api";

export const useCart = () => {
  const {
    items,
    addManyItems,
    removeItem,
    updateQuantity,
    clearCart: clearStore,
  } = useCartStore();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        clearStore();
        addManyItems(
          data.items.map((item) => ({
            productId: item.product_id,
            name: item.product_name,
            price: item.product_price,
            quantity: item.quantity,
          })),
        );
      } catch (error) {
        console.error("장바구니 로드 실패:", error);
      }
    };

    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    const prevQuantity =
      items.find((i) => i.productId === productId)?.quantity ?? 0;

    updateQuantity(productId, quantity);

    try {
      await updateCartItemQuantity(productId, quantity);
    } catch (error) {
      console.error("수량 변경 실패, 이전으로 되돌림", error);
      updateQuantity(productId, prevQuantity);
    }
  };

  const handleRemoveItem = async (productId: number) => {
    const prevItems = [...items];
    removeItem(productId);

    try {
      await removeCartItem(productId);
    } catch (error) {
      console.error("삭제 실패, 롤백합니다:", error);
      useCartStore.setState({
        items: prevItems,
        itemCount: prevItems.reduce((sum, i) => sum + i.quantity, 0),
      });
    }
  };

  const handleRemoveSelected = async (productIds: number[]) => {
    const prevItems = [...items];
    productIds.forEach((id) => removeItem(id));

    try {
      await removeSelectedCartItems(productIds);
    } catch (error) {
      console.error("선택 삭제 실패, 롤백합니다:", error);
      useCartStore.setState({
        items: prevItems,
        itemCount: prevItems.reduce((sum, i) => sum + i.quantity, 0),
      });
    }
  };

  const handleClearCart = async () => {
    const prevItems = [...items];
    clearStore();

    try {
      await clearCart();
    } catch (error) {
      console.error("전체 비우기 실패, 롤백합니다:", error);
      useCartStore.setState({
        items: prevItems,
        itemCount: prevItems.reduce((sum, i) => sum + i.quantity, 0),
      });
    }
  };

  const calcTotal = (selectedIds: number[]) => {
    return items
      .filter((item) => selectedIds.includes(item.productId))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return {
    items,
    handleUpdateQuantity,
    handleRemoveItem,
    handleRemoveSelected,
    handleClearCart,
    calcTotal,
  };
};

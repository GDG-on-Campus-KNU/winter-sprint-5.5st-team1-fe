import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartState {
  items: CartItem[];
  itemCount: number;
  addItem: (item: CartItem) => void;
  addManyItems: (newItems: CartItem[]) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,

      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.productId === item.productId);
        const updatedItems = existingItem
          ? items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
            )
          : [...items, item];

        set({
          items: updatedItems,
          itemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        });
      },

      addManyItems: (newItems) => {
        const updatedItems = [...get().items, ...newItems];
        set({
          items: updatedItems,
          itemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        });
      },

      removeItem: (productId) => {
        const updatedItems = get().items.filter(
          (i) => i.productId !== productId,
        );
        set({
          items: updatedItems,
          itemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        });
      },

      updateQuantity: (productId, quantity) => {
        const updatedItems = get().items.map((i) =>
          i.productId === productId ? { ...i, quantity } : i,
        );
        set({
          items: updatedItems,
          itemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        });
      },

      clearCart: () => set({ items: [], itemCount: 0 }),
    }),
    { name: "cart-storage" },
  ),
);

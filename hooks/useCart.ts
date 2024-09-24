import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";
import { toast } from "sonner";

interface CartStore {
  items: { product: Product; quantity: number }[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: data => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.product?.id === data.id);

        if (existingItem) {
          existingItem.quantity++;
          set({ items: currentItems });
          toast.success("Item added to cart");
          return;
        }
        set({ items: [...get().items, { product: data, quantity: 1 }] });
        toast.success("Item added to cart");
      },

      removeItem: id => {
        const currentItems = get().items;
        const index = currentItems.findIndex(item => item.product?.id === id);
        if (index === -1) return;
        currentItems[index].quantity--;
        if (currentItems[index].quantity <= 0) currentItems.splice(index, 1);
        set({ items: currentItems });
        toast.success("Item removed from cart");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;

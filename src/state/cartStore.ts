// state/cartStore.ts
import { create } from "zustand";

export interface CartItem {
  id: string; // Özel id: ürün id ve varyant bilgisi birleşimi (ör. "productId-variant")
  productId: string;
  name: string;
  price: number; // kuruş cinsinden fiyat
  quantity: number;
  image: string;
  variant?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item: CartItem) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id: string) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateItemQuantity: (id: string, quantity: number) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),
  clearCart: () => set({ items: [] }),
}));

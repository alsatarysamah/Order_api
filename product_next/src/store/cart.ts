import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@interface/cartItem";

type CartStore = {
  cart: CartItem[];
  addOrUpdateItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (item: Omit<CartItem, "quantity">, quantity: number) => void;
  removeItem: (item: Omit<CartItem, "quantity">) => void;
  clearCart: () => void;
  setCart: (cart: CartItem[]) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

    addOrUpdateItem: (item, quantity = 1) =>
  set((state) => {
    const index = state.cart.findIndex(
      (i) =>
        i.id === item.id &&
        i.selectedColor === item.selectedColor &&
        i.selectedSize === item.selectedSize
    );

    let updatedCart = [...state.cart];

    if (index >= 0) {
      updatedCart[index] = { ...item, quantity };
    } else {
      updatedCart = updatedCart.filter((i) => i.id !== item.id);

      if (quantity > 0) {
        updatedCart.push({ ...item, quantity });
      }
    }

    updatedCart = updatedCart.filter((i) => i.quantity > 0);

    return { cart: updatedCart };
  }),

      updateQuantity: (item, quantity) => {
        if (quantity <= 0) {
          get().removeItem(item);
          return;
        }

        set((state) => {
          const index = state.cart.findIndex(
            (i) =>
              i.id === item.id &&
              i.selectedColor === item.selectedColor &&
              i.selectedSize === item.selectedSize
          );

          if (index === -1) return state;

          const updatedCart = [...state.cart];
          updatedCart[index].quantity = quantity;
          return { cart: updatedCart };
        });
      },

      removeItem: (item) =>
        set((state) => ({
          cart: state.cart.filter(
            (i) =>
              !(
                i.id === item.id &&
                i.selectedColor === item.selectedColor &&
                i.selectedSize === item.selectedSize
              )
          ),
        })),

      clearCart: () => set({ cart: [] }),

      setCart: (cart) => set({ cart }),
    }),
    {
      name: "cart-storage",
      storage: {
        getItem: (key) => {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        },
        setItem: (key, value) => {
          localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        },
      },
    }
  )
);

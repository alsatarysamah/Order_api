import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "@interface/cartItem";

type CartStore = {
  cart: CartItem[];
  addOrUpdateItem: (
    item: Omit<CartItem, "quantity">,
    quantity?: number
  ) => void;
  updateQuantity: (item: Omit<CartItem, "quantity">, quantity: number) => void;
  removeItem: (item: Omit<CartItem, "quantity">) => void;
  clearCart: () => void;
  setCart: (cart: CartItem[]) => void;
  updateSelectedColor: (item: CartItem, selectedColor: string) => void;
  updateSelectedSize: (item: CartItem, selectedSize: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      updateSelectedColor: (item: CartItem, selectedColor: string) => {
        set((state) => {
          const selectedItemIndex = state.cart.findIndex(
            (cartItem) => cartItem.id === item.id
          );
          const updatedCart = [...state.cart];
          item.selectedColor = selectedColor;
          if (selectedItemIndex != -1) updatedCart[selectedItemIndex] = item;
          else updatedCart.push(item);

          return { cart: updatedCart };
        });
      },
      updateSelectedSize: (item: CartItem, selectedSize: string) => {
        set((state) => {
          const selectedItemIndex = state.cart.findIndex(
            (cartItem) => cartItem.id === item.id
          );

          console.log("🚀 ~ cart.ts ~ selectedItemIndex:", selectedItemIndex);

          const updatedCart = [...state.cart];
          item.selectedSize = selectedSize;
          if (selectedItemIndex != -1) updatedCart[selectedItemIndex] = item;
          else updatedCart.push(item);

          return { cart: updatedCart };
        });
      },

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
            if (quantity > 0) updatedCart.push({ ...item, quantity });
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
      storage: createJSONStorage(() => localStorage),
    }
  )
);

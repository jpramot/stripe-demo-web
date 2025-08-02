import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: [],
  addToCart: (product) => {
    const cart = get().cart;
    const idx = cart.findIndex((item) => item.name === product.name);
    if (idx !== -1) {
      return;
    }
    set((state) => ({
      cart: [...state.cart, product],
    }));
  },
  changeQty: (name, qty) => {
    set((state) => ({
      cart: state.cart
        .map((item) => {
          if (item.name === name) {
            const newQty = item.quantity + qty;
            if (newQty <= 0) return null;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item !== null),
    }));
  },
  removeFromCart: (name) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.name !== name),
    }));
  },
  clearCart: () => {
    set({ cart: [] });
  },
}));

export default useCartStore;

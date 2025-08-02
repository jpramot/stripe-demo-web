import { create } from "zustand";
import * as orderApi from "../api/orderApi";

const useOrderStore = create((set, get) => ({
  orders: [],
  getAllOrders: async () => {
    const data = await orderApi.getAllOrders();
    set({ orders: data.orders });
  },
  cancelOrder: async (id) => {
    const data = await orderApi.cancelOrder(id);
    set((state) => {
      return {
        orders: state.orders.map((order) => {
          if (order.id === id) {
            return { ...order, status: "CANCELLED" };
          }
          return order;
        }),
      };
    });
    return data;
  },
}));

export default useOrderStore;

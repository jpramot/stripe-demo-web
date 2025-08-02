import { useEffect } from "react";
import useOrderStore from "../../../store/orderStore";
import OrderItem from "./OrderItem";
import { useNavigate } from "react-router";

export default function OrderList() {
  const getAllOrders = useOrderStore((state) => state.getAllOrders);
  const orders = useOrderStore((state) => state.orders);
  const navigate = useNavigate();

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">คำสั่งซื้อของคุณ</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 hover:underline hover:cursor-pointer"
        >
          ← Back
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

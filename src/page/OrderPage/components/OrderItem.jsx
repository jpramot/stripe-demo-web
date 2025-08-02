import * as orderApi from "../../../api/orderApi";
import useOrderStore from "../../../store/orderStore";

export default function OrderItem({ order }) {
  const cancelOrder = useOrderStore((state) => state.cancelOrder);
  const hdlPay = async () => {
    const data = await orderApi.payAgain(order.id);
    window.location.href = data.url;
  };

  const hdlCancel = async () => {
    cancelOrder(order.id);
  };
  return (
    <div
      key={order.id}
      className="border p-4 rounded shadow-sm flex justify-between items-center bg-white"
    >
      <div>
        <p className="font-semibold">
          Order #{order.id} -{" "}
          <span
            className={`${
              order.status === "PENDING"
                ? "text-yellow-500"
                : order.status === "PAID"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {order.status}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Total:{" "}
          {order.totalAmount.toLocaleString("th-TH", {
            style: "currency",
            currency: "THB",
          })}
        </p>
      </div>

      <div className="space-x-2">
        {order.status === "PENDING" && (
          <>
            <button
              onClick={hdlPay}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
            >
              Pay
            </button>
            <button
              onClick={hdlCancel}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </>
        )}
        {/* {order.status === "SUCCESS" && (
          <span className="text-green-700 font-medium">Payment Success</span>
        )}
        {order.status === "CANCELED" && (
          <span className="text-red-500 font-medium">Cancel Order</span>
        )}
        {order.status === "FAILED" && (
          <span className="text-red-500 font-medium">Payment Failed</span>
        )} */}
      </div>
    </div>
  );
}

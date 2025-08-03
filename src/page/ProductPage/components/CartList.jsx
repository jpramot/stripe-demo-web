import useCartStore from "../../../store/cartStore";
import CartItem from "./CartItem";
import * as orderApi from "../../../api/orderApi";
import { Link } from "react-router";
import { useState } from "react";

export default function CartList() {
  const cart = useCartStore((state) => state.cart);
  const [userId, setUserId] = useState("1");
  const [discount, setDiscount] = useState(0);

  const hdlCheckout = async () => {
    const data = await orderApi.createOrder({ userId, discount, cart });
    window.location.href = data.url;
  };
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col gap-4 mb-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Cart</h2>
          <div className="flex gap-4">
            <Link
              to="/orders"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Order
            </Link>
            <Link
              to="/subscriptions"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Subscribe
            </Link>
          </div>
        </div>

        {/* Input Fields */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 flex-1"
          />
          <input
            type="number"
            placeholder="Discount (%)"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
          />
        </div>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500">No items in cart</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>

          <div className="mt-6 text-right space-y-4">
            <p className="text-xl font-semibold">
              Total:{" "}
              {cart
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toLocaleString("th-TH", {
                  style: "currency",
                  currency: "THB",
                })}
            </p>

            <button
              onClick={hdlCheckout}
              className="mt-2 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

import { useState } from "react";
import * as orderApi from "../../api/orderApi";

const products = [
  {
    id: "price_1RqmISC4T8NNH8UQNSuhF1dU",
    name: "Basic Plan",
    description: "แผนสำหรับผู้เริ่มต้น ใช้งานทั่วไป",
    price: "฿599 / เดือน",
  },
  {
    id: "price_1RqmLsC4T8NNH8UQkJpB01qA",
    name: "Premium Plan",
    description: "แผนระดับมืออาชีพ พร้อมฟีเจอร์ครบครัน",
    price: "฿4999 / ปี",
  },
];

export default function SubscriptionPage() {
  const [userId, setUserId] = useState("1");
  const handleSubscribe = async (productId) => {
    const data = await orderApi.createSubOrder(productId, { userId });
    window.location.href = data.url;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* ปุ่ม Back to Home */}
      <div className="mb-6">
        <a
          href="/"
          className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back to Home
        </a>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">เลือกแผนการใช้งาน</h1>

      {/* Input สำหรับ User ID */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="กรอก User ID ของคุณ"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 w-60 text-center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-bold text-indigo-600 mb-6">{product.price}</p>
            <button
              onClick={() => handleSubscribe(product.id)}
              className="w-full py-2 px-4 rounded-md text-white font-medium bg-indigo-600 hover:bg-indigo-700"
            >
              สมัครใช้งาน
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

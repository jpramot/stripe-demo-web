// import { useState } from "react";
// import * as orderApi from "../../api/orderApi";

// const products = [
//   {
//     id: "price_1RqmISC4T8NNH8UQNSuhF1dU",
//     name: "Basic Plan",
//     description: "แผนสำหรับผู้เริ่มต้น ใช้งานทั่วไป",
//     price: "฿599 / เดือน",
//   },
//   {
//     id: "price_1RqmLsC4T8NNH8UQkJpB01qA",
//     name: "Premium Plan",
//     description: "แผนระดับมืออาชีพ พร้อมฟีเจอร์ครบครัน",
//     price: "฿4999 / ปี",
//   },
// ];

// export default function SubscriptionPage() {
//   const [userId, setUserId] = useState("1");
//   const handleSubscribe = async (productId) => {
//     const data = await orderApi.createSubOrder(productId, { userId });
//     window.location.href = data.url;
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* ปุ่ม Back to Home */}
//       <div className="mb-6">
//         <a
//           href="/"
//           className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//         >
//           ← Back to Home
//         </a>
//       </div>

//       <h1 className="text-3xl font-bold mb-6 text-center">เลือกแผนการใช้งาน</h1>

//       {/* Input สำหรับ User ID */}
//       <div className="mb-6 text-center">
//         <input
//           type="text"
//           placeholder="กรอก User ID ของคุณ"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//           className="border border-gray-300 rounded-md px-3 py-1 w-60 text-center"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
//           >
//             <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
//             <p className="text-gray-600 mb-4">{product.description}</p>
//             <p className="text-lg font-bold text-indigo-600 mb-6">{product.price}</p>
//             <button
//               onClick={() => handleSubscribe(product.id)}
//               className="w-full py-2 px-4 rounded-md text-white font-medium bg-indigo-600 hover:bg-indigo-700"
//             >
//               สมัครใช้งาน
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import * as orderApi from "../../api/orderApi";
import * as subscriptionApi from "../../api/subscriptionApi";

const products = [
  {
    id: "price_1RqmISC4T8NNH8UQNSuhF1dU",
    name: "Basic Plan",
    description: "แผนสำหรับผู้เริ่มต้น ใช้งานทั่วไป",
    price: "฿599 / เดือน",
  },
  {
    id: "price_1RswA3C4T8NNH8UQYBDBPy73",
    name: "Premium Plan",
    description: "แผนระดับมืออาชีพ พร้อมฟีเจอร์ครบครัน",
    price: "฿2000 / เดือน",
  },
];

export default function SubscriptionPage() {
  const [userId, setUserId] = useState("5");
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSubscription = async () => {
    const data = await subscriptionApi.getUserSubscription(userId);
    console.log(data.sub);
    setSubscription(data.sub || null);
  };

  useEffect(() => {
    if (userId) fetchSubscription();
  }, [userId]);

  const handleSubscribe = async (priceId) => {
    const data = await orderApi.createSubOrder(priceId, { userId });
    window.location.href = data.url; // redirect ไป Stripe Checkout
  };

  const handleCancel = async () => {
    setLoading(true);
    await subscriptionApi.cancelOrResub(subscription.id, true);
    await fetchSubscription();
    setLoading(false);
  };

  const handleResub = async () => {
    setLoading(true);
    await subscriptionApi.cancelOrResub(subscription.id, false);
    await fetchSubscription();
    setLoading(false);
  };

  const handleChangePlan = async (priceId) => {
    setLoading(true);
    await subscriptionApi.changePlan(subscription.id, priceId);
    await fetchSubscription();
    setLoading(false);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const now = new Date();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back to Home */}
      <div className="mb-6">
        <a
          href="/"
          className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back to Home
        </a>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">การจัดการ Subscription</h1>

      {/* User ID Input */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="กรอก User ID ของคุณ"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 w-60 text-center"
        />
      </div>

      {/* ถ้ายังไม่มี Subscription */}
      {!subscription && (
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
      )}

      {/* ถ้ามี Subscription แล้ว */}
      {subscription && (
        <div className="text-center border border-gray-300 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">สถานะ Subscription</h2>
          <p className="text-gray-700 mb-2">
            <strong>Plan:</strong>{" "}
            {products.find((p) => p.id === subscription.priceId)?.name || "Unknown"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>สถานะ:</strong> {subscription.subScriptionStatus}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>หมดอายุ:</strong>{" "}
            {subscription.currentPeriodEnd ? formatDate(subscription.currentPeriodEnd) : "-"}
          </p>

          <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
            {/* ปุ่มตามสถานะ */}
            {subscription.subScriptionStatus === "ACTIVE" && (
              <>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                >
                  ยกเลิกต่ออายุอัตโนมัติ
                </button>

                {products
                  .filter((p) => p.id !== subscription.priceId)
                  .map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleChangePlan(product.id)}
                      disabled={loading}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50"
                    >
                      เปลี่ยนเป็น {product.name}
                    </button>
                  ))}
              </>
            )}

            {subscription.subScriptionStatus === "CANCELED_AT_PERIOD_END" && (
              <>
                {new Date(subscription.currentPeriodEnd) > now ? (
                  <button
                    onClick={handleResub}
                    disabled={loading}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                  >
                    ต่ออายุ Subscription
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(subscription.priceId)}
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                  >
                    สมัครใหม่
                  </button>
                )}
              </>
            )}

            {subscription.subScriptionStatus === "CANCELED" && (
              <button
                onClick={() => handleSubscribe(subscription.priceId)}
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                สมัครใหม่
              </button>
            )}

            {subscription.subScriptionStatus === "UNPAID" && (
              <button
                onClick={() => handleSubscribe(subscription.priceId)}
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                ชำระและสมัครใหม่
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

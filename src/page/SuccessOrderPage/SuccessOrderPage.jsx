import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import * as checkoutApi from "../../api/checkoutApi";

export default function SuccessOrderPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("PENDING");
  const [checkoutData, setCheckoutData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      setStatus("FAILED");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const { checkout } = await checkoutApi.checkStatusPayment(sessionId);

        if (
          (checkout.type === "payment" && checkout.status.toLowerCase() === "paid") ||
          (checkout.type === "subscription" && checkout.status.toLowerCase() === "active")
        ) {
          setCheckoutData(checkout);
          setStatus("SUCCESS");
          clearInterval(interval);

          // Auto redirect after 3s
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          setStatus("PENDING");
        }
      } catch (error) {
        console.error(error);
        setStatus("FAILED");
        clearInterval(interval);
      }
    }, 3000);

    const timeout = setTimeout(() => {
      console.log("timeout: ", status);
      clearInterval(interval);
      setStatus("FAILED");
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [sessionId, navigate]);

  const renderContent = () => {
    switch (status) {
      case "PENDING":
        return (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 mb-6 mx-auto"></div>
            <h1 className="text-xl font-semibold text-gray-700">Checking Checkout Status…</h1>
            <p className="text-gray-500 mt-2">
              Please wait while we verify your payment/subscription.
            </p>
          </>
        );

      case "SUCCESS":
        if (!checkoutData) return null;

        if (checkoutData.type === "payment") {
          return (
            <>
              <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Payment Successful</h1>
              <p className="text-gray-700 mb-6">
                Thank you for your order. Your payment has been processed successfully.
              </p>
              <a
                href="/"
                className="inline-block px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
              >
                Back to Home
              </a>
            </>
          );
        }

        if (checkoutData.type === "subscription") {
          const endDate = new Date(checkoutData.currentPeriodEnd).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: "Asia/Bangkok",
          });
          return (
            <>
              <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Subscription Active</h1>
              <p className="text-gray-700 mb-2">
                Your subscription is now active. Thank you for subscribing!
              </p>
              <p className="text-gray-500 mb-6">Current period ends on: {endDate}</p>
              <a
                href="/"
                className="inline-block px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
              >
                Back to Home
              </a>
            </>
          );
        }
        return null;

      case "FAILED":
        return (
          <>
            <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Status Check Failed</h1>
            <p className="text-gray-700 mb-6">
              We could not verify your checkout status. Please try again.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
            >
              Back to Home
            </a>
          </>
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md text-center">
        {renderContent()}
      </div>
    </div>
  );
}
